const favKey =  'fav_';
let storedArticels = JSON.parse(localStorage.getItem(favKey) || '[]');
const url = window.location.href;

const createButton = (text, onClick) => {
  const button = document.createElement('button');
  button.innerText = text;
  Object.assign(button.style, {
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '4px 8px 4px 0'
  });
  
  
  button.addEventListener('click', onClick);
  return button;
};

const createFavouriteIcon = (short_article) => {


  const favBtn = document.createElement('span');
  favBtn.classList.add(`srj_${short_article.id}`);
  if(!storedArticels.some(art => art.id === short_article.id)){
  favBtn.innerText = '♡'; 
  }else{
  favBtn.innerText = '♥'; 
  }
  favBtn.title = 'Mark as Favourite';
  favBtn.style.cursor = 'pointer';
  favBtn.style.fontSize = '24px';
  favBtn.style.marginLeft = '10px';
  favBtn.style.color = '#FFD700';


  favBtn.addEventListener('click', () => {

  if(storedArticels.length > 0 ){
 
    if(!storedArticels.some(art => art.id === short_article.id)){
     const merged = [...storedArticels,short_article];
      
      const sortedArtiles = merged.sort();
      localStorage.setItem(favKey, JSON.stringify(sortedArtiles));
      favBtn.innerText = '♥';
      storedArticels = sortedArtiles;
      console.log("New item", short_article);
    }else{
      const removed = storedArticels.filter(art => art.id.toString() !== short_article.id.toString());
  
      storedArticels = removed.sort();
     
      localStorage.setItem(favKey,JSON.stringify(storedArticels));
      favBtn.innerText = '♡';
    }

  }else{
    console.log('intial item', short_article);
    storedArticels.push(short_article);
    localStorage.setItem(favKey, JSON.stringify([short_article]));
    favBtn.innerText = '♥';
  }

  });

  return favBtn;
};

const createToggleBtn = (block, short_article,isScrolled=false) => {
  const hideBtn = createButton('Hide Full Response', () => {
    block.style.display = 'none';
    hideBtn.remove();
    block.parentNode.insertBefore(showBtn, block.nextSibling);
  });
  const showBtn = createButton('Show Full Response', () => {
    block.style.display = 'block';
    showBtn.remove();
    hideBtn.classList.add(`hidden_btn_${short_article.id}`);
    block.parentNode.insertBefore(hideBtn, block.nextSibling);
  });
  
  showBtn.classList.add(`show_btn_${short_article.id}`);

  const favIcon = createFavouriteIcon(short_article);

  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';

  if(!isScrolled){
    wrapper.appendChild(showBtn);
  }else{
    const getShowBtnElement = document.querySelector(`.show_btn_${short_article.id}`);

    getShowBtnElement?.remove();
    favIcon.remove();
    wrapper.appendChild(hideBtn);
  }
  wrapper.appendChild(favIcon);

  return {showBtn,wrapper};
}

const makeToggleCollapsToScroll = (assistantMessage,article) => {
  const {wrapper} = createToggleBtn(assistantMessage,article, true);
  assistantMessage.parentNode.insertBefore(wrapper, assistantMessage.nextSibling);
}

