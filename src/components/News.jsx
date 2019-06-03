import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from 'material-ui-flat-pagination';
import * as actions from '../actions';
import InputsPanel from './InputsPanel';
import Articles from './Articles';
import { articlesSelector } from '../selectors';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    'min-height': '100vh',
  },
  progress: {},
});

const Main = ({ classes, children }) => (
  <main className={classes.content}>
    <div className={classes.toolbar} />
    {children}
  </main>
);

const mapStateToProps = (state, ownProps) => {
  const currentPage = ownProps.match.params.id || 1;
  return {
    articles: articlesSelector(state),
    articlesFetchingState: state.articlesFetchingState,
    articlesOnPage: state.pages.articlesOnPage,
    currentPage,
    totalArticles: state.pages.totalArticles,
    filterDate: state.UIState.filterDate,
  };
};

const actionCreators = {
  fetchArticles: actions.fetchArticles,
  changeFilterDate: actions.changeFilterDate,
  changePage: actions.changePage,
};

class News extends React.Component {
  componentDidMount() {
    console.log('component did mount');
    this.fetchArticles();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps)
    return true;
  }

  componentDidUpdate() {
    console.log('component did update');
    // this.fetchArticles();
  }

  fetchArticles = () => {
    const { fetchArticles, articlesOnPage, filterDate, currentPage } = this.props;
    fetchArticles(currentPage, articlesOnPage, filterDate);
  };

  handlePaginationChange = (event, offset, page) => {
    const { changePage, history } = this.props;
    console.log('this props', this.props);
    changePage({ page });
    history.push(`/articles/${page}`);
  };

  render() {
    const {
      classes,
      articlesFetchingState,
      articles,
      currentPage,
      totalArticles,
      articlesOnPage,
    } = this.props;

    if (articlesFetchingState === 'failure') {
      return (
        <Main classes={classes}>
          <Typography paragraph variant="h4" component="h1">
            Что-то пошло не так, попробуйте обновить страницу
          </Typography>
        </Main>
      );
    }
    if (articlesFetchingState === 'success') {
      return (
        <Main classes={classes}>
          <InputsPanel />
          <Articles articles={articles} />
          <Pagination
            limit={articlesOnPage}
            offset={(currentPage - 1) * articlesOnPage}
            total={totalArticles}
            onClick={this.handlePaginationChange}
          />
        </Main>
      );
    }
    return (
      <Main classes={classes}>
        <Grid container justify="center" alignContent="center">
          <CircularProgress className={classes.progress} />
        </Grid>
      </Main>
    );
  }
}

const wStyles = withStyles(styles)(News);
export default connect(
  mapStateToProps,
  actionCreators
)(wStyles);
