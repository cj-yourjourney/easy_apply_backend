// src/components/UserSkill.tsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import UserSkillForm from '../../components/Forms/Profiles/UserSkillForm'
import FormContainer from '../../components/Forms/FormContainer'
import StatusDisplay from '../../components/common/StatusDisplay'
import { createUserSkills } from '../../store/skills/skillThunks'
import useFormSkills from '../../utils/hooks/useFormSkills'

const UserSkill: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const skillState = useSelector((state: RootState) => state.skillCreate)

  const { skills, handleSkillChange, handleAddSkill } = useFormSkills()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const skillsPayload = { skills }
    console.log(skillsPayload)
    dispatch(createUserSkills(skillsPayload))
  }

  return (
    <FormContainer>
      <h1>User Skills</h1>
      <StatusDisplay
        loading={skillState.loading}
        error={skillState.error}
        successMessage={
          skillState.skills.length > 0
            ? 'Skills saved successfully!'
            : undefined
        }
      />
      <UserSkillForm
        skills={skills}
        onChange={handleSkillChange}
        onAddSkill={handleAddSkill}
        onSubmit={handleSubmit}
      />
    </FormContainer>
  )
}

export default UserSkill
