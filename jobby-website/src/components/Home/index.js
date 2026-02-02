import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Component } from "react";
import withRouter from "../../utils/withRouter";
import Header from "../Header";
import "./index.css";

class Home extends Component {
  handleJobsRoute = () => {
    const { router } = this.props;
    router.navigate("/jobs", { replace: true });
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Navigate to="/login" />;
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-text-container">
            <h1 className="home-text">Find The Job That Fits Your Life</h1>
            <p className="home-paragraph">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <button
              type="button"
              className="find-jobs"
              onClick={this.handleJobsRoute}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Home);
