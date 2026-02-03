# 💕 Sophia's Valentine's Day Surprise

A beautiful, romantic web application built to ask Sophia to be your Valentine! 

## ✨ Features

### 🏠 Homepage
- Beautiful animated entrance with floating hearts
- Welcoming message with a call-to-action button

### 💝 Valentine's Message
- Showcase your special moments with 3 beautiful images
- Each image has a romantic caption and description
- Smooth animations and transitions
- Leads to the big question

### ❤️ The Question
- Interactive "Will you be my Valentine?" page
- Fun interaction: The "No" button moves away when hovered!
- Celebration screen with confetti when "Yes" is clicked
- Romantic design with floating hearts

### 📸 Memories Page
- Simple, elegant gallery of your 3 special images
- Click to view full-size images with descriptions
- Easy navigation back to the question

## 🎨 Design Features

- **Romantic Color Palette**: Pink, red, and rose gradients throughout
- **Smooth Animations**: Fade-ins, bounces, pulses, and floating hearts
- **Responsive Design**: Works beautifully on all devices
- **Modern UI**: Clean, contemporary design with beautiful typography

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Sophia/
├── pages/
│   ├── index.vue              # Homepage with initial greeting
│   ├── valentines-message.vue # Showcases the 3 images with romantic messages
│   ├── the-question.vue       # The main Valentine's proposal page
│   └── memories.vue           # Simple gallery of memories
├── components/
│   └── home/
│       ├── navbar.vue         # Navigation bar
│       ├── hero.vue           # Hero section on homepage
│       └── bg.vue             # Background component
├── assets/
│   └── images/
│       ├── 1.jpeg             # Your first special image
│       ├── 2.jpeg             # Your second special image
│       └── 3.jpeg             # Your third special image
└── app.vue                    # Main app wrapper
```

## 🎯 User Flow

1. **Homepage** → User sees welcoming message
2. **Click "Open My Heart"** → Goes to Valentine's Message page
3. **View 3 images** → Each with romantic descriptions
4. **Click "Click Here"** → Goes to The Question page
5. **See the question** → "Will You Be My Valentine?"
6. **Click "YES!"** → Celebration screen with confetti!
7. **Explore memories** → View the images in gallery format

## 💡 Customization Tips

### Change the Images
Replace these files with your own images:
- `assets/images/1.jpeg`
- `assets/images/2.jpeg`
- `assets/images/3.jpeg`

### Update Image Descriptions
Edit `pages/valentines-message.vue` to change the text for each image section.

### Modify Memory Descriptions
Edit `pages/memories.vue` to update the captions and descriptions in the memories array.

### Change Colors
The main color scheme uses:
- Pink: `pink-500`, `pink-600`
- Red: `red-500`, `red-600`
- Rose: `rose-500`, `rose-600`

You can change these throughout the components to match your preference.

## 🎉 Tips for the Big Reveal

1. **Test First**: Make sure everything works smoothly before showing Sophia
2. **Good Internet**: Ensure you have a stable connection
3. **Full Screen**: Show it on a large screen for maximum impact
4. **Privacy**: Make sure you're in a comfortable, private setting
5. **Backup Plan**: Have a screenshot or video recording just in case!

## 💖 Technology Stack

- **Nuxt 3**: Vue.js framework for the application
- **Tailwind CSS**: For beautiful, responsive styling
- **GSAP**: For smooth animations (if used)
- **TypeScript**: For type-safe code

## 📱 Browser Support

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎊 Good Luck!

May Sophia say YES! 💕

---

Made with ❤️ for Sophia
