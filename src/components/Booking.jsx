import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Booking() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const initial = state?.form || {
    name: '', email: '', address: '', zip_code: '', lawn_size_sqft: 1000, frequency: 'weekly', extras: []
  }
  const quote = state?.quote

  const [form, setForm] = useState({
    ...initial,
    phone: '',
    notes: '',
    preferred_date: '',
    price_total: quote?.total || 0,
  })
  const [loading, setLoading] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        quote_id: quote?.id || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        zip_code: form.zip_code,
        lawn_size_sqft: form.lawn_size_sqft,
        frequency: form.frequency,
        extras: form.extras,
        notes: form.notes || null,
        preferred_date: form.preferred_date || null,
        price_total: form.price_total,
      }
      const res = await fetch(`${backend}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create booking')
      const data = await res.json()
      setConfirmation(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-emerald-900">Book Your Service</h1>
        <p className="text-emerald-700 mb-6">Confirm your details and pick a preferred date.</p>

        {quote && (
          <div className="mb-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <div className="text-emerald-900 font-semibold">Quote Total: ${quote.total.toFixed(2)}</div>
            <div className="text-emerald-800 text-sm">Includes base, extras and fees</div>
          </div>
        )}

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <input className="border rounded-lg p-3" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <input className="border rounded-lg p-3" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <input className="border rounded-lg p-3" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required />
          <input className="border rounded-lg p-3 md:col-span-2" placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} required />
          <input className="border rounded-lg p-3" placeholder="ZIP code" value={form.zip_code} onChange={e=>setForm({...form,zip_code:e.target.value})} required />
          <div>
            <label className="block text-sm text-emerald-800 mb-1">Preferred date</label>
            <input type="date" className="border rounded-lg p-3 w-full" value={form.preferred_date} onChange={e=>setForm({...form,preferred_date:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-emerald-800 mb-1">Total</label>
            <input className="border rounded-lg p-3 w-full" value={form.price_total} onChange={e=>setForm({...form,price_total:parseFloat(e.target.value||'0')})} />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-lg font-semibold disabled:opacity-60">
              {loading? 'Booking...' : 'Confirm Booking'}
            </button>
            <button type="button" onClick={()=>navigate('/quote')} className="px-5 py-3 rounded-lg border border-emerald-300 text-emerald-900 bg-emerald-100">Back</button>
          </div>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {confirmation && (
          <div className="mt-6 bg-white border border-emerald-200 rounded-xl p-4">
            <h3 className="text-emerald-900 font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-emerald-800">We emailed a confirmation to {confirmation.email}.</p>
            <p className="text-emerald-800 text-sm mt-2">Booking ID: <span className="font-mono">{confirmation.id}</span></p>
            <button className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white" onClick={()=>navigate('/')}>Go Home</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Booking
