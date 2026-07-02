/**
 * Widget-specific types
 */

import { ResolvedCitation } from "@/types/api-types";

export interface WidgetConfig {
  // Required
  backendUrl: string;
  apiKey: string;

  // Optional - Assistant
  agentId?: number;
  agentName?: string;
  logo?: string;

  // Optional - Customization
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;

  // Optional - Display
  mode?: "launcher" | "inline";

  // Optional - Launcher positioning
  /** Distance from the bottom edge of the viewport (e.g. "20px", "40px"). */
  launcherBottom?: string;
  /** Distance from the right edge of the viewport (e.g. "20px", "40px"). */
  launcherRight?: string;
  /** When true, the floating launcher button can be dragged. */
  launcherDraggable?: boolean;

  // Optional - Citations
  includeCitations?: boolean;

  // Optional - Attraction
  /** The message displayed in the launcher attraction popup. */
  attractionMessage?: string;
  /** When true, shows the attraction popup bubble. */
  showAttraction?: boolean | string;
}

export interface ChatState {
  sessionId?: string;
  messages: ChatMessage[];
  isLoading: boolean;
  error?: string;
}

export interface ChatMessage {
  id: string | number; // string for temporary local IDs, number for backend IDs
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  citations?: ResolvedCitation[];
}
