import { Component } from "react";
import withRouter from "../../utils/withRouter";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  state = { username: "", password: "", showError: false };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { router } = this.props;
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    router.navigate("/", { replace: true });
  };

  onSubmitFailure = () => {
    this.setState({ showError: true });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();
    const loginAPIURL = "https://apis.ccbp.in/login";
    const { username, password } = this.state;
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(loginAPIURL, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure();
    }
  };

  render() {
    const { username, password, showError } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Navigate to="/" replace />;
    }
    return (
      <div className="login-bg-container">
        <form className="login-card-container" onSubmit={this.handleOnSubmit}>
          <div className="jobby-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="jobby-logo"
            />
          </div>
          <div className="input-container">
            <label htmlFor="username-input" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              className="input-text"
              id="username-input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password-input" className="label-text">
              PASSWORD
            </label>
            <input
              type="text"
              className="input-text"
              id="password-input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && (
            <p className="error-msg">*Username and Password didn`t match</p>
          )}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
