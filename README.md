# 🧠 ChatGPT Response Manager

A lightweight yet powerful Chrome Extension that helps manage ChatGPT conversations more efficiently by **collapsing long responses**, offering **quick previews**, and letting you **save important responses for later**.

Perfect for power users who regularly work with long conversations and want a cleaner, faster, and more focused experience.

---

## ✨ Features

- ✅ Automatically **collapses lengthy ChatGPT responses**
- 🔄 **Toggle expand/collapse** with “Show More” / “Show Less” buttons
- 🧩 **Preview** of user messages (first 5 words shown)
- 📌 **Add important responses to a “Card” list** for quick access later
- 🚀 Detects and processes **new messages in real time**
- 💾 Saves state with `localStorage` so your preferences persist
- ⚙️ Configurable thresholds for collapsing (lines, characters, etc.)
- 🧠 Optimized for minimal DOM manipulation and better performance

---

## 📷 Demo

> Add a screenshot or GIF here showing:
> - Before/After collapse
> - Adding to cards
> - Preview toggle and user experience

---

## 🧰 Installation & Build Instructions

This project uses **React.js** and the Chrome Extension API.

### 🔨 Build Steps

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Build the project**  
   ```bash
   npm run build
   ```

   This outputs files into the `dist/` folder.

3. **Manually copy `contentScript.js`** to the assets folder  
   ```bash
   cp public/contentScript.js dist/assets/contentScript.js
   ```

   > ⚠️ `contentScript.js` must be referenced directly in `manifest.json` due to Chrome’s Content Security Policy (CSP).

4. **Load in Chrome**

- Visit `chrome://extensions/`
- Enable **Developer Mode**
- Click **Load Unpacked**
- Select the `dist/` folder

---

## 🗂️ Project Structure

```
chatgpt-response-manager/
├── public/
│   └── contentScript.js        # must be manually copied post-build
├── src/
│   └── App.jsx                 # React app entry
├── dist/
│   ├── index.html
│   ├── assets/
│   │   ├── contentScript.js   # manually placed
│   │   └── main.js            # React bundle
│   └── manifest.json
└── README.md
```

---

## ⚙️ How It Works

The extension enhances your ChatGPT experience through:

- **Message Collapse**  
  Automatically collapses assistant responses and previews user messages for quick scanning.

- **Interactive Controls**  
  Each message gets a **"Show More" / "Show Less"** toggle, making long threads manageable.

- **Add to Card**  
  Important responses can be **saved into a persistent “Card” section**—great for bookmarking key info or reusable prompts.

- **Real-Time Monitoring**  
  A `MutationObserver` tracks updates to the conversation and dynamically applies all functionality.

- **Performance Friendly**  
  Designed to minimize DOM updates and keep the page smooth, even during large conversations.

---

## ✅ Browser Support

| Browser        | Supported |
|----------------|-----------|
| Chrome         | ✅         |
| Microsoft Edge | ✅         |
| Firefox        | 🔜 Coming Soon |

---

## 🧪 Contributing

We welcome PRs and contributions from the community!

### Steps to Contribute

1. Fork the repo  
2. Create a feature branch  
   ```bash
   git checkout -b feature-name
   ```
3. Make changes and commit  
4. Push and open a PR  
   ```bash
   git push origin feature-name
   ```

Clone and set up the project:

```bash
git clone https://github.com/yourusername/chatgpt-response-manager.git
cd chatgpt-response-manager
```

---

## 📄 License

Licensed under the [MIT License](LICENSE).

Feel free to modify and use for personal or professional use.

---

## 🙌 Acknowledgments

Built to improve real-world productivity and focus while working with ChatGPT.  
Special thanks to the open-source community for providing tools, inspiration, and guidance.

> *“Sometimes, small tools make the biggest difference.”*
