import React from 'react';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
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

const Articles = props => {
  const { classes, articles } = props;

  return articles.map(article => {
    const { title, description, urlToImage, publishedAt, source } = article;
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
            <Chip label={publishedAt} className={classes.chip} />
            <Chip label={source.name} className={classes.chip} />
          </CardContent>
        </div>
      </Card>
    );
  });
};

export default withStyles(styles)(Articles);
