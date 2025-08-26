import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function ElementIsLoading({isLoading, className}: {isLoading: boolean, className?: string}) {
  return isLoading &&  (
    <div className={twMerge("w-full h-full blur-lg bg-[length:200%] animate-loading bg-[linear-gradient(-60deg,_transparent_35%,_var(--color-primary-1)_,_transparent_65%)] ", className)}/>
  )
}