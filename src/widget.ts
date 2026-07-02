/**
 * Onyx Chat Widget - Main Component
 * Orchestrates launcher/inline modes and manages widget lifecycle
 */

import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { WidgetConfig, ChatMessage } from "./types/widget-types";
import { SearchDocument, ResolvedCitation } from "./types/api-types";
import { resolveConfig } from "./config/config";
import { theme } from "./styles/theme";
import { widgetStyles } from "./styles/widget-styles";
import { ApiService } from "./services/api-service";
import { processPacket } from "./services/stream-parser";
import { saveSession, loadSession, clearSession } from "./utils/storage";
import { DEFAULT_LOGO } from "./assets/logo";

@customElement("onyx-chat-widget")
export class OnyxChatWidget extends LitElement {
  static styles = [theme, widgetStyles];

  // Configuration attributes
  @property({ attribute: "backend-url" }) backendUrl?: string;
  @property({ attribute: "api-key" }) apiKey?: string;
  @property({ attribute: "agent-id", type: Number }) agentId?: number;
  @property({ attribute: "primary-color" }) primaryColor?: string;
  @property({ attribute: "background-color" }) backgroundColor?: string;
  @property({ attribute: "text-color" }) textColor?: string;
  @property({ attribute: "agent-name" }) agentName?: string;
  @property({ attribute: "logo" }) logo?: string;
  @property() mode?: "launcher" | "inline";
  @property({ attribute: "launcher-bottom" }) launcherBottom?: string;
  @property({ attribute: "launcher-right" }) launcherRight?: string;
  @property({ attribute: "launcher-draggable", type: Boolean })
  launcherDraggable?: boolean;
  @property({ attribute: "include-citations", type: Boolean })
  includeCitations?: boolean;

  // Internal state
  @state() private isOpen = false;
  @state() private chatSessionId?: string;
  @state() private messages: ChatMessage[] = [];
  @state() private isLoading = false;
  @state() private isStreaming = false;
  @state() private streamingStatus = ""; // e.g., "Searching the web...", "Generating response..."
  @state() private error?: string;
  @state() private inputValue = "";
  @state() private showEmptyPlaceholder = false;
  @state() private showEmptyHiding = false;

  private config!: WidgetConfig;
  private apiService!: ApiService;
  private abortController?: AbortController;
  // Citation state — plain fields (not @state) since Map mutations don't trigger Lit re-renders
  private documentMap = new Map<string, SearchDocument>();
  private citationMap = new Map<number, string>();
  // Cache for fetched Lucide SVGs
  private lucideSvgCache = new Map<string, string>();

  // Drag state for the floating launcher (not @state — manual re-render via requestUpdate)
  private isDragging = false;
  private dragHasMoved = false;
  private dragPointerId: number | null = null;
  /** Cached rect at pointerdown — used for sizing and as the origin for transform delta. */
  private dragStartRect: DOMRect | null = null;
  /** Pointer Y offset from the button's top at the moment of grab. */
  private dragGrabOffsetY = 0;
  private boundOnPointerMove = (e: PointerEvent) => this.onPointerMove(e);
  private boundOnPointerUp = (e: PointerEvent) => this.onPointerUp(e);
  private launcherEl: HTMLButtonElement | null = null;

  /**
   * Maximum Y travel allowed when dragging the launcher, in pixels.
   * The button can move up/down within this band from its original position.
   * Set to 0 to disable the limit (drag from original to viewport edge).
   */
  private readonly DRAG_Y_RANGE_PX = 120;

  constructor() {
    super();
    // Configure marked options
    marked.setOptions({
      breaks: true, // Convert \n to <br>
      gfm: true, // GitHub Flavored Markdown
    });
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    // Auto-scroll when messages change or streaming status changes
    if (
      changedProperties.has("messages") ||
      changedProperties.has("isStreaming")
    ) {
      this.scrollToBottom();
    }

    // Ensure Lucide icons are loaded into any placeholders
    this.loadLucideIcons();

    // Cache reference to the launcher element for drag calculations
    if (!this.launcherEl) {
      this.launcherEl = this.shadowRoot?.querySelector(
        ".launcher"
      ) as HTMLButtonElement | null;
    }
  }

