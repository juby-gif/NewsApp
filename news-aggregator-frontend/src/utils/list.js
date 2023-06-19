import { CONSTANTS } from "./constants";


export const getUniqueAuthors = (articles) => {
    const authors = articles.map((article) => article.author);
    const uniqueAuthors = Array.from(new Set(authors)).filter((author) => author);
    return uniqueAuthors.map((author) => author);
};
  
export const getSources = () => {
    const sourceList = Object.values(CONSTANTS.sources).map((source) => ({
      name: source.name,
      value: source.value,
    }));
    return sourceList;
};
  