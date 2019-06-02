import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import * as actions from '../actions';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  slider: {
    padding: theme.spacing(2, 0),
  },
  sliderWrapper: {
    width: '200px',
  },
  row: {
    display: 'flex',
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  paper: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(1, 1, 0, 0),
  },
  textField: {
    'margin-top': theme.spacing(1),
  },
});

const mapStateToProps = state => {
  return {
    fontSize: state.UIState.fontSize,
    theme: state.UIState.theme,
    articlesOnPage: state.pages.articlesOnPage,
  };
};

const actionCreators = {
  changeFontSize: actions.changeFontSize,
  changeTheme: actions.changeTheme,
  changeArticlesCountOnPage: actions.changeArticlesCountOnPage,
};

class Sidebar extends React.Component {
  handleSliderChange = (event, value) => {
    const { changeFontSize } = this.props;
    changeFontSize({ fontSize: value });
  };

  handleRadioChange = (event, value) => {
    const { changeTheme } = this.props;
    changeTheme({ theme: value });
  };

  handleArticlesCountChange = event => {
    const { changeArticlesCountOnPage } = this.props;
    const articlesOnPage = event.target.value;
    changeArticlesCountOnPage({ articlesOnPage });
  };

  render() {
    const { classes, fontSize, theme, articlesOnPage } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.row}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Размер шрифта:
            </Typography>
            <Slider
              className={classes.slider}
              value={fontSize}
              min={12}
              max={20}
              step={2}
              onChange={this.handleSliderChange}
            />
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Цветовая схема:
            </Typography>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Color theme"
                name="theme"
                className={classes.group}
                value={theme}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel value="primary" control={<Radio />} label="Основная" />
                <FormControlLabel value="secondary" control={<Radio />} label="Дополнительная" />
              </RadioGroup>
            </FormControl>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Кол-во новостей
              <br />
              на странице:
            </Typography>
            <TextField
              id="articles-count-number"
              value={articlesOnPage}
              onChange={this.handleArticlesCountChange}
              type="number"
              className={classes.textField}
              inputProps={{ min: '2', max: '20', step: '1' }}
            />
          </Paper>
        </div>
      </main>
    );
  }
}

const wStyles = withStyles(styles)(Sidebar);
export default connect(
  mapStateToProps,
  actionCreators
)(wStyles);
