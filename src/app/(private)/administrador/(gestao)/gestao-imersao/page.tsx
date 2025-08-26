'use client';

import React, { useEffect, useState } from 'react';
// import { CiSearch } from "react-icons/ci";
// import CardProjectsAdmin from '@/app/components/CardProjectsAdmin';
import ModalDelete from '@/app/components/ModalDelete';
// import { twMerge } from 'tailwind-merge';
import CardCreateImersaoAdmin from '@/app/components/CardCreateImersaoAdmin';
// import ModalModifiedImersao, { FormData, Imersao } from '@/app/components/ModalModifiedImersao';
// import ModalCreateImersao from '@/app/components/ModalCreateImersao';
// import CardImersaoAdmin from '@/app/components/CardImersaoAdmin';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuth } from '@/app/context/useAuth';
import { ImersaoService } from '@/app/services/api/ImersaoService';
import { MessageService } from '@/app/services/message/MessageService';
import ElementIsLoading from '@/app/components/shared/ElementIsLoading';
import ModalBase from '@/app/components/shared/ModalBase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '@/app/components/InputField';

type ImersaoProps = {
    id: number
    ano: number
    semestre: number
    iteracao_nome: string
  }

export default function HomeGestaoImersao() {

  
  // const [openModalEdit, setOpenModalEdit] = useState(false);

  
  // const [imersoes, setImersoes] = useState<Imersao[]>([
  //   {
  //     id: '1',
  //     nome_imersao: 'Imersão Fábrica de Software 2025.2',
  //     status: 'Sem registro',
  //     data_inicio: '16/02/25',
  //     data_final: '28/02/25',
  //   },
  //   {
  //     id: '2',
  //     nome_imersao: 'Imersão Fábrica de Software 2025.1',
  //     status: 'Em andamento',
  //     data_inicio: '16/02/25',
  //     data_final: '28/02/25',
  //   },
  //   {
  //     id: '3',
  //     nome_imersao: 'Imersão Fábrica de Software 2024.2',
  //     status: 'Concluído',
  //     data_inicio: '16/08/24',
  //     data_final: '28/08/24',
  //   },
  // ]);

  // const [search, setSearch] = useState('');
  // const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null);

  // const imersoesFiltrados = imersoes.filter((imersao) => {
  //   const atendeStatus = statusSelecionado ? imersao.status === statusSelecionado : true;
  //   const atendeBusca = search.length > 0 ? imersao.nome_imersao.toLowerCase().includes(search.toLowerCase()) : true;
  //   return atendeStatus && atendeBusca;
  // });

  // const buttons = ['Em andamento', 'Concluído'];

  // function handleCreateImersao(data: FormData) {
  //   const novaImersao: Imersao = {
  //     id: Math.random().toString(),
  //     nome_imersao: data.nome_imersao,
  //     status: 'Sem Registro',
  //     data_inicio: data.data_inicio,
  //     data_final: data.data_final,
  //   };
  //   setImersoes((prev) => [...prev, novaImersao]);
  //   setOpenModalCreate(false);
  // }

  

  // function handleEdit(data: FormData) {
  //   if (!imersaoSelecionadaEdit) return;

  //   setImersoes((prev) =>
  //     prev.map((item) =>
  //       item.id === imersaoSelecionadaEdit.id
  //         ? {
  //             ...item,
  //             nome_imersao: data.nome_imersao,
  //             data_inicio: data.data_inicio,
  //             data_final: data.data_final,
  //           }
  //         : item
  //     )
  //   );
  //   setOpenModalEdit(false);
  //   setImersaoSelecionadaEdit(null);
  // }

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [imersaoSelecionadaDelete, setImersaoSelecionadaDelete] = useState<number | null>(null);
  const [imersaoSelecionadaEdit, setImersaoSelecionadaEdit] = useState<ImersaoProps | null>(null);

  const {auth} = useAuth()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [imersoesData, setImersoesData] = useState<ImersaoProps[] | null>(null)

  // CARREGAR TODAS IMERSOES
  async function getImersaoData() {
  
    if(auth?.access){
      setIsLoading(true)
      const response = await new ImersaoService(auth?.access).getAllImersao()
      setIsLoading(false)
      const message = new MessageService()

      if(response){

        if(response.sucesso && response.resultado){

          const imersoes: ImersaoProps[] = response.resultado.map(imersao => {
            const [ano, semestre] = imersao.iteracao_nome.split(".")
            return{
              id: imersao.id,
              ano: Number(ano),
              semestre: Number(semestre),
              iteracao_nome: imersao.iteracao_nome
            }
          })

          setImersoesData(imersoes)
          return
        }

        return response.detalhes.map(detalhe => {
          message.error(detalhe)
        })
      }

      return message.error('Erro ao buscar os dados.')
    }
  }

  //CRIAR - EDITAR IMERSÃO
  async function CriarModificarImersao(data: FormDataImersao, id?: number) {

    if(auth?.access){

      const message = new MessageService()

      if(id){
        setIsLoading(true)
        const response = await new ImersaoService(auth?.access).updateImersao({ano: Number(data.ano), semestre: Number(data.semestre)}, id)
        setIsLoading(false)

        if(response){

        if(response.sucesso && response.resultado){
          message.success('Edição realizada com sucesso!')
          const [ano, semestre] = response.resultado.iteracao_nome.split(".")

          const attImersao = {
            id: response.resultado.id,
            ano: Number(ano),
            semestre: Number(semestre),
            iteracao_nome: response.resultado.iteracao_nome,
          }

          setImersoesData(prev => {
            if (!prev) return prev;

            const index = prev.findIndex(i => i.id === attImersao.id);
            if (index === -1) return prev;

            const prox = [...prev];
            prox[index] = attImersao;
            return prox;
          });

          setOpenModalCreate(false);
          return
        }

        return response.detalhes.map(detalhe => {
          message.error(detalhe)
        })
        
      }

      return message.error('Erro ao buscar os dados.')

      }

      setIsLoading(true)
      const response = await new ImersaoService(auth?.access).registerImersao({ano: Number(data.ano), semestre: Number(data.semestre)})
      setIsLoading(false)

      if(response){

        if(response.sucesso && response.resultado){
          message.success('Cadastro realizado com sucesso!')
          const [ano, semestre] = response.resultado!.iteracao_nome.split(".")

          const newImersao = {
            ano: Number(ano),
            semestre: Number(semestre),
            iteracao_nome: response.resultado.iteracao_nome,
            id: response.resultado.id
          }
      
          setImersoesData(prev =>
            prev ? [...prev, newImersao] : [newImersao]
          );
          setOpenModalCreate(false);
          return
        }

        return response.detalhes.map(detalhe => {
          message.error(detalhe)
        })  
      }
      return message.error('Erro ao buscar os dados.')
    }
  }

  // EXCLUIR IMERSAO
  async function handleDelete() {

    if(auth?.access){
      
      const message = new MessageService()

      setIsLoading(true)
      const response = await new ImersaoService(auth?.access).deleteImersao(imersaoSelecionadaDelete!)
      setIsLoading(false)

      if(response){

        if(response.sucesso && response.resultado){
          message.success('Exclusão realizada com sucesso!')

          setImersoesData(prev =>
            prev ? prev.filter(item => item.id !== imersaoSelecionadaDelete) : null
          );
          
          setOpenModalDelete(false);
          setImersaoSelecionadaDelete(null);
          return
        }

        return response.detalhes.map(detalhe => {
          message.error(detalhe)
        })
        
      }
      return message.error('Erro ao buscar os dados.')
    }
  }

  function OpenModalCreateImersao(){
    setImersaoSelecionadaEdit(null)
    setOpenModalCreate(true)
  }

  useEffect(() => {

    if(auth?.access){
      getImersaoData()
    }

  }, [auth?.access])

  return (
    <main className='bg-gradient-to-b from-[#411CCF] to-[#17113A] grow overflow-x-hidden'>
      
          <div className="flex flex-col md:flex-row w-full min-h-[100px] items-center justify-center gap-4 md:gap-10 px-4 pt-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 md:gap-10">
              <h1 className="text-white text-[24px] sm:text-[28px] md:text-[30px] whitespace-nowrap font-coolvetica text-center sm:text-left">
                Imersões gerais
              </h1>

              {/* <div className="relative w-full max-w-[550px] h-[48px] bg-white rounded-[60px] flex items-center px-4">
                <input
                  type="text"
                  placeholder="Pesquise por nome"
                  className="w-full h-full bg-transparent outline-none text-black text-[15px] sm:text-[16px] placeholder:text-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CiSearch className="absolute right-4 text-[22px] text-black" />
              </div> */}
            </div>

            {/* <div className="flex flex-row gap-3 justify-center">
              {buttons.map((item) => (
                <button
                  key={item}
                  onClick={() => setStatusSelecionado(item === statusSelecionado ? null : item)}
                  className={twMerge("text-white cursor-pointer text-[16px] sm:text-[18px] md:text-[20px] font-roboto px-4 py-2 rounded-[15px] bg-[#2C2C2C] flex items-center justify-center",
                    item === statusSelecionado && 'bg-secondary-1'
                  )}
                >
                  {item}
                </button>
              ))}
            </div> */}

          </div>


          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 w-full my-4 px-10'>
            <CardCreateImersaoAdmin onOpenModal={OpenModalCreateImersao} />
            
            <ElementIsLoading isLoading={isloading}/>
            {(!isloading && imersoesData) && (
              
              imersoesData.map(imersao => (
                <CardImersao
                  key={imersao.id}
                  imersao={imersao}
                  setOpenModalDelete={setOpenModalDelete}
                  setImersaoSelecionadaDelete={setImersaoSelecionadaDelete}
                  setImersaoSelecionadaEdit={setImersaoSelecionadaEdit}
                  setOpenModalEdit={() => setOpenModalCreate(true)}
                />
              ))
            )}

          </div>

          <ModalCreateEditImersao
            openModal={openModalCreate}
            setOpenModal={setOpenModalCreate}
            onSubmit={CriarModificarImersao}
            imsersaoData={imersaoSelecionadaEdit}
          />

          <ModalDelete
            openModal={openModalDelete}
            setOpenModal={setOpenModalDelete}
            title='Deseja remover essa imersão?'
            onConfirm={handleDelete}
            className='bg-primary-1 h-auto'
          />
    </main>
  );
}

