const hostUrl = 'https://newsapi.org/v2/'
const apiKey = 'a5112cd4be574f9dabd0e505858e0cce';

export default {
  articlesUrl: () => `${hostUrl}everything?q=russia&apiKey=${apiKey}`,
};
