import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orderId, paymentId, items, totalAmount, shippingDetails } = body

    // Format item details line by line
    const itemLines = items
      .map(
        (item: any) =>
          `• ${item.product.name} — Qty: ${item.quantity} — ₹${(
            item.product.price * item.quantity
          ).toLocaleString('en-IN')}`
      )
      .join('\n')

    // Construct clean email content
    const emailBody = `
📦 NEW ORDER RECEIVED!

========================================
1. ORDER SUMMARY
========================================
Order ID: ${orderId}
Payment ID: ${paymentId}
Total Paid: ₹${totalAmount.toLocaleString('en-IN')}

========================================
2. ITEMS TO PACK & SHIP
========================================
${itemLines}

========================================
3. CUSTOMER & SHIPPING DETAILS
========================================
Full Name: ${shippingDetails.fullName}
Phone Number: ${shippingDetails.phone}
Email: ${shippingDetails.email || 'N/A'}

Shipping Address:
${shippingDetails.address}
${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}

========================================
`

    await resend.emails.send({
      from: 'Ishira Homeware <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL!],
      subject: `🛍️ New Order from ${shippingDetails.fullName}`,
      text: emailBody,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email Dispatch Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}