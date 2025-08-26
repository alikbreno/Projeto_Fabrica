import Header from "@/app/components/header/Header";
import { MenuTreeType } from "@/app/types/MenuTypes/MenuTreeType";

export default function RootLayout({ children }: { children: React.ReactNode}){

  const menuTree: MenuTreeType[] = [
    {
      id: '01',
      title: 'Dashboard',
      href: '/administrador',
    },
    {
      id: '02',
      title: 'Gestão',
      href: '',
      children: [
        {
          id: '02',
          title: 'Gestão de Imersões',
          href: '',
          children: [
            {
              id: '01',
              title: 'Imersões',
              href: '/administrador/gestao-imersao',
            },
            {
              id: '02',
              title: 'Palestras',
              href: '/administrador/gestao-palestra',
            },
            {
              id: '03',
              title: 'Workshops',
              href: '/administrador/gestao-workshop',
            },
          ]
        },
        {
          id: '03',
          title: 'Gestão de Projetos',
          href: '',
          children: [
            {
              id: '01',
              title: 'Projetos',
              href: '/administrador/gestao-projeto',
            },
            {
              id: '02',
              title: 'Equipes',
              href: '/administrador/gestao-equipe',
            },  
          ]
        },
        {
          id: '04',
          title: 'Gestão de Usuários',
          href: '',
          children: [
            {
              id: '01',
              title: 'Usuários',
              href: '/administrador/usuarios',
            },
            {
              id: '02',
              title: 'Imersionistas',
              href: '/administrador/gestao-imersionistas',
            },
            {
              id: '03',
              title: 'Extensionistas',
              href: '/administrador/gestao-extensionistas',
            },
          ]
        },
      ]
    },
  ]

  return (
    <> 
      <Header navigation={{menuTitle: 'Administrador', menuTree: menuTree}}/>
      {children}
    </>
  );
}