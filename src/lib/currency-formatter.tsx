export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  if (isNaN(amount)) return '0.00'
  const locale = currency === 'NGN' ? 'en-NG' : 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    // minimumFractionDigits: 2,
    // maximumFractionDigits: 2,
  }).format(amount)
}
