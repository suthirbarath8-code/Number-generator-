# Project 2: Random Number Generator

A modern React application demonstrating **State Management** (`useState`), **Button Event Handling**, and **Conditional Rendering** with the Google **Poppins** typeface.

---

## 🚀 Features

- **React Functional Component**: Modern, clean architecture using hooks.
- **State Management (`useState`)**:
  - `randomNumber`: Tracks the current generated number (`null` initially).
  - `min` / `max`: Configurable range bounds (default: 1 to 100).
  - `history`: Roll history of generated numbers with timestamps.
  - `isAnimating`: Dynamic pop/scale transition feedback on generation.
- **Conditional Rendering**:
  - **Before Generation**: Displays a clean placeholder: `“No number generated yet”`.
  - **After Generation**: Dynamically displays the generated number, parity tag (Even/Odd), and copy button.
- **Interactive UI**:
  - **Generate Random Number Button**: Generates a random integer within `[min, max]`.
  - **Reset Button**: Resets the state back to `null` to demonstrate conditional rendering again.
  - **Quick Range Presets**: 1–10, 1–50, 1–100, 1–1,000, 1–6 (Dice).
  - **One-Click Copy**: Copy generated number to clipboard.
  - **Keyboard Support**: Press <kbd>Space</kbd> or <kbd>Enter</kbd> to generate instantly.
- **Typography & Styling**:
  - Powered by **Poppins** font from Google Fonts.
  - Glassmorphic card design with subtle gradients, responsive layout, and smooth animations.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure
```text
f:\Random Number Generator\
├── index.html          # HTML entry point with Poppins font imports
├── package.json        # Dependencies (React 18, Vite, Lucide Icons)
├── vite.config.js      # Vite configuration
├── README.md           # Documentation
└── src\
    ├── App.jsx         # Main React component with useState & conditional rendering
    ├── index.css       # Complete Poppins styling, themes, and animations
    └── main.jsx        # React root mounting
```