  private async fetchLucideSvg(name: string): Promise<string | null> {
    if (this.lucideSvgCache.has(name)) return this.lucideSvgCache.get(name)!;
    // Try GitHub CDN for lucide icons
    const base = "https://cdn.jsdelivr.net/gh/lucide-icons/lucide@latest/icons";
    const url = `${base}/${name}.svg`;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      let svg = await res.text();
      // Normalize SVG: remove XML prolog and fix width/height to use em for sizing
      svg = svg.replace(/<\?xml.*?\?>\s*/i, "");
      svg = svg.replace(/width=\"[^"]*\"/i, 'width="1em"');
      svg = svg.replace(/height=\"[^"]*\"/i, 'height="1em"');
      // Ensure stroke uses currentColor where appropriate
      svg = svg.replace(/stroke=\"none\"/gi, '');
      this.lucideSvgCache.set(name, svg);
      return svg;
    } catch (e) {
      console.warn("Failed to fetch lucide svg:", url, e);
      return null;
    }
  }

  private async loadLucideIcons() {
    if (!this.shadowRoot) return;
    const nodes = Array.from(
      this.shadowRoot.querySelectorAll<HTMLElement>(".lucide-icon[data-icon]")
    );
    await Promise.all(
      nodes.map(async (el) => {
        const name = el.getAttribute("data-icon");
        if (!name) return;
        if (el.dataset["loaded"] === "1") return;
        const svg = await this.fetchLucideSvg(name);
        if (svg) {
          el.innerHTML = svg;
          // make svg inherit currentColor
          const svgEl = el.querySelector("svg");
          if (svgEl) {
            svgEl.setAttribute("width", "1em");
            svgEl.setAttribute("height", "1em");
            svgEl.style.verticalAlign = "middle";
            svgEl.setAttribute("stroke", "currentColor");
            svgEl.setAttribute("fill", "none");
          }
          el.dataset["loaded"] = "1";
        }
      })
    );
  }

  private scrollToBottom() {
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const messagesContainer = this.shadowRoot?.querySelector(".messages");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Inject Material Symbols stylesheet into the host document (avoid @import in constructable stylesheets)
    try {
      const href =
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    } catch (e) {
      console.warn("Failed to inject material symbols stylesheet:", e);
    }

    // Resolve configuration (guard against thrown errors so the widget doesn't crash)
    try {
      this.config = resolveConfig({
        backendUrl: this.backendUrl,
        apiKey: this.apiKey,
        agentId: this.agentId,
        primaryColor: this.primaryColor,
        backgroundColor: this.backgroundColor,
        textColor: this.textColor,
        agentName: this.agentName,
        logo: this.logo,
        mode: this.mode,
        launcherBottom: this.launcherBottom,
        launcherRight: this.launcherRight,
        launcherDraggable: this.launcherDraggable,
        includeCitations: this.includeCitations,
      });
    } catch (err: any) {
      console.error("Failed to resolve widget config:", err);
      this.error = err?.message || "Invalid widget configuration";
      // Fallback minimal config so UI can render and show the error
      this.config = resolveConfig({
        backendUrl: this.backendUrl || "",
        apiKey: this.apiKey || "",
        agentId: this.agentId,
        primaryColor: this.primaryColor,
        backgroundColor: this.backgroundColor,
        textColor: this.textColor,
        agentName: this.agentName,
        logo: this.logo,
        mode: this.mode || "launcher",
        launcherBottom: this.launcherBottom,
        launcherRight: this.launcherRight,
        launcherDraggable: this.launcherDraggable,
        includeCitations: this.includeCitations,
      });
    }

    // Apply custom colors
    this.applyCustomColors();

    // Apply launcher positioning defaults via CSS custom properties
    this.applyLauncherPosition();

    // Initialize API service (use config values; ApiService may validate further)
    this.apiService = new ApiService(
      this.config.backendUrl,
      this.config.apiKey
    );

    // Load persisted session
    const stored = loadSession();
    if (stored) {
      this.chatSessionId = stored.sessionId;
      this.messages = stored.messages;
    }

    // Show empty placeholder when there are no messages
    this.showEmptyPlaceholder = this.messages.length === 0;

    // Auto-open if inline mode
    if (this.config.mode === "inline") {
      this.isOpen = true;
    }
  }

