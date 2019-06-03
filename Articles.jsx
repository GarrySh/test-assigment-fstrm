import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from 'material-ui-flat-pagination';
import * as actions from '../actions';
import InputsPanel from './InputsPanel';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    'min-height': '100vh',
  },
  progress: {},
  card: {
    margin: theme.spacing(1, 0),
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  chip: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  cover: {
    width: '300px',
    flex: '0 0 200px',
  },
});

const mapStateToProps = (state, ownProps) => {
  const currentPage = ownProps.match.params.id || 1;
  return {
    articles: state.articles,
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

class Articles extends React.Component {
  componentDidMount() {
    console.log('component did mount');
    this.fetchArticles();
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

  renderProgressBar = () => {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignContent="center">
        <CircularProgress className={classes.progress} />
      </Grid>
    );
  };

  renderArticles = () => {
    const { classes, articles, currentPage, totalArticles, articlesOnPage } = this.props;
    return (
      <div>
        <InputsPanel />
        {articles.map(article => {
          const { title, description, urlToImage, publishedAt, source } = article;
          const articleDate = publishedAt;
          return (
            <Card className={classes.card}>
              <CardMedia className={classes.cover} image={urlToImage} title="Article image" />
              <div className={classes.details}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component={Link}>
                    {title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {description}
                  </Typography>
                  <Chip label={articleDate} className={classes.chip} />
                  <Chip label={source.name} className={classes.chip} />
                </CardContent>
              </div>
            </Card>
          );
        })}
        <Pagination
          limit={articlesOnPage}
          offset={currentPage * articlesOnPage - 1}
          total={totalArticles}
          onClick={this.handlePaginationChange}
        />
      </div>
    );
  };

  render() {
    console.log(this.props);
    const { classes, articlesFetchingState } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {articlesFetchingState === 'request' ? this.renderProgressBar() : this.renderArticles()}
      </main>
    );
  }
}

const wStyles = withStyles(styles)(Articles);
export default connect(
  mapStateToProps,
  actionCreators
)(wStyles);
