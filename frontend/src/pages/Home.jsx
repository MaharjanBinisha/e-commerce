import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import RecommendedSection from '../components/RecommendedSection'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <RecommendedSection/>
      <BestSeller/>
      <OurPolicy/>
    </div>
  )
}

export default Home