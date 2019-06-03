import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import * as actions from '../actions';

const styles = theme => ({
  form: {},
  textField: {
    margin: theme.spacing(1, 1, 0, 0),
    width: 200,
  },
});

const mapStateToProps = state => {
  return {
    filterDate: state.UIState.filterDate,
  };
};

const actionCreators = {
  changeFilterDate: actions.changeFilterDate,
};

class InputsPanel extends React.Component {
  handleDateChange = async event => {
    const { changeFilterDate } = this.props;
    const filterDate = event.target.value;
    await changeFilterDate({ filterDate });
  };

  render() {
    const { classes, filterDate } = this.props;
    return (
      <form className={classes.form} noValidate>
        <TextField
          id="date"
          label="Фильтр по дате"
          type="date"
          value={filterDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleDateChange}
        />
      </form>
    );
  }
}

const wStyles = withStyles(styles)(InputsPanel);
export default connect(
  mapStateToProps,
  actionCreators
)(wStyles);
