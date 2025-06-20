import React, { useState } from 'react';
import axios from 'axios';
import './ResumeCreate.css';

const ResumeCreate = () => {
  const [formData, setFormData] = useState({
    profile: { bio: '', headline: '', location: '' },
    Contact: { phone: '', address: '', website: '', github: '', linkedin: '' },
    Education: { institution: '', degree: '', field: '', startYear: '', endYear: '' },
    Skill: { name: '', level: '' },
    Project: { title: '', description: '', link: '' },
    Experience: { company: '', position: '', startDate: '', endDate: '', description: '' }
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlNTg1OTIyLTZjZjctNDYwZC05N2NmLWM3MDEyZWM1NDgzNiIsImVtYWlsIjoiYmh1c2hhbjIzMUBnbWFpbC5jb20iLCJpYXQiOjE3NTA0MDIwNjQsImV4cCI6MTc1MDQ4ODQ2NH0.rGslivUfG_nfo4Oji3bhMCu7R1wkc1rqV4GalMqgP1s'; // Replace with real token
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
      <input type="text" placeholder="Phone" onChange={(e) => handleChange('Contact', 'phone', e.target.value)} />
      <input type="text" placeholder="Address" onChange={(e) => handleChange('Contact', 'address', e.target.value)} />
      <input type="text" placeholder="Website" onChange={(e) => handleChange('Contact', 'website', e.target.value)} />
      <input type="text" placeholder="GitHub" onChange={(e) => handleChange('Contact', 'github', e.target.value)} />
      <input type="text" placeholder="LinkedIn" onChange={(e) => handleChange('Contact', 'linkedin', e.target.value)} />

      <h3>Education</h3>
      <input type="text" placeholder="Institution" onChange={(e) => handleChange('Education', 'institution', e.target.value)} />
      <input type="text" placeholder="Degree" onChange={(e) => handleChange('Education', 'degree', e.target.value)} />
      <input type="text" placeholder="Field" onChange={(e) => handleChange('Education', 'field', e.target.value)} />
      <input type="text" placeholder="Start Year" onChange={(e) => handleChange('Education', 'startYear', e.target.value)} />
      <input type="text" placeholder="End Year" onChange={(e) => handleChange('Education', 'endYear', e.target.value)} />

      <h3>Skill</h3>
      <input type="text" placeholder="Skill Name" onChange={(e) => handleChange('Skill', 'name', e.target.value)} />
      <input type="text" placeholder="Skill Level" onChange={(e) => handleChange('Skill', 'level', e.target.value)} />

      <h3>Project</h3>
      <input type="text" placeholder="Project Title" onChange={(e) => handleChange('Project', 'title', e.target.value)} />
      <input type="text" placeholder="Project Description" onChange={(e) => handleChange('Project', 'description', e.target.value)} />
      <input type="text" placeholder="Project Link" onChange={(e) => handleChange('Project', 'link', e.target.value)} />

      <h3>Experience</h3>
      <input type="text" placeholder="Company" onChange={(e) => handleChange('Experience', 'company', e.target.value)} />
      <input type="text" placeholder="Position" onChange={(e) => handleChange('Experience', 'position', e.target.value)} />
      <input type="date" onChange={(e) => handleChange('Experience', 'startDate', e.target.value)} />
      <input type="date" onChange={(e) => handleChange('Experience', 'endDate', e.target.value)} />
      <input type="text" placeholder="Description" onChange={(e) => handleChange('Experience', 'description', e.target.value)} />

      <button type="submit">Submit Resume</button>
    </form>
  );
};

export default ResumeCreate;
