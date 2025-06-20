import { useNavigate } from "react-router-dom";
import "./Resume.css";

export default function Resume() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/dashboard/create-resume");
  };

  return (
    <div className="resume-container">
      <h1 className="resume-title">My Resume</h1>

      <button className="create-button" onClick={handleCreateClick}>
        Create Resume
      </button>
    </div>
  );
}
