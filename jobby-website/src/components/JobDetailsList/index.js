import { Component } from "react";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";
import Header from "../Header";
import JobDetails from "../JobDetails";
import SimilarJobs from "../SimilarJobs";
import withRouter from "../../utils/withRouter";
import "./index.css";

const jobDetailsAPIStatusConstants = {
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class JobDetailsList extends Component {
  state = { apiStatus: "", jobDetails: {}, similarJobsList: [] };

  componentDidMount() {
    this.getJobDetails();
  }

  getJobDetails = async () => {
    this.setState({ apiStatus: jobDetailsAPIStatusConstants.progress });
    const { router } = this.props;
    const { id } = router.params;
    const API = `https://apis.ccbp.in/jobs/${id}`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(API, options);
    if (response.ok === true) {
      const jobDetailsData = await response.json();
      console.log(jobDetailsData);
      const updatedJobDetails = {
        companyLogoUrl: jobDetailsData.job_details.company_logo_url,
        id: jobDetailsData.job_details.id,
        companyWebsiteUrl: jobDetailsData.job_details.company_website_url,
        employmentType: jobDetailsData.job_details.employment_type,
        jobDescription: jobDetailsData.job_details.job_description,
        lifeAtCompanyDescription:
          jobDetailsData.job_details.life_at_company.description,
        lifeAtCompanyImageUrl:
          jobDetailsData.job_details.life_at_company.image_url,
        location: jobDetailsData.job_details.location,
        packagePerAnnum: jobDetailsData.job_details.package_per_annum,
        skills: jobDetailsData.job_details.skills,
        title: jobDetailsData.job_details.title,
      };
      const updatedSimilarJobs = jobDetailsData.similar_jobs.map((eachJob) => ({
        companyLogoUrl: eachJob.company_logo_url,
        id: eachJob.id,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        title: eachJob.title,
      }));
      this.setState({
        apiStatus: jobDetailsAPIStatusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobsList: updatedSimilarJobs,
      });
    } else {
      this.setState({ apiStatus: jobDetailsAPIStatusConstants.failure });
    }
  };

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  );

  renderJobDetailsSucessView = () => {
    const { jobDetails } = this.state;
    return (
      <ul className="unorderlist-container">
        <JobDetails eachJob={jobDetails} />
      </ul>
    );
  };

  renderJobDetailsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something went Wrong</h1>
      <p className="reason">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        retry
      </button>
      /
    </>
  );

  renderJobDetailsAPIStatusViews = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case jobDetailsAPIStatusConstants.progress:
        return this.renderLoadingView();
      case jobDetailsAPIStatusConstants.success:
        return this.renderJobDetailsSucessView();
      case jobDetailsAPIStatusConstants.failure:
        return this.renderJobDetailsFailureView();
      default:
        return null;
    }
  };

  render() {
    const { similarJobsList } = this.state;
    return (
      <>
        <Header />
        <div className="jobs-details-container">
          {this.renderJobDetailsAPIStatusViews()}
          <h1 className="similar-jobs-text">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobsList.map((eachSimilarJob) => (
              <SimilarJobs
                key={eachSimilarJob.id}
                similarJobDetails={eachSimilarJob}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}
export default withRouter(JobDetailsList);
