export const filterArticles = (articles, filters) => {
    return articles.filter((article) => {
      const { date, author, source, category } = filters;
  
      // Apply filters
      if (date && typecastDate(article.date) !== typecastDate(date)) {
        return false;
      }
  
      if (author && author !== '' && article.author !== author) {
        return false;
      }
  
      if (source && article.source !== source) {
        return false;
      }
  
      if (category && article.category !== category) {
        return false;
      }
  
      return true;
    });
  };
  

  const typecastDate = (date) => {

    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric"
    });

    return formattedDate;
  }