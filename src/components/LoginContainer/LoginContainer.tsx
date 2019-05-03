import React, { FunctionComponent, useState, useEffect } from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import { Paper, Button, Typography } from "@material-ui/core";
import { setDataId } from "../../util/setDataId";
import LoginInputs from "../LoginInputs/LoginInputs";
import LoginButtons from "../LoginButtons/LoginButtons";
import axios from "axios";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      height: 400,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    contentWrapper: {
      width: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    message: {
      height: 30,
      color: theme.palette.error.main
    },
    messageSuccess: {
      height: 30,
      color: "green"
    }
  });

interface Props extends WithStyles<typeof styles> {}

const LoginContainer: FunctionComponent<Props> = props => {
  const { classes } = props;

  const [displayInputs, setDisplayInputs] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) {
      setMessage("Email needs a value");
      return;
    }

    try {
      const response = axios.post("https://reqres.in/api/login", {
        email,
        password
      });
      await response;
      setMessage("Login Successful");
    } catch (e) {
      setMessage("Login Failed");
    }
  };

  const messageStyle = () => {
    if (message === "Login Successful") {
      return classes.messageSuccess;
    } else {
      return classes.message;
    }
  };

  const loginProps = {
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    setMessage,
    setDisplayInputs
  };

  const renderContent = () => {
    if (displayInputs) {
      return (
        <div className={classes.contentWrapper}>
          <Typography className={messageStyle()} {...setDataId("message")}>
            {message}
          </Typography>
          <LoginInputs {...loginProps} />
          <LoginButtons {...loginProps} />
        </div>
      );
    } else {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setDisplayInputs(true)}
          {...setDataId("signIn")}
        >
          Sign In
        </Button>
      );
    }
  };

  return <Paper className={classes.root}> {renderContent()}</Paper>;
};

export default withStyles(styles)(LoginContainer);
