import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { BsBriefcaseFill } from "react-icons/bs";
import "./index.css";

const JobsList = (props) => {
  const { eachJobDetails } = props;
  const {
    companyLogoUrl,
    id,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    title,
  } = eachJobDetails;
  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobs-list-container">
        <div className="title-logo-container">
          <div>
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="image-style"
            />
          </div>
          <div>
            <h1 className="jobs-title">{title}</h1>
          </div>
        </div>
        <div className="location-text-container">
          <div className="container">
            <IoLocationSharp />
            <p className="text">{location}</p>
            <BsBriefcaseFill />
            <p className="text">{employmentType}</p>
          </div>
          <div>
            <p className="salary-text">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />

        <p className="description-text">Description</p>
        <p className="text">{jobDescription}</p>
      </li>
    </Link>
  );
};

export default JobsList;
