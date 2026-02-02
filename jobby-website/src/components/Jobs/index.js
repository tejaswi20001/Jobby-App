import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { BsSearch } from "react-icons/bs";
import JobsList from "../JobsList";
import Header from "../Header";
import "./index.css";

const apiStatusConstants = {
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const jobsAPIStatusConstants = {
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const salaryRangesList = [
  { salaryRangeId: "1000000", label: "10 LPA and above" },
  { salaryRangeId: "2000000", label: "20 LPA and above" },
  { salaryRangeId: "3000000", label: "30 LPA and above" },
  { salaryRangeId: "4000000", label: "40 LPA and above" },
];

const employmentTypesList = [
  { label: "Full Time", employmentTypeId: "FULLTIME" },
  { label: "Part Time", employmentTypeId: "PARTTIME" },
  { label: "Freelance", employmentTypeId: "FREELANCE" },
  { label: "Internship", employmentTypeId: "INTERNSHIP" },
];

class Jobs extends Component {
  state = {
    apiStatus: "",
    jobsApiStatus: "",
    profileData: {},
    employmentType: [],
    minimumPackage: salaryRangesList[0].salaryRangeId,
    search: "",
    jobsList: [],
  };

  componentDidMount() {
    this.getProfileData();
    this.getJobsData();
  }

  getProfileData = async () => {
    this.setState({ apiStatus: apiStatusConstants.progress });

    const jwtToken = Cookies.get("jwt_token");
    const profileApiUrl = "https://apis.ccbp.in/profile";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(profileApiUrl, options);

    if (response.ok === true) {
      const data = await response.json();
      const profile = data.profile_details;

      const updatedProfileDetails = {
        profileImageUrl: profile.profile_image_url,
      };

      this.setState({
        apiStatus: apiStatusConstants.success,
        profileData: updatedProfileDetails,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  getJobsData = async () => {
    this.setState({ jobsApiStatus: jobsAPIStatusConstants.progress });
    const jwtToken = Cookies.get("jwt_token");
    const { employmentType, minimumPackage, search } = this.state;
    const employmentTypeParams = employmentType.join(",");
    const JobsAPI = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeParams}&minimum_package=${minimumPackage}&search=${search}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(JobsAPI, options);
    if (response.ok === true) {
      const jobsData = await response.json();
      const updatedJobsList = jobsData.jobs.map((eachJob) => ({
        companyLogoUrl: eachJob.company_logo_url,
        id: eachJob.id,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }));
      this.setState({
        jobsList: updatedJobsList,
        jobsApiStatus: jobsAPIStatusConstants.success,
      });
    } else {
      this.setState({ jobsApiStatus: jobsAPIStatusConstants.failure });
    }
  };

  onChangeSearchInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const { jobsList } = this.state;

    const updatedFilteredJobslist = jobsList.filter((each) =>
      each.title.toLowerCase().includes(searchValue),
    );

    this.setState({
      search: searchValue,
      jobsList: updatedFilteredJobslist,
    });
  };

  onChangeCheckbox = (e) => {
    const { value, checked } = e.target;
    this.setState((prevState) => {
      const updatedEmploymentType = checked
        ? [...prevState.employmentType, value]
        : prevState.employmentType.filter((each) => each !== value);
      return { employmentType: updatedEmploymentType };
    }, this.getJobsData);
  };

  onChangeSelectedRadio = (e) => {
    const { value } = e.target;
    this.setState({ minimumPackage: value }, this.getJobsData);
  };

  handleSearch = () => {
    this.getJobsData();
  };

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  );

  renderSuccessView = () => {
    const { profileData } = this.state;
    const { profileImageUrl } = profileData;

    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="name">Tejaswi Methuku</h1>
        <p className="profile-text">I am a Software Engineer</p>
      </div>
    );
  };

  renderFailureView = () => (
    <button
      className="retry-button"
      type="button"
      onClick={this.getProfileData}
    >
      Retry
    </button>
  );

  renderJobsFailureView = () => (
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
      <button type="button" className="retry-button" onClick={this.getJobsData}>
        retry
      </button>
      /
    </>
  );

  renderJobsSuccessView = () => {
    const { jobsList } = this.state;
    return (
      <ul className="unorderlist-container">
        {jobsList.map((eachJob) => (
          <JobsList key={eachJob.id} eachJobDetails={eachJob} />
        ))}
      </ul>
    );
  };

  renderJobsAPIStatusViews = () => {
    const { jobsApiStatus } = this.state;

    switch (jobsApiStatus) {
      case jobsAPIStatusConstants.progress:
        return this.renderLoadingView();
      case jobsAPIStatusConstants.success:
        return this.renderJobsSuccessView();
      case jobsAPIStatusConstants.failure:
        return this.renderJobsFailureView();
      default:
        return null;
    }
  };

  renderApiStatusViews = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoadingView();
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  renderNoJobsView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-image"
      />
      <h1 className="failure-text">No Jobs Found</h1>
      <p className="reason">We could not find any jobs. Try other filters.</p>/
    </>
  );

  render() {
    const { search, jobsList, employmentType } = this.state;
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div>
            <div className="profile-container">
              {this.renderApiStatusViews()}
              <hr />

              <h1 className="type-of-employment">Type of Employment</h1>
              <ul>
                {employmentTypesList.map((eachListItem) => (
                  <li
                    key={eachListItem.employmentTypeId}
                    className="list-container"
                  >
                    <input
                      type="checkbox"
                      id={eachListItem.employmentTypeId}
                      onChange={this.onChangeCheckbox}
                      checked={employmentType.includes(
                        eachListItem.employmentTypeId,
                      )}
                      value={eachListItem.employmentTypeId}
                    />
                    <label
                      htmlFor={eachListItem.employmentTypeId}
                      className="label-text"
                    >
                      {eachListItem.label}
                    </label>
                  </li>
                ))}
              </ul>

              <hr />

              <h1 className="salary-range">Salary Range</h1>
              <ul>
                {salaryRangesList.map((eachSalaryItem) => (
                  <li
                    key={eachSalaryItem.salaryRangeId}
                    className="list-container"
                  >
                    <input
                      type="radio"
                      id={eachSalaryItem.salaryRangeId}
                      value={eachSalaryItem.salaryRangeId}
                      onChange={this.onChangeSelectedRadio}
                      name="salary"
                    />
                    <label
                      htmlFor={eachSalaryItem.salaryRangeId}
                      className="label-text"
                    >
                      {eachSalaryItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs">
            <div>
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-style"
                  value={search}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  data-testid="searchButton"
                  onClick={this.handleSearch}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <div>
              {jobsList.length > 0
                ? this.renderJobsAPIStatusViews()
                : this.renderNoJobsView()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Jobs;
