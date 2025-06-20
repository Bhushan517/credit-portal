import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Resume.css";

const API_BASE_URL = "http://localhost:4000";
const TOKEN_EXPIRY_THRESHOLD = 5 * 60 * 1000; 

export default function Resume() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!token || isTokenExpired(token)) {
        handleTokenExpiry();
        return;
      }

      const res = await axios.get(`${API_BASE_URL}/resume`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000, // 10 second timeout
      });

      if (res.data?.resume?.profile) {
        setResumeData(res.data.resume);
      } else {
        setResumeData(null);
        toast.info("No resume data found. Please create your resume.");
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      setError("Failed to load resume data");
      
      if (error.response) {
        if (error.response.status === 401) {
          handleTokenExpiry();
        } else {
          toast.error(`Error: ${error.response.data.message || "Server error"}`);
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now() + TOKEN_EXPIRY_THRESHOLD;
    } catch {
      return true;
    }
  };

  const handleTokenExpiry = () => {
    localStorage.removeItem("authToken");
    toast.warn("Your session has expired. Please log in again.");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleCreateClick = () => {
    navigate("/dashboard/create-resume");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast.info("PDF download feature would be implemented in production");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-content">
          <i className="fas fa-exclamation-triangle error-icon"></i>
          <h1>Unable to Load Resume</h1>
          <p>{error}</p>
          <button className="retry-button" onClick={fetchResume}>
            <i className="fas fa-sync-alt"></i> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="empty-state">
        <div className="empty-content">
          <i className="fas fa-file-alt empty-icon"></i>
          <h1>You don't have a resume yet</h1>
          <p>Create a professional resume to showcase your skills and experience</p>
          <button className="primary-button" onClick={handleCreateClick}>
            <i className="fas fa-plus"></i> Create Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-page">
      <div className="resume-header">
        <h1>My Professional Resume</h1>
        <div className="action-buttons">
          <button className="print-button" onClick={handlePrint}>
            <i className="fas fa-print"></i> Print
          </button>
          <button className="download-button" onClick={handleDownloadPDF}>
            <i className="fas fa-file-pdf"></i> PDF
          </button>
          <button className="edit-button" onClick={handleCreateClick}>
            <i className="fas fa-edit"></i> Edit
          </button>
        </div>
      </div>

      <div className="resume-wrapper">
        <div className="resume-left">
          <ProfileSection profile={resumeData.profile} />
          <ContactSection contact={resumeData.contact} />
          <SkillsSection skills={resumeData.skill} />
        </div>

        <div className="resume-right">
          <ExperienceSection experience={resumeData.experience} />
          <EducationSection education={resumeData.education} />
          <ProjectsSection projects={resumeData.project} />
        </div>
      </div>
    </div>
  );
}

// Sub-components for better organization
const ProfileSection = ({ profile }) => (
  <section className="profile-section">
    <div className="section-header">
      <h2>{profile.headline}</h2>
    </div>
    <p className="profile-bio">{profile.bio}</p>
    <div className="profile-meta">
      <span className="location">
        <i className="fas fa-map-marker-alt"></i> {profile.location}
      </span>
    </div>
  </section>
);

const ContactSection = ({ contact }) => (
  contact && (
    <section className="contact-section">
      <div className="section-header">
        <h3>Contact</h3>
      </div>
      <ul className="contact-list">
        {contact.phone && (
          <li>
            <i className="fas fa-phone"></i>
            <span>{contact.phone}</span>
          </li>
        )}
        {contact.address && (
          <li>
            <i className="fas fa-home"></i>
            <span>{contact.address}</span>
          </li>
        )}
        {contact.website && (
          <li>
            <i className="fas fa-globe"></i>
            <a href={contact.website} target="_blank" rel="noopener noreferrer">
              {contact.website}
            </a>
          </li>
        )}
        {contact.github && (
          <li>
            <i className="fab fa-github"></i>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              {contact.github}
            </a>
          </li>
        )}
        {contact.linkedin && (
          <li>
            <i className="fab fa-linkedin"></i>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              {contact.linkedin}
            </a>
          </li>
        )}
      </ul>
    </section>
  )
);

const SkillsSection = ({ skills }) => (
  skills?.length > 0 && (
    <section className="skills-section">
      <div className="section-header">
        <h3>Skills</h3>
      </div>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index}>
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}</span>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-progress" 
                style={{ width: `${parseInt(skill.level) * 10}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
);

const ExperienceSection = ({ experience }) => (
  experience?.length > 0 && (
    <section className="experience-section">
      <div className="section-header">
        <h3>Professional Experience</h3>
      </div>
      <div className="timeline">
        {experience.map((exp, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4 className="position">{exp.position}</h4>
              <div className="company-info">
                <span className="company">{exp.company}</span>
                <span className="duration">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <p className="job-description">{exp.description}</p>
              {exp.achievements?.length > 0 && (
                <ul className="achievements-list">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
);

const EducationSection = ({ education }) => (
  education?.length > 0 && (
    <section className="education-section">
      <div className="section-header">
        <h3>Education</h3>
      </div>
      <div className="education-list">
        {education.map((edu, index) => (
          <div className="education-item" key={index}>
            <h4 className="degree">{edu.degree} in {edu.field}</h4>
            <div className="education-meta">
              <span className="institution">{edu.institution}</span>
              <span className="education-duration">
                {edu.startYear} - {edu.endYear || "Present"}
              </span>
            </div>
            {edu.gpa && (
              <div className="gpa">
                <strong>GPA:</strong> {edu.gpa}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
);

const ProjectsSection = ({ projects }) => (
  projects?.length > 0 && (
    <section className="projects-section">
      <div className="section-header">
        <h3>Projects</h3>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h4 className="project-title">{project.title}</h4>
            <div className="project-technologies">
              {project.technologies?.join(" • ")}
            </div>
            <p className="project-description">{project.description}</p>
            {project.link && (
              <a 
                href={project.link} 
                className="project-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt"></i> View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
);