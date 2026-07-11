export interface ShareContent {
  title: string;
  description: string;
  url: string;
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

export function getShareUrl(platform: SharePlatform, content: ShareContent): string {
  return PLATFORM_BUILDERS[platform](content);
}

export function isNativeShareSupported(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function nativeShare(content: ShareContent): Promise<boolean> {
  if (!isNativeShareSupported()) return false;
  try {
    await navigator.share({
      title: content.title,
      text: content.description,
      url: content.url,
    });
    return true;
  } catch {
    return false;
  }
}