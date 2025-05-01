
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

This extension dynamically collapses and expands ChatGPT responses to improve readability and performance:

- **Message Selection**  
  The extension targets both assistant and user messages on the page that have not been processed yet. It excludes the last message from collapsing.

- **Auto-Collapse Logic**  
  - For **assistant responses**, the message is collapsed by default, and a "Show Full Response" button is added to reveal the full message.
  - For **user messages**, only the first 5 words are shown by default with a "More..." button to expand the full message. A "Less" button is also provided to collapse it back.

- **Button Creation**  
  Custom buttons like "Show More" and "Show Full Response" are dynamically created and attached to each message. These buttons toggle the visibility of messages when clicked.

- **DOM Monitoring**  
  A `MutationObserver` is used to detect changes to the page (e.g., new responses). When the page content updates, the auto-collapse functionality is re-applied.

- **Error Handling**  
  If an error occurs, it’s logged in the console for debugging.

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