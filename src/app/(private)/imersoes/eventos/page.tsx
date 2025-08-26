'use client'

import CardImersaoEventos from '@/app/components/CardImersaoEventos'
import MiniCardImersaoEventos from '@/app/components/MiniCardImersaoEventos'
import React, { useState } from 'react'

export default function Eventos() {
  const [selected, setSelected] = useState('Todos os Eventos')
  const [openDetails, setOpenDetails] = useState<number | null>(null)

  const buttons = ['Todos os Eventos', 'Palestras', 'Workshops']

  const EventosImersao = [
    {
      imagem: '/images/cardsEventosImersao/Card1.png',
      titulo: 'Abertura da Imersão 2025.1',
      data: '17/02',
      horario: '14h ás 14:50h',
      local: 'Auditório UNIPÊ',
      status: ['Todos os Eventos', 'Palestras'],
      palestrante: 'Walace Bonfim',
      sintese: 'Informações sobre o processo imersionista',
      material: 'link',
    },
    {
      imagem: '/images/cardsEventosImersao/Card2.png',
      titulo: 'De 0 a 100 em um Semestre',
      data: '20/02',
      horario: '15h ás 15:30h',
      local: 'Auditório UNIPÊ',
      status: ['Todos os Eventos', 'Palestras'],
      palestrante: 'Felipe',
      sintese: 'Maneiras de como ser eficiente na fábrica',
      material: 'link',
    },
    {
      imagem: '/images/cardsEventosImersao/Card3.png',
      titulo: 'Workshop Back End 2025.1',
      data: '20/02 a 28/02',
      horario: '14h ás 18h',
      local: 'Lab 12 CT',
      status: ['Todos os Eventos', 'Workshops'],
      palestrante: 'Ricardo Dantas',
      sintese: 'Introdução a sintaxe da linguagem Python',
      material: 'link',
    },
    {
      imagem: '/images/cardsEventosImersao/Card4.png',
      titulo: 'Workshop Front End 2025.1',
      data: '20/02 a 28/02',
      horario: '14h ás 18h',
      local: 'Lab 8 CT',
      status: ['Todos os Eventos', 'Workshops'],
      palestrante: 'Carlos Herriot',
      sintese: 'Introdução a HTML, CSS, JavaSript e Git',
      material: 'link',
    },
  ]

  return (
    <main className='flex flex-col bg-gradient-to-b from-[#17113A] to-[#411CCF] grow overflow-x-hidden'>
      <div className='flex flex-col bg-primary-1 items-center min-h-[200px] p-5 gap-8'>
        <h1 className='text-white text-[30px] font-coolvetica'>
          Progresso da Imersão
        </h1>

        <div className='relative w-full max-w-[600px] h-[35px] bg-white rounded-[60px] overflow-hidden'>
          <div
            className='absolute top-0 left-0 h-full bg-secondary-1 rounded-[60px]'
            style={{ width: '75%' }}
          ></div>
          <h1 className='absolute inset-0 flex items-center justify-center text-[20px] text-black font-louis-george-cafe'>
            75% Concluído
          </h1>
        </div>

        <h1 className='text-[24px] text-white font-louis-george-cafe text-center'>
          Você participou de 6/8 eventos
        </h1>
      </div>

      <h1 className='text-[30px] text-white font-coolvetica mt-5 mx-10'>
        Participe dos eventos da imersão
      </h1>

      
      <div className='flex w-full max-w-[500px] bg-transparent mt-5 mx-0 sm:mx-4 items-center justify-start px-2 sm:px-4'>
  
        {buttons.map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={` text-white text-[20px] h-[70px] px-4 py-2 rounded-t-[20px] flex items-center justify-center transition-all duration-300
              ${
                selected === item
                  ? 'bg-[#2C2C2C]'
                  : 'hover:bg-[#2C2C2C]'
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="w-full bg-[#2C2C2C] grow">
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10 px-5 md:px-10 max-w-[1500px] mx-auto py-5'>
          {EventosImersao.filter((evento) =>
            evento.status.includes(selected)
          ).map((evento, index) => (
            <div key={index} className='flex flex-col items-center gap-2'>
              <CardImersaoEventos
                imagem={evento.imagem}
                titulo={evento.titulo}
                data={evento.data}
                horario={evento.horario}
                local={evento.local}
                palestrante={evento.palestrante}
                sintese={evento.sintese}
                material={evento.material}
                status={evento.status}
                onClickDetalhes={() =>
                  setOpenDetails(openDetails === index ? null : index)
                }
              />

              {openDetails === index && (
                <MiniCardImersaoEventos
                  palestrante={evento.palestrante}
                  sintese={evento.sintese}
                  material={evento.material}
                  status={evento.status}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
