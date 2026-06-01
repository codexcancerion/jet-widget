import React, { useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import clsx from "clsx";
import { ApiService } from "@/services/api-service";
import { processPacket } from "@/services/stream-parser";
import { saveSession, loadSession, clearSession } from "@/utils/storage";
import { ChatMessage, WidgetConfig } from "@/types/widget-types";
import { ResolvedCitation, SearchDocument } from "@/types/api-types";

interface ChatWidgetProps {
  config: WidgetConfig;
}

const CITATIONS_COLLAPSED_COUNT = 1;


function safeHtml(content: string, citations?: ResolvedCitation[], includeCitations = false) {
  let stripped = content;

  if (includeCitations) {
    if (citations?.length) {
      const displayMap = new Map<number, number>();
      citations.forEach((citation, index) =>
        displayMap.set(citation.citation_number, index + 1)
      );
      stripped = stripped.replace(/\[\[(\d+)\]\]\([^)]*\)/g, (_match, num) => {
        const displayNum = displayMap.get(Number(num));
        return displayNum ? `<sup>[${displayNum}]</sup>` : "";
      });
    } else {
      stripped = stripped.replace(/\[\[(\d+)\]\]\([^)]*\)/g, "");
    }
  }

  const html = marked.parse(stripped, { gfm: true, breaks: true }) as string;
  return DOMPurify.sanitize(html, { ADD_TAGS: ["sup"] });
}

