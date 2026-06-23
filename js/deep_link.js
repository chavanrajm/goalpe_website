(function () {
    var PLAY_STORE_URL =
        'https://play.google.com/store/apps/details?id=live.goalpe.mobileapp';
    var APP_STORE_URL =
        'https://apps.apple.com/us/app/goalpe-daily-fantasy-football/id6773258294';
    var PACKAGE_NAME = 'live.goalpe.mobileapp';
    var GOALPE_HOST_PATTERN = /^(?:www\.)?goalpe\.live$/i;
    var APP_DEEP_LINK_PATH =
        /^\/(?:get|referral|login|signup|auth|dashboard|entry|league|leagues|fantasy|store|orders|order|settings|account|wallet|games|winnings)(?:\/|$)/;

    function isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function isMobile() {
        return isAndroid() || isIOS();
    }

    function openPlayStore() {
        window.location.href = PLAY_STORE_URL;
    }

    function openAppStore() {
        window.location.href = APP_STORE_URL;
    }

    function parseGoalPeUrl(href) {
        try {
            var url = new URL(href, window.location.origin);
            if (!GOALPE_HOST_PATTERN.test(url.hostname)) {
                return null;
            }
            return {
                host: url.hostname,
                pathname: url.pathname || '/',
            };
        } catch (_error) {
            return null;
        }
    }

    function isAppDeepLinkPath(pathname) {
        if (!pathname || pathname === '/') {
            return true;
        }
        return APP_DEEP_LINK_PATH.test(pathname);
    }

    function tryOpenApp(path, host) {
        var normalizedPath = path.charAt(0) === '/' ? path : '/' + path;
        var linkHost = host || window.location.hostname || 'www.goalpe.live';

        if (isAndroid()) {
            var intentUrl =
                'intent://' +
                linkHost +
                normalizedPath +
                '#Intent;scheme=https;package=' +
                PACKAGE_NAME +
                ';S.browser_fallback_url=' +
                encodeURIComponent(PLAY_STORE_URL) +
                ';end';
            window.location.href = intentUrl;
            return;
        }

        if (isIOS()) {
            window.location.href = 'https://' + linkHost + normalizedPath;
            window.setTimeout(openAppStore, 1500);
            return;
        }

        window.location.href = '/';
    }

    function interceptAppLinks() {
        if (!isAndroid()) {
            return;
        }

        document.addEventListener(
            'click',
            function (event) {
                var anchor = event.target.closest('a[href]');
                if (!anchor) {
                    return;
                }

                var parsed = parseGoalPeUrl(anchor.getAttribute('href'));
                if (!parsed || !isAppDeepLinkPath(parsed.pathname)) {
                    return;
                }

                event.preventDefault();
                tryOpenApp(parsed.pathname, parsed.host);
            },
            true
        );
    }

    function initDeepLinkPage(config) {
        var path = config.path || '/get';
        var host = config.host || window.location.hostname || 'www.goalpe.live';
        var autoRedirect = config.autoRedirect !== false;

        interceptAppLinks();

        document.querySelectorAll('[data-store="android"]').forEach(function (button) {
            button.addEventListener('click', openPlayStore);
        });

        document.querySelectorAll('[data-store="ios"]').forEach(function (button) {
            button.addEventListener('click', openAppStore);
        });

        document.querySelectorAll('[data-action="open-app"]').forEach(function (button) {
            button.addEventListener('click', function () {
                tryOpenApp(path, host);
            });
        });

        if (autoRedirect && isMobile()) {
            tryOpenApp(path, host);
        }
    }

    window.GoalPeDeepLink = {
        initDeepLinkPage: initDeepLinkPage,
        interceptAppLinks: interceptAppLinks,
        openPlayStore: openPlayStore,
        openAppStore: openAppStore,
        tryOpenApp: tryOpenApp,
        isMobile: isMobile,
        isAppDeepLinkPath: isAppDeepLinkPath,
        parseGoalPeUrl: parseGoalPeUrl,
    };
})();
