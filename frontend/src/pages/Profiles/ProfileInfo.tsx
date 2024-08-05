// src/components/ProfileInfo.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { createProfile } from '../../store/profiles/profileThunks'
import ProfileInfoForm from '../../components/Forms/Profiles/ProfileInfoForm'
import Loader from '../../components/common/Loader'
import Message from '../../components/common/Message'
import FormContainer from '../../components/Forms/FormContainer'

const ProfileInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const profileState = useSelector((state: RootState) => state.profileCreate)

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitting Profile Data:', profileData)
    dispatch(createProfile(profileData))
  }

  return (
   
      <FormContainer>
        <h1>Basic Info</h1>
        {profileState.loading && <Loader />}
        {profileState.error && (
          <Message variant="error">Error: {profileState.error}</Message>
        )}
        {profileState.profile && (
          <Message variant="success">Profile created successfully!</Message>
        )}
        <ProfileInfoForm
          profileData={profileData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </FormContainer>
    
  )
}

export default ProfileInfo
