'use client'

import CardAvailableImmersion from "@/app/components/CardAvailableImmersion";
import ElementIsLoading from "@/app/components/shared/ElementIsLoading";
import { useAuth } from "@/app/context/useAuth";
import { ImersaoService } from "@/app/services/api/ImersaoService";
import { MessageService } from "@/app/services/message/MessageService";
import { useEffect, useState } from "react";
// import { CardGeneralImmersion } from "@/app/components/CardGeneralImmersion";
// import Carrousel from "@/app/components/Carrousel";

type CardImersionProps = {
  title: string;
  dateIni: string;
  dateEnd: string;
  presenceState: string;
  status: string;
}

export default function Imersoes() {

  const {auth} = useAuth()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [availableImmersions, setAvailableImmersions] = useState<CardImersionProps[] | null>(null)

  async function getImersaoData() {
    
    if(auth?.access){
      setIsLoading(true)
      const response = await new ImersaoService(auth?.access).getAllImersao()
      setIsLoading(false)
      const message = new MessageService()

      if(response){

        if(response.sucesso && response.resultado){

          const imersoes: CardImersionProps[] = response.resultado.map(imersao => {
            return{
              title: `Imersão Fábrica de Software ${imersao.iteracao_nome}`,
              status: (imersao.usuario_inscricao === false || !imersao.usuario_inscricao) ? imersao.imersao_ativa === false ? "Indisponível" : "Inscrever-se" : "Inscrito",
              dateEnd: '',
              dateIni: '',
              presenceState: ''
            }
          })

          setAvailableImmersions(imersoes)

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
      getImersaoData()
    }

  }, [auth?.access])

  // const availableImmersions = [
  //   {
  //     title: "Imersão Fábrica de Software 2025.2",
  //     dateIni: "16/08/25",
  //     dateEnd: "28/08/25",
  //     presenceState: "Sem registro",
  //     status: "Inscrever-se"
  //   },
  //   {
  //     title: "Imersão Fábrica de Software 2025.1",
  //     dateIni: "16/02/25",
  //     dateEnd: "28/02/25",
  //     presenceState: "Em andamento",
  //     status: "Inscrito"
  //   }
  // ]

  // const generalImmersions = [
  //   {
  //     title: "Imersão Fábrica de Software 2024.2",
  //     dateIni: "16/08/24",
  //     dateEnd: "28/08/24",
  //     status: "Presente"
  //   },
  //   {
  //     title: "Imersão Fábrica de Software 2024.1",
  //     dateIni: "16/02/24",
  //     dateEnd: "28/02/24",
  //     status: "Ausente"
  //   },
  //   {
  //     title: "Imersão Fábrica de Software 2023.2",
  //     dateIni: "16/08/23",
  //     dateEnd: "28/08/23",
  //     status: "Ausente"
  //   }, 
  // ]

  return (
    <main className='text-white bg-gradient-to-b from-primary-5 to-[#411ccf] p-6 grow'>
      <ElementIsLoading isLoading={isloading}/>
      {(!isloading && availableImmersions) && (
        <div className='flex flex-col items-center gap-4 pt-4 max-w-[1024px] mx-auto'>
          <h1 className='text-[28px] font-coolvetica'>Imersões disponíveis</h1>
          
            <div className='flex flex-col items-center sm:flex-row gap-5 w-full'>
              {availableImmersions?.map((immersion, index) =>(
                <CardAvailableImmersion 
                  key={index}
                  {...immersion}
                />
              ))}
            </div>
          

          {/* <h1 className='px-4 pb-1 pt-4 text-[28px] font-coolvetica'>Imersões gerais</h1>
          <Carrousel
            Element={CardGeneralImmersion}
            items={generalImmersions}
            classNameCompensation="min-w-[calc(((100%-280px)/2)-24px)] sm:min-w-[calc(((100%-380px)/2)-40px)]"
          /> */}
          
        </div>
      )}
    </main>
  );
}
