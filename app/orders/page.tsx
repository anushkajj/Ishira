'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Package, CheckCircle2, ArrowLeft } from 'lucide-react'

interface OrderItem {
  product: {
    id: string
    name: string
    category: string
    price: number
    imageSrc: string
  }
  quantity: number
}

interface Order {
  id: string
  paymentId: string
  date: string
  items: OrderItem[]
  totalAmount: number
  status: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('my_orders') || '[]')
    setOrders(savedOrders)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-sans text-sm text-muted-foreground">Loading your orders...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-sans text-muted-foreground hover:text-foreground mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Shop
            </Link>
            <h1 className="font-serif text-3xl font-light text-foreground">My Orders</h1>
          </div>
          <span className="px-3 py-1 bg-sand/60 text-foreground font-sans text-xs rounded-full">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-4 border border-dashed border-border rounded-lg">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-light text-foreground">No orders found</h2>
            <Link
              href="/"
              className="mt-2 px-6 py-3 bg-foreground text-background hover:bg-terracotta font-sans text-xs font-medium uppercase tracking-widest transition-colors duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-xs"
              >
                {/* Order Summary Header */}
                <div className="bg-sand/30 p-4 sm:p-6 border-b border-border flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Order Placed</p>
                    <p className="font-medium text-foreground">{order.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="font-semibold text-foreground">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Payment ID</p>
                    <p className="font-mono text-[11px] text-foreground">{order.paymentId}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-medium rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="p-4 sm:p-6 divide-y divide-border/60">
                  {order.items.map((item, index) => (
                    <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                      <div className="relative w-16 h-20 bg-sand/40 border border-border/60 rounded-xs overflow-hidden shrink-0">
                        <Image
                          src={item.product.imageSrc}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <div>
                          <h3 className="font-serif text-base text-foreground font-normal">
                            {item.product.name}
                          </h3>
                          <p className="font-sans text-xs text-muted-foreground">
                            Category: {item.product.category}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground mt-1">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-sans text-sm font-semibold text-foreground">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}