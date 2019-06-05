import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
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
    flex: '0 0 200px',
  },
});

const Articles = props => {
  const { classes, articles } = props;

  return articles.map(article => {
    const { id, title, description, urlToImage, date, source } = article;
    const image = urlToImage || 'https://picsum.photos/id/433/600';
    return (
      <Card className={classes.card} key={id}>
        <CardMedia className={classes.cover} image={image} title="Article image" />
        <div className={classes.details}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5">
              <Link component={RouterLink} to={`/article/${id}`}>
                {title}
              </Link>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
            <Chip label={date} className={classes.chip} />
            <Chip label={source.name} className={classes.chip} />
          </CardContent>
        </div>
      </Card>
    );
  });
};

export default withStyles(styles)(Articles);
