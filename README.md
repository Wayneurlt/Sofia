# Sofia

A romantic, cinematic birthday experience built with Nuxt 3 for Sophia.

## ✨ What's Inside

- **Cinematic intro** – Netflix-style fullscreen with her name, then auto-advance. **Digital love letter** – Paper letter with typing animation, cursor, optional music, particles. **Final section** – Video + "This is just the beginning…". **Single landing (legacy): “For Sophia” with three links
- 📝 Birthday note, Birthday story, Make a wish pages

## 🚀 Quick Start

### Setup

Install dependencies:

```bash
npm install
```

### Development

Run the development server at `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build for production:

```bash
npm run build
npm run preview
```

## 💖 Made with Love

Built with Nuxt 3, Tailwind CSS, GSAP, and lots of love for Sophia.

### Customizing content

- **Letter text** – Edit `composables/useLetterContent.ts` and replace `LETTER_CONTENT`.
- **Background music** – Add `public/sounds/birthday-music.mp3` (plays during the letter; mute button appears).
- **Ending video** – Add `public/videos/birthday-ending.mp4` for the final section.
