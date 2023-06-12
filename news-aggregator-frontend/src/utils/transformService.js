import { CONSTANTS } from "./constants";

export function transformArticles(response) {
    const transformedArticles = [];
  
    Object.keys(response).forEach((key) => {
      switch (key) {
        case CONSTANTS.NEWS_API:
          transformedArticles.push(...transformNewsAPIArticles(response[key].articles));
          break;
  
        case CONSTANTS.THE_GUARDIAN:
          transformedArticles.push(...transformGuardianArticles(response[key].response.results));
          break;
  
        case CONSTANTS.THE_NEW_YORK_TIMES:
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
  
      return { title, subtitle, description, source:CONSTANTS.NEWS_API, author, redirectLink, img, date };
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
      return { id, category, img, redirectLink:webUrl, source:CONSTANTS.THE_GUARDIAN, date, title };
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
  
      return { id, title, category, author, redirectLink, source:CONSTANTS.THE_NEW_YORK_TIMES, subtitle, date };
    });
  }
  