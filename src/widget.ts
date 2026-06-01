import { createRoot, type Root } from "react-dom/client";
import { resolveConfig } from "./config/config";
import { WidgetConfig } from "./types/widget-types";
import { ChatWidget } from "./components/ChatWidget";
import "./styles/index.css";

function parseAgentId(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function parseBoolean(value: string | null): boolean | undefined {
  if (value === null) return undefined;
  return value !== "false";
}

function resolveElementConfig(element: HTMLElement): WidgetConfig {
  return resolveConfig({
    backendUrl: element.getAttribute("backend-url") ?? undefined,
    apiKey: element.getAttribute("api-key") ?? undefined,
    agentId: parseAgentId(element.getAttribute("agent-id")),
    primaryColor: element.getAttribute("primary-color") ?? undefined,
    backgroundColor: element.getAttribute("background-color") ?? undefined,
    textColor: element.getAttribute("text-color") ?? undefined,
    agentName: element.getAttribute("agent-name") ?? undefined,
    logo: element.getAttribute("logo") ?? undefined,
    mode: element.getAttribute("mode") === "inline" ? "inline" : "launcher",
    includeCitations: parseBoolean(element.getAttribute("include-citations")) ?? false,
  });
}

export class OnyxChatWidget extends HTMLElement {
  private root?: Root;

  static get observedAttributes() {
    return [
      "backend-url",
      "api-key",
      "agent-id",
      "primary-color",
      "background-color",
      "text-color",
      "agent-name",
      "logo",
      "mode",
      "include-citations",
    ];
  }

  connectedCallback() {
    this.style.display = "block";
    this.renderWidget();
  }

  disconnectedCallback() {
    this.root?.unmount();
  }

  attributeChangedCallback() {
    this.renderWidget();
  }

  private renderWidget() {
    try {
      const config = resolveElementConfig(this);
      if (!this.root) {
        this.root = createRoot(this);
      }
      this.root.render(<ChatWidget config={config} />);
    } catch (error) {
      console.error("Failed to render OnyxChatWidget:", error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onyx-chat-widget": OnyxChatWidget;
  }
}
