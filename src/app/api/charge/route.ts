// app/api/charge/route.ts
import { NextResponse } from 'next/server'
import Omise from 'omise'

const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY!,
  secretKey: process.env.OMISE_SECRET_KEY!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const amount = body.amount // amount in satang (10000 = 100.00 THB)

    const charge = await omise.charges.create({
      amount,
      currency: 'thb',
      source: {
        type: 'promptpay',
        amount,
        currency: 'thb',
      },
      description: 'Test PromptPay Charge',
    })

    return NextResponse.json({
      qrCode: charge.source?.scannable_code?.image?.download_uri || null,
      chargeId: charge.id,
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Omise error:', err.message)
    } else {
      console.error('Unknown error:', err)
    }
  
    return NextResponse.json({ error: 'Error creating charge' }, { status: 500 })
  }
  
}
