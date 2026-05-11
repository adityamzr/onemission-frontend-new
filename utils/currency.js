export function formatCurrency(value, currency = "IDR", locale = "id-ID") {
  if (!value) return "0";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
