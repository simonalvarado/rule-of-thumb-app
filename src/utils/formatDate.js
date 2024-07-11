import { formatDistanceToNow } from "date-fns";

export function formatLastUpdated(seconds, category) {
  const lastUpdatedDate = new Date(seconds * 1000);
  let timeAgo = formatDistanceToNow(lastUpdatedDate, { addSuffix: false });
  timeAgo = timeAgo.replace(/about|over/g, "").trim();
  return `${timeAgo} ago in ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;
}
