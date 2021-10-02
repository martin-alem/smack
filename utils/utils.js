export function getFormattedDate() {
  const date = new Date();
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}
