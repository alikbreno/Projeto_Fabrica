'use client'

import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { CiFilter } from "react-icons/ci"
import { CiImport } from "react-icons/ci"
import { MdOutlineTransform } from "react-icons/md"
import { FaRegTrashCan } from "react-icons/fa6"
import { useAuth } from '@/app/context/useAuth'
import { FormularioInscricaoService } from '@/app/services/api/FormularioInscricaoService'
import { MessageService } from '@/app/services/message/MessageService'
import ElementIsLoading from '@/app/components/shared/ElementIsLoading'
// import { CgMathPlus } from "react-icons/cg"

type Imersionistas = {
    usuario_id: number,
    nome: string,
    area_1: string,
    area_2: string,
    workshop: string,
    status: string
}

export default function GestaoImersionistas(){

    const [search, setSearch] = useState('')
    const [statusSearch, setStatusSearch] = useState('')
    const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // const [area1Selecionada, setArea1Selecionada] = useState<string | null>(null)
    // const [area2Selecionada, setArea2Selecionada] = useState<string | null>(null)
    // const [workshopSelecionado, setWorkshopSelecionado] = useState<string | null>(null)  

    const [area1Search, setArea1Search] = useState('')
    const [area2Search, setArea2Search] = useState('')
    const [workshopSearch, setWorkshopSearch] = useState('')
    
    const statusImersionistaOptions = ['Participando', 'Concluinte', 'Inscrito', 'Desistente']

    const [imersionistasAdmin, setImersionistasAdmin] = useState<Imersionistas[]>([
        // {
        //     nome: 'Imersionista 1',
        //     area_1: 'Front End',
        //     area_2: 'UI/UX Design',
        //     workshop: 'Workshop Front End 2025.1',
        //     status: 'Participando'
        // },
        // {
        //     nome: 'Imersionista 2',
        //     area_1: 'Back End',
        //     area_2: 'Dados',
        //     workshop: 'Workshop Front End 2025.1',
        //     status: 'Desistente'
        // }
    ])

    const imersionistasFiltrados = imersionistasAdmin.filter((imersionista) => {
        const nomeMatch = imersionista.nome.toLowerCase().includes(search.toLowerCase());
        const statusMatch = statusSelecionado ? imersionista.status === statusSelecionado : true;
        const area1Match = imersionista.area_1.toLowerCase().includes(area1Search.toLowerCase());
        const area2Match = imersionista.area_2.toLowerCase().includes(area2Search.toLowerCase());
        const workshopMatch = imersionista.workshop.toLowerCase().includes(workshopSearch.toLowerCase());

        return nomeMatch && statusMatch && area1Match && area2Match && workshopMatch;
    });

    const getStatusStyle = (status: string) => {
        switch(status){
            case 'Participando' :
                return 'bg-[#D0A30FCF] text-[#FFF5BA]';
            case 'Concluinte' :
                return 'bg-[#18A933B2] text-[#C3FFCE]';
            case 'Inscrito' :
                return 'bg-[#ACA5A5B5] text-white';
            case 'Desistente' :
                return 'bg-[#D23418B5] text-[#FFCECE]' 
        }
    };

    const {auth} = useAuth()
    const [isloading, setIsLoading] = useState<boolean>(false)

    async function geImersionistasData() {
    
        if(auth?.access){
          setIsLoading(true)
          const response = await new FormularioInscricaoService(auth?.access).getAllFormularioInscricao()
          setIsLoading(false)
          const message = new MessageService()
    
          if(response){
    
            if(response.sucesso && response.resultado){
                console.log(response.resultado)

                const imersionistas: Imersionistas[] = response.resultado.map(imersionista => {
                    return {
                        usuario_id: imersionista.usuario_id,
                        nome: imersionista.participante_nome,
                        area_1: imersionista.primeira_opcao_nome,
                        area_2: imersionista.segunda_opcao_nome,
                        status: "Inscrito",
                        workshop: imersionista.imersao_info
                    }
                })

                setImersionistasAdmin(imersionistas)
                return
            }
    
            return response.detalhes.map(detalhe => {
              message.error(detalhe)
            })
          }
    
          return message.error('Erro ao buscar os dados.')
        }
        
        
      }
    
      useEffect(() => {
    
        if(auth?.access){
          geImersionistasData()
        }
    
      }, [auth?.access])

    return(
        <main className='bg-gradient-to-b from-[#411CCF] to-[#17113A] flex flex-col grow overflow-x-hidden'>
            <div className='flex items-center justify-center w-full'>
                <h1 className='text-white text-[24px] sm:text-[28px] md:text-[30px] font-coolvetica text-center pt-4 leading-snug'>
                    Imersionistas de “Imersão Fábrica de Software 2025.1”
                </h1>
            </div>

            <div className='flex flex-col md:flex-row w-full min-h-[100px] items-center justify-center gap-4 md:gap-10 px-4 pt-4 mb-6 lg:mb-2'>
                <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-6 md:gap-x-10'>

                    <div className='relative w-full max-w-[550px] h-[48px] bg-white rounded-[8px] flex items-center px-4'>
                        <input 
                            type="text" 
                            placeholder='Pesquise por Nome'
                            className='w-full h-full bg-transparent outline-none text-black text-[15px] sm:text-[16px] placeholder:text-black'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <CiSearch className='absolute right-0 text-[22px] text-black'/>
                    </div>

                    <div className='flex  items-center gap-2 relative'>

                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className='bg-white px-4 py-2 rounded-[8px] h-[48px] flex items-center gap-2 text-black shadow-md'
                    >

                    <CiFilter className="text-[22px]" />
                        Filtros

                    </button>

                    {statusSelecionado && (
                        <div className='h-[48px] flex items-center bg-white rounded-[8px] px-4 text-black text-[15px] sm:text-[16px] shadow-md whitespace-nowrap'>
                            <span className='mr-2'>{statusSelecionado}</span>
                            <button
                                onClick={() => {
                                    setStatusSelecionado(null)
                                    setStatusSearch('')
                                }}
                                className='text-gray-500 hover:text-black text-lg leading-none'
                            >
                                x
                            </button>
                        </div>
                    )}

                    {isDropdownOpen && (
                        <div className='absolute top-[60px] left-0 w-[300px] bg-white rounded-lg shadow-lg p-4 z-10 flex flex-col gap-4'>

                            <div>
                                <p className='text-black font-semibold mb-1'>Status</p>
                                <input 
                                    type="text"
                                    placeholder='Buscar status'
                                    className='w-full border px-2 py-1 rounded'
                                    value={statusSearch}
                                    onChange={(e) => setStatusSearch(e.target.value)}
                                />
                                {statusImersionistaOptions
                                    .filter((s) => s.toLowerCase().includes(statusSearch.toLowerCase()))
                                    .map((status) => (
                                        <div 
                                            key={status}
                                            className='flex items-center gap-2 mt-1'
                                        >
                                            <input 
                                                type="radio"
                                                name='status'
                                                checked= {statusSelecionado === status}
                                                onChange={() => {
                                                    setStatusSelecionado(status)
                                                    setStatusSearch('')
                                                    setIsDropdownOpen(false)
                                                }} 
                                            />
                                            <label className='text-black'>{status}</label>
                                        </div>
                                    ))}
                            </div>

                            <div>
                                <p className='text-black font-semibold mb-1'> 1° Área</p>
                                <input 
                                    type="text" 
                                    placeholder='Buscar Área 1'
                                    className='w-full border px-2 py-1 rounded'
                                    value={area1Search}
                                    onChange={(e) => setArea1Search(e.target.value)}
                                />
                            </div>

                            <div>
                                <p className='text-black font-semibold mb-1'> 2° Área</p>
                                <input 
                                    type="text" 
                                    placeholder='Buscar Área 2'
                                    className='w-full border px-2 py-1 rounded'
                                    value={area2Search}
                                    onChange={(e) => setArea2Search(e.target.value)}
                                />
                            </div>   

                            <div>
                                <p className='text-black font-semibold mb-1'>Workshop</p>
                                <input 
                                    type="text" 
                                    placeholder='Buscar Workshop'
                                    className='w-full border px-2 py-1 rounded'
                                    value={workshopSearch}
                                    onChange={(e) => setWorkshopSearch(e.target.value)}
                                />
                            </div>                                                       
                        </div>
                    )}

                    </div>
                </div>
            </div>
            
            <div className='flex flex-col md:flex-row w-full min-h-[50px] items-center justify-center gap-4 md:gap-10 px-4 mb-6 lg:mb-2'>
                <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-6 md:gap-x-10'>
                    <button
                        className='bg-white/37 min-w-[150px] px-6 py-1 rounded-[8px] border border-white text-black text-[16px] font-medium shadow-sm hover:bg-white/50 transition-all duration-200 flex items-center gap-2'
                        >
                        <CiImport className='text-black text-[22px]' />
                        Alocar em workshop
                        </button>
                    <button
                        className='bg-white/37 min-w-[150px] px-6 py-1 rounded-[8px] border border-white text-black text-[16px] font-medium shadow-sm hover:bg-white/50 transition-all duration-200 flex items-center gap-2'
                        >
                        <MdOutlineTransform className='text-black text-[22px]' />
                        Converter para extensionista
                        </button>
                    <button
                        className='bg-white/37 min-w-[150px] px-6 py-1 rounded-[8px] border border-white text-black text-[16px] font-medium shadow-sm hover:bg-white/50 transition-all duration-200 flex items-center gap-2'
                        >
                        <FaRegTrashCan className='text-black text-[22px]' />
                        Apagar tudo
                    </button>
                </div>    
            </div>

            <div className='w-full bg-[#1E1E1E] flex flex-col grow'>

                <div className='w-full grid grid-cols-6 items-center justify-center bg-[#1E1E1E] h-[80px] border-b border-white'>
                    <div className='flex justify-center'>
                        <div className='w-[24px] h-[24px] border border-white rounded-[4px] cursor-pointer hover:bg-white/10 transition'/>
                    </div>
                    <div className='flex justify-center'>
                    <p className='text-white text-[14px] sm:text-[18px] md:text-[20px] font-semibold'>Nome</p>
                    </div>
                    <div className='flex justify-center'>
                    <p className='text-white text-[14px] sm:text-[18px] md:text-[20px] font-semibold'>1° Área</p>
                    </div>
                    <div className='flex justify-center'>
                    <p className='text-white text-[14px] sm:text-[18px] md:text-[20px] font-semibold'>2° Área</p>
                    </div>
                    <div className='flex justify-center'>
                    <p className='text-white text-[14px] sm:text-[18px] md:text-[20px] font-semibold'>Workshop</p>
                    </div>
                    <div className='flex justify-center'>
                    <p className='text-white text-[14px] sm:text-[18px] md:text-[20px] font-semibold'>Status</p>
                    </div>
                </div>

                <ElementIsLoading isLoading={isloading}/>

                {!isloading && imersionistasFiltrados.map((imersionista) => (
                <div
                    key={imersionista.usuario_id}
                    className='w-full border-b border-[#FFFFFF80] bg-[#2C2C2CE5] flex flex-col sm:grid sm:grid-cols-6 sm:items-center sm:justify-center sm:h-[80px]'
                >
                    <div className='flex justify-between items-center sm:justify-center sm:h-full px-4 py-2 sm:p-0'>
                    <span className='text-white font-bold sm:hidden'>Selecionar:</span>
                    <input
                        type="checkbox"
                        className="w-[24px] h-[24px] border border-white rounded-[4px] cursor-pointer hover:bg-white/10 transition appearance-none bg-transparent relative checked:after:content-['✔'] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:text-white checked:after:text-sm"
                    />
                    </div>

                    <div className='flex justify-between gap-2 px-4 py-2 sm:p-0'>
                    <span className='text-white font-bold sm:hidden'>Nome:</span>
                    <p className='text-white text-[16px]'>{imersionista.nome}</p>
                    </div>

                    <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                    <span className='text-white font-bold sm:hidden'>1° Área:</span>
                    <p className='text-white text-[16px]'>{imersionista.area_1}</p>
                    </div>

                    <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                    <span className='text-white font-bold sm:hidden'>2° Área:</span>
                    <p className='text-white text-[16px]'>{imersionista.area_2}</p>
                    </div>

                    <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0 text-center'>
                    <span className='text-white font-bold sm:hidden'>Workshop:</span>
                    <p className='text-white text-[16px] break-words'>{imersionista.workshop}</p>
                    </div>

                    <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                    <span className='text-white font-bold sm:hidden'>Status:</span>
                    <p className={`text-[14px] sm:text-[16px] font-medium px-3 py-1 rounded-[8px] text-center ${getStatusStyle(imersionista.status)}`}>
                        {imersionista.status}
                    </p>
                    </div>
                </div>
                ))}
            </div>
        </main>
    )
}