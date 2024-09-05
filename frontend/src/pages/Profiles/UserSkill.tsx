// src/components/UserSkill.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { createUserSkills } from '../../store/skills/skillThunks'
import UserSkillForm from '../../components/Forms/Profiles/UserSkillForm'
import Loader from '../../components/common/Loader'
import Message from '../../components/common/Message'
import FormContainer from '../../components/Forms/FormContainer'

const UserSkill: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const skillState = useSelector((state: RootState) => state.skillCreate)

  const {success} = skillState

  console.log('success', success)
  const [skills, setSkills] = useState<string[]>([''])

  const handleSkillChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSkills = [...skills]
    newSkills[index] = e.target.value
    setSkills(newSkills)
  }

  const handleAddSkill = () => {
    setSkills([...skills, ''])
  }

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  // Filter out empty skills
  const filteredSkills = skills.filter((skill) => skill.trim() !== '')

  if (filteredSkills.length > 0) {
    dispatch(createUserSkills({ skills: filteredSkills }))
  } else {
    alert('Please fill out at least one skill')
  }
}


  return (
    <FormContainer>
      <h1>User Skills</h1>
      {skillState.loading && <Loader />}
      {skillState.error && (
        <Message variant="error">Error: {skillState.error}</Message>
      )}
      {skillState.skills.length > 0 && (
        <Message variant="success">Skills saved successfully!</Message>
      )}
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
