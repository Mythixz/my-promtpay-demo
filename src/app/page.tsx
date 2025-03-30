'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const [qrCode, setQrCode] = useState('')
  const [chargeId, setChargeId] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePay = async () => {
    setLoading(true)
    const res = await fetch('/api/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 10000 }),
    })

    const data = await res.json()
    setQrCode(data.qrCode)
    setChargeId(data.chargeId)
    setLoading(false)
  }

  const handleSuccess = () => {
    router.push(`/success?charge=${chargeId}`)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">PromptPay Payment Demo</h1>

      {!qrCode ? (
        <button
          onClick={handlePay}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? 'กำลังสร้าง QR...' : 'จ่ายด้วย PromptPay (100 บาท)'}
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4 font-medium">สแกน QR เพื่อชำระเงิน</p>
          <div className="relative w-64 h-64 mx-auto mb-4">
            <Image
              src={qrCode}
              alt="PromptPay QR"
              fill
              className="object-contain rounded-md"
            />
          </div>

          <button
            onClick={handleSuccess}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ✅ ชำระเงินเสร็จแล้ว
          </button>
        </div>
      )}
    </main>
  )
}