type CardImersaoProps = {
  imersao: ImersaoProps;
  setOpenModalDelete: (value: boolean) => void;
  setImersaoSelecionadaDelete: (value: number) => void;
  setOpenModalEdit: (value: boolean) => void;
  setImersaoSelecionadaEdit: (value: ImersaoProps) => void;
};

function CardImersao({
  imersao, 
  setOpenModalDelete, 
  setImersaoSelecionadaDelete,
  setOpenModalEdit,
  setImersaoSelecionadaEdit,
}: CardImersaoProps){

  return(
    <div className='flex flex-col self-stretch min-h-60 w-full sm:min-w-[290px] rounded-[20px] bg-[#2C2C2C] drop-shadow-[7px_4px_1px] drop-shadow-[#FFB01C]/50 gap-2'>
      <div className='bg-[#1E1E1E] p-5 pl-13 rounded-[20px]'>
        <div className='flex flex-row justify-end gap-5'>
          <FiEdit 
            onClick={() => {
              setImersaoSelecionadaEdit(imersao);
              setOpenModalEdit(true);
            }}
            className='text-white text-[30px] cursor-pointer'
          />
          <RiDeleteBin6Line 
            onClick={() => {
              setOpenModalDelete(true);
              setImersaoSelecionadaDelete(imersao.id);
            }}
            className='text-white text-[30px] cursor-pointer'
          /> 
        </div>

        <h1 className='text-3xl sm:text-2xl text-white max-w-[380px]'>
          {`Imersão Fábrica de Software ${imersao.iteracao_nome}`}
        </h1>
      </div>
          
      {/* <p className='px-13 text-lg sm:text-xl font-light line-clamp-3 font-roboto text-white'>
        Data: {imersao.data_inicio} a {imersao.data_final}
      </p> */}
      <div className='flex flex-col'>
        <div className='flex items-center gap-1 px-13'>
          <div className='w-[3px] h-[28px] bg-white'/>
          {/* <div
            className={twMerge(
              'rounded-[6px] w-fit py-1 px-2 min-w-[115px]',
              imersao.status === 'Em andamento'
                ? 'bg-secondary-3/81 text-[#FFEA74]'
                : imersao.status === 'Concluído'
                  ? 'bg-secondary-4/70 text-[#C3FFCE]'
                  : 'bg-[#ACA5A5]/71 text-white'
            )}
          >             
            <p className='text-lg font-louis-george-cafe text-center italic'>
              {imersao.status}
            </p>        
          </div> */}
        </div>
        
        {/* <a 
          href="#"
          className='pr-5 pb-4 text-white underline text-[16px] cursor-pointer self-end'  
        >
          Ver detalhes
        </a> */}
      </div>
          
    </div>
  )
}

type ModalCreateImersaoProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onSubmit: (data: FormDataImersao, id?: number) => void;
  imsersaoData?: ImersaoProps | null;
};

const schema = z.object({
  ano: z
    .string()
    .regex(/^\d{4}$/, { message: "O ano deve ter 4 dígitos" }),

  semestre: z
    .string()
    .regex(/^[12]$/, { message: "O semestre deve ser 1 ou 2" }),
});

type FormDataImersao = z.infer<typeof schema>;

function ModalCreateEditImersao({
  openModal,
  setOpenModal,
  onSubmit,
  imsersaoData
}: ModalCreateImersaoProps){

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataImersao>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (imsersaoData) {
      setValue('ano', String(imsersaoData?.ano))
      setValue('semestre', String(imsersaoData?.semestre))
    }else{
      setValue('ano', '')
      setValue('semestre', '')
    }

  }, [imsersaoData]);
  
  function handleRegister(data: FormDataImersao) {

    if(imsersaoData){
      onSubmit(data, imsersaoData.id);
    }else{
      onSubmit(data);
    }
  }

  function onCloseModal(open: boolean){
    setOpenModal(open)
  }

  return(
    <ModalBase
      openModal={openModal}
      setOpenModal={onCloseModal}
      className="bg-primary-1 w-full max-w-[500px]"
    >
      <div className="flex flex-col gap-5 px-10 py-5">
        <h2 className="pl-5 text-[28px] text-white font-coolvetica font-semibold">
          {imsersaoData ? "Modificar Imersão" : "Criar Imersão"}
        </h2>
        <div className="px-5">
          <div className="bg-white mb-5 h-[4px] rounded-[5px] w-full" />
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid grid-cols-1 md:gap-y-10 gap-y-6 w-full"
        >
          <InputField
            id="ano"
            label="Ano"
            register={register("ano")}
            error={errors.ano}
            className="peer-focus:bg-primary-1 bg-primary-1"
          />

          <InputField
            id="semestre"
            label="Semestre"
            register={register("semestre")}
            error={errors.semestre}
            className="peer-focus:bg-primary-1 bg-primary-1"
          />

          <div className="flex min-w-30 md:min-w-[20px] justify-center">
            <button
              type="submit"
              className="bg-secondary-1 hover:brightness-90 cursor-pointer transition text-white rounded-[10px] w-full max-w-[100px] md:max-w-[200px] py-3 font-roboto text-[18px]"
            >
            {imsersaoData ? "Modificar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </ModalBase>
  )
}