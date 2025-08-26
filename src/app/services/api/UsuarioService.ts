import { ApiResponse } from "@/app/types/ApiTypes/ApiResponseType"
import { apiInstance } from "./apiInstance"
import { AxiosError, AxiosResponse } from "axios"
import { UsuarioResponseType } from "@/app/types/ApiTypes/UsuarioResponseType"

export class UsuarioService {

  constructor(token: string){
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  
  public async getUserById(id: number): Promise<ApiResponse<UsuarioResponseType> | null>{
    try {
      const response: AxiosResponse<ApiResponse<UsuarioResponseType>> = await apiInstance.get(`/usuario/${id}/perfil`)
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
  
}