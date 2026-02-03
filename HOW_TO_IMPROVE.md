# How to make it better, more mobile responsive & heartfelt

Quick guide so you can keep improving the Valentine’s site yourself.

---

## 1. Mobile responsiveness

### What’s already in place
- **Safe areas** – `env(safe-area-inset-*)` so content clears notches and home indicators.
- **Touch targets** – Buttons and links use at least 48px height on small screens (`.touch-target` in `main.css`).
- **Fluid layout** – `min-h-[75dvh]` / `min-h-[80vh]` so height works with mobile browser chrome.
- **Responsive type** – `text-base sm:text-lg`, `text-xl sm:text-2xl`, etc., so text scales by breakpoint.
- **Responsive spacing** – `px-4 sm:px-6`, `py-8 sm:py-12`, `mb-14 sm:mb-28` so padding/margins adapt.

### What you can do
- **Test on a real device** – Resize the browser to 360px wide and 640px tall, or use Chrome DevTools device mode.
- **Avoid tiny text** – On mobile, keep body text at least 16px so iOS doesn’t zoom on focus.
- **Use `clamp()` for big text** – e.g. `font-size: clamp(1.5rem, 5vw, 2.5rem)` so headings scale smoothly.
- **Check overflow** – Long words or names can overflow; add `break-words` or `overflow-wrap: break-word` if needed.

---

## 2. More heartfelt

### What’s already in place
- **Landing** – “I’m really glad you’re here.” + “You mean a lot to me…”
- **Message page** – “Thanks for being you.” + three personal lines under the photos.
- **Success** – “Thank you for making me so happy.” after she says yes.

### What you can do
- **Use her name** – You already use “Sophia” in a few places; add it once or twice more where it feels natural (e.g. “So that’s why I’m asking, Sophia.”).
- **One specific memory** – In one of the three photo captions, refer to a real moment (place, date, or thing you did). That makes it clearly about her.
- **Short and sincere** – One short sentence (“I’m lucky to know you.” / “You make ordinary days better.”) often feels more heartfelt than long paragraphs.
- **Tone** – Keep the same tone: warm, simple, not over-the-top. If it sounds like something you’d say in person, it’ll feel heartfelt.

---

## 3. Making the UI “better” in general

- **Contrast** – Text (e.g. stone-700, stone-800) on the light pink background is already readable. If you add new colours, keep contrast high enough for accessibility.
- **Consistency** – Buttons, spacing, and type are consistent across the three pages. When you add new elements, reuse the same patterns (e.g. same button style, same padding scale).
- **Loading** – On slow connections, the first page can feel empty until content appears. You could add a very light loading state (e.g. a small spinner or “Loading…”), but it’s optional.
- **Success screen** – Confetti + floating hearts + tap-to-add-hearts is already there. If you want it calmer, reduce the number of confetti pieces or floating hearts in `the-question.vue`.

---

## 4. Where to edit what

| What you want to change | File |
|------------------------|------|
| First screen (name, message, button) | `components/home/hero.vue` |
| “A few things that mean a lot to me” + 3 photos + captions | `pages/valentines-message.vue` |
| “Will you be my Valentine?” + Yes/No + success screen | `pages/the-question.vue` |
| Global colours, safe areas, touch targets | `assets/css/main.css` |

---

## 5. Quick mobile checklist

- [ ] Test at 360×640 (small phone).
- [ ] Test with Chrome DevTools “iPhone” or “Pixel” device.
- [ ] Check that buttons are easy to tap (no tiny links).
- [ ] Scroll the message page: all three sections and the Continue button should be reachable without horizontal scroll.
- [ ] On the success screen, tap “Start over” and tap the background to add hearts; both should work.

If all of that works, the site is in good shape for mobile. You can then tweak copy and small layout details using the tips above.
