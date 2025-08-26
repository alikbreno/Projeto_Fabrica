'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Imersao } from './ModalModifiedImersao';

type CardImersaoAdminProps = {
  imersoes: Imersao[];
  setOpenModalDelete: (value: boolean) => void;
  setImersaoSelecionadaDelete: (value: string) => void;
  setOpenModalEdit: (value: boolean) => void;
  setImersaoSelecionadaEdit: (value: Imersao) => void;
};

export default function CardImersaoAdmin({
  imersoes, 
  setOpenModalDelete, 
  setImersaoSelecionadaDelete,
  setOpenModalEdit,
  setImersaoSelecionadaEdit,
}: CardImersaoAdminProps) {

  return (
    <>
      {imersoes.map((item) => (
        <div
          key={item.id}
          className='flex flex-col self-stretch w-full sm:min-w-[290px] rounded-[20px] bg-[#2C2C2C] drop-shadow-[7px_4px_1px] drop-shadow-[#FFB01C]/50 gap-2'
        >
          <div className='bg-[#1E1E1E] p-5 pl-13 rounded-[20px]'>
            <div className='flex flex-row justify-end gap-5'>
              <FiEdit 
                onClick={() => {
                  setImersaoSelecionadaEdit(item);
                  setOpenModalEdit(true);
                }}
                className='text-white text-[30px] cursor-pointer'
              />
              <RiDeleteBin6Line 
                onClick={() => {
                  setOpenModalDelete(true);
                  setImersaoSelecionadaDelete(item.id);
                }}
                className='text-white text-[30px] cursor-pointer'
              /> 
            </div>

            <h1 className='text-3xl sm:text-2xl text-white max-w-[380px]'>
              {item.nome_imersao}
            </h1>
          </div>
              
          <p className='px-13 text-lg sm:text-xl font-light line-clamp-3 font-roboto text-white'>
            Data: {item.data_inicio} a {item.data_final}
          </p>
          <div className='flex flex-col'>
            <div className='flex items-center gap-1 px-13'>
              <div className='w-[3px] h-[28px] bg-white'/>
              <div
                className={twMerge(
                  'rounded-[6px] w-fit py-1 px-2 min-w-[115px]',
                  item.status === 'Em andamento'
                    ? 'bg-secondary-3/81 text-[#FFEA74]'
                    : item.status === 'Concluído'
                      ? 'bg-secondary-4/70 text-[#C3FFCE]'
                      : 'bg-[#ACA5A5]/71 text-white'
                )}
              >             
                <p className='text-lg font-louis-george-cafe text-center italic'>
                  {item.status}
                </p>        
              </div>
            </div>
            
            <a 
              href="#"
              className='pr-5 pb-4 text-white underline text-[16px] cursor-pointer self-end'  
            >
              Ver detalhes
            </a>
          </div>
              
        </div>
      ))}
    </>
  );
}
