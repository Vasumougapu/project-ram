const usdInput = document.getElementById('usd');
const btcInput = document.getElementById('btc');
const toBtcBtn = document.getElementById('toBtc');
const toUsdBtn = document.getElementById('toUsd');
const resultDiv = document.getElementById('result');
const loader = document.getElementById('loader');

const API_URL = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";

// Utility to show loader
function showLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

// Fetch current BTC price in USD
async function getBTCPrice() {
  showLoader(true);
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    showLoader(false);
    return data.bpi.USD.rate_float;
  } catch (err) {
    showLoader(false);
    resultDiv.textContent = "Failed to fetch BTC price.";
    throw err;
  }
}

// Convert USD to BTC
toBtcBtn.onclick = async function () {
  const usd = parseFloat(usdInput.value);
  if (isNaN(usd) || usd <= 0) {
    resultDiv.textContent = "Please enter a valid USD amount.";
    return;
  }
  resultDiv.textContent = "";
  const price = await getBTCPrice();
  const btc = usd / price;
  btcInput.value = btc.toFixed(8);
  resultDiv.textContent = `$${usd} USD = ${btc.toFixed(8)} BTC (1 BTC ≈ $${price.toLocaleString()})`;
};

// Convert BTC to USD
toUsdBtn.onclick = async function () {
  const btc = parseFloat(btcInput.value);
  if (isNaN(btc) || btc <= 0) {
    resultDiv.textContent = "Please enter a valid BTC amount.";
    return;
  }
  resultDiv.textContent = "";
  const price = await getBTCPrice();
  const usd = btc * price;
  usdInput.value = usd.toFixed(2);
  resultDiv.textContent = `${btc} BTC = $${usd.toLocaleString()} USD (1 BTC ≈ $${price.toLocaleString()})`;
};