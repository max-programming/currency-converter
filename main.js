import 'bulma/css/bulma.min.css';
import { convertCurrency, getCurrencyList } from './fetchers';

// DOM Elements
const selectFromCurrency = document.getElementById('selectFromCurrency');
const selectToCurrency = document.getElementById('selectToCurrency');
const toValue = document.getElementById('toValue');
const fromValue = document.getElementById('fromValue');
const convertBtn = document.getElementById('convertBtn');

// Save to local storage
selectFromCurrency.onchange = e => localStorage.setItem('from', e.target.value);
selectToCurrency.onchange = e => localStorage.setItem('to', e.target.value);
fromValue.onchange = e => localStorage.setItem('fromValue', e.target.value);

// Get amount from local storage
fromValue.value = localStorage.getItem('fromValue') || 1;

// Display Currencies
async function displayCurrencies() {
  // Start loading
  selectFromCurrency.setAttribute('disabled', 'true');
  selectToCurrency.setAttribute('disabled', 'true');
  selectFromCurrency.parentElement.classList.add('is-loading');
  selectToCurrency.parentElement.classList.add('is-loading');

  // Fetch list and create elements
  const currencies = await getCurrencyList();
  currencies.forEach(currency => {
    const optionEl = document.createElement('option');
    optionEl.value = currency;
    optionEl.innerText = currency;

    const optionElClone = optionEl.cloneNode(true);
    selectFromCurrency.appendChild(optionElClone);
    selectToCurrency.appendChild(optionEl);
  });

  // Get from local storage
  selectFromCurrency.value = localStorage.getItem('from') || 'USD';
  selectToCurrency.value = localStorage.getItem('to') || 'INR';

  // Stop loading
  selectFromCurrency.removeAttribute('disabled');
  selectToCurrency.removeAttribute('disabled');
  selectFromCurrency.parentElement.classList.remove('is-loading');
  selectToCurrency.parentElement.classList.remove('is-loading');
}

convertBtn.onclick = async () => {
  // Start loading
  convertBtn.classList.add('is-loading');

  // Convert and display amount
  const converted = await convertCurrency(
    selectFromCurrency.value,
    selectToCurrency.value,
    fromValue.value
  );

  const amountHtml = `
    <code class="has-background-link-light has-text-link">${converted.amount.toFixed(
      1
    )}</code>
  `;

  toValue.innerHTML = amountHtml + converted.to;

  // Stop loading
  convertBtn.classList.remove('is-loading');
};

displayCurrencies();
