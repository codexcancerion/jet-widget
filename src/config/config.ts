import { WidgetConfig } from "@/types/widget-types";

/** Default fallback values for optional launcher positioning. */
const DEFAULT_LAUNCHER_BOTTOM = "20px";
const DEFAULT_LAUNCHER_RIGHT = "20px";

/**
 * Normalize a CSS length value to the form "<number><unit>".
 * Accepts bare numbers (e.g. "20" → "20px") and rejects anything obviously
 * invalid so we never inject dangerous values into inline styles.
 */
function normalizeLength(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  // Allow common length units; if a bare number is given, default to px.
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`;
  if (/^-?\d+(\.\d+)?(px|rem|em|%|vh|vw)$/i.test(trimmed)) return trimmed;
  // Fall back to the default if we can't confidently parse it
  return fallback;
}

/**
 * Resolve widget configuration from attributes and environment variables
 * Priority: attributes > environment variables > defaults
 */
export function resolveConfig(attributes: Partial<WidgetConfig>): WidgetConfig {
  const config = {
    backendUrl:
      attributes.backendUrl || import.meta.env.VITE_WIDGET_BACKEND_URL || "",
    apiKey: attributes.apiKey || import.meta.env.VITE_WIDGET_API_KEY || "",
    agentId: attributes.agentId,
    primaryColor: attributes.primaryColor,
    backgroundColor: attributes.backgroundColor,
    textColor: attributes.textColor,
    agentName: attributes.agentName || "Assistant",
    logo: attributes.logo,
    mode: attributes.mode || "launcher",
    launcherBottom: normalizeLength(
      attributes.launcherBottom,
      DEFAULT_LAUNCHER_BOTTOM
    ),
    launcherRight: normalizeLength(
      attributes.launcherRight,
      DEFAULT_LAUNCHER_RIGHT
    ),
    launcherDraggable: attributes.launcherDraggable ?? false,
    includeCitations: attributes.includeCitations ?? false,
  };

  if (!config.backendUrl || !config.apiKey) {
    throw new Error(
      "backendUrl and apiKey are required for the widget to function"
    );
  }

  return config;
}
