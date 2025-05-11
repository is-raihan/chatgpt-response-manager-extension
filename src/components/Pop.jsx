import React, { useState } from 'react';

const initialResponses = [
  { id: 1, content: 'Hello world!', timestamp: Date.now(), isExpanded: false },
  {
    id: 2,
    content: 'This is another example response that is a bit longer.',
    timestamp: Date.now(),
    isExpanded: false,
  },
];

const ResponseManager = () => {
  const [responses, setResponses] = useState(initialResponses);
  const [isGlobalExpanded, setIsGlobalExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleGlobalExpand = () => {
    setIsGlobalExpanded((prev) => !prev);
  };

  const toggleSingleExpand = (id) => {
    setResponses((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, isExpanded: !res.isExpanded } : res
      )
    );
  };

  const filteredResponses = responses.filter((res) =>
    res.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearAllResponses = () => setResponses([]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🗂️ Response Manager</h1>
        <button
          style={styles.toggleBtn}
          onClick={toggleGlobalExpand}
          title="Toggle All"
        >
          {isGlobalExpanded ? '−' : '+'}
        </button>
      </div>



      {/* Response List */}
      <div style={styles.responseList}>
        {filteredResponses.length ? (
          filteredResponses.map((res) => (
            <div key={res.id} style={styles.responseBox}>
              <div style={styles.responseTop}>
                <div>
                  <p style={styles.date}>
                    {new Date(res.timestamp).toLocaleString()}
                  </p>
                  <div
                    style={{
                      ...styles.content,
                      maxHeight:
                        res.isExpanded || isGlobalExpanded ? 'none' : '38px',
                    }}
                  >
                    {res.content}
                  </div>
                </div>
                <button
                  style={styles.expandBtn}
                  onClick={() => toggleSingleExpand(res.id)}
                  title="Toggle View"
                >
                  {res.isExpanded ? '🔼' : '🔽'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.empty}>No responses found.</p>
        )}
      </div>

      {/* <ToggleSwitch /> */}

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button style={styles.clearBtn} onClick={clearAllResponses}>
          🗑️ Clear All
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '460px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  toggleBtn: {
    padding: '6px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#e5e7eb',
    color: '#111',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
  },
  searchWrapper: {
    position: 'relative',
    marginBottom: '16px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 36px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: '#6b7280',
  },
  responseList: {
    overflowY: 'auto',
    maxHeight: '240px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  responseBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    padding: '12px',
  },
  responseTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },
  date: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
  },
  content: {
    fontSize: '14px',
    color: '#111827',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  expandBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#374151',
    padding: '4px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: 'auto',
  },
  clearBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
  },
  viewBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
  },
  empty: {
    fontSize: '14px',
    color: '#9ca3af',
    textAlign: 'center',
    padding: '20px 0',
  },
};

export default ResponseManager;
