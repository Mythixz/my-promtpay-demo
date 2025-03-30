'use client'

import { useSearchParams } from 'next/navigation'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const chargeId = searchParams.get('charge')

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">ชำระเงินสำเร็จ 🎉</h1>
      <p className="text-gray-700">ขอบคุณสำหรับการชำระเงินผ่าน PromptPay</p>
      {chargeId && (
        <p className="mt-2 text-sm text-gray-500">
          หมายเลขรายการ (Charge ID): {chargeId}
        </p>
      )}
    </main>
  )
}
