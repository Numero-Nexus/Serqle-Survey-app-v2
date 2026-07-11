export interface ShareContent {
  title: string;
  description: string;
  url: string;
}

export interface CampaignParams {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

function withCampaignParams(
  url: string,
  platform: SharePlatform | "manual",
  campaign: CampaignParams
): string {
  try {
    const withParams = new URL(url);
    withParams.searchParams.set("utm_source", campaign.utmSource);
    withParams.searchParams.set("utm_medium", campaign.utmMedium);
    withParams.searchParams.set("utm_campaign", campaign.utmCampaign);
    withParams.searchParams.set("share_platform", platform);
    return withParams.toString();
  } catch {
    return url;
  }
}

export type SharePlatform =
  | "whatsapp"
  | "twitter"
  | "linkedin"
  | "facebook"
  | "telegram"
  | "reddit";

function buildShareText(content: ShareContent): string {
  return `${content.title}\n\n${content.description}\n\n${content.url}`;
}

const PLATFORM_BUILDERS: Record<SharePlatform, (c: ShareContent) => string> = {
  whatsapp: (c) => `https://wa.me/?text=${encodeURIComponent(buildShareText(c))}`,
  twitter: (c) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${c.title}\n\n${c.description}`
    )}&url=${encodeURIComponent(c.url)}`,
  linkedin: (c) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(c.url)}`,
  facebook: (c) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(c.url)}`,
  telegram: (c) =>
    `https://t.me/share/url?url=${encodeURIComponent(c.url)}&text=${encodeURIComponent(
      `${c.title}\n\n${c.description}`
    )}`,
  reddit: (c) =>
    `https://www.reddit.com/submit?url=${encodeURIComponent(c.url)}&title=${encodeURIComponent(c.title)}`,
};

const DEFAULT_CAMPAIGN: CampaignParams = {
  utmSource: "share",
  utmMedium: "social",
  utmCampaign: "organic-share",
};

export function getShareUrl(
  platform: SharePlatform,
  content: ShareContent,
  campaign: CampaignParams = DEFAULT_CAMPAIGN
): string {
  const taggedContent: ShareContent = {
    ...content,
    url: withCampaignParams(content.url, platform, campaign),
  };
  return PLATFORM_BUILDERS[platform](taggedContent);
}

export function isNativeShareSupported(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function nativeShare(
  content: ShareContent,
  campaign: CampaignParams = DEFAULT_CAMPAIGN
): Promise<boolean> {
  if (!isNativeShareSupported()) return false;
  try {
    await navigator.share({
      title: content.title,
      text: content.description,
      url: withCampaignParams(content.url, "manual", campaign),
    });
    return true;
  } catch {
    return false;
  }
}