
# 🧠 ChatGPT Response Collapser Extension

A lightweight browser extension that improves the performance and readability of ChatGPT by **collapsing and expanding long responses**. Ideal for users who work with large conversations and want a cleaner, faster interface.

---

## ✨ Features

- ✅ Automatically collapses lengthy ChatGPT responses
- 🔄 Toggle expand/collapse on click
- 📄 Optional preview (first few lines shown when collapsed)
- 💾 (Optional) Save collapsed state with `localStorage`
- ⚙️ Configurable thresholds (e.g., number of lines or characters)
- 🚀 Performance-optimized with minimal DOM manipulation

---

## 🧰 Build & Usage Instructions

This extension is built with **React.js**. To use it in your browser, you need to build the project and **manually copy the `contentScript.js` file into the `dist` folder**, as this script must be directly loaded via `manifest.json`.

### 🔨 Build Steps

1. **Install dependencies:**

```bash
npm install
```

2. **Build the extension:**

```bash
npm run build
```

This will generate the output in the `dist/` directory.

3. **Manual step (important):**  
   After the build completes, **copy `public/contentScript.js` (or your path) manually to the `dist/assets/` folder**, so it can be loaded by the extension:

```bash
cp public/contentScript.js dist/assets/contentScript.js
```

> Note: `contentScript.js` must be declared directly in `manifest.json` and cannot be bundled through Webpack/Vite due to CSP (Content Security Policy) restrictions on `chrome.scripting`.

4. **Load the extension in Chrome:**

- Open `chrome://extensions/`
- Enable **Developer Mode**
- Click **Load unpacked**
- Select the `dist/` folder

---

## 📁 Project Structure

```
chatgpt-response-collapser/
├── public/
│   └── contentScript.js        # must be manually copied post-build
├── src/
│   └── App.jsx                 # React code
├── dist/
│   ├── index.html
│   ├── assets/
│   │   ├── contentScript.js   # manually placed here
│   │   └── main.js            # React build output
│   └── manifest.json
└── README.md
```

---

## ⚙️ How It Works

This extension dynamically modifies the ChatGPT interface to enhance performance by collapsing lengthy responses. Here’s a breakdown of how it functions:

### 🔍 1. DOM Monitoring with `MutationObserver`
A `MutationObserver` continuously watches the DOM for newly generated responses in the ChatGPT thread. When a new message is added, it triggers the collapsing logic.

```js
const observer = new MutationObserver(handleNewResponses);
observer.observe(targetNode, { childList: true, subtree: true });
```

---

### 📏 2. Auto-Collapse Logic

Each response is scanned to check if it exceeds a configurable threshold:

```js
if (lineCount > COLLAPSE_LINE_THRESHOLD) {
  collapseMessage(messageElement);
}
```

You can configure the threshold in `content.js`:

```js
const COLLAPSE_LINE_THRESHOLD = 30;  // Collapse if message exceeds 30 lines
const PREVIEW_LINES = 5;             // Show 5 lines in preview when collapsed
```

---

### 🔘 3. Toggle Button Injection

For every collapsible message, a toggle button (`Show More` / `Show Less`) is injected:

```js
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Show More';
toggleButton.onclick = () => toggleCollapse(messageElement);
```

---

### 🎨 4. Smooth CSS Transitions

The extension uses `max-height` and `overflow` CSS rules to create a smooth expand/collapse animation:

```css
.collapsed {
  max-height: 120px;
  overflow: hidden;
  position: relative;
}

.collapsed::after {
  content: '';
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: linear-gradient(transparent, white);
}
```

---

This system ensures a responsive and user-friendly experience even in long ChatGPT sessions.

---

## 🖼️ Screenshots

> Add GIFs or screenshots here to demonstrate:
> - Before and after collapsing
> - Toggle interaction
> - Performance boost with long threads

Example (placeholder):

![Demo Screenshot](assets/demo.gif)

---

## ✅ Compatibility

| Browser        | Supported |
|----------------|-----------|
| Chrome         | ✅         |
| Microsoft Edge | ✅         |
| Firefox        | 🔜 Coming Soon |

---

## 🧪 Contributing

We welcome contributions from the community! Here’s how you can get involved:

### 🔧 Steps

1. **Fork** this repository
2. **Create a feature branch**:
   ```bash
   git checkout -b your-feature-name
   ```
3. **Make your changes** in `content.js`, `styles.css`, or other relevant files
4. **Push your changes** and open a Pull Request:
   ```bash
   git push origin your-feature-name
   ```

Clone the project locally:

```bash
git clone https://github.com/yourusername/chatgpt-response-collapser.git
cd chatgpt-response-collapser
```

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute as needed.

---

## 🙌 Acknowledgments

Built out of necessity to improve performance and readability during large ChatGPT sessions.  
Thanks to the open-source community for the inspiration and support!

> *“Simple tools often solve the biggest frustrations.”*