export function formatPrice(value) {
  return `EUR ${Number(value || 0).toFixed(2).replace(".", ",")}`;
}
