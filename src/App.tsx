import React, { Component } from "react";
import "./App.css";
import LoginContainer from "./components/LoginContainer/LoginContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginContainer />
      </div>
    );
  }
}

export default App;
