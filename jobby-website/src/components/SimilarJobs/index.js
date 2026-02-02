import { IoLocationSharp } from "react-icons/io5";
import { BsBriefcaseFill } from "react-icons/bs";
import "./index.css";

const SimilarJobs = (props) => {
  const { similarJobDetails } = props;
  const { companyLogoUrl, employmentType, jobDescription, location, title } =
    similarJobDetails;
  return (
    <li className="similar-jobs-list-container">
      <div className="title-logo-container">
        <div>
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="image-style"
          />
        </div>
        <div>
          <h1 className="jobs-title">{title}</h1>
        </div>
      </div>
      <p className="description-text">Description</p>
      <p className="text">{jobDescription}</p>
      <div className="location-text-container">
        <div className="container">
          <IoLocationSharp />
          <p className="text">{location}</p>
          <BsBriefcaseFill />
          <p className="text">{employmentType}</p>
        </div>
      </div>
    </li>
  );
};

export default SimilarJobs;
