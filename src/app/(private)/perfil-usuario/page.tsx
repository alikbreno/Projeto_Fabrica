'use client'

import ElementIsLoading from '@/app/components/shared/ElementIsLoading'
import { useAuth } from '@/app/context/useAuth'
import { UsuarioService } from '@/app/services/api/UsuarioService'
import { MessageService } from '@/app/services/message/MessageService'
import { UsuarioResponseType } from '@/app/types/ApiTypes/UsuarioResponseType'
import { DecodeToken } from '@/app/utils/DecodeToken'
import { maskCPF, maskPhone, maskRGM } from '@/app/utils/InputMasks'
import React, { useEffect, useState } from 'react'
import { LiaUserCircle } from 'react-icons/lia'

export default function PerfilUsuario() {

  const {auth} = useAuth()
  const decodedToken = DecodeToken(auth ? auth.access : '')
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<(UsuarioResponseType & {status: string[]}) | null>(null)

  function statusUser(membro: Record<string, boolean>) {
    return Object.entries(membro)
      .filter(([, valor]) => valor)
      .map(([chave]) => chave.charAt(0).toUpperCase() + chave.slice(1));
  }

  async function getUserData(id: number) {

    if(auth?.access){
      setIsLoading(true)
      const response = await new UsuarioService(auth?.access).getUserById(id)
      setIsLoading(false)
      const message = new MessageService()

      if(response){

        if(response.sucesso && response.resultado){
          const status = statusUser(response.resultado.membro)
          const userProps = {...response.resultado, status}
          setUser(userProps)
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

    if(decodedToken?.user_id && auth?.access){
      getUserData(decodedToken?.user_id)
    }

  }, [decodedToken?.user_id, auth?.access])

  return (
    <div className='px-[10px] bg-primary-4 flex md:items-center justify-center grow'>
      <ElementIsLoading isLoading={isloading}/>
      {(!isloading && user) && (
        <main className='text-white max-h-[600px] md:bg-primary-1 max-w-[800px] md:min-w-[550px] rounded-[20px] drop-shadow-[10px_10px_4px] drop-shadow-black/25 pb-5'>
          <header className='w-full md:bg-primary-3 h-[100px] rounded-[20px]'>
            <div className='pt-4 pl-4 md:pl-16 flex items-center gap-3 text-2xl font-semibold'>
              <LiaUserCircle className='w-18 h-18'/>
              {user?.nome}
            </div>
          </header>
          <article className='flex p-4 pl-8 md:pl-20'>
            <section className='flex flex-col justify-around w-[45%]'>
              <div>
                <h1 className='font-medium text-[18px]'>Email</h1>
                <p className='font-light break-words'>{user?.username}</p>
              </div>
              <div>
                <h1 className='font-medium text-[18px]'>Matrícula</h1>
                <p className='font-light'>{maskRGM(user?.rgm)}</p>
              </div>
              {/* <div>
                <h1 className='font-medium text-[18px]'>Área da imersão</h1>
                <p className='font-light'>Dev. Frot End</p>
              </div> */}
            </section>
            <div className='flex justify-center w-[8%]'>
              <div className='h-[215px] mt-7 w-1 bg-secondary-1'></div>
            </div>
            <section className='flex flex-col justify-around w-[45%]'>
              <div>
                <h1 className='font-medium text-[18px]'>CPF</h1>
                <p className='font-light'>{maskCPF(user?.cpf)}</p>
              </div>
              <div>
                <h1 className='font-medium text-[18px]'>Telefone</h1>
                <p className='font-light'>{maskPhone(user?.telefone)}</p>
              </div>
              <div>
                <h1 className='font-medium text-[18px]'>Status</h1>
                <p className='font-light'>{user?.status.join(', ')}</p>
              </div>
            </section>
          </article>
          {/* <div className='p-4 pl-8 md:pl-20 '>
            <h1 className='font-medium text-[18px]'>Experiência Prévia</h1>
            <p className='font-light max-h-[100px] overflow-auto md:scrollbar-none text-justify pr-5'>Atuou como front end em certa empresa</p>
          </div>
          <div className='flex justify-center'>     
            <button className='bg-secondary-2 rounded-[10px] py-[10px] px-[60px]'>Editar</button>
          </div>  */}
        </main>
      )}
    </div>
  )
}