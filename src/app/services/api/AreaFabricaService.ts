import { ApiResponse } from "@/app/types/ApiTypes/ApiResponseType"
import { apiInstance } from "./apiInstance"
import { AxiosError, AxiosResponse } from "axios"

type AreaFabricaResponseType = {
  id: number
  nome: string
  ativa: boolean
}

export class AreaFabricaService {

  constructor(token: string){
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public async getAllAreaFabrica(): Promise<ApiResponse<AreaFabricaResponseType[]> | null>{
    try {
      const response: AxiosResponse<ApiResponse<AreaFabricaResponseType[]>> = await apiInstance.get('/area_fabrica/')
      if(response){
        return {
          ...response.data
        }
      }
      return null
    } catch (error) {
      if(error instanceof AxiosError){
        const errorData = error.response?.data as ApiResponse<AreaFabricaResponseType[]>
        return {
          ...errorData
        }
      }
      return null
    } 
  }
  
}