import { createSelector } from 'reselect';

export const getArticles = state => state.articles;

export const articlesSelector = createSelector(
  getArticles,
  articles => articles
);
