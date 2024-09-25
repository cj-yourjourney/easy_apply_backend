import { useState } from 'react'
import { initialWorkExperience, WorkExperience } from '../../components/Forms/Profiles/WorkExperienceForm'
  

const useFormArray = () => {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    initialWorkExperience
  ])

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedExperiences = [...workExperiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    }
    setWorkExperiences(updatedExperiences)
  }

  const handleAddExperience = () => {
    setWorkExperiences([...workExperiences, initialWorkExperience])
  }

  const handleRemoveExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index))
  }

  return {
    workExperiences,
    handleExperienceChange,
    handleAddExperience,
    handleRemoveExperience
  }
}

export default useFormArray
