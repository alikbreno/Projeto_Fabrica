import { ApiResponse } from "@/app/types/ApiTypes/ApiResponseType"
import { apiInstance } from "./apiInstance"
import { AxiosError, AxiosResponse } from "axios"

type FormularioInscricaoType = {
  id: number,
  usuario_id: number,
  participante: number,
  participante_nome: string,
  imersao: number,
  imersao_info: string,
  data_inscricao: string,
  primeira_opcao: number,
  primeira_opcao_nome: string,
  segunda_opcao: number,
  segunda_opcao_nome: string,
  interesses:
    {
      area_nome: string,
      nivel: number
    }[]
}

type FormularioInscricaoResponseType = {
  id: number,
  autor: string,
  primeira_opcao: number,
  primeira_info: string,
  segunda_opcao: number,
  segunda_info: string,
  tecnologias: number[],
  tecnologias_info: 
    {
      nome: string
    }[]
}

type FormularioInscricaoData = {
  tecnologias: number[],
  primeira_opcao: number,
  segunda_opcao: number,
  interesses: 
    {
      area: number,
      nivel: number
    }[]
  ,
  outras_tech?: 
    {
      nome: string
    }[]
}

export class FormularioInscricaoService {

  constructor(token: string){
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public async getAllFormularioInscricao(): Promise<ApiResponse<FormularioInscricaoType[]> | null>{
    try {
      const response: AxiosResponse<ApiResponse<FormularioInscricaoType[]>> = await apiInstance.get('/formulario_inscricao/')
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<FormularioInscricaoType[]>
        return {
          ...errorData
        }
      }
      return null
    } 
  }

  public async registerFormularioInscricao(data: FormularioInscricaoData): Promise<ApiResponse<FormularioInscricaoResponseType> | null>{
      try {
        const response: AxiosResponse<ApiResponse<FormularioInscricaoResponseType>> = await apiInstance.post('/formulario_inscricao/', data)
        if(response){
          return {
            ...response.data
          }
        }
        return null
      } catch (error) {
        if(error instanceof AxiosError){
          const errorData = error.response?.data as ApiResponse<FormularioInscricaoResponseType>
          return {
            ...errorData
          }
        }
        return null
      } 
    }
  
}