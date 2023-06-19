import { CONSTANTS } from "./constants";

export function transformArticles(response) {
    const transformedArticles = [];
  
    Object.keys(response).forEach((key) => {
      switch (key) {
        case CONSTANTS?.sources?.NEWS_API?.value:
          transformedArticles.push(...transformNewsAPIArticles(response[key].articles));
          break;
  
        case CONSTANTS?.sources?.THE_GUARDIAN?.value:
          transformedArticles.push(...transformGuardianArticles(response[key].response.results));
          break;
  
        case CONSTANTS?.sources?.THE_NEW_YORK_TIMES?.value:
          transformedArticles.push(...transformNYTimesArticles(response[key].response.docs));
          break;
  
        default:
          console.log('Invalid');
          break;
      }
    });
  
    return transformedArticles;
  }
  
  function transformNewsAPIArticles(articles) {
    return articles.map((article) => {
      const {
        title,
        description: subtitle,
        content: description,
        author,
        url: redirectLink,
        urlToImage: img,
        publishedAt: date,
      } = article;
  
      return { title, subtitle, description, source:CONSTANTS?.sources?.NEWS_API?.value, author, redirectLink, img, date };
    });
  }
  
  function transformGuardianArticles(articles) {
    return articles.map((article) => {
      const { 
        id, 
        sectionName: category,
        webUrl, 
        webTitle: title, 
        webPublicationDate:date, 
        fields: { thumbnail:img },
        // API doesn't support author
        // author 
      } = article;
      return { id, category, img, redirectLink:webUrl, source:CONSTANTS?.sources?.THE_GUARDIAN?.value, date, title };
    });
  }
  
  function transformNYTimesArticles(articles) {
    return articles.map((article) => {
      const {
        _id: id,
        section_name: category,
        web_url: redirectLink,
        headline: { main: title },
        byline: { original: author },
        abstract: subtitle,
        pub_date: date,
      } = article;
  
      return { id, title, category, author, redirectLink, source:CONSTANTS?.sources?.THE_NEW_YORK_TIMES?.value, subtitle, date };
    });
  }
  