import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './index.css'

function App() {


  return (
    <>
       <Router>
      <div className="app">
        <Routes>
          {/* Route to the Dashboard page */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
