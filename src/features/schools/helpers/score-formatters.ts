export function formatRating(value: number): string {
  return value.toFixed(1);
}

export function formatReviewCount(value: number): string {
  return value.toLocaleString();
}
