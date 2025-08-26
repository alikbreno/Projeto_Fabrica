export type UsuarioResponseType = {
  id: number,
  id_usuario: number,
  nome: string,
  username: string,
  telefone?: string
  cpf: string,
  rgm: string,
  curso: string,
  outro_curso?: string,
  periodo: number,
  membro: {
    imersionista: boolean
  }
}