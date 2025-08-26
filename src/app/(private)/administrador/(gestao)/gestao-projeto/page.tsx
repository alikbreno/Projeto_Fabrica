'use client';

import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import CardCreateProjectAdmin from '@/app/components/CardCreateProjectAdmin';
import ModalCreateProject from '@/app/components/ModalCreateProject';
import CardProjectsAdmin from '@/app/components/CardProjectsAdmin';
import ModalDelete from '@/app/components/ModalDelete';
import ModalModifiedProject, { FormData, Projeto } from '@/app/components/ModalModifiedProject';
import { twMerge } from 'tailwind-merge';

export default function HomeGestaoProjetos() {

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [projetoSelecionadoDelete, setProjetoSelecionadoDelete] = useState<string | null>(null);
  const [projetoSelecionadoEdit, setProjetoSelecionadoEdit] = useState<Projeto | null>(null);

  const [projetos, setProjetos] = useState<Projeto[]>([
    {
      id: '1',
      imagem: '/images/logos/branca-com-preenchimento/branco-com-preenchimento.png',
      nome_projeto: 'Projeto F360',
      descricao: 'Desenvolvimento de um Website da própria Fábrica de Software',
      status: 'Em andamento',
      nome_empresa: 'Fábrica de Software',
      data_inicio: '01/01/2024',
      data_final: '31/12/2024',
    },
    {
      id: '2',
      imagem: '/images/partners/btor.png',
      nome_projeto: 'Projeto Btor',
      descricao: 'Desenvolvimento de um aplicativo Mobile para a empresa',
      status: 'Concluido',
      nome_empresa: 'Btor',
      data_inicio: '01/05/2023',
      data_final: '30/10/2023',
    },
  ]);

  const [search, setSearch] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null);

  const projetosFiltrados = projetos.filter((projeto) => {
    const atendeStatus = statusSelecionado ? projeto.status === statusSelecionado : true;
    const atendeBusca = search.length > 0 ? projeto.nome_projeto.toLowerCase().includes(search.toLowerCase()) : true;
    return atendeStatus && atendeBusca;
  });

  const buttons = ['Em andamento', 'Concluido'];

  function handleCreateProject(data: FormData) {
    const novoProjeto: Projeto = {
      id: Math.random().toString(),
      nome_projeto: data.nome_projeto,
      descricao: data.descricao,
      status: 'Em andamento',
      imagem: data.imagem || '/images/default.png',
      nome_empresa: data.nome_empresa,
      data_inicio: data.data_inicio,
      data_final: data.data_final,
    };
    setProjetos((prev) => [...prev, novoProjeto]);
    setOpenModalCreate(false);
  }

  function handleDelete() {
    setProjetos((prev) => prev.filter((item) => item.id !== projetoSelecionadoDelete));
    setOpenModalDelete(false);
    setProjetoSelecionadoDelete(null);
  }

  function handleEdit(data: FormData) {
    if (!projetoSelecionadoEdit) return;

    setProjetos((prev) =>
      prev.map((item) =>
        item.id === projetoSelecionadoEdit.id
          ? {
              ...item,
              nome_projeto: data.nome_projeto,
              descricao: data.descricao,
              imagem: data.imagem,
              nome_empresa: data.nome_empresa,
              data_inicio: data.data_inicio,
              data_final: data.data_final,
            }
          : item
      )
    );
    setOpenModalEdit(false);
    setProjetoSelecionadoEdit(null);
  }

  return (
    <main className='bg-gradient-to-b from-[#411CCF] to-[#17113A] grow overflow-x-hidden'>
      <div className="flex flex-col md:flex-row w-full min-h-[100px] items-center justify-center gap-4 md:gap-10 px-4 pt-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 md:gap-10">
          <h1 className="text-white text-[24px] sm:text-[28px] md:text-[30px] whitespace-nowrap font-coolvetica text-center sm:text-left">
            Projetos gerais
          </h1>

          <div className="relative w-full max-w-[550px] h-[48px] bg-white rounded-[60px] flex items-center px-4">
            <input
              type="text"
              placeholder="Pesquise por nome"
              className="w-full h-full bg-transparent outline-none text-black text-[15px] sm:text-[16px] placeholder:text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch className="absolute right-4 text-[22px] text-black" />
          </div>
        </div>

        <div className="flex flex-row gap-3 justify-center">
          {buttons.map((item) => (
            <button
              key={item}
              onClick={() => setStatusSelecionado(item === statusSelecionado ? null : item)}
              className={twMerge("text-white text-[16px] sm:text-[18px] md:text-[20px] font-roboto px-4 py-2 rounded-[15px] bg-[#2C2C2C] flex items-center justify-center",
                item === statusSelecionado && 'bg-secondary-1'
              )}
            >
              {item}
            </button>
          ))}
        </div>

      </div>


      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full px-10'>
        <CardCreateProjectAdmin onOpenModal={() => setOpenModalCreate(true)} />

        <CardProjectsAdmin
          projetos={projetosFiltrados}
          setOpenModalDelete={setOpenModalDelete}
          setProjetoSelecionadoDelete={setProjetoSelecionadoDelete}
          setOpenModalEdit={setOpenModalEdit}
          setProjetoSelecionadoEdit={setProjetoSelecionadoEdit}
        />
      </div>

      <ModalCreateProject
        openModal={openModalCreate}
        setOpenModal={setOpenModalCreate}
        onCreate={handleCreateProject}
      />

      <ModalDelete
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title='Deseja remover esse projeto?'
        onConfirm={handleDelete}
        className='bg-primary-1'
      />

      <ModalModifiedProject
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        projetoSelecionado={projetoSelecionadoEdit}
        onEdit={handleEdit}
      />
    </main>
  );
}
