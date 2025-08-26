import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { DecodeToken } from "./app/utils/DecodeToken";
import { AllowedModulesByProfiles } from "./app/core/data/AllowedModulesByProfiles";

type UserLogedCookiesValueType = {
  state: {
    auth: {
      access: string | null,
    }
  }
}

const PUBLIC_ROUTES = [
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/register/participante', whenAuthenticated: 'redirect' },
  { path: '/register/empresa', whenAuthenticated: 'redirect' },
  { path: '/', whenAuthenticated: 'allowed' },
] as const
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'
const COOKIE_NAME = 'userLoged'

export default function middleware(request: NextRequest){

  const path = request.nextUrl.pathname
  const publicRoute = PUBLIC_ROUTES.find(route => route.path === path)
  const userLogedCookies = request.cookies.get(COOKIE_NAME)

  let userLoged: UserLogedCookiesValueType | undefined = undefined
  if(userLogedCookies){
    try {
      userLoged = JSON.parse(userLogedCookies.value)
    } catch (error) {
      console.error("erro ao fazer o parse do cookie", error)
    }
  }

  const authToken = userLoged?.state.auth.access

  const isStaticFile = /\.(png|jpg|jpeg|gif|svg|webp|ico|txt|xml|ttf)$/.test(path);
  if (isStaticFile) {
    return NextResponse.next();
  }

  if(!authToken && publicRoute){
    return NextResponse.next()
  }

  if(!authToken && !publicRoute){
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/inicio'
    return NextResponse.redirect(redirectUrl)
  }

  if(authToken && !publicRoute){
    
    const tokenDecoded = DecodeToken(authToken)
    
    const currentModule = '/' + path.split('/')[1]
    const ALLOWED_MODULES_PROFILE = AllowedModulesByProfiles.filter(allowed => allowed.profile === tokenDecoded!.tipo_usuario)

    // VALIDAÇÃO DE TOKEN => VERIFICAR SE NÃO ESTÁ EXPIRADA
    const now = Math.floor(Date.now() / 1000);
    if(tokenDecoded!.exp < now){

      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
      redirectUrl.searchParams.set('expiredAccess', 'true')

      const response = NextResponse.redirect(redirectUrl)
      response.cookies.delete(COOKIE_NAME)

      return response
    }


    // SE PERFIL NÃO ESTIVER NAS ROTAS PERMITIDAS, REDIRECIONAR PARA A HOME ÁREA LOGADA (/inicio)
    if(!ALLOWED_MODULES_PROFILE.find(module => module.modulesAllowed.includes(currentModule))){
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/inicio'
      return NextResponse.redirect(redirectUrl)
    }

  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ]
}