function autoCollapse() {
  try {
    const assistantMessages = Array.from(document.querySelectorAll('[data-message-author-role="assistant"]:not([data-processed])'));
    const userMessages = Array.from(document.querySelectorAll('.whitespace-pre-wrap:not([data-processed])'));

    const assistantToCollapse = assistantMessages.slice(0,-1);
    const userToCollapse = userMessages;


    const processAssistantBlock = (block,index) => {
    
      if (block.dataset.hidden) return;

      block.dataset.processed = 'true';
      block.style.display = 'none';
      block.dataset.hidden = 'true';
      block.id = `srj_${index}`;



      const child = block.querySelector('[data-start="0"]');

      const originalText = child.textContent.trim();
      const words = originalText.split(/\s+/);
      const preview = words.length > 5 ? words.slice(0, 5).join(' ') + '...' : originalText;

 
      const short_article = {
        id:index,
        title:document.title,
        resPath:url,
        description:preview,
        savedDate: new Date(),
      }


      const {wrapper} = createToggleBtn(block,short_article);
  

      block.parentNode.insertBefore(wrapper, block);
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


const tableActions = () => {
  try {

    const delete_btns = Array.from(document.querySelectorAll('.delete-btn'));
    const fav_trs = Array.from(document.querySelectorAll('.fav_tr'));
    const modal = document.getElementById('modal_ex');


    const action = (tr,index) => {

      const article = findArticleById(storedArticels, index);

      const delete_btn = tr.querySelector(`.delete-btn`);
  
      const tds = tr.querySelectorAll(`td#td_${index}`);


      if(tds && tds.length > 0){
        const tdHandler = (td) => {
          td.addEventListener("click", () => {

            const assistantMessage = document.getElementById(`srj_${index}`);
            const favBtn = document.querySelector(`.srj_${index}`);
       
            if(assistantMessage && url === article.resPath){
              if(assistantMessage){
                assistantMessage.style.display = 'block';
               
                favBtn?.remove();
                
                makeToggleCollapsToScroll(assistantMessage,article);
              }
              
              assistantMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            modal.classList.add('hidden_srj');
            modal.classList.remove("showmodal_srj");
          
          })
        }
        tds.forEach(tdHandler);
      }
        if(delete_btn){
          const articleId = delete_btn.dataset.userId;


          let favBtn = document.querySelector(`.srj_${articleId}`);
          const trElement = document.getElementById(`fav_raw_${articleId}`);
          
          // const tdElement = document.getElementById(`fav_raw_${articleId}`);

          const art_not_found = document.getElementById('art_not_found');
        
        
        
          delete_btn.addEventListener("click",()=>{
      
            if(storedArticels.length > 0 ){
      
              if(storedArticels.some(art => art.id.toString() === articleId.toString())){
                const removed = storedArticels.filter(art => art.id.toString() !== articleId.toString());
            
                storedArticels = removed.sort((a, b) => a.id - b.id);
      
      
                localStorage.setItem(favKey, JSON.stringify(storedArticels));
            
                if(trElement){
                  trElement.remove();
                  if(storedArticels.length === 0){
                  const table = document.getElementById('article-table');
                  table.innerHTML = "";
                  art_not_found.innerText = "No responses found.";
                  art_not_found.classList.remove('hidden_not_found');
                  }
                }
          
                if(favBtn){
                  favBtn.innerText = '☆';
                }
              }
        
            }
          })
        }
        if(tr.length === index){
          return;
        }
        }


    fav_trs.forEach(action);

    } catch (error) {
      console.log('error', error);
    }
}


const findArticleById = (array, id) => {
  return array.find(item => item.id.toString() === id.toString());
}



function createFloatingButton() {


    if (document.getElementById('auto-collapse-btn')) return; // prevent duplicates

    const button = document.createElement('button');
    button.id = 'auto-collapse-btn'; // 👈 give it a stable ID
    button.classList.add('openModalBtn')
  
    button.innerText = '⚙️'; // Settings gear icon
  
    Object.assign(button.style, {
      position: 'fixed',
      bottom: '50%',
      right: '20px',
      zIndex: '9999',
      padding: '10px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border:'1px solid #ddd'
    });
  
    button.addEventListener('click', () => {
      autoCollapse();
    });
  

  

    document.body.appendChild(button);
  

}



function modalStyles(isDark){
  const style = document.createElement('style');
style.textContent = `

   #art_not_found{
      text-align: center;
      margin-top: 2rem;
    }
    .hidden_not_found{
     margin-top:0 !important;
    }
   #fav_articles{
    margin-top:1.5rem;
   }
  .hidden_srj {
    display: none !important;
  }

  .modal_srj {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${isDark ? "rgba(0,0,0,0.5":"rgba(0,0,0,0.5"});
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s forwards;
  }

  .modal-content {
    background: ${isDark ? "#303030":"white"};
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 1000px;
    transform: scale(0.8);
    opacity: 0;
    animation: popIn 0.3s forwards;
    position: relative;
    color: ${isDark ? "white":"black"};
  }

  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes popIn {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

}

function injectTableStyles(isDark) {
  const style = document.createElement('style');
  style.textContent = `

    #article-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Segoe UI', sans-serif;
      // background-color: ${isDark ? '#334155' : '#fff'};
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    #article-table th, #article-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid ${isDark ? '#475569' : '#eee'};
    }

    #article-table th {
      // background-color: ${isDark ? '#1e293b' : '#f9f9f9'};
      font-weight: 600;
    }

    #article-table tr:hover {
      background-color: ${isDark ? '#00000024' : '#f1f5f9'};
    }

    #pagination {
      margin-top: 12px;
      text-align: center;
    }

    #pagination button {
      margin: 0 4px;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background-color: ${isDark ? '#334155' : '#e2e8f0'};
      color: ${isDark ? '#f1f5f9' : '#1e293b'};
      cursor: pointer;
      transition: background-color 0.3s;
    }

    #pagination button:hover:not(:disabled) {
      background-color: ${isDark ? '#475569' : '#cbd5e1'};
    }

    #pagination button:disabled {
      background-color: ${isDark ? '#1e293b' : '#94a3b8'};
      color: white;
      cursor: not-allowed;
    }

    button.action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      font-size: 14px;
      border-radius: 6px;
      color: inherit;
      transition: background-color 0.2s;
    }

    button.action-btn:hover {
      background-color: ${isDark ? '#475569' : '#e2e8f0'};
    }

    button.delete-btn {
      color: #ef4444;
    }

    button.pin-btn {
      color: #3b82f6;
    }
  `;
  document.head.appendChild(style);
}


function detectTheme() {
  const themeMode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const isDark = themeMode === "dark";
  modalStyles(isDark);
  injectTableStyles(isDark);
  tableActions();


  const btn = document.getElementById('auto-collapse-btn');
  if (btn) {
    btn.style.backgroundColor = isDark ? "#000" : "#fff";
    btn.style.color = isDark ? "#fff" : "#000";
  } else {
    console.warn("Element with ID 'auto-collapse-btn' not found.");
  }
}


function modal() {
  const modalHTML = `
  <div id="modal_ex" class="modal_srj hidden_srj">
    <div class="modal-content">
      <span id="closeModalBtn" class="close">&times;</span>
      <h2>Favorite Responses</h2>
      <div id="art_not_found"></div>
      <div id="fav_articles">
        <table id="article-table"></table>
        <div id="pagination"></div>
      </div>
    </div>
  </div>