  private applyCustomColors() {
    // Primary color (buttons, accents)
    if (this.config.primaryColor) {
      this.style.setProperty("--theme-primary-05", this.config.primaryColor);
      this.style.setProperty(
        "--theme-primary-06",
        this.adjustBrightness(this.config.primaryColor, -10)
      );
    }

    // Background color
    if (this.config.backgroundColor) {
      this.style.setProperty(
        "--background-neutral-00",
        this.config.backgroundColor
      );
      this.style.setProperty(
        "--background-neutral-03",
        this.adjustBrightness(this.config.backgroundColor, -10)
      );
    }

    // Text color
    if (this.config.textColor) {
      this.style.setProperty("--text-04", this.config.textColor);
    }
  }

  /**
   * Apply configured launcher bottom/right offsets to the host element via
   * CSS custom properties. The .launcher and .container rules pick these up
   * automatically.
   */
  private applyLauncherPosition() {
    if (this.config.launcherBottom) {
      this.style.setProperty(
        "--onyx-launcher-bottom",
        this.config.launcherBottom
      );
    }
    if (this.config.launcherRight) {
      this.style.setProperty(
        "--onyx-launcher-right",
        this.config.launcherRight
      );
    }
  }

  private adjustBrightness(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  /**
   * Public API: Reset conversation
   */
  public resetConversation() {
    // Abort any active streaming request first
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = undefined;
    }

    this.messages = [];
    this.chatSessionId = undefined;
    this.error = undefined;
    this.inputValue = "";
    this.isStreaming = false;
    this.isLoading = false;
    this.streamingStatus = "";
    this.documentMap.clear();
    this.citationMap.clear();
    clearSession();
    this.showEmptyPlaceholder = true;
  }

