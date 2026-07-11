export type AttributionSource =
  | "direct"
  | "whatsapp"
  | "twitter"
  | "linkedin"
  | "facebook"
  | "telegram"
  | "reddit"
  | "discord"
  | "slack"
  | "manual";

export interface AttributionContext {
  source: AttributionSource;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  sharePlatform: AttributionSource | null;
  landingTimestamp: number;
}