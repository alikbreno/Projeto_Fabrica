import React from 'react'
import { twMerge } from 'tailwind-merge';

type CardProps = {
  imagem: string;
  titulo: string;
  descricao: string;
  status: string;
};

function Card({imagem, titulo, descricao, status}: CardProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-between self-stretch max-h-[390px] bg-primary-1 text-white rounded-[20px] gap-6 p-6 w-full min-w-[250px] sm:min-w-[350px] drop-shadow-[6px_6px_4px] drop-shadow-black/50",
      )}
      ref={ref}
    >
      <div className='flex flex-col gap-6'>
        <picture className='h-22 max-w-58 self-start'>
          <img
            src={imagem}
            alt={`Logo ${titulo}`}
            className="w-full h-full object-contain"
          />
        </picture>

        <h1 className="text-2xl sm:text-3xl">
          {titulo}
        </h1>

        <p className="text-lg sm:text-xl font-light text-justify line-clamp-3">
          {descricao}
        </p>
      </div>

      <div className={twMerge(
        'rounded-[8px] w-fit py-2 px-6',
        status === 'Em andamento' ? 'bg-secondary-3/81' : 'bg-secondary-4/70'
      )}>
        <p className='text-lg font-louis-george-cafe text-center italic'>
          {status}
        </p>
      </div>

    </div>
  )
}

export const CardMyProjects = React.forwardRef(Card);
