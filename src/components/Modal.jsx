import React, { useState, useCallback, useMemo } from "react";
import { FaTrash, FaThumbtack, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ArticleCard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Understanding React Performance Optimization",
      description: "Deep dive into React's rendering mechanism and how to optimize your applications for better performance.",
      savedDate: "2024-01-15",
      isPinned: true,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
    },
    {
      id: 2,
      title: "Modern CSS Techniques",
      description: "Exploring the latest CSS features and how they can improve your web development workflow.",
      savedDate: "2024-01-14",
      isPinned: false,
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2"
    },
    {
      id: 3,
      title: "JavaScript Best Practices",
      description: "Essential JavaScript patterns and practices for writing maintainable code.",
      savedDate: "2024-01-13",
      isPinned: false,
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a"
    },
        {
      id: 4,
      title: "JavaScript Best Practices",
      description: "Essential JavaScript patterns and practices for writing maintainable code.",
      savedDate: "2024-01-13",
      isPinned: false,
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a"
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => (b.isPinned ? 1 : -1));
  }, [articles, searchTerm]);

  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const handleDelete = useCallback((article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = useCallback(() => {
    setArticles(prev => prev.filter(art => art.id !== selectedArticle.id));
    setShowDeleteModal(false);
  }, [selectedArticle]);

  const togglePin = useCallback((id) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id
          ? { ...article, isPinned: !article.isPinned }
          : article
      )
    );
  }, []);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Favorite Articles</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className={`pl-10 pr-4 py-2 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-opacity-80"
              aria-label="Toggle theme"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>
          </div>
        </div>

        {currentArticles.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <div
                key={article.id}
                className={`rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-102 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold line-clamp-2">{article.title}</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePin(article.id)}
                        className={`p-2 rounded-full transition-colors ${article.isPinned ? "text-blue-500" : "text-gray-400"} hover:bg-gray-100 dark:hover:bg-gray-700`}
                        aria-label={article.isPinned ? "Unpin article" : "Pin article"}
                      >
                        <FaThumbtack />
                      </button>
                      <button
                        onClick={() => handleDelete(article)}
                        className="p-2 rounded-full text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Delete article"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Saved on {new Date(article.savedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className={`rounded-lg p-6 max-w-md w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Confirm Deletion</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <IoMdClose size={24} />
                </button>
              </div>
              <p className="mb-6">Are you sure you want to delete this article?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-opacity-80"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;