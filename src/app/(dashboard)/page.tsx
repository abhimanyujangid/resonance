"use client";

import { Button } from '@/src/components/ui/button'
import React from 'react'

export default function DashBoardPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1>Dashboard</h1>
      <Button onClick={() => {
        console.log("Button clicked");
      }}>Click Me</Button>
    </div>
  )
}
