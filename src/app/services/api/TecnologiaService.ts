import { ApiResponse } from "@/app/types/ApiTypes/ApiResponseType"
import { apiInstance } from "./apiInstance"
import { AxiosError, AxiosResponse } from "axios"

type TecnologiaResponseType = {
  id: number
  nome: string
  ativa: boolean
}

export class TecnologiaService {

  constructor(token: string){
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public async getAllTecnologia(): Promise<ApiResponse<TecnologiaResponseType[]> | null>{
    try {
      const response: AxiosResponse<ApiResponse<TecnologiaResponseType[]>> = await apiInstance.get('/tecnologia/')
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<TecnologiaResponseType[]>
        return {
          ...errorData
        }
      }
      return null
    } 
  }
  
}