import { IoLocationSharp } from "react-icons/io5";
import { BsBriefcaseFill, BsArrowRight } from "react-icons/bs";
import "./index.css";

const JobDetails = (props) => {
  const { eachJob } = props;
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    lifeAtCompanyDescription,
    lifeAtCompanyImageUrl,
    location,
    packagePerAnnum,
    skills,
    title,
  } = eachJob;

  const onClickVisit = () => {
    window.open(companyWebsiteUrl, "_blank");
  };

  return (
    <li className="job-details-list-container">
      <div className="title-logo-container">
        <div>
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
      <button type="button" onClick={onClickVisit}>
        <div className="comapny-visit-container">
          <div>
            <p className="visit-text">Visit</p>
          </div>
          <div>
            <BsArrowRight style={{ color: "#6366f1" }} />
          </div>
        </div>
      </button>

      <p className="description-text">Description</p>
      <p className="text">{jobDescription}</p>
      <p className="description-text">Skills</p>
      <ul className="skills-container">
        {skills.map((eachSkill) => (
          <li className="skills-logo-container" key={eachSkill.name}>
            <div>
              <img
                src={eachSkill.image_url}
                alt={eachSkill.name}
                className="skills-logo"
              />
            </div>
            <div>
              <p className="text">{eachSkill.name}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="life-at-company-container">
        <div>
          <p className="description-text">Description</p>
          <p className="text">{lifeAtCompanyDescription}</p>
        </div>
        <div>
          <img
            src={lifeAtCompanyImageUrl}
            alt="life at company"
            className="life-at-company-image"
          />
        </div>
      </div>
    </li>
  );
};

export default JobDetails;
