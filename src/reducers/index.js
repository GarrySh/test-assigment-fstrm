import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const articlesFetchingState = handleActions(
  {
    [actions.fetchArticlesRequest]() {
      return 'request';
    },
    [actions.fetchArticlesSuccess]() {
      return 'success';
    },
    [actions.fetchArticlesFailure]() {
      return 'failure';
    },
  },
  'none'
);

const articles = handleActions(
  {
    [actions.fetchArticlesSuccess](state, { payload }) {
      return [...payload.articles];
    },
  },
  []
);

const pages = handleActions(
  {
    [actions.changeArticlesCountOnPage](state, { payload }) {
      const { articlesOnPage } = payload;
      return {
        ...state,
        articlesOnPage: Number(articlesOnPage),
      };
    },
    [actions.fetchArticlesSuccess](state, { payload }) {
      const { totalResults } = payload;
      return {
        ...state,
        totalArticles: totalResults,
      };
    },
  },
  { totalArticles: 0, articlesOnPage: 2 }
);

const UIState = handleActions(
  {
    [actions.changeTheme](state, { payload }) {
      const { theme } = payload;
      return {
        ...state,
        theme,
      };
    },
    [actions.changeFontSize](state, { payload }) {
      const { fontSize } = payload;
      return {
        ...state,
        fontSize,
      };
    },
    [actions.changeArticlesCountOnPage](state, { payload }) {
      const { articlesCountOnPage } = payload;
      return {
        ...state,
        articlesCountOnPage,
      };
    },
    [actions.changeFilterDate](state, { payload }) {
      const { filterDate } = payload;
      return {
        ...state,
        filterDate,
      };
    },
  },
  { theme: 'primary', fontSize: 14, filterDate: '' }
);

export default combineReducers({
  articles,
  pages,
  articlesFetchingState,
  UIState,
});
