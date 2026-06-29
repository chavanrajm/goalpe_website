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

function getPlatform() {
    var ua = navigator.userAgent || '';
    if (/android/i.test(ua)) {
        return 'android';
    }
    if (/iphone|ipad|ipod/i.test(ua)) {
        return 'ios';
    }
    return 'other';
}

function openStoreForPlatform() {
    if (getPlatform() === 'android') {
        openPlayStore();
        return;
    }
    openAppStore();
}

function initDownloadLinks() {
    document.querySelectorAll('[data-store="ios"]').forEach(function (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', openAppStore);
    });

    document.querySelectorAll('[data-store="android"]').forEach(function (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', openPlayStore);
    });

    document.querySelectorAll('[data-store="auto"]').forEach(function (el) {
        el.addEventListener('click', openStoreForPlatform);
    });
}

document.addEventListener('DOMContentLoaded', initDownloadLinks);
