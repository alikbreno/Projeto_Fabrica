import { ApiResponse } from "@/app/types/ApiTypes/ApiResponseType"
import { apiInstance } from "./apiInstance"
import { AxiosError, AxiosResponse } from "axios"
import { UsuarioResponseType } from "@/app/types/ApiTypes/UsuarioResponseType"

type DataPropsParticipante = {
  perfil: 'participante'
  nome: string,
  username: string,
  password: string,
  telefone?: string
  cpf: string,
  rgm: string,
  curso: string,
  outro_curso?: string,
  periodo: number,
}

type DataPropsEmpresa = {
  usuario: {
    nome: string,
    username: string,
    password: string,
    telefone?: string
  },
  cnpj: string,
  representante: string,
}

type ResultadoPropsEmpresa = {
  id: number,
  usuario: {
    id: number,
    nome: string,
    username: string,
    telefone?: string
  },
  cnpj: string,
  representante: string,
}

export class RegisterService {

  constructor(){}
  
  public async registerParticipante(data: DataPropsParticipante): Promise<ApiResponse<UsuarioResponseType> | null>{
    try {
      const response: AxiosResponse<ApiResponse<UsuarioResponseType>> = await apiInstance.post('/usuario/', data)
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<UsuarioResponseType>
        return {
          ...errorData
        }
      }
      return null
    } 
  }

  public async registerEmpresa(data: DataPropsEmpresa): Promise<ApiResponse<ResultadoPropsEmpresa> | null>{
    try {
      const response: AxiosResponse<ApiResponse<ResultadoPropsEmpresa>> = await apiInstance.post('/empresa/', data)
      console.log(response)
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<ResultadoPropsEmpresa>
        console.log(errorData)
        return {
          ...errorData
        }
      }
      return null
    } 
  }
  
}