
function autoCollapse() {
  try {
    const assistantMessages = Array.from(document.querySelectorAll('[data-message-author-role="assistant"]:not([data-processed])'));
    const userMessages = Array.from(document.querySelectorAll('.whitespace-pre-wrap:not([data-processed])'));

    // Remove last assistant and user message from collapsing
    const assistantToCollapse = assistantMessages.slice(0, -1); // all except last
    const userToCollapse = userMessages.slice(0, -1); // all except last

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

      block.dataset.processed = 'true';
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

      block.dataset.processed = 'true';
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

    assistantToCollapse.forEach(processAssistantBlock);
    userToCollapse.forEach(processUserBlock);
  } catch (error) {
    console.error('Auto-collapse failed:', error);
  }
}

// Initial trigger
window.addEventListener("load", () => {
  autoCollapse();

  // Observe DOM changes to handle SPA route updates
  const observer = new MutationObserver(() => {
    autoCollapse();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
