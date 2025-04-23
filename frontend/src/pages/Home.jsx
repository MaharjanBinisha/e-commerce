import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import RecommendedSection from '../components/RecommendedSection'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <RecommendedSection/>
      <BestSeller/>
     
    </div>
  )
}

export default Home