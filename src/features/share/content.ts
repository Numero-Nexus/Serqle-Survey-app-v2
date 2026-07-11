import type { ShareContent } from "./share-service";

const SHARE_TITLE = "Help researchers understand how people naturally spend their free time.";
const SHARE_DESCRIPTION = "Take this anonymous 3-minute behavioural study.";

export function getShareContent(surveyUrl: string): ShareContent {
  return {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    url: surveyUrl,
  };
}