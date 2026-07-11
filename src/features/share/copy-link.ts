export type CopyLinkResult = { success: true } | { success: false; error: string };

export async function copySurveyLink(url: string): Promise<CopyLinkResult> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return { success: true };
    }

    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textArea);

    return ok ? { success: true } : { success: false, error: "Copy command failed" };
  } catch {
    return { success: false, error: "Clipboard unavailable" };
  }
}