'use client'

import React, {useState} from 'react'
import { CiSearch } from 'react-icons/ci'
import { CiFilter } from "react-icons/ci"
// import { CiImport } from "react-icons/ci"
// import { MdOutlineTransform } from "react-icons/md"
import { FaRegTrashCan } from "react-icons/fa6"
// import { CgMathPlus } from "react-icons/cg"


export default function GestaoExtensionistas(){

    const [search, setSearch] = useState('')
    const [statusSearch, setStatusSearch] = useState('')
    const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // const [area1Selecionada, setArea1Selecionada] = useState<string | null>(null)
    // const [area2Selecionada, setArea2Selecionada] = useState<string | null>(null)
    // const [funcaoSelecionada, setFuncaoSelecionada] = useState<string | null>(null)
    // const [tecnologiaSelecionada, setTecnologiaSelecionada] = useState<string | null>(null)

    const [area1Search, setArea1Search] = useState('')
    const [area2Search, setArea2Search] = useState('')
    const [funcaoSearch, setFuncaoSearch] = useState('')
    const [tecnologiaSearch, setTecnologiaSearch] = useState('')


    const statusExtensionistasOptions = ['Participando', 'Concluinte', 'Desistente']

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [extensionistasAdmin, setExtensionistasAdmin] = useState([
        {
            projeto: 'Projeto F360',
            nome: 'Imersionista 1',
            area_1: 'Back End',
            area_2: 'Front End',
            funcao: 'Dev. Back End',
            tecnologia: 'Django',
            status: 'Participando'
        },
        {
            projeto: 'Projeto F360',
            nome: 'Imersionista 2',
            area_1: 'Front End',
            area_2: 'Mobile',
            funcao: 'Dev. Front End',
            tecnologia: 'React.js',
            status: 'Participando'
        },
        {
            projeto: 'Projeto F360',
            nome: 'Imersionista 3',
            area_1: 'Dados',
            area_2: 'Back End',
            funcao: 'Dev. Back End',
            tecnologia: 'Django',
            status: 'Participando'
        },
        {
            projeto: 'Projeto F360',
            nome: 'Imersionista 4',
            area_1: 'Front End',
            area_2: 'UX/UI Design',
            funcao: 'UX/UI Designer',
            tecnologia: 'Figma',
            status: 'Desistente'
        }
    ])

    const extensionistasFiltrados = extensionistasAdmin.filter((extensionista) => {
        const nomeMatch = extensionista.nome.toLowerCase().includes(search.toLowerCase());
        const statusMatch = statusSelecionado ? extensionista.status === statusSelecionado : true;
        const area1Match = extensionista.area_1.toLowerCase().includes(area1Search.toLowerCase());
        const area2Match = extensionista.area_2.toLowerCase().includes(area2Search.toLowerCase());
        const funcaoMatch = extensionista.funcao.toLowerCase().includes(funcaoSearch.toLowerCase());
        const tecnologiaMatch = extensionista.tecnologia.toLowerCase().includes(tecnologiaSearch.toLowerCase());

        return nomeMatch && statusMatch && area1Match && area2Match && funcaoMatch && tecnologiaMatch ;
    });

    const getStatusStyle = (status: string) => {
        switch(status){
            case 'Participando' :
                return 'bg-[#D0A30FCF] text-[#FFF5BA]';
            case 'Concluinte' :
                return 'bg-[#18A933B2] text-[#C3FFCE]';
            case 'Desistente' :
                return 'bg-[#D23418B5] text-[#FFCECE]' 
        }
    };

    return(
        <main className='bg-gradient-to-b from-[#411CCF] to-[#17113A] grow overflow-x-hidden'>
            <div className='flex items-center justify-center w-full'>
                <h1 className='text-white text-[24px] sm:text-[28px] md:text-[30px] font-coolvetica text-center pt-4 leading-snug'>
                    Extensionistas de “Projeto F360”
                </h1>
            </div>

            <div className='flex flex-col md:flex-row w-full min-h-[100px] items-center justify-center gap-4 md:gap-10 px-4 pt-4 mb-6 lg:mb-2'>
                <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-6 md:gap-x-10'>

                    <div className='relative w-full max-w-[550px] h-[48px] bg-white rounded-[8px] flex items-center px-4'>
                        <input 
                            type="text" 
                            placeholder='Pesquise por Nome/CPF'
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
                                {statusExtensionistasOptions
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
                                <p className='text-black font-semibold mb-1'>Função</p>
                                <input 
                                    type="text" 
                                    placeholder='Buscar Função'
                                    className='w-full border px-2 py-1 rounded'
                                    value={funcaoSearch}
                                    onChange={(e) => setFuncaoSearch(e.target.value)}
                                />
                            </div>  

                            <div>
                                <p className='text-black font-semibold mb-1'>Tecnologias</p>
                                <input 
                                    type="text" 
                                    placeholder='Buscar Tecnologia'
                                    className='w-full border px-2 py-1 rounded'
                                    value={tecnologiaSearch}
                                    onChange={(e) => setTecnologiaSearch(e.target.value)}
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
                        <FaRegTrashCan className='text-black text-[22px]' />
                        Apagar tudo
                    </button>
                </div>    
            </div>

            <div className='w-full h-full bg-[#1E1E1E] flex flex-col  grow overflow-x-auto'>
                <div className='w-full'>

                <div className='w-full grid grid-cols-7 items-center justify-center bg-[#1E1E1E] h-[80px] border-b border-white'>
                    <div className='flex justify-center'>
                        <div className='w-[24px] h-[24px] border border-white rounded-[4px] cursor-pointer hover:bg-white/10 transition'/>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-white text-[12px] sm:text-[18px] md:text-[20px] font-semibold'>Nome</p>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-white text-[12px] sm:text-[18px] md:text-[20px] font-semibold'>1° Área</p>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-white text-[12px] sm:text-[18px] md:text-[20px] font-semibold'>2° Área</p>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-white text-[12px] sm:text-[18px] md:text-[20px] font-semibold'>Função</p>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-white text-[12px] sm:text-[18px] md:text-[20px] font-semibold'>Tecnologia</p>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-white text-[12px] sm:text-[18px] md:text-[20px] font-semibold'>Status</p>
                    </div>

                </div>

                {extensionistasFiltrados.map((extensionista, i) => (
                    <div key={i} className='w-full flex flex-col sm:grid sm:grid-cols-7 sm:items-center sm:justify-center sm:h-[80px] bg-[#2C2C2CE5] border-b border-[#FFFFFF80]'>
                        <div className='flex justify-between items-center sm:justify-center px-4 py-2 sm:p-0'>
                        <span className='text-white font-bold sm:hidden'>Selecionar:</span>
                        <input 
                            type="checkbox"
                            className="w-[24px] h-[24px] border border-white rounded-[4px] cursor-pointer hover:bg-white/10 transition appearance-none bg-transparent relative checked:after:content-['✔'] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:text-white checked:after:text-sm"
                        />
                        </div>

                        <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                        <span className='text-white font-bold sm:hidden'>Nome:</span>
                        <p className='text-white text-[16px]'>{extensionista.nome}</p>
                        </div>

                        <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                        <span className='text-white font-bold sm:hidden'>1° Área:</span>
                        <p className='text-white text-[16px]'>{extensionista.area_1}</p>
                        </div>

                        <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                        <span className='text-white font-bold sm:hidden'>2° Área:</span>
                        <p className='text-white text-[16px]'>{extensionista.area_2}</p>
                        </div>

                        <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                        <span className='text-white font-bold sm:hidden'>Função:</span>
                        <p className='text-white text-[16px]'>{extensionista.funcao}</p>
                        </div>

                        <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                        <span className='text-white font-bold sm:hidden'>Tecnologia:</span>
                        <p className='text-white text-[16px]'>{extensionista.tecnologia}</p>
                        </div>

                        <div className='flex justify-between px-4 py-2 sm:justify-center sm:p-0'>
                        <span className='text-white font-bold sm:hidden'>Status:</span>
                        <p className={`text-[14px] sm:text-[16px] font-medium px-3 py-1 rounded-[8px] text-center ${getStatusStyle(extensionista.status)}`}>
                            {extensionista.status}
                        </p>
                        </div>
                    </div>
                    ))}
            </div>
            </div>

        </main>
    )
}