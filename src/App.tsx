
import './App.css'
import InfoSection from './components/InfoSection'
import Navbar from './components/Navbar'
import NewContentSection from './components/NewContentSection'
import SourceDashboard from './components/SourceDashboard'

function App() {


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

export default App