  /**
   * Render markdown content safely.
   * Strips [[n]](url) citation links before markdown parsing so they render
   * as plain [n] text references. Citation badges are rendered separately.
   * Renumbers citations to sequential display numbers (1, 2, 3...).
   */
  private renderMarkdown(content: string, citations?: ResolvedCitation[]) {
    try {
      let stripped = content;
      if (this.config.includeCitations) {
        if (citations?.length) {
          // Build a map from backend citation number → sequential display number
          const displayMap = new Map<number, number>();
          citations.forEach((c, i) => displayMap.set(c.citation_number, i + 1));

          // Replace [[n]](url) with superscript-style display number
          stripped = stripped.replace(
            /\[\[(\d+)\]\]\([^)]*\)/g,
            (_match, num) => {
              const displayNum = displayMap.get(Number(num));
              return displayNum ? `<sup>[${displayNum}]</sup>` : "";
            }
          );
        } else {
          // Still streaming or no citations resolved yet — strip raw links
          stripped = stripped.replace(/\[\[(\d+)\]\]\([^)]*\)/g, "");
        }
      }
      const htmlContent = marked.parse(stripped, { async: false }) as string;
      const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
        ADD_TAGS: ["sup"],
      });
      return unsafeHTML(sanitizedHTML);
    } catch (err) {
      console.error("Failed to parse markdown:", err);
      return content; // Fallback to plain text
    }
  }

  private static readonly CITATIONS_COLLAPSED_COUNT = 1;

  /**
   * Render a single citation badge.
   */
  private renderCitationBadge(
    c: ResolvedCitation,
    displayNum: number
  ): TemplateResult {
    const title = c.semantic_identifier || "Source";
    const safeHref =
      c.link && /^https?:\/\//i.test(c.link) ? c.link : undefined;
    return safeHref
      ? html`<a
          class="citation-badge"
          href=${safeHref}
          target="_blank"
          rel="noopener noreferrer"
          title=${title}
          ><span class="citation-num">${displayNum}</span
          ><span class="citation-title">${title}</span></a
        >`
      : html`<span class="citation-badge" title=${title}
          ><span class="citation-num">${displayNum}</span
          ><span class="citation-title">${title}</span></span
        >`;
  }

  /**
   * Toggle expanded state for a citation list.
   */
  private toggleCitationExpand(e: Event): void {
    const container = (e.target as HTMLElement).closest(".citation-list");
    if (container) {
      container.classList.toggle("expanded");
    }
  }

  /**
   * Render citation badges for a message.
   * Shows first 3 inline, collapses the rest behind a "+N more" toggle.
   */
  private renderCitations(
    citations?: ResolvedCitation[]
  ): string | TemplateResult {
    if (!citations?.length) return "";
    const limit = OnyxChatWidget.CITATIONS_COLLAPSED_COUNT;
    const visible = citations.slice(0, limit);
    const overflow = citations.slice(limit);

    return html`
      <div class="citation-list">
        ${visible.map((c, i) => this.renderCitationBadge(c, i + 1))}
        ${overflow.length > 0
        ? html`
              <button class="citation-more" @click=${this.toggleCitationExpand}>
                +${overflow.length} more
              </button>
              <div class="citation-overflow">
                ${overflow.map((c, i) =>
          this.renderCitationBadge(c, limit + i + 1)
        )}
              </div>
            `
        : ""}
      </div>
    `;
  }

  private toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  private close() {
    if (this.config.mode === "launcher") {
      this.isOpen = false;
    }
  }

  /**
   * Begin a drag of the floating launcher. We only initiate a drag once the
   * pointer has moved a few pixels — otherwise a plain click would never
   * toggle the chat popup.
   */
  private onLauncherPointerDown(e: PointerEvent) {
    if (!this.config.launcherDraggable) return;
    // Disable drag on mobile (touch + narrow viewport)
    if (this.isMobileViewport()) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;

    const el = this.launcherEl;
    if (!el) return;

    // Capture pointer so the element keeps receiving events even if the
    // pointer leaves it.
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    // Cache the starting rect ONCE — used as the origin for transform delta.
    this.dragStartRect = el.getBoundingClientRect();

    // Pointer Y offset from the button's top at grab time. Used so the
    // button doesn't snap its top to the pointer on every move.
    this.dragGrabOffsetY = e.clientY - this.dragStartRect.top;

    this.dragPointerId = e.pointerId;
    this.isDragging = true;
    this.dragHasMoved = false;

    // Window-level fallback listeners in case pointer capture is unavailable.
    window.addEventListener("pointermove", this.boundOnPointerMove);
    window.addEventListener("pointerup", this.boundOnPointerUp);
    window.addEventListener("pointercancel", this.boundOnPointerUp);
  }

  private onPointerMove(e: PointerEvent) {
    if (
      !this.isDragging ||
      this.dragPointerId === null ||
      e.pointerId !== this.dragPointerId
    ) {
      return;
    }

    // Threshold: only treat as drag after the pointer has moved enough
    // vertically from the grab point.
    if (!this.dragHasMoved) {
      const startY = this.dragStartRect
        ? this.dragStartRect.top + this.dragGrabOffsetY
        : e.clientY;
      if (Math.abs(e.clientY - startY) < 4) return;
      this.dragHasMoved = true;
    }

    e.preventDefault();

    const el = this.launcherEl;
    if (!el) return;

    // Y-axis drag: new top = pointer Y - grab offset. X stays put.
    const newTop = e.clientY - this.dragGrabOffsetY;

    // Clamp Y to a limited range from the original position. The launcher
    // can move up/down by DRAG_Y_RANGE_PX from its starting point, but
    // also cannot go off-screen.
    const rect = this.dragStartRect;
    if (!rect) return;
    const vh = window.innerHeight;
    const h = rect.height;

    // Allowed Y range: [rect.top - DRAG_Y_RANGE_PX, rect.top + DRAG_Y_RANGE_PX]
    // intersected with viewport bounds [0, vh - h].
    const range = this.DRAG_Y_RANGE_PX;
    const minTop = Math.max(0, rect.top - range);
    const maxTop = Math.min(vh - h, rect.top + range);
    const clampedTop = Math.max(minTop, Math.min(maxTop, newTop));

    // Translate from the original rect position. X is always 0 (no horizontal
    // movement) so the launcher stays anchored to the right edge.
    const ty = clampedTop - rect.top;

    el.style.transform = `translate3d(0, ${ty}px, 0)`;
    el.style.transition = "none";
  }

  private onPointerUp(e: PointerEvent) {
    if (
      this.dragPointerId === null ||
      e.pointerId !== this.dragPointerId
    ) {
      return;
    }
    this.isDragging = false;
    this.dragPointerId = null;

    window.removeEventListener("pointermove", this.boundOnPointerMove);
    window.removeEventListener("pointerup", this.boundOnPointerUp);
    window.removeEventListener("pointercancel", this.boundOnPointerUp);

    const el = this.launcherEl;
    if (!el) {
      this.dragHasMoved = false;
      return;
    }

    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    // Convert final transform offset to bottom so the launcher re-anchors
    // via inline style (no transform = no visual artifact on next render).
    // Right is left unchanged from the configured value.
    if (this.dragHasMoved && this.dragStartRect) {
      const ty = this.parseTranslateY(el.style.transform);
      const rect = this.dragStartRect;
      const finalTop = rect.top + ty;
      const vh = window.innerHeight;
      const newBottomPx = Math.max(0, Math.round(vh - finalTop - rect.height));

      el.style.transform = "";
      el.style.transition = "";
      el.style.bottom = `${newBottomPx}px`;
      // right is intentionally NOT set — leave it at the configured value
    } else {
      el.style.transition = "";
    }

    this.dragStartRect = null;

    // Suppress the click that would otherwise toggle the chat popup
    if (this.dragHasMoved) {
      const swallow = (ev: Event) => {
        ev.stopPropagation();
        ev.preventDefault();
        window.removeEventListener("click", swallow, true);
      };
      window.addEventListener("click", swallow, true);
    }

    this.dragHasMoved = false;
  }

  private parseTranslateY(transform: string): number {
    const m = transform.match(
      /translate3d\(\s*-?\d+(?:\.\d+)?px,\s*(-?\d+(?:\.\d+)?)px/
    );
    return m ? parseFloat(m[1]) : 0;
  }

  /**
   * True when the viewport is mobile-sized or the input is primarily touch.
   * Used to disable the draggable launcher on mobile per requirements.
   */
  private isMobileViewport(): boolean {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(max-width: 768px)").matches) return true;
    // Coarse pointer = touch-first device
    if (window.matchMedia("(pointer: coarse)").matches) return true;
    return false;
  }

  private handleInput(e: InputEvent) {
    this.inputValue = (e.target as HTMLInputElement).value;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  private async sendMessage() {
    const message = this.inputValue.trim();
    if (!message || this.isLoading || this.isStreaming) return;

    // Clear input immediately
    this.inputValue = "";

    // If the empty placeholder is visible, start hide animation and remove after animation
    if (this.showEmptyPlaceholder) {
      this.showEmptyHiding = true;
      // Match CSS transition duration (320ms) with small buffer
      setTimeout(() => {
        this.showEmptyPlaceholder = false;
        this.showEmptyHiding = false;
      }, 360);
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: Date.now(),
    };
    this.messages = [...this.messages, userMessage];

    try {
      this.isStreaming = true;
      this.error = undefined;

      // Create session if needed
      if (!this.chatSessionId) {
        this.isLoading = true;
        this.chatSessionId = await this.apiService.createChatSession(
          this.config.agentId
        );
        this.isLoading = false;
      }

      // Get parent message ID (last assistant message with a numeric ID from backend)
      const parentMessage = [...this.messages]
        .reverse()
        .find((m) => m.role === "assistant" && typeof m.id === "number");
      const parentMessageId =
        parentMessage && typeof parentMessage.id === "number"
          ? parentMessage.id
          : null;

      // Stream response
      this.abortController = new AbortController();
      let currentMessage: ChatMessage | null = null;
      let assistantMessageId: number | null = null;

      for await (const packet of this.apiService.streamMessage({
        message,
        chatSessionId: this.chatSessionId,
        parentMessageId,
        signal: this.abortController.signal,
        includeCitations: this.config.includeCitations,
      })) {
        const result = processPacket(packet, currentMessage);

        // Capture message IDs from backend and update local messages
        if (result.messageIds) {
          // Update user message ID if we got one
          if (result.messageIds.userMessageId !== null) {
            const userMsgIndex = this.messages.findIndex(
              (m) => m.id === userMessage.id
            );
            if (userMsgIndex >= 0) {
              // Create new array to trigger reactivity
              const updatedMessage = {
                ...this.messages[userMsgIndex],
                id: result.messageIds.userMessageId,
              };
              this.messages = [
                ...this.messages.slice(0, userMsgIndex),
                updatedMessage,
                ...this.messages.slice(userMsgIndex + 1),
              ];
            }
          }
          // Store assistant message ID to apply when message is created
          assistantMessageId = result.messageIds.assistantMessageId;
        }

        // Update status if provided
        if (result.status !== undefined) {
          this.streamingStatus = result.status;
        }

        // Accumulate document metadata for citation resolution
        if (result.documents) {
          for (const doc of result.documents) {
            this.documentMap.set(doc.document_id, doc);
          }
        }

        // Accumulate citation mappings for the current message
        if (result.citation) {
          this.citationMap.set(
            result.citation.citation_number,
            result.citation.document_id
          );
        }

        if (result.message) {
          // Reset per-message citation state when a new message starts
          if (
            result.message.isStreaming &&
            result.message.content === "" &&
            currentMessage === null
          ) {
            this.citationMap.clear();
          }

          currentMessage = result.message;

          // Apply the backend message ID if we have it and message doesn't have a numeric ID yet
          if (
            assistantMessageId !== null &&
            typeof currentMessage.id !== "number"
          ) {
            currentMessage.id = assistantMessageId;
          }

          // When message is complete, resolve citations and attach to message
          if (!currentMessage.isStreaming && this.citationMap.size > 0) {
            const resolved: ResolvedCitation[] = [];
            for (const [citNum, docId] of this.citationMap) {
              const doc = this.documentMap.get(docId);
              resolved.push({
                citation_number: citNum,
                document_id: docId,
                semantic_identifier: doc?.semantic_identifier,
                link: doc?.link ?? undefined,
              });
            }
            resolved.sort((a, b) => a.citation_number - b.citation_number);
            currentMessage = { ...currentMessage, citations: resolved };
          }

          // Update or add message
          const existingIndex = this.messages.findIndex(
            (m) => m.id === currentMessage?.id
          );
          if (existingIndex >= 0) {
            this.messages = [
              ...this.messages.slice(0, existingIndex),
              currentMessage,
              ...this.messages.slice(existingIndex + 1),
            ];
          } else {
            this.messages = [...this.messages, currentMessage];
          }

          // Clear streaming state and persist when message is complete
          if (!currentMessage.isStreaming) {
            this.isStreaming = false;
            this.streamingStatus = "";
            saveSession(this.chatSessionId, this.messages);
          }
        }
      }
    } catch (err: any) {
      console.error("Failed to send message:", err);
      if (err.name !== "AbortError") {
        this.error = err.message || "Failed to send message";
      }
    } finally {
      this.isStreaming = false;
      this.isLoading = false;
      this.streamingStatus = "";
      this.abortController = undefined;
    }
  }

  render() {
    const showContainer = this.config.mode === "inline" || this.isOpen;
    const hasMessages = this.messages.length > 0 || this.isStreaming;
    const isCompactInline = this.config.mode === "inline" && !hasMessages;
    const isLauncher = this.config.mode === "launcher";
    // Disable drag on mobile viewports per spec
    const draggable =
      isLauncher && this.config.launcherDraggable && !this.isMobileViewport();

    return html`
      ${isLauncher
        ? html`
            <button
              class="launcher ${draggable ? "launcher--draggable" : ""} ${this.isDragging ? "launcher--dragging" : ""
          }"
              @pointerdown=${this.onLauncherPointerDown}
              @click=${this.toggleOpen}
              title="Open chat"
            >
              <img
                src="${this.config.logo || DEFAULT_LOGO}"
                alt="Logo"
                style="width: 32px; height: 32px; object-fit: contain;"
              />
            </button>
          `
        : ""}
      ${showContainer
        ? html`
            <div
              class="container ${isLauncher ? "launcher-mode" : "inline"} ${isCompactInline ? "compact" : ""
          }"
            >
              ${isCompactInline
            ? this.renderCompactInput()
            : html`
                    ${this.renderHeader()} ${this.renderMessages()}
                    ${this.renderInput()}
                  `}
            </div>
          `
        : ""}
    `;
  }

  private renderHeader() {
    return html`
      <div class="header">
        <div class="header-left">
          <div class="avatar">
            <img
              src="${this.config.logo || DEFAULT_LOGO}"
              alt="Logo"
              style="width: 100%; height: 100%; object-fit: contain;"
            />
          </div>
          <div class="header-title">
            ${this.config.agentName || "Assistant Test"}
          </div>
        </div>
        <div class="header-right">
          <button
            class="icon-button"
            @click=${this.resetConversation}
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <span class="lucide-icon" data-icon="refresh-cw" aria-hidden="true"></span>
          </button>
          ${this.config.mode === "launcher"
        ? html`
                <button class="icon-button" @click=${this.close} title="Close" aria-label="Close">
                  <span class="lucide-icon" data-icon="x" aria-hidden="true"></span>
                </button>
              `
        : ""}
        </div>
      </div>
    `;
  }

  private renderMessages() {
    // Check if there's a streaming message with content
    const hasStreamingContent = this.messages.some(
      (m) => m.role === "assistant" && m.isStreaming && m.content.length > 0
    );
    // Show ellipsis only when: streaming AND (has status text OR no content yet)
    const showEllipsis =
      this.isStreaming && (this.streamingStatus || !hasStreamingContent);

    return html`
      
      <div class="messages">
        ${(this.showEmptyPlaceholder || (this.messages.length === 0 && !this.isStreaming))
        ? html`
              <div
                class="empty-welcome ${this.showEmptyHiding ? "empty-welcome--hide" : ""}"
                aria-hidden=${this.messages.length > 0}
              >
                <div class="empty-welcome__logo">
                  <img
                    src="${this.config.logo || DEFAULT_LOGO}"
                    alt=""
                    style="width:56px;height:56px;object-fit:contain;border-radius:50%"
                  />
                </div>
                <div class="empty-welcome__title">Hi there, ${"I'm " + this.config.agentName || "Assistant"}</div>
                <div class="empty-welcome__subtitle">How can I help you today?</div>
              </div>
            `
        : ""}
        ${this.error ? html` <div class="error">${this.error}</div> ` : ""}
        ${this.messages.map(
          (msg) => html`
            <div class="message ${msg.role}">
              <div class="message-bubble">
                ${msg.role === "assistant"
              ? html`${this.renderMarkdown(
                msg.content,
                msg.citations
              )}${this.renderCitations(msg.citations)}`
              : msg.content}
              </div>
            </div>
          `
        )}
        ${showEllipsis
        ? html`
              <div class="message assistant">
                <div class="message-bubble">
                  <div class="status-container">
                    <div class="typing-indicator">
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                    </div>
                    ${this.streamingStatus
            ? html`
                          <span class="status-text"
                            >${this.streamingStatus}</span
                          >
                        `
            : ""}
                  </div>
                </div>
              </div>
            `
        : ""}
      </div>
    `;
  }

  private renderInput() {
    return html`
      <div class="input-wrapper">
        <div class="input-container">
          <input
            class="input"
            type="text"
            .value=${this.inputValue}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
            placeholder="Type your message..."
            ?disabled=${this.isLoading || this.isStreaming}
          />
          <button
            class="send-button"
            @click=${this.sendMessage}
            ?disabled=${!this.inputValue.trim() ||
      this.isLoading ||
      this.isStreaming}
            title="Send message"
            aria-label="Send message"
          >
            <span class="lucide-icon" data-icon="send" aria-hidden="true"></span>
          </button>
        </div>
        <div class="disclaimer">
          Responses are generated by AI and may be inaccurate.
        </div>
      </div>
    `;
  }

  private renderCompactInput() {
    return html`
      <div class="compact-input-container">
        <div class="compact-avatar">
          <img
            src="${this.config.logo || DEFAULT_LOGO}"
            alt="Logo"
            style="width: 100%; height: 100%; object-fit: contain;"
          />
        </div>
        <input
          class="compact-input"
          type="text"
          .value=${this.inputValue}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
          placeholder="Type to ask ${this.config.agentName || "Assistant"} anything..."
          ?disabled=${this.isLoading || this.isStreaming}
        />
        <button
          class="send-button"
          @click=${this.sendMessage}
          ?disabled=${!this.inputValue.trim() ||
      this.isLoading ||
      this.isStreaming}
          title="Send message"
          aria-label="Send message"
        >
          <span class="lucide-icon" data-icon="send" aria-hidden="true"></span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onyx-chat-widget": OnyxChatWidget;
  }
}
this.isLoading ||
  this.isStreaming}
title = "Send message"
aria - label="Send message"
  >
  <span class="lucide-icon" data - icon="send" aria - hidden="true" > </span>
    </button>
    </div>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onyx-chat-widget": OnyxChatWidget;
  }
}
