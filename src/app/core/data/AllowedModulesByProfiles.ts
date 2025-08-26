type AllowedModulesByProfilesProps = {
  profile: string,
  modulesAllowed: string[]
}

export const AllowedModulesByProfiles: AllowedModulesByProfilesProps[]  = [
  {
    profile: 'ADMIN',
    modulesAllowed: ['/inicio', '/agenda-eventos', '/imersoes', '/projetos-extensao', '/contato', '/perfil-usuario', '/administrador']
  },
  {
    profile: 'PART',
    modulesAllowed: ['/inicio', '/agenda-eventos', '/imersoes', '/projetos-extensao', '/contato', '/perfil-usuario',]
  },
]