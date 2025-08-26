'use client'

import { useForm } from "react-hook-form"
import SelectField from "./SelectField"
import ModalBase from "./shared/ModalBase"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import InputField from "./InputField"
import Checkbox from "./Checkbox"
import { MessageService } from "../services/message/MessageService"
import InputRange from "./InputRange"
import LogoText from "./LogoText"
import { twMerge } from "tailwind-merge"
import ButtonSubmit from "./shared/ButtonSubmit"
import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"
import { AreaFabricaService } from "../services/api/AreaFabricaService"
import { TecnologiaService } from "../services/api/TecnologiaService"
import { FormularioInscricaoService } from "../services/api/FormularioInscricaoService"

type ModalFormProps = {
  openModal: boolean,
  setOpenModal: (open: boolean) => void
}

const modalFormschema = z.object({
  area1: z
    .string()
    .min(1, { message: 'Selecione uma área' }),
  area2: z
    .string()
    .min(1, { message: 'Selecione uma área' }),
  outro: z
    .string()
    .optional(),

  nivel1: z.number(),
  nivel2: z.number(),

  tecnologias: z
    .array(z.string()),
})

type ModalFormschema = z.infer<typeof modalFormschema>

export default function ModalForm({ openModal, setOpenModal }: ModalFormProps) {

  const defaultValues: ModalFormschema = {
    area1: '',
    area2: '',
    outro: '',
    nivel1: 0,
    nivel2: 0,
    tecnologias: []
  }

  const{
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModalFormschema>({
    resolver: zodResolver(modalFormschema),
    defaultValues: defaultValues
  });

  // const areasTiOptions: {value: string, label:string}[] = [
  //   {value: "front", label: "Front-end"},
  //   {value: "back", label: "Back-end"},
  //   {value: "AD", label: "Análise de Dados"},
  //   {value: "jogos", label: "Jogos"},
  //   {value: "mobile", label: "Mobile"},
  //   {value: "PO", label: "Product Owner"},
  //   {value: "QA", label: "QA"}
  // ]

  // const tecnologias: {id: string, label: string, checked: boolean, register: UseFormRegisterReturn}[] = [
  //   {
  //     id: 'js',
  //     label: 'JavaScript',
  //     checked: watch().tecnologias.js,
  //     register: register('tecnologias.js')
  //   },
  //   {
  //     id: 'ts',
  //     label: 'TypeScript',
  //     checked: watch().tecnologias.ts,
  //     register: register('tecnologias.ts')
  //   },
  //   {
  //     id: 'django',
  //     label: 'Django (Python)',
  //     checked: watch().tecnologias.django,
  //     register: register('tecnologias.django')
  //   },
  //   {
  //     id: 'react',
  //     label: 'React (Javascript)',
  //     checked: watch().tecnologias.react,
  //     register: register('tecnologias.react')
  //   },
  //   {
  //     id: 'springboot',
  //     label: 'SpringBoot (Java)',
  //     checked: watch().tecnologias.springboot,
  //     register: register('tecnologias.springboot')
  //   },
  //   {
  //     id: 'next',
  //     label: 'Next.js',
  //     checked: watch().tecnologias.next,
  //     register: register('tecnologias.next')
  //   }
  // ]

  const {auth} = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [areasTiOptions, setAreasTiOptions] = useState<{value: string, label:string}[]>([])
  const [tecnologias, setTecnologias] = useState<{id: number, label: string}[]>([])

  const handleImmersion = async (data: ModalFormschema) => {
    
    if(auth?.access){

      setIsLoading(true)
      const response = await new FormularioInscricaoService(auth?.access).registerFormularioInscricao({
        primeira_opcao: Number(data.area1),
        segunda_opcao: Number(data.area2),
        interesses: [
          {
            area: Number(data.area1),
            nivel: data.nivel1
          },
          {
            area: Number(data.area2),
            nivel: data.nivel2
          }
        ],
        tecnologias: data.tecnologias.map(tec => Number(tec)),
        outras_tech: data.outro ? data.outro.split(",").map(outr => {
          return {
            nome: outr
          }
        }) : []
      })
      setIsLoading(false)
      
      const message = new MessageService()

      if(response){

        if(response.sucesso){
          message.success('Inscrição realizada com sucesso!')
          setOpenModal(false)
          reset(defaultValues);
          return
        }
        response.detalhes.map(detalhe => {
          message.error(detalhe)
        })
        return 
      }
      message.error('Erro ao buscar os dados.')
      return
    } 
  }

  async function getAreasFabrica() {
  
    if(auth?.access){
      setIsLoading(true)
      const response = await new AreaFabricaService(auth?.access).getAllAreaFabrica()
      setIsLoading(false)
      const message = new MessageService()

      if(response){

        if(response.sucesso && response.resultado){
          
          const areasTi: {value: string, label: string}[] = response.resultado.map(area => {
            return {
              value: String(area.id),
              label: area.nome
            }
          })

          setAreasTiOptions(areasTi)
          return
        }
        response.detalhes.map(detalhe => {
          message.error(detalhe)
        })
        return 
      }
      message.error('Erro ao buscar os dados.')
      return
    }
  }

  async function getTecnologias() {
  
    if(auth?.access){
      setIsLoading(true)
      const response = await new TecnologiaService(auth?.access).getAllTecnologia()
      setIsLoading(false)
      const message = new MessageService()

      if(response){

        if(response.sucesso && response.resultado){

          const tecnologias: {id: number, label: string}[] = response.resultado.map(tecnologia => {
            return{
              id: tecnologia.id,
              label: tecnologia.nome,
            }
          })
          setTecnologias(tecnologias)
          return
        }
        response.detalhes.map(detalhe => {
          message.error(detalhe)
        })
        return 
      }
      message.error('Erro ao buscar os dados.')
      return
    }
  }

  useEffect(() => {
  
      if(auth?.access){
        Promise.all([getAreasFabrica(), getTecnologias()])
      }
  
    }, [auth?.access])

  return (
    <ModalBase
      openModal={openModal}
      setOpenModal={setOpenModal}
      className='max-w-[500px] bg-[#2C2C2C] text-white'
      viewCloseButton={true}
    >
      <form
        onSubmit={handleSubmit(handleImmersion)}
        className='px-2 sm:px-10 flex flex-col items-center gap-4.5 text-[18px]'
      >
        <div className='max-w-48 sm:max-w-62 w-full'>
          <LogoText/>
        </div>
        <p className='font-louis-george-cafe text-center text-sm sm:text-base'>Venha participar do processo imersionista</p>
        <div className='bg-white h-[1px] w-full my-[-7px]'/>

        <div className="flex gap-4 w-full pt-2">
          <div className="flex flex-col gap-3 w-full">
            <label className="font-medium text-sm sm:text-base z-20">1° opção de área</label>
            <SelectField
              className={twMerge(
                'peer-focus:bg-[#2C2C2C] bg-[#2C2C2C]',
                !watch().area1 && "bg-transparent"
              )}
              id = "area1"
              label="Áreas de TI"
              register={register('area1')}
              error = {errors.area1}
              isInvalidOption={!watch().area1}
              options = {areasTiOptions}
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="font-medium text-sm sm:text-base z-20">2° opção de área</label>
            <SelectField
              className={twMerge(
                'peer-focus:bg-[#2C2C2C] bg-[#2C2C2C]',
                !watch().area2 && "bg-transparent"
              )}
              id = "area2"
              label="Áreas de TI"
              register={register('area2')}
              error = {errors.area2}
              isInvalidOption={!watch().area2}
              options = {areasTiOptions}
            />
          </div>
        </div>

        <div className="flex gap-4 w-full pt-2">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
              <label className="font-medium text-sm sm:text-base">Nível (1° opção)</label>
              <p className="text-[11px]">{watch().nivel1}-4</p>
            </div>
            <InputRange
              id="nivel1"
              max={4}
              min={0}
              step={1}
              initialValue={watch().nivel1}
              register={register("nivel1", { valueAsNumber: true })}
            />
            <p className="w-full px-1 flex justify-between text-[13px]"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span></p>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
              <label className="font-medium text-sm sm:text-base">Nível (2° opção)</label>
              <p className="text-[11px]">{watch().nivel2}-4</p>
            </div>
            <InputRange
              id="nivel2"
              max={4}
              min={0}
              step={1}
              initialValue={watch().nivel2}
              register={register("nivel2", { valueAsNumber: true })}
            />
            <p className="w-full px-1 flex justify-between text-[13px]"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span></p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start w-full">
          <label className="pl-1 font-medium text-sm sm:text-base">Tecnologias:</label>
          {errors.tecnologias && (
            <>{errors.tecnologias.message?.toString()}</>
          )}
          
          <div className="grid grid-cols-2 gap-2 w-full">
            {tecnologias.map(tecnologia => (
              <Checkbox
                key={tecnologia.id}
                id={String(tecnologia.id)}
                label={tecnologia.label}
                value={tecnologia.id}
                checked={watch('tecnologias').includes(String(tecnologia.id))}
                register={register('tecnologias')}
              />
            ))}
          </div>
        </div>
        
        <InputField
          id="outro"
          type="text"
          label="Outras Tecnologias (separe por vírgula)"
          register={register('outro')}
          className=" peer-focus:bg-[#2C2C2C] bg-[#2C2C2C]"
          classNameElement="mt-4"
        />

        <ButtonSubmit
          label="Inscrever-se"
          isLoading={isLoading}
          className="text-base md:text-base my-2 py-3 px-4 rounded-[13px] h-12"
          sizeLoading={25}
        />
      
      </form>
    </ModalBase>
  )
}
