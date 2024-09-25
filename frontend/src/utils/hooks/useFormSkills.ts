// src/hooks/useFormSkills.ts
import { useState } from 'react'

const useFormSkills = () => {
  const [skills, setSkills] = useState<string[]>([''])

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    setSkills(updatedSkills)
  }

  const handleAddSkill = () => {
    setSkills([...skills, ''])
  }

  return {
    skills,
    handleSkillChange,
    handleAddSkill
  }
}

export default useFormSkills
