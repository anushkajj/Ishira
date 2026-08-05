'use client'

import React, { useState } from 'react'
import { X, Truck } from 'lucide-react'

export interface ShippingDetails {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
}

interface ShippingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (details: ShippingDetails) => void
  subtotal: number
}

export function ShippingModal({ isOpen, onClose, onSubmit, subtotal }: ShippingModalProps) {
  // Hardcoded location values
  const fixedCity = 'Bengaluru'
  const fixedState = 'Karnataka'

  const [form, setForm] = useState<ShippingDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: fixedCity,
    state: fixedState,
    pincode: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ensure fixed city & state are always sent on submit
    onSubmit({
      ...form,
      city: fixedCity,
      state: fixedState,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-background border border-border w-full max-w-lg rounded-lg shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-sand/30">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-terracotta" />
            <h3 className="font-serif text-xl text-foreground">Shipping Details</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-xs">
          <div>
            <label className="block text-muted-foreground mb-1">Full Name *</label>
            <input
              required
              type="text"
              className="w-full p-2.5 bg-card border border-border rounded-xs text-foreground focus:outline-none focus:border-terracotta"
              placeholder="e.g. Priya Sharma"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground mb-1">Phone Number *</label>
              <input
                required
                type="tel"
                className="w-full p-2.5 bg-card border border-border rounded-xs text-foreground focus:outline-none focus:border-terracotta"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">Email (Optional)</label>
              <input
                type="email"
                className="w-full p-2.5 bg-card border border-border rounded-xs text-foreground focus:outline-none focus:border-terracotta"
                placeholder="priya@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground mb-1">Flat / Street / House No. *</label>
            <textarea
              required
              rows={2}
              className="w-full p-2.5 bg-card border border-border rounded-xs text-foreground focus:outline-none focus:border-terracotta"
              placeholder="e.g. Flat 402, Green Acres Apartment, Indiranagar"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-muted-foreground mb-1">City</label>
              {/* Static non-editable Box */}
              <div className="w-full p-2.5 bg-muted/60 border border-border/80 rounded-xs text-foreground font-medium select-none cursor-not-allowed">
                {fixedCity}
              </div>
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">State</label>
              {/* Static non-editable Box */}
              <div className="w-full p-2.5 bg-muted/60 border border-border/80 rounded-xs text-foreground font-medium select-none cursor-not-allowed">
                {fixedState}
              </div>
            </div>
            <div>
              <label className="block text-muted-foreground mb-1">Pincode *</label>
              <input
                required
                type="text"
                className="w-full p-2.5 bg-card border border-border rounded-xs text-foreground focus:outline-none focus:border-terracotta"
                placeholder="560038"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-foreground text-background hover:bg-terracotta font-sans text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            Continue to Pay ₹{subtotal.toLocaleString('en-IN')}
          </button>
        </form>
      </div>
    </div>
  )
}