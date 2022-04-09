const signIn = function() {
    chrome.storage.local.set({mnemonic: window.store['common/wallet/getMnemonic']});
}
const signinBtn = document.getElementById('signinBtn');
signinBtn.addEventListener('submit', signIn);

const signOut = function() {
    chrome.storage.local.set({mnemonic: ''});
}
const signoutBtn = document.getElementById('signoutBtn');
signoutBtn.addEventListener('submit', signOut);