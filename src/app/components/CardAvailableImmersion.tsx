/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import ButtonSubscribe from './shared/ButtonSubscribe'

type CardAvailableImmersionProps = {
  title: string,
  dateIni: string,
  dateEnd: string,
  presenceState: string,
  status: string
}

export default function CardAvailableImmersion({ title, dateIni, dateEnd, presenceState, status }: CardAvailableImmersionProps){
  return (
    <div className='w-full max-w-[480px] bg-primary-1 rounded-[20px] text-white drop-shadow-[10px_10px_4px] drop-shadow-black/25 overflow-hidden'>
        <header className='bg-primary-4 py-4 px-6 rounded-b-[20px]'>
          <div className='flex justify-end pb-2'>
            <ButtonSubscribe status={status}/>
          </div>
          <div className='text-[20px] sm:text-[24px] max-w-[320px] underline'>
            {title}
          </div>
        </header>
        <article className='flex flex-col gap-3 px-6 py-3 text-[14px] sm:text-[18px]'>
          {/* <p>Data: {dateIni} a {dateEnd}</p>
          <div className='bg-white w-full h-[1px]'/>
          <div className='flex items-center gap-2'>
            <p>Status de presença:</p>
            <span className={`${presenceState === "Em andamento" ? 'bg-[#D0A30F]/81 text-[#FFEA74]' : 'bg-[#aca5a5]/71'} py-1 px-5 sm:px-7 rounded-[6px] text-center`}>
              {presenceState}
            </span>
          </div> */}
        </article>
    </div>
  )
}
