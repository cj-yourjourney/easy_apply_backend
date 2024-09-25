// src/components/Forms/Profiles/UserSkillForm.tsx
import React from 'react'
import { Form as BootstrapForm } from 'react-bootstrap'
import Input from '../Input'
import CustomButton from '../../common/Button'

interface UserSkillFormProps {
  skills: string[]
  onChange: (index: number, value: string) => void
  onAddSkill: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const UserSkillForm: React.FC<UserSkillFormProps> = ({
  skills,
  onChange,
  onAddSkill,
  onSubmit
}) => {
  return (
    <BootstrapForm onSubmit={onSubmit}>
      {skills.map((skill, index) => (
        <Input
          key={index}
          id={`skill-${index}`}
          name={`skill-${index}`}
          type="text"
          label={`Skill ${index + 1}`}
          value={skill}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder="Enter a skill"
          required
        />
      ))}
      <CustomButton variant="secondary" onClick={onAddSkill} type="button">
        Add Another Skill
      </CustomButton>
      <CustomButton variant="primary" type="submit">
        Save Skills
      </CustomButton>
    </BootstrapForm>
  )
}

export default UserSkillForm
