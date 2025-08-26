import React from 'react'

type CardGeneralImmersionProps = {
  title: string,
  dateIni: string,
  dateEnd: string,
  status: string
}

function Card({ title, dateIni, dateEnd, status }: CardGeneralImmersionProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className='min-w-[280px] sm:min-w-[380px] bg-primary-1 rounded-[20px] text-white drop-shadow-[10px_10px_4px] drop-shadow-black/25 overflow-hidden'
    >
      <div className='flex flex-col gap-4 pb-4'>
        <header className='flex flex-col gap-3 text-[24px] bg-primary-4 px-4 py-2 rounded-b-[20px]'>
          <h1 className='underline'>{title}</h1>
          <p className='text-[16px]'>Data: {dateIni} a {dateEnd}</p>
        </header>

        <div className='flex justify-center'>
          <div className='bg-white w-[260px] h-[1px]'/>
        </div>
        <p className='text-center'>
          Status de presença: 
          <span className={`${status === "Presente" ? 'bg-[#18A933]/70 text-[#C3FFCE]' : 'bg-[#D23418]/71 text-[#FFCECE]'} p-1.5 ml-1 rounded-[6px]`}>
            {status}
          </span>
        </p> 
      </div>
    </div>
  )
}

export const CardGeneralImmersion = React.forwardRef(Card);
