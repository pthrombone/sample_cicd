import React, { FunctionComponent, useState, useEffect } from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { setDataId } from "../../util/setDataId";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    }
  });

interface Props extends WithStyles<typeof styles> {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setMessage: (message: string) => void;
}

const LoginInputs: FunctionComponent<Props> = props => {
  const { classes, email, password, setEmail, setPassword, setMessage } = props;

  return (
    <div className={classes.root}>
      <TextField
        id="standard-email"
        label="Email"
        type="email"
        value={email}
        onChange={e => {
          setMessage("");
          setEmail(e.target.value);
        }}
        margin="normal"
      />
      <TextField
        id="standard-password"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        margin="normal"
      />
    </div>
  );
};

export default withStyles(styles)(LoginInputs);
