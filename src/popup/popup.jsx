

/* global chrome */
import React from "react";

function Popup() {

  const handleCollapseClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        try {
          const assistantMessages = document.querySelectorAll('[data-message-author-role="assistant"]');
          const userMessages = document.querySelectorAll('.whitespace-pre-wrap');

          const createButton = (text, onClick) => {
            const button = document.createElement('button');
            button.innerText = text;
            Object.assign(button.style, {
              display: 'inline-block',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              textAlign: 'left',
              margin: '4px 0'
            });
            button.addEventListener('click', onClick);
            return button;
          };

          const processAssistantBlock = (block) => {
            if (block.dataset.hidden) return;

            block.style.display = 'none';
            block.dataset.hidden = 'true';

            const hideBtn = createButton('Hide Full Response', () => {
              block.style.display = 'none';
              hideBtn.remove();
              block.parentNode.insertBefore(showBtn, block.nextSibling);
            });

            const showBtn = createButton('Show Full Response', () => {
              block.style.display = 'block';
              showBtn.remove();
              block.parentNode.insertBefore(hideBtn, block.nextSibling);
            });

            block.parentNode.insertBefore(showBtn, block);
          };

          const processUserBlock = (block, index) => {
            if (block.dataset.hidden) return;

            const originalText = block.textContent.trim();
            const words = originalText.split(/\s+/);
            const preview = words.length > 5 ? words.slice(0, 5).join(' ') + '...' : originalText;

            block.style.display = 'none';
            block.dataset.hidden = 'true';

            const previewPara = document.createElement('p');
            previewPara.innerText = preview;
            previewPara.className = `short_res_${index}`;

            const showMoreBtn = createButton('More...', () => {
              block.style.display = 'block';
              previewPara.remove();
              showMoreBtn.remove();
              block.parentNode.insertBefore(showLessBtn, block.nextSibling);
            });

            const showLessBtn = createButton('Less', () => {
              block.style.display = 'none';
              showLessBtn.remove();
              block.parentNode.insertBefore(previewPara, block);
              block.parentNode.insertBefore(showMoreBtn, block.nextSibling);
            });

            block.parentNode.insertBefore(previewPara, block);
            block.parentNode.insertBefore(showMoreBtn, block.nextSibling);
          };

          assistantMessages.forEach(processAssistantBlock);
          userMessages.forEach(processUserBlock);
        } catch (error) {
          console.error('Collapse toggle error:', error);
        }
      }
    });
  };



  return (
    <div style={{ padding: "16px", width: '400px', borderRadius: '20px' }}>
      <h3>ChatGPT Response Manager</h3>
      <button
        onClick={handleCollapseClick}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Collapse All Responses
      </button>
    </div>
  );
}

export default Popup;


