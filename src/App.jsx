import { Routes, Route, Link } from 'react-router-dom'
import Landing from './components/Landing'
import QuoteCalculator from './components/QuoteCalculator'
import Booking from './components/Booking'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quote" element={<QuoteCalculator />} />
        <Route path="/book" element={<Booking />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-emerald-50">
            <div className="text-center">
              <p className="text-emerald-800 mb-4">Page not found</p>
              <Link to="/" className="text-emerald-700 underline">Go Home</Link>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App
