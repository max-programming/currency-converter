export async function convertCurrency(from, to, amount) {
  const res = await fetch('/api/convert', {
    method: 'POST',
    body: JSON.stringify({ from, to, amount }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { converted } = await res.json();

  return converted;
}

export async function getCurrencyList() {
  const res = await fetch('/api/list');
  const { currencies } = await res.json();

  return currencies;
}
