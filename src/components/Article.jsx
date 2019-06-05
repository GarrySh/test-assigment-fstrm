import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import Modal from '@material-ui/core/Modal';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CardMedia from '@material-ui/core/CardMedia';
import * as actions from '../actions';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    'min-height': '100vh',
  },
  imageList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    article: state.articles.data.find(article => article.id === id),
    isModalOpen: state.UIState.isModalOpen,
    modalImgUrl: state.UIState.modalImgUrl,
  };
};

const actionCreators = {
  fetchArticles: actions.fetchArticles,
  openModal: actions.openModal,
  closeModal: actions.closeModal,
};

class Article extends React.Component {
  componentDidMount() {}

  handleModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleModalOpen = imgUrl => () => {
    const { openModal } = this.props;
    openModal({ imgUrl })
  };

  render() {
    const {
      isModalOpen,
      modalImgUrl,
      classes,
      article: { title, description, date, url, content, urlToImage },
    } = this.props;

    // От api прилетает только одна картинка и то не всегда, остальные - рандомные
    const img = urlToImage || 'https://picsum.photos/id/433/1200';
    const tileData = [
      {
        img,
        title: 'News image',
      },
      {
        img: 'https://picsum.photos/600?random=1',
        title: 'Image1',
      },
      {
        img: 'https://picsum.photos/600?random=2',
        title: 'Image2',
      },
      {
        img: 'https://picsum.photos/600?random=3',
        title: 'Image2',
      },
    ];

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Grid container justify="space-between" alignItems="stretch">
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              <Link href={url} target="_blank" rel="noopener">
                Reference to the original
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              {'Publication date: '}
              {date}
            </Typography>
          </Grid>
        </Grid>
        <Typography paragraph>{description}</Typography>
        <Typography paragraph>{content}</Typography>
        <div className={classes.imageList}>
          <GridList className={classes.gridList} cols={2.5} cellHeight={300}>
            {tileData.map(tile => (
              <GridListTile key={tile.img} onClick={this.handleModalOpen(tile.img)}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isModalOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.paper}>
            <CardMedia image={modalImgUrl} component="img" alt="modal img" />
          </div>
        </Modal>
      </main>
    );
  }
}

const wStyles = withStyles(styles)(Article);
export default connect(
  mapStateToProps,
  actionCreators
)(wStyles);
