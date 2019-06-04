import axios from 'axios';
import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';
import routes from '../routes';

export const changeTheme = createAction('THEME_CHANGE');
export const changeFontSize = createAction('FONT_SIZE_CHANGE');
export const changeFilterDate = createAction('FILTER_DATE_CHANGE');
export const changeArticlesCountOnPage = createAction('ARTICLES_COUNT_ON_PAGE_CHANGE');

export const fetchArticlesRequest = createAction('ARTICLES_FETCH_REQUEST');
export const fetchArticlesSuccess = createAction('ARTICLES_FETCH_SUCCESS');
export const fetchArticlesFailure = createAction('ARTICLES_FETCH_FAILURE');

const prepareArticles = articles =>
  articles.map(article => {
    const date = new Date(article.publishedAt).toLocaleString('ru');
    return { ...article, id: uniqueId(), date };
  });

export const fetchArticles = (page, pageSize, date) => async dispatch => {
  dispatch(fetchArticlesRequest());
  try {
    const url = routes.articlesUrl();
    const response = await axios.get(url, { params: { page, pageSize, from: date, to: date } });
    const { status, articles, totalResults } = response.data;
    if (status === 'ok') {
      dispatch(fetchArticlesSuccess({ articles: prepareArticles(articles), totalResults }));
    } else {
      dispatch(fetchArticlesFailure());
    }
  } catch (err) {
    dispatch(fetchArticlesFailure());
    throw err;
  }
};
