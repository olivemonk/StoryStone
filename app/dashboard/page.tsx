import React from 'react'
import DashboardHeader from './_components/dashboard-header'
import UserStoryList from './_components/user-story-list'

const DashboardPage = () => {
  return (
    <div className='p-10 md:px-20 lg:px-40 min-h-screen'>
      <DashboardHeader/>
      <UserStoryList/>
    </div>
  )
}

export default DashboardPage