`;


  const body = document.body; // ✅ Get the actual body element directly
  body.insertAdjacentHTML('beforeend', modalHTML); // ✅ Append the modal HTML
}



// const articles = JSON.parse(localStorage.getItem(favKey) || '[]');

const rowsPerPage = 8;
let currentPage = 1;

function renderTablePage(page) {
  const table = document.getElementById('article-table');
  const art_not_found = document.getElementById('art_not_found');
    
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = storedArticels.slice(start, end);

  if(storedArticels && storedArticels.length > 0){
    art_not_found.innerText = "";
    art_not_found.classList.add('hidden_not_found');
      // Table Header
  table.innerHTML = `
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Saved Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    ${pageItems
      .map(
        (a) => `
      <tr id=fav_raw_${a.id} class="fav_tr">
        <td>${a.id}</td>
        <td id=td_${a.id}>${a.title}</td>
        <td id=td_${a.id}>${a.description}</td>
        <td>${new Date(a.savedDate).toLocaleDateString()}</td>
        <td>
          <button data-user-id=${a.id} class="action-btn delete-btn" title="Delete">
            🗑️
          </button>
        </td>
      </tr>`
      )
      .join('')}
  </tbody>
`;
  }else{
    art_not_found.innerText = "No responses found.";

  }

}

function renderPagination() {
  const totalPages = Math.ceil(storedArticels.length / rowsPerPage);
  const pagination = document.getElementById('pagination');

  pagination.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => changePage(currentPage - 1);
  pagination.appendChild(prevBtn);

  const pageIndicator = document.createElement('span');
  pageIndicator.style.margin = '0 8px';
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  pagination.appendChild(pageIndicator);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => changePage(currentPage + 1);
  pagination.appendChild(nextBtn);
}

function changePage(page) {
  currentPage = page;
  renderTablePage(currentPage);
}



function openModal() {

  const modal = document.getElementById('modal_ex');
  const openBtn = document.querySelector('.openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');



  if (openBtn) {
    openBtn.addEventListener('click', () => {
    if (modal) {
      modal.classList.remove('hidden_srj');
      modal.classList.add("showmodal_srj");
    }
    // Initial render
    renderTablePage(currentPage);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      // alert('Hi');
      if(modal){
        modal.classList.add('hidden_srj');
        modal.classList.remove("showmodal_srj");
      }

    });
  }

  window.addEventListener('click', (e) => {
    if(modal){
      if (e.target === modal) {
        modal.classList.add('hidden_srj');
        modal.classList.remove("showmodal_srj");
      }
    }

  });


}




// Trigger on load

window.addEventListener('load', () => {
  // Initial run
  createFloatingButton();
  autoCollapse();
  // styles();
  // Observe DOM for dynamic changes (e.g., SPA updates)
  const observer = new MutationObserver(() => {
    autoCollapse();
    detectTheme();
    openModal();
    // Only create the button if it doesn't already exist
    if (!document.getElementById('auto-collapse-btn')) {
      createFloatingButton();
    }


    if(!document.getElementById('modal_ex')){
      modal();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
