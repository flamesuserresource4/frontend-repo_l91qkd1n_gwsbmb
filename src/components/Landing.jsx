import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.15),transparent_40%)]" />
      <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-emerald-300 font-bold">LM</div>
          <span className="text-white text-xl font-semibold">GreenBlade Lawn Care</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-emerald-100/80">
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#areas" className="hover:text-white transition-colors">Service Areas</a>
        </nav>
        <Link to="/quote" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-emerald-900 font-semibold px-4 py-2 rounded-lg transition-colors">Get a Quote</Link>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Reliable Lawn Mowing,
            <br />
            Transparent Pricing.
          </h1>
          <p className="mt-6 text-emerald-100/90 text-lg max-w-xl">
            Book professional lawn mowing in minutes. Instant quote based on your lawn size and schedule preferences.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/quote" className="bg-white text-emerald-900 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-100 transition-colors">Get Instant Quote</Link>
            <a href="#services" className="px-6 py-3 rounded-xl border border-emerald-300/30 text-white hover:bg-white/10 transition-colors">View Services</a>
          </div>
          <div className="mt-8 text-emerald-200/80 text-sm">
            No hidden fees • Licensed & insured • Satisfaction guaranteed
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-300/20 flex items-center justify-center text-white text-2xl">
            Your lawn, our care 🌿
          </div>
          <ul className="mt-6 space-y-3 text-emerald-100/90">
            <li>• Weekly or biweekly schedules</li>
            <li>• Edging and leaf cleanup options</li>
            <li>• Simple online booking</li>
          </ul>
        </div>
      </main>

      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Simple pricing</h2>
        <p className="text-emerald-100/80 mb-6">Base rate from $30, calculated by lawn size. Extras available.</p>
        <Link to="/quote" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-emerald-900 font-semibold px-5 py-3 rounded-lg transition-colors">Calculate My Price</Link>
      </section>
    </div>
  )
}

export default Landing
