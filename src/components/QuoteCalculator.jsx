import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EXTRA_PRICES = {
  edging: 10,
  leaf_cleanup: 20,
  pet_waste: 8,
}

function QuoteCalculator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    zip_code: '',
    lawn_size_sqft: 1000,
    frequency: 'weekly',
    extras: [],
  })
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const toggleExtra = (key) => {
    setForm((f) => {
      const has = f.extras.includes(key)
      return { ...f, extras: has ? f.extras.filter(e => e !== key) : [...f.extras, key] }
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create quote')
      const data = await res.json()
      setQuote(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const proceedToBook = () => {
    navigate('/book', { state: { form, quote } })
  }

  const pricePreview = () => {
    const base = Math.max(30, form.lawn_size_sqft * 0.02)
    const extras = form.extras.reduce((a, k) => a + (EXTRA_PRICES[k] || 0), 0)
    const freqDiscount = { once: 0, biweekly: 0.05, weekly: 0.10 }[form.frequency] || 0
    const discount = base * freqDiscount
    const total = base - discount + extras + 3.99
    return { base, extras, discount, total }
  }

  const preview = pricePreview()

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-emerald-900">Instant Quote</h1>
        <p className="text-emerald-700 mb-6">Enter your details to calculate your price.</p>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <input className="border rounded-lg p-3" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <input className="border rounded-lg p-3" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <input className="border rounded-lg p-3 md:col-span-2" placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} required />
          <input className="border rounded-lg p-3" placeholder="ZIP code" value={form.zip_code} onChange={e=>setForm({...form,zip_code:e.target.value})} required />
          <div>
            <label className="block text-sm text-emerald-800 mb-1">Lawn size (sqft)</label>
            <input type="number" min={100} className="border rounded-lg p-3 w-full" value={form.lawn_size_sqft} onChange={e=>setForm({...form,lawn_size_sqft:parseInt(e.target.value||'0')})} required />
          </div>
          <div>
            <label className="block text-sm text-emerald-800 mb-1">Frequency</label>
            <select className="border rounded-lg p-3 w-full" value={form.frequency} onChange={e=>setForm({...form,frequency:e.target.value})}>
              <option value="once">One-time</option>
              <option value="biweekly">Biweekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-emerald-800 mb-2">Extras</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(EXTRA_PRICES).map(([k, v]) => (
                <button type="button" key={k} onClick={()=>toggleExtra(k)} className={`px-3 py-2 rounded-full border ${form.extras.includes(k)?'bg-emerald-600 text-white border-emerald-600':'border-emerald-300 text-emerald-800 hover:bg-emerald-50'}`}>
                  {k.replace('_',' ')} (+${v})
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <h3 className="font-semibold text-emerald-900 mb-2">Price breakdown</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-emerald-800">
              <div>Base: ${preview.base.toFixed(2)}</div>
              <div>Extras: ${preview.extras.toFixed(2)}</div>
              <div>Discount: -${preview.discount.toFixed(2)}</div>
              <div>Service fee: $3.99</div>
              <div className="sm:col-span-2 font-bold text-emerald-900">Total: ${preview.total.toFixed(2)}</div>
            </div>
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-lg font-semibold disabled:opacity-60">
              {loading? 'Calculating...' : 'Save Quote'}
            </button>
            {quote && (
              <button type="button" onClick={proceedToBook} className="bg-emerald-100 text-emerald-900 px-5 py-3 rounded-lg border border-emerald-300">
                Continue to Booking
              </button>
            )}
          </div>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {quote && (
          <div className="mt-6 text-sm text-emerald-700">
            Quote saved. ID: <span className="font-mono">{quote.id}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteCalculator
