import React, { useState } from 'react';
import axios from 'axios';
import './ResumeCreate.css'; // Make sure to import your CSS file

const ResumeCreate = () => {
  const [formData, setFormData] = useState({
    profile: {
      bio: '',
      headline: '',
      location: ''
    },
    contact: {
      phone: '',
      address: '',
      website: '',
      github: '',
      linkedin: ''
    },
    education: {
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: ''
    },
    skill: {
      name: '',
      level: ''
    },
    project: {
      title: '',
      description: '',
      link: ''
    },
    experience: {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = 'your_actual_jwt_token_here'; // Replace with actual token
      const response = await axios.post('http://localhost:4000/resume', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Resume created:', response.data);
      alert('Resume submitted successfully!');
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Failed to submit resume');
    }
  };

  return (
    <form className="resume-form-container" onSubmit={handleSubmit}>
      <h2>Create Resume</h2>

      <h3>Profile</h3>
      <input type="text" placeholder="Bio" onChange={(e) => handleChange('profile', 'bio', e.target.value)} />
      <input type="text" placeholder="Headline" onChange={(e) => handleChange('profile', 'headline', e.target.value)} />
      <input type="text" placeholder="Location" onChange={(e) => handleChange('profile', 'location', e.target.value)} />

      <h3>Contact</h3>
      <input type="text" placeholder="Phone" onChange={(e) => handleChange('contact', 'phone', e.target.value)} />
      <input type="text" placeholder="Address" onChange={(e) => handleChange('contact', 'address', e.target.value)} />
      <input type="text" placeholder="Website" onChange={(e) => handleChange('contact', 'website', e.target.value)} />
      <input type="text" placeholder="GitHub" onChange={(e) => handleChange('contact', 'github', e.target.value)} />
      <input type="text" placeholder="LinkedIn" onChange={(e) => handleChange('contact', 'linkedin', e.target.value)} />

      <h3>Education</h3>
      <input type="text" placeholder="Institution" onChange={(e) => handleChange('education', 'institution', e.target.value)} />
      <input type="text" placeholder="Degree" onChange={(e) => handleChange('education', 'degree', e.target.value)} />
      <input type="text" placeholder="Field" onChange={(e) => handleChange('education', 'field', e.target.value)} />
      <input type="text" placeholder="Start Year" onChange={(e) => handleChange('education', 'startYear', e.target.value)} />
      <input type="text" placeholder="End Year" onChange={(e) => handleChange('education', 'endYear', e.target.value)} />

      <h3>Skill</h3>
      <input type="text" placeholder="Skill Name" onChange={(e) => handleChange('skill', 'name', e.target.value)} />
      <input type="text" placeholder="Skill Level" onChange={(e) => handleChange('skill', 'level', e.target.value)} />

      <h3>Project</h3>
      <input type="text" placeholder="Project Title" onChange={(e) => handleChange('project', 'title', e.target.value)} />
      <input type="text" placeholder="Project Description" onChange={(e) => handleChange('project', 'description', e.target.value)} />
      <input type="text" placeholder="Project Link" onChange={(e) => handleChange('project', 'link', e.target.value)} />

      <h3>Experience</h3>
      <input type="text" placeholder="Company" onChange={(e) => handleChange('experience', 'company', e.target.value)} />
      <input type="text" placeholder="Position" onChange={(e) => handleChange('experience', 'position', e.target.value)} />
      <input type="date" placeholder="Start Date" onChange={(e) => handleChange('experience', 'startDate', e.target.value)} />
      <input type="date" placeholder="End Date" onChange={(e) => handleChange('experience', 'endDate', e.target.value)} />
      <input type="text" placeholder="Description" onChange={(e) => handleChange('experience', 'description', e.target.value)} />

      <button type="submit">Submit Resume</button>
    </form>
  );
};

export default ResumeCreate;
