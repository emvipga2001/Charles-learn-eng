
import Image from 'next/image'
import React from 'react'
import fireworksImg from "$root/public/fireworks.gif";

export default function CongratulationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen0">
      <div className="max-w-md w-full shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <div className="mt-8">
          <Image
            src={fireworksImg}
            alt="Fireworks"
            className="w-full"
            height={100} width={100}
          />
        </div>
      </div>
    </div>
  )
}

