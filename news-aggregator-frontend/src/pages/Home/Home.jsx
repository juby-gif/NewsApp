import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Header, SearchBar, ArticleCard, EmptyComponent } from '../../components';
import './Home.css';
import { 
  API_ENDPOINTS, 
  useApiService,
  filterArticles, 
  transformArticles,
} from '../../utils';
import { UserContext } from '../../context';

const Home = () => {
  const { updateArticles, articles } = useContext(UserContext);
  const apiService = useApiService();

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    author: '',
    date: '',
    source: '',
  });
  const [error, setError] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (keyword.length > 0) {
        const keywordString = keyword.join(',');
        const response = await apiService.get(API_ENDPOINTS.FETCH_ARTICLES, {
          keyword: keywordString,
        });

        transformResponse(response);
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  // Handle filter change
  const handleFilterChange = useCallback((filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value === '' ? '' : value,
    }));
  }, []);

  // Transform API response into common format
  const transformResponse = useCallback((response) => {
    if (response && Object.keys(response).length > 0) {
      const transformedArticles = transformArticles(response); // Reusable function for transforming articles
      updateArticles(transformedArticles);
      setIsLoaded(true);
    }
  }, [updateArticles]);

  useEffect(() => {
    const filtered = filterArticles(articles, selectedFilters);
    setFilteredArticles(filtered);

    setIsSearchEmpty(filtered.length === 0 && isLoaded);
  }, [articles, selectedFilters, isLoaded]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="container">
        <h1>Generate Articles by Typing Your Keywords!</h1>
        <div>
          <SearchBar
            loading={loading}
            error={error}
            keyword={keyword}
            setKeyword={setKeyword}
            selectedFilters={selectedFilters}
            handleSearch={handleSearch}
            setSelectedFilters={setSelectedFilters}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="article-section">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, id) => (
              <ArticleCard key={id} article={article} />
            ))
          ) : (
            <EmptyComponent isLoaded={isLoaded} isSearchEmpty={isSearchEmpty} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
