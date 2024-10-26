import InfoSection from '../InfoSection'
import Navbar from '../Navbar'
import NewContentSection from '../NewContentSection'
import SourceDashboard from '../SourceDashboard'


function Homepage() {


  return (
  
  <>
      <div>
      <Navbar />
      <SourceDashboard />
      <InfoSection />
      <NewContentSection />
      {/* Other content */}
    </div>

 
  </>
  
  )
}

export default Homepage
