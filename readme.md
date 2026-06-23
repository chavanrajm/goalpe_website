"# goalpe_website"

Static marketing site for GoalPe.

## Deep link landing pages

| URL | File | Purpose |
|-----|------|---------|
| `/get` | `get.html`, `get/index.html` | App download / share links |
| `/referral` | `referral.html`, `referral/index.html` | Referral signup links |

Deploy `/.well-known/assetlinks.json` on both `goalpe.live` and `www.goalpe.live` (keep in sync with `goalpe_android/deployment/assetlinks.json`).

## Deploy

Production deploys from the `main` branch on GitHub (`TheManhattanProject/goalpe_website`). After merging deep-link changes, push `main` so DigitalOcean/Cloudflare picks up:

- `/get`, `/referral` landing pages
- `/js/deep_link.js` (Chrome Android `intent://` fallback)
- Site-wide link interception on `index.html`, `legal.html`, `delete_user.html`

