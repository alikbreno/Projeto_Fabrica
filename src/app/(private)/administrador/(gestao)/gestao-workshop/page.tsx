'use client'

import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

import CardCreateProjectAdmin from '@/app/components/CardCreateProjectAdmin'
import CardImersaoWorkshop from '@/app/components/CardImersaoWorkshop'
import MiniCardWorkshop from '@/app/components/MiniCardWorkshop'
import ModalPalestraWorkshop, { FormPalestraWorkshop, PalestraWorkshop } from '@/app/components/ModalPalestraWorkshop'

export default function GestaoWorkshop() {
  const [openDetailsIndex, setOpenDetailsIndex] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [statusSearch, setStatusSearch] = useState('')

  const [modalCreate, setModalCreate] = useState(false)

  const [itemSelecionadoModified, setItemSelecionadoModified] = useState<PalestraWorkshop | null>(null)

  const statusOptions = ['Sem registro', 'Em andamento', 'Concluido']

  const [workshopAdmin, setWorkshopAdmin] = useState<PalestraWorkshop[]>([
    {
      imagem: '/images/cardsEventosImersao/Card3.png',
      titulo: 'Workshop Back End 2025.1',
      data: '20/02 a 28/02',
      horario: '14h ás 18h',
      local: 'Lab 12 CT',
      status: 'Em andamento',
      palestrante: 'Ricardo Dantas',
      sintese: 'Introdução a sintaxe da linguagem Python',
      material: 'link',
    },
    {
      imagem: '/images/cardsEventosImersao/Card4.png',
      titulo: 'Workshop Front End 2025.1',
      data: '20/02 a 28/02',
      horario: '14h ás 18h',
      local: 'Lab 08 CT',
      status: 'Em andamento',
      palestrante: 'Carlos Herriot',
      sintese: 'Introdução a HTML, CSS, Javascript e Git',
      material: 'link',
    },
  ])

  const workshopsFiltrados = workshopAdmin.filter((palestra) => {
    const atendeStatus = statusSelecionado
      ? palestra.status.toLowerCase() === statusSelecionado.toLowerCase()
      : true

    const atendeBusca = search
      ? palestra.titulo.toLowerCase().includes(search.toLowerCase())
      : true

    return atendeStatus && atendeBusca
  })

  const statusFiltrados = statusOptions.filter((status) =>
    status.toLowerCase().includes(statusSearch.toLowerCase())
  )

  const handleCreate = (data: FormPalestraWorkshop) => {
    const novoWorkshop: PalestraWorkshop = {
      data: data.data,
      horario: data.horario,
      imagem: data.imagem,
      local: data.local,
      material: data.material,
      palestrante: data.palestrante,
      sintese: data.sintese,
      titulo: data.titulo,
      infoAdicional: data.infoAdicional,
      status: 'Sem registro',
    };
    setWorkshopAdmin((prev) => [...prev, novoWorkshop]);
  }

  const handleModified = (data: FormPalestraWorkshop) => {
    if (!itemSelecionadoModified) return;

    setWorkshopAdmin((prev) =>
      prev.map((item) =>
        item === itemSelecionadoModified
          ? {
              ...item,
              data: data.data,
              horario: data.horario,
              imagem: data.imagem,
              local: data.local,
              material: data.material,
              palestrante: data.palestrante,
              sintese: data.sintese,
              titulo: data.titulo,
              infoAdicional: data.infoAdicional
            }
          : item
      )
    );
    setItemSelecionadoModified(null);   
  }

  const handleDelete = (itemRemoved: PalestraWorkshop) => {
    setWorkshopAdmin((prev) => prev.filter((workshop) => workshop !== itemRemoved));
  }

  return (
    <main className="bg-gradient-to-b from-[#411CCF] to-[#17113A] grow overflow-x-hidden">
      <div className="flex items-center justify-center w-full">
        <h1 className="text-white text-[24px] sm:text-[28px] md:text-[30px]  font-coolvetica text-center pt-4 leading-snug">
          Workshops de “Imersão Fábrica de Software 2025.1”
        </h1>
      </div>

      <div className="flex flex-col md:flex-row w-full min-h-[100px] items-center justify-center gap-4 md:gap-10 px-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-6 md:gap-x-10">

          <div className="relative w-full max-w-[550px] h-[48px] bg-white rounded-[8px] flex items-center px-4">
            <input
              type="text"
              placeholder="Pesquise por nome"
              className="w-full h-full bg-transparent outline-none text-black text-[15px] sm:text-[16px] placeholder:text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch className="absolute right-4 text-[22px] text-black" />
          </div>

          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white px-4 py-2 rounded-[8px] h-[48px] flex items-center gap-2 text-black shadow-md"
            >
              <svg
                className="w-8 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17V13.414L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              Filtros
            </button>

            {statusSelecionado && (
              <div className="h-[48px] flex items-center bg-white rounded-[8px] px-4 text-black text-[15px] sm:text-[16px] shadow-md whitespace-nowrap">
                <span className="mr-2">{statusSelecionado}</span>
                <button
                  onClick={() => {
                    setStatusSelecionado(null)
                    setStatusSearch('')
                  }}
                  className="text-gray-500 hover:text-black text-lg leading-none"
                >
                  x
                </button>
              </div>
            )}


            {isDropdownOpen && (
              <div className="absolute top-[60px] left-0 w-[230px] bg-white rounded-lg shadow-lg p-4 z-10">
                <div className="text-black font-semibold mb-2">Status</div>

                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Pesquise por status"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
                    value={statusSearch}
                    onChange={(e) => setStatusSearch(e.target.value)}
                  />
                  <CiSearch className="absolute right-3 top-2.5 text-[18px]" />
                </div>

                <div className="flex flex-col gap-2">
                  {statusFiltrados.map((status, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 text-black"
                    >
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={statusSelecionado === status}
                        onChange={() => {
                          setStatusSelecionado(status)
                          setIsDropdownOpen(false)
                          setStatusSearch('')
                        }}
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full px-10 pb-10">
        <CardCreateProjectAdmin onOpenModal={() => setModalCreate(true)} />

        {workshopsFiltrados.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <CardImersaoWorkshop
              item={item}
              handleDelete={handleDelete}
              setItemSelecionadoModified={setItemSelecionadoModified}
              handleModified={handleModified}
              onClickDetalhes={() =>
                setOpenDetailsIndex(openDetailsIndex === index ? null : index)
              }
            />

            {openDetailsIndex === index && (
              <MiniCardWorkshop
                palestrante={item.palestrante}
                sintese={item.sintese}
                material={item.material}
                status={item.status}
              />
            )}
          </div>
        ))}
      </div>

        <ModalPalestraWorkshop 
          nome='Workshop' 
          tipo='Criar' 
          onSubmit={handleCreate} 
          openModal={modalCreate} 
          setOpenModal={setModalCreate} 
        />

    </main>
  )
}
