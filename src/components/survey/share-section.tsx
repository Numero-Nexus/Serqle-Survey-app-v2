"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui";
import {
  getShareContent,
  getShareUrl,
  isNativeShareSupported,
  nativeShare,
  copySurveyLink,
  trackShareAction,
  type SharePlatform,
} from "@/features/share";

const PLATFORMS: { id: SharePlatform; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "twitter", label: "X (Twitter)" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
  { id: "telegram", label: "Telegram" },
  { id: "reddit", label: "Reddit" },
];

export function ShareSection({ surveyUrl }: { surveyUrl: string }) {
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");
  const content = getShareContent(surveyUrl);

  const handlePlatformShare = useCallback(
    (platform: SharePlatform) => {
      trackShareAction(platform);
      const url = getShareUrl(platform, content); // uses DEFAULT_CAMPAIGN
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [content]
  );

  const handleNativeShare = useCallback(async () => {
    trackShareAction("native");
    await nativeShare(content);
  }, [content]);

  const handleCopyLink = useCallback(async () => {
    trackShareAction("copy-link");
    const result = await copySurveyLink(surveyUrl);
    setCopyState(result.success ? "success" : "error");
    setTimeout(() => setCopyState("idle"), 2500);
  }, [surveyUrl]);

  return (
    <section aria-labelledby="share-heading" className="mt-8 text-center">
      <h2 id="share-heading" className="text-lg font-semibold">
        Help us reach more people
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        If you enjoyed participating, consider sharing this study with friends or colleagues.
        Every additional participant helps improve the quality of our behavioural research.
      </p>

      {isNativeShareSupported() ? (
        <Button type="button" onClick={handleNativeShare} aria-label="Share this survey">
          Share
        </Button>
      ) : (
        <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Share on social platforms">
          {PLATFORMS.map((p) => (
            <Button
              key={p.id}
              type="button"
              variant="secondary"
              onClick={() => handlePlatformShare(p.id)}
              aria-label={`Share on ${p.label}`}
            >
              {p.label}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Button type="button" variant="ghost" onClick={handleCopyLink} aria-label="Copy survey link">
          {copyState === "success" ? "Link copied!" : copyState === "error" ? "Copy failed" : "Copy Survey Link"}
        </Button>
      </div>
    </section>
  );
}