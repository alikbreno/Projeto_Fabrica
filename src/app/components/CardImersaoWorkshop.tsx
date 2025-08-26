'use client'

import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { HiMiniUserGroup } from "react-icons/hi2";
import ModalDelete from './ModalDelete';
import ModalPalestraWorkshop from './ModalPalestraWorkshop';
import { CardPalestraWorkshop } from './CardImersaoPalestras';


function CardImersaoWorkshop(
  {
    item,
    handleModified,
    handleDelete,
    setItemSelecionadoModified,
    onClickDetalhes,
  }: CardPalestraWorkshop,
  ref: React.Ref<HTMLDivElement>
) {
  const cardBackGroundColor = 'bg-[#005960E5]';
  const labelBackGroundColor = 'bg-[#2C2C2CE5]';

  const [modalModified, setModalModified] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center ${cardBackGroundColor} w-full max-w-[450px] h-[450px] rounded-[20px] text-white gap-6 mx-auto shadow-[10px_5px_5px_0px_#FFC31180] `}
    >
      <div className='absolute top-0 right-[-2] w-[120px] h-[50px] bg-[#2C2C2CE5]  rounded-[20px] flex items-center justify-around'>
        <HiMiniUserGroup
          onClick={() => {
            // ação de alguma coisa
          }}
          className="text-white text-[20px] cursor-pointer"
        />
         <FiEdit
          onClick={() => {
            setItemSelecionadoModified(item)
            setModalModified(true)
          }}
          className="text-white text-[20px] cursor-pointer"
        />
        <RiDeleteBin6Line
          onClick={() => {
            setModalDelete(true)
          }}
          className="text-white text-[20px] cursor-pointer"
        />
      </div>
      <div className='w-full'>
        <picture>
          <img
            src={item.imagem}
            alt={`Logo ${item.titulo}`}
            className='w-full h-[120px]'
          />
        </picture>
      </div>

      <h1 className='text-[24px] text-center font-roboto'>{item.titulo}</h1>

      <div
        className={`rounded-[8px] w-fit py-2 px-6 mt-[-8px] ${
          item.status === 'Em andamento' ? 'bg-secondary-3/81' : item.status === 'Sem registro' ? 'bg-[#ACA5A5]/71' : 'bg-secondary-4/70'
        }`}
      >
        <p className='text-lg font-louis-george-cafe text-center italic text-white'>
          {item.status}
        </p>
      </div>

      <div className='w-full max-w-[350px] flex flex-col gap-2'>
        <div className='flex'>
          <div
            className={`w-[80px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}
          >
            Data
          </div>
          <div className='flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px]'>
            {item.data}
          </div>
        </div>

        <div className='flex'>
          <div
            className={`w-[80px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}
          >
            Horário
          </div>
          <div className='flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px]'>
            {item.horario}
          </div>
        </div>

        <div className='flex'>
          <div
            className={`w-[80px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}
          >
            Local
          </div>
          <div className='flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px]'>
            {item.local}
          </div>
        </div>
      </div>

      <div>
        <a
          onClick={onClickDetalhes}
          className='text-white underline text-[16px] cursor-pointer'
        >
          Ver detalhes
        </a>
      </div>

      <ModalPalestraWorkshop
        nome='Workshop' 
        tipo='Modificar'
        onSubmit={handleModified}
        itemSelecionado={item}
        openModal={modalModified}
        setOpenModal={setModalModified}
      />

      <ModalDelete 
        title='Deseja remover esse workshop?' 
        onConfirm={() => {     
          handleDelete(item)
          setModalDelete(false)
        }} 
        openModal={modalDelete} 
        setOpenModal={setModalDelete} 
        className='bg-primary-1 h-auto'
      />

    </div>
  )
}

export default React.forwardRef(CardImersaoWorkshop);
