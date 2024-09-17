import React from 'react'
import Input from '../Input'

interface WorkExperienceFormProps {
  experience: {
    job_title: string
    company_name: string
    start_year: string
    end_year: string
    job_description: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  experience,
  onChange,
  onRemove
}) => {
  return (
    <div>
      <Input
        id="job_title"
        name="job_title"
        type="text"
        label="Job Title"
        value={experience.job_title}
        onChange={onChange}
        required
      />
      <Input
        id="company_name"
        name="company_name"
        type="text"
        label="Company Name"
        value={experience.company_name}
        onChange={onChange}
        required
      />
      <Input
        id="start_year"
        name="start_year"
        type="text"
        label="Start Year"
        value={experience.start_year}
        onChange={onChange}
        required
      />
      <Input
        id="end_year"
        name="end_year"
        type="text"
        label="End Year"
        value={experience.end_year}
        onChange={onChange}
      />
      <Input
        id="job_description"
        name="job_description"
        type="text"
        label="Job Description"
        value={experience.job_description}
        onChange={onChange}
        required
      />
      <button type="button" onClick={onRemove}>
        Remove Experience
      </button>
    </div>
  )
}

export default WorkExperienceForm
