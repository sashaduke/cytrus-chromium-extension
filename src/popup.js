const signIn = function(event) {
    event.preventDefault();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,
            {
                type: 'mnemonic',
                payload: {
                    message: 'Requested mnemonic',
                },
            },
            
            response => {
                console.log(response);
            }
        );
    });
}
const signinBtn = document.getElementById('signinBtn');
signinBtn.addEventListener('submit', signIn);

const signOut = function(event) {
    event.preventDefault();
    chrome.storage.local.set({mnemonic: ''});
}
const signoutBtn = document.getElementById('signoutBtn');
signoutBtn.addEventListener('submit', signOut);