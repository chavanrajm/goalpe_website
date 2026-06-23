const APP_STORE_URL =
    'https://apps.apple.com/us/app/goalpe-daily-fantasy-football/id6773258294';
const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=live.goalpe.mobileapp';

function openAppStore() {
    window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer');
}

function openPlayStore() {
    window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
}

function initDownloadLinks() {
    document.querySelectorAll('nav button').forEach(function (button) {
        if (button.textContent.trim() === 'Download Now') {
            button.addEventListener('click', openAppStore);
        }
    });

    document.querySelectorAll('button').forEach(function (button) {
        var label = button.textContent.trim();
        if (label === 'Download for IOS') {
            button.addEventListener('click', openAppStore);
        }
        if (label === 'Download for Android') {
            button.addEventListener('click', openPlayStore);
        }
    });

    document.querySelectorAll('img[alt="apple_store"]').forEach(function (image) {
        image.style.cursor = 'pointer';
        image.addEventListener('click', openAppStore);
    });

    document.querySelectorAll('img[alt="google-play"]').forEach(function (image) {
        image.style.cursor = 'pointer';
        image.addEventListener('click', openPlayStore);
    });
}

document.addEventListener('DOMContentLoaded', initDownloadLinks);
