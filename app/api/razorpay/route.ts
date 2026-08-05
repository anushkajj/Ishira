import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
    try {
        const { amount, currency = 'INR' } = await req.json()

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
        }

        const options = {
            // Convert INR amount to paise (e.g. ₹500 = 50000 paise)
            amount: Math.round(amount * 100),
            currency,
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        })
    } catch (error: any) {
        console.error('Razorpay Order Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 500 }
        )
    }
}