import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import WorkExperienceForm from '../../components/Forms/Profiles/WorkExperienceForm'
import FormContainer from '../../components/Forms/FormContainer'
import StatusDisplay from '../../components/common/StatusDisplay'
import CustomButton from '../../components/common/Button'
import { createWorkExperiences } from '../../store/workExperience/workExperienceThunks'
import useFormArray from '../../utils/hooks/useFormArray'

const WorkExperience: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const workExperienceState = useSelector(
    (state: RootState) => state.workExperienceCreate
  )

  const {
    workExperiences,
    handleExperienceChange,
    handleAddExperience,
    handleRemoveExperience
  } = useFormArray()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formattedExperiences = workExperiences.map((experience) => ({
      ...experience,
      start_year: Number(experience.start_year),
      end_year: Number(experience.end_year)
    }))
    dispatch(createWorkExperiences(formattedExperiences))
  }

  return (
    <FormContainer>
      <h1>Work Experiences</h1>
      <StatusDisplay
        loading={workExperienceState.loading}
        error={workExperienceState.error}
        successMessage={
          workExperienceState.workExperiences?.length
            ? 'Work Experiences saved successfully!'
            : undefined
        }
      />
      <form onSubmit={handleSubmit}>
        {workExperiences.map((experience, index) => (
          <WorkExperienceForm
            key={index}
            experience={experience}
            onChange={(e) =>
              handleExperienceChange(index, e.target.name, e.target.value)
            }
            onRemove={() => handleRemoveExperience(index)}
          />
        ))}

        <CustomButton type="button" onClick={handleAddExperience}>
          Add Another Experience
        </CustomButton>

        <CustomButton type="submit">Submit Work Experiences</CustomButton>
      </form>
    </FormContainer>
  )
}

export default WorkExperience
