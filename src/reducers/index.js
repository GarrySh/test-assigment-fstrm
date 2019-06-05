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
      const { articles: newArticles, totalResults } = payload;
      return {
        data: newArticles,
        totalArticles: totalResults,
      };
    },
  },
  { data: [], totalArticles: 0 }
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
    [actions.changeFilterDate](state, { payload }) {
      const { filterDate } = payload;
      return {
        ...state,
        filterDate,
      };
    },
    [actions.changeTitle](state, { payload }) {
      const { title } = payload;
      return {
        ...state,
        title,
      };
    },
  },
  { articlesOnPage: 5, filterDate: '', title: '' }
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

    [actions.changeVisibleMobileSidebar](state, { payload }) {
      const { isOpen } = payload;
      return {
        ...state,
        isMobileSidebarOpen: isOpen,
      };
    },

    [actions.openModal](state, { payload }) {
      const { imgUrl } = payload;
      return {
        ...state,
        isModalOpen: true,
        modalImgUrl: imgUrl,
      };
    },

    [actions.closeModal](state) {
      return {
        ...state,
        isModalOpen: false,
        modalImgUrl: '',
      };
    },
  },
  { theme: 'primary', fontSize: 14, isMobileSidebarOpen: false, isModalOpen: false, modalImgUrl: '' }
);

export default combineReducers({
  articles,
  pages,
  articlesFetchingState,
  UIState,
});
