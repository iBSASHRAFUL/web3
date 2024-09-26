// Initialize variables
let coinBalance = 0;
let userAddress = null;

// Elements
const coinBalanceDisplay = document.getElementById('coin-balance');
const earnCoinBtn = document.getElementById('earn-coin-btn');
const connectWalletBtn = document.getElementById('connect-wallet-btn');
const walletAddressDisplay = document.getElementById('wallet-address');

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
} else {
  alert('Please install MetaMask to play this game.');
}

// Connect wallet function
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      walletAddressDisplay.innerText = `Wallet: ${userAddress}`;
      earnCoinBtn.disabled = false;
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  } else {
    alert('MetaMask not found!');
  }
}

// Earn coin function
function earnCoin() {
  coinBalance += 1;
  coinBalanceDisplay.innerText = coinBalance;
  // You can store the balance in localStorage for persistence
  localStorage.setItem('coinBalance', coinBalance);
}

// Event listeners
earnCoinBtn.addEventListener('click', earnCoin);
connectWalletBtn.addEventListener('click', connectWallet);

// Load balance from localStorage on page load
window.addEventListener('load', () => {
  const savedBalance = localStorage.getItem('coinBalance');
  if (savedBalance) {
    coinBalance = parseInt(savedBalance, 10);
    coinBalanceDisplay.innerText = coinBalance;
  }
});
