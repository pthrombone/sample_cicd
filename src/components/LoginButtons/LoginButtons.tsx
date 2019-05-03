import React, { FunctionComponent, useState, useEffect } from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { setDataId } from "../../util/setDataId";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginTop: `${theme.spacing.unit * 3}px`
    },
    button: {
      margin: theme.spacing.unit
    }
  });

interface Props extends WithStyles<typeof styles> {
  handleLogin: () => void;
  setDisplayInputs: (value: boolean) => void;
}

const LoginButtons: FunctionComponent<Props> = props => {
  const { classes, handleLogin, setDisplayInputs } = props;

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        onClick={() => setDisplayInputs(false)}
        variant="contained"
        color="primary"
        {...setDataId("returnButton")}
      >
        Return
      </Button>
      <Button
        className={classes.button}
        onClick={() => handleLogin()}
        variant="contained"
        color="primary"
        {...setDataId("loginButton")}
      >
        Login
      </Button>
    </div>
  );
};

export default withStyles(styles)(LoginButtons);
