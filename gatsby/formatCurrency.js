const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function formatCurrency(currencyToFormat) {
  return formatter.format(currencyToFormat / 100);
}
