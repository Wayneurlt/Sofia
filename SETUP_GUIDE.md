# Quick Setup Guide

## What's in the project

Single-entry UI for Sophia: one landing page with three links.

### Main pieces

1. **Landing** (`pages/index.vue`)
   - “For Sophia” + “Pick one to begin.”
   - Three links: **Birthday note**, **Birthday story**, **Make a wish**.

2. **Pages**
   - `birthday-note.vue` – Birthday note
   - `birthday-story.vue` – Birthday story
   - `make-a-wish.vue` – Make a wish

3. **Global styles** – `assets/css/main.css` (colours, fonts, touch targets).

## Run the site

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. You’ll see the landing; use the three links to open each page.

## Customize

- **Landing** – `pages/index.vue` (title, subtitle, link labels).
- **Birthday note** – `pages/birthday-note.vue`.
- **Birthday story** – `pages/birthday-story.vue`.
- **Make a wish** – `pages/make-a-wish.vue`.
- **Colours / fonts** – `assets/css/main.css`.

## Testing checklist

- [ ] Landing loads with “For Sophia” and three links.
- [ ] Each link goes to the correct page.
- [ ] Pages are readable and tap-friendly on mobile.