function renderCitationBadge(citation: ResolvedCitation, displayNum: number) {
  const title = citation.semantic_identifier || "Source";
  const href = citation.link && /^https?:\/\//i.test(citation.link) ? citation.link : undefined;

  if (href) {
    return (
      <a
        key={`${citation.document_id}-${displayNum}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
        title={title}
      >
        <span className="font-semibold text-slate-900">[{displayNum}]</span>
        <span className="truncate max-w-[10rem]">{title}</span>
      </a>
    );
  }

  return (
    <span
      key={`${citation.document_id}-${displayNum}`}
      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600"
      title={title}
    >
      <span className="font-semibold text-slate-900">[{displayNum}]</span>
      <span className="truncate max-w-[10rem]">{title}</span>
    </span>
  );
}

export function ChatWidget({ config }: ChatWidgetProps) {
  const apiService = useMemo(
    () => new ApiService(config.backendUrl, config.apiKey),
    [config.backendUrl, config.apiKey]
  );

  const [isOpen, setIsOpen] = useState(config.mode === "inline");
  const [chatSessionId, setChatSessionId] = useState<string | undefined>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const latestMessagesRef = useRef<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingStatus, setStreamingStatus] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [citationExpanded, setCitationExpanded] = useState<Record<string, boolean>>({});

  const abortControllerRef = useRef<AbortController | null>(null);
  const documentMapRef = useRef(new Map<string, SearchDocument>());
  const citationMapRef = useRef(new Map<number, string>());
  const currentMessageRef = useRef<ChatMessage | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = loadSession();
    if (stored) {
      setChatSessionId(stored.sessionId);
      setMessages(stored.messages);
      latestMessagesRef.current = stored.messages;
    }
  }, []);

  useEffect(() => {
    latestMessagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (config.mode === "inline") {
      setIsOpen(true);
    }
  }, [config.mode]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  }, [messages, isStreaming]);

  const updateMessages = (updatedMessage: ChatMessage) => {
    setMessages((prev) => {
      const existingIndex = prev.findIndex((message) => message.id === updatedMessage.id);
      const nextMessages =
        existingIndex >= 0
          ? [
              ...prev.slice(0, existingIndex),
              updatedMessage,
              ...prev.slice(existingIndex + 1),
            ]
          : [...prev, updatedMessage];
      latestMessagesRef.current = nextMessages;
      return nextMessages;
    });
  };

  const renderCitations = (citations?: ResolvedCitation[], messageId?: string | number) => {
    if (!citations?.length) return null;

    const visible = citations.slice(0, CITATIONS_COLLAPSED_COUNT);
    const overflow = citations.slice(CITATIONS_COLLAPSED_COUNT);
    const key = messageId?.toString() ?? "";
    const expanded = citationExpanded[key];

    return (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {visible.map((citation, index) => renderCitationBadge(citation, index + 1))}
        {overflow.length > 0 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCitationExpanded((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {expanded ? "Hide" : `+${overflow.length} more`}
            </button>
            {expanded && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {overflow.map((citation, index) =>
                  renderCitationBadge(citation, CITATIONS_COLLAPSED_COUNT + index + 1)
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const sendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isLoading || isStreaming) return;

    setInputValue("");
    setError(undefined);

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmedMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => {
      const next = [...prev, userMessage];
      latestMessagesRef.current = next;
      return next;
    });

    try {
      setIsStreaming(true);
      let sessionId = chatSessionId;
      if (!sessionId) {
        setIsLoading(true);
        const newSessionId = await apiService.createChatSession(config.agentId);
        sessionId = newSessionId;
        setChatSessionId(newSessionId);
        setIsLoading(false);
      }

      abortControllerRef.current = new AbortController();
      currentMessageRef.current = null;
      citationMapRef.current.clear();
      documentMapRef.current.clear();

      for await (const packet of apiService.streamMessage({
        message: trimmedMessage,
        chatSessionId: sessionId,
        parentMessageId: null,
        signal: abortControllerRef.current.signal,
        includeCitations: config.includeCitations,
      })) {
        const result = processPacket(packet, currentMessageRef.current);

        if (result.messageIds) {
          const userMessageId = result.messageIds.userMessageId;
          if (userMessageId !== null && userMessageId !== undefined) {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === userMessage.id
                  ? { ...message, id: userMessageId }
                  : message
              )
            );
          }
        }

        if (result.status !== undefined) {
          setStreamingStatus(result.status);
        }

        if (result.documents) {
          result.documents.forEach((doc) => {
            documentMapRef.current.set(doc.document_id, doc);
          });
        }

        if (result.citation) {
          citationMapRef.current.set(result.citation.citation_number, result.citation.document_id);
        }

        if (result.message) {
          if (
            result.message.isStreaming &&
            result.message.content === "" &&
            currentMessageRef.current === null
          ) {
            citationMapRef.current.clear();
          }

          currentMessageRef.current = result.message;

          if (
            result.messageIds?.assistantMessageId !== undefined &&
            typeof currentMessageRef.current.id !== "number"
          ) {
            currentMessageRef.current = {
              ...currentMessageRef.current,
              id: result.messageIds.assistantMessageId,
            };
          }

          if (!currentMessageRef.current.isStreaming && citationMapRef.current.size > 0) {
            const resolved: ResolvedCitation[] = [];
            citationMapRef.current.forEach((docId, citationNumber) => {
              const doc = documentMapRef.current.get(docId);
              resolved.push({
                citation_number: citationNumber,
                document_id: docId,
                semantic_identifier: doc?.semantic_identifier,
                link: doc?.link ?? undefined,
              });
            });
            resolved.sort((a, b) => a.citation_number - b.citation_number);
            currentMessageRef.current = { ...currentMessageRef.current, citations: resolved };
          }

          updateMessages(currentMessageRef.current);

          if (!currentMessageRef.current.isStreaming) {
            setIsStreaming(false);
            setStreamingStatus("");
            if (sessionId) {
              saveSession(sessionId, latestMessagesRef.current);
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to send message");
      }
    } finally {
      setIsStreaming(false);
      setIsLoading(false);
      setStreamingStatus("");
      abortControllerRef.current = null;
    }
  };

  const resetConversation = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setChatSessionId(undefined);
    setError(undefined);
    setInputValue("");
    setIsStreaming(false);
    setIsLoading(false);
    setStreamingStatus("");
    documentMapRef.current.clear();
    citationMapRef.current.clear();
    clearSession();
  };

  const closeWidget = () => {
    if (config.mode === "launcher") {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const hasMessages = messages.length > 0 || isStreaming;
  const showContainer = config.mode === "inline" || isOpen;
  const isCompactInline = config.mode === "inline" && !hasMessages;
  const buttonColor = config.primaryColor || "#0ea5e9";

  return (
    <div className="onyx-chat-widget">
      {config.mode === "launcher" && (
        <button
          type="button"
          className="fixed bottom-5 right-5 z-[9999] inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-2xl transition hover:-translate-y-1 hover:bg-slate-900"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Open chat"
        >
          <span className="sr-only">Open chat</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {showContainer && (
        <div
          className={clsx(
            config.mode === "launcher"
              ? "fixed inset-0 z-[10000] flex items-end justify-end bg-slate-950/30 p-0 transition-opacity md:p-5"
              : "relative z-[10000] flex w-full items-start justify-start bg-transparent p-0"
          )}
          style={config.mode === "launcher" ? {} : { pointerEvents: "auto" }}
        >
          <div
            className={clsx(
              "relative flex h-full w-full max-w-full flex-col overflow-hidden rounded-none bg-white shadow-2xl md:rounded-[28px] md:h-[600px] md:w-[400px] md:max-w-[calc(100vw-40px)] md:max-h-[calc(100vh-40px)]",
              config.mode === "inline" ? "m-0 max-h-full rounded-[24px] border border-slate-200" : "m-0 md:m-0"
            )}
            style={{
              backgroundColor: config.backgroundColor || "#ffffff",
              color: config.textColor || "#0f172a",
            }}
          >
            {isCompactInline ? (
              <div className="mx-5 mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <img
                      src={config.logo || undefined}
                      alt="Logo"
                      className="h-8 w-8 rounded-full object-contain"
                      onError={(event) => {
                        (event.target as HTMLImageElement).src = "";
                      }}
                    />
                  </div>
                  <input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder={`Ask ${config.agentName || "Assistant"} anything...`}
                    disabled={isLoading || isStreaming}
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading || isStreaming}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: buttonColor }}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                      <img
                        src={config.logo || undefined}
                        alt="Logo"
                        className="h-8 w-8 rounded-full object-contain"
                        onError={(event) => {
                          (event.target as HTMLImageElement).src = "";
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{config.agentName || "Assistant"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetConversation}
                      title="Reset conversation"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 0 1 15.26-6.75M21 12a9 9 0 0 1-15.26 6.75M12 3v3m0 12v3m4.95-16.05l-2.12 2.12M7.17 16.83l-2.12 2.12" />
                      </svg>
                    </button>
                    {config.mode === "launcher" ? (
                      <button
                        type="button"
                        onClick={closeWidget}
                        title="Close"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 6l12 12M6 18L18 6" />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="bg-slate-50 px-5 py-3 text-xs text-slate-500">
                  Responses are generated by AI and may be inaccurate
                </div>

                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-5 space-y-4 bg-white"
                >
                  {error ? (
                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                      {error}
                    </div>
                  ) : null}

                  {messages.map((msg) => (
                    <div
                      key={`${msg.role}-${msg.id}`}
                      className={clsx(
                        "flex flex-col gap-3",
                        msg.role === "user" ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={clsx(
                          "max-w-[85%] rounded-[28px] px-4 py-4 text-sm leading-6 shadow-sm",
                          msg.role === "user"
                            ? "bg-slate-950 text-white"
                            : "bg-slate-100 text-slate-900"
                        )}
                      >
                        {msg.role === "assistant" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: safeHtml(msg.content, msg.citations, config.includeCitations),
                            }}
                          />
                        ) : (
                          <div>{msg.content}</div>
                        )}
                      </div>
                      {msg.role === "assistant" ? renderCitations(msg.citations, msg.id) : null}
                    </div>
                  ))}

                  {isStreaming ? (
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                        <div className="flex items-center gap-1">
                          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-700"></span>
                          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-700 delay-150"></span>
                          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-700 delay-300"></span>
                        </div>
                      </div>
                      <div className="rounded-[28px] bg-slate-100 px-4 py-4 text-sm leading-6 text-slate-900">
                        {streamingStatus || "Thinking..."}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-slate-200 bg-white px-5 py-4">
                  <div className="flex items-center gap-3">
                    <input
                      className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-sky-500/20"
                      type="text"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      disabled={isLoading || isStreaming}
                    />
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading || isStreaming}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ backgroundColor: buttonColor }}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500">
                    Powered by <a className="font-medium text-slate-700" href="https://onyx.app" target="_blank" rel="noreferrer">Onyx</a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
