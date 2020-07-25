let deferredInstallPrompt = null;
let installButton = null;

window.addEventListener('load', () => {
    installButton = document.getElementById("install-button");
    installButton.addEventListener('click', installPWA);
});

// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener(
    'beforeinstallprompt',
    saveBeforeInstallPromptEvent
);

function saveBeforeInstallPromptEvent (evt) {
    // CODELAB: Add code to save event & show the install button.
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA {
    // CODELAB: Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();
    installButton.remove();

    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice
    .then((choice) => {
    if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
    } else {
        console.log('User dismissed the A2HS prompt', choice);
    }
    deferredInstallPrompt = null;
    });
}