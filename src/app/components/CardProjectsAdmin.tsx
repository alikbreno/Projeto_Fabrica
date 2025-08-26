'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Projeto } from './ModalModifiedProject';

type CardProjectsAdminProps = {
  projetos: Projeto[];
  setOpenModalDelete: (value: boolean) => void;
  setProjetoSelecionadoDelete: (value: string) => void;
  setOpenModalEdit: (value: boolean) => void;
  setProjetoSelecionadoEdit: (value: Projeto) => void;
};

export default function CardProjectsAdmin({
  projetos, 
  setOpenModalDelete, 
  setProjetoSelecionadoDelete,
  setOpenModalEdit,
  setProjetoSelecionadoEdit,
}: CardProjectsAdminProps) {

  return (
    <>
      {projetos.map((item) => (
        <div
          key={item.id}
          className='flex flex-col self-stretch w-full sm:min-w-[300px] min-h-[450px] rounded-[20px] bg-[#2C2C2CE5] shadow-[10px_5px_10px_-5px_#FFC31180] p-5 gap-4'
        >

          <div className='flex flex-row justify-end gap-5'>
            <FiEdit 
              onClick={() => {
                setProjetoSelecionadoEdit(item);
                setOpenModalEdit(true);
              }}
              className='text-white text-[30px] cursor-pointer'
            />
            <RiDeleteBin6Line 
              onClick={() => {
                setOpenModalDelete(true);
                setProjetoSelecionadoDelete(item.id);
              }}
              className='text-white text-[30px] cursor-pointer'
            /> 
          </div>

          <picture className='h-32 max-w-60 self-start'>
            <img
              src={item.imagem}
              alt={item.nome_projeto}
              className='w-full h-full object-contain rounded-lg'
            />
          </picture>

          <h1 className='text-3xl sm:text-2xl text-white font-coolvetica'>
            {item.nome_projeto}
          </h1>

          <p className='text-lg sm:text-xl font-light text-justify line-clamp-3 font-roboto text-white'>
            {item.descricao}
          </p>

          <div
            className={twMerge(
              'rounded-[8px] w-fit py-2 px-6 mt-2',
              item.status === 'Em andamento'
                ? 'bg-secondary-3/81'
                : 'bg-secondary-4/70'
            )}
          >
            <p className='text-lg font-louis-george-cafe text-center italic text-white'>
              {item.status}
            </p>
          </div>
          
          <a 
            href="#"
            className='text-white underline text-[16px] cursor-pointer self-end'  
          >
            Ver detalhes
          </a>
              
        </div>
      ))}
    </>
  );
}
