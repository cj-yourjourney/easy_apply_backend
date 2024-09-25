import React from 'react'
import Input from '../Input'
import CustomButton from '../../common/Button'

interface WorkExperienceFormProps {
  experience: WorkExperience
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

export interface WorkExperience {
  job_title: string
  company_name: string
  start_year: string
  end_year: string
  job_description: string
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  experience,
  onChange,
  onRemove
}) => {
  return (
    <div>
      {[
        'job_title',
        'company_name',
        'start_year',
        'end_year',
        'job_description'
      ].map((field) => (
        <Input
          key={field}
          id={field}
          name={field}
          type="text"
          label={field.replace('_', ' ').toUpperCase()}
          value={experience[field as keyof WorkExperience]}
          onChange={onChange}
          required={field !== 'end_year'} // Optional end year
        />
      ))}

      <CustomButton type="button" onClick={onRemove}>
        Remove Experience
      </CustomButton>
    </div>
  )
}

export const initialWorkExperience: WorkExperience = {
  job_title: '',
  company_name: '',
  start_year: '',
  end_year: '',
  job_description: ''
}

export default WorkExperienceForm
