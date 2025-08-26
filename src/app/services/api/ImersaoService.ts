import { AxiosError, AxiosResponse } from "axios"
import { apiInstance } from "./apiInstance"
import { ApiResponse } from "@/app/types/ApiTypes/ApiResponseType"

type DataProspImersao = {
  ano: number,
  semestre: number,
}

type ImersaoResponseType = {
  id: number,
  iteracao: number,
  iteracao_nome: string
}

type ImersaoGetAllType = {
  id: number,
  iteracao: number,
  iteracao_nome: string,
  usuario_inscricao: boolean | null,
  imersao_ativa: boolean
}

export class ImersaoService {

  constructor(token: string){
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public async getAllImersao(): Promise<ApiResponse<ImersaoGetAllType[]> | null>{
    try {
      const response: AxiosResponse<ApiResponse<ImersaoGetAllType[]>> = await apiInstance.get('/imersao/')
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<ImersaoGetAllType[]>
        return {
          ...errorData
        }
      }
      return null
    } 
  }
  
  public async registerImersao(data: DataProspImersao): Promise<ApiResponse<ImersaoResponseType> | null>{
    try {
      const response: AxiosResponse<ApiResponse<ImersaoResponseType>> = await apiInstance.post('/imersao/', data)
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<ImersaoResponseType>
        return {
          ...errorData
        }
      }
      return null
    } 
  }

  public async updateImersao(data: DataProspImersao, id: number): Promise<ApiResponse<ImersaoResponseType> | null>{
    try {
      const response: AxiosResponse<ApiResponse<ImersaoResponseType>> = await apiInstance.put(`/imersao/${id}/`, data)
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<ImersaoResponseType>
        return {
          ...errorData
        }
      }
      return null
    }
  }

  public async deleteImersao(id: number): Promise<ApiResponse<ImersaoResponseType> | null>{
    try {
      const response: AxiosResponse<ApiResponse<ImersaoResponseType>> = await apiInstance.delete(`/imersao/${id}/`)
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<ImersaoResponseType>
        return {
          ...errorData
        }
      }
      return null
    }
  }
  
}