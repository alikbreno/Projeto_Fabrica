'use client'

import React, { useEffect, useState } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
// import TextareaField from '@/app/components/TextArea';
import Link from 'next/link';
import { cleanMasksNumeralDocuments, maskCPF, maskPhone, maskRGM } from '@/app/utils/InputMasks';
import { isValidCpfFormat, isValidPhoneFormat, isValidRGMFormat } from '@/app/utils/InputValidators';
import { RegisterService } from '@/app/services/api/RegisterService';
import { MessageService } from '@/app/services/message/MessageService';
import { useRouter } from 'next/navigation';
import ButtonSubmit from '@/app/components/shared/ButtonSubmit';
import LogoText from '@/app/components/LogoText';
import Checkbox from '@/app/components/Checkbox';
import ModalBase from '@/app/components/shared/ModalBase';

const schema = z.object({
  nome: z
    .string()
    .min(1, {message: 'Preenchimento obrigatório'}),
  username: z
    .string()
    .email({message: 'Digite um email válido'}),
  // email_institucional: z
  //   .string()
  //   .email({message: 'Digite um email válido'}),
  password: z
    .string()
    .min(1, {message: "Preenchimento obrigatório"})
    .max(30, {message: "O campo não deve ter mais que 30 caracteres"})
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {message: 'A senha deve conter pelo menos, 8 caracteres, uma letra minúscula, uma maiúscula e um número'}),
  confirmPassword: z
    .string()
    .min(1, {message: "Preenchimento obrigatório"})
    .max(30, {message: "O campo não deve ter mais que 30 caracteres"}),
  telefone: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || val.trim() === '' || isValidPhoneFormat(val),
      { message: 'Formato de telefone inválido' }
    ),
  cpf: z
    .string()
    .min(1, {message: 'Preenchimento Obrigatório'})
    .refine(isValidCpfFormat, {message: "XXX.XXX.XXX-XX"}),
  rgm: z
    .string()
    .refine(isValidRGMFormat, {message: 'RGM possui 8 dígitos'}),
    // .max(8, {message: 'RGM possui 8 números'}),
  curso: z
    .string()
    .min(1, { message: 'Selecione um curso' }),
  outro_curso: z
    .string()
    .optional(),
  periodo: z
    .string()
    .min(1, {message: 'Selecione um período'})
    .transform((num) => Number(num)),
  acceptTerms: z.literal(true, {
    errorMap: () => ({message: "É necessário aceitar os termos"}),
  })
  // experienciaprevia: z
  //   .string()
  //   .optional(),
})
.refine((data) => {
  if(data.curso === 'OTR'){
    return data.outro_curso && data.outro_curso.trim() !== '';
  }
  return true;
},{
  message: 'Informe o nome do curso',
  path: ['outro_curso'],
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas devem ser iguais.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>

export default function Participante() {

  const{
    register,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      outro_curso: ''
    }
  });

  const [isloading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  async function handleRegister(data: FormData){
    
    setIsLoading(true)
    const response = await new RegisterService().registerParticipante({
      perfil: 'participante',
      nome: data.nome,
      username: data.username,
      password: data.password,
      telefone: data.telefone,
      cpf: cleanMasksNumeralDocuments(data.cpf),
      rgm: data.rgm,
      curso: data.curso,
      outro_curso: data.outro_curso,
      periodo: data.periodo,
    })
    setIsLoading(false)

    const message = new MessageService()
    
    if(response){

      if(response.sucesso){
        message.success('Cadastro realizado com sucesso!')
        return router.push("/sign-in");
      }

      return response.detalhes.map(detalhe => {
        message.error(detalhe)
      })
      
    }

    return message.error('Erro ao buscar os dados.')
  }

  useEffect(() => {
    if(watch().telefone === ''){
      clearErrors('telefone')
    }

    if(watch().curso !== 'OTR'){
      setValue('outro_curso', '')
    }
  }, [watch().telefone, watch().curso])

  return (
    <main className='flex items-center-safe justify-center-safe bg-primary-4 min-h-svh p-4 pb-8'>
      <div className='flex flex-col gap-8 md:gap-12 w-full max-w-[850px] bg-primary-2 rounded-2xl justify-center items-center px-4 md:px-6 py-4 drop-shadow-[0px_10px_0px] drop-shadow-secondary-2'>
        
        <div className='flex flex-col items-center gap-4 w-full'>
          {/* <Link
            href={'/'}
            className='w-full max-w-50 md:max-w-60'
          >
            <picture>
              <img 
                src="/images/logos/branca-com-preenchimento/branco-com-preenchimento-letreiro-horizontal.png" 
                alt="Logo Fábrica de Software"
                className='w-full h-full object-contain'
              />
            </picture>
          </Link> */}
          <Link href={'/'} className='max-w-50 md:max-w-60 w-full'>
            <LogoText/>
          </Link>
          <p className='text-white font-louis-george-cafe text-xl md:text-2xl text-center'>
            Venha participar do  processo de imersão
          </p>
          <div className="bg-white h-[1px] w-full max-w-[503px]" />
        </div>

        <form 
          className='grid md:grid-cols-2 gap-x-[80px] gap-y-8 w-full max-w-[750px]'
          onSubmit={handleSubmit(handleRegister)}
        >
          <InputField
            id="nome"
            label="Nome completo"
            register={register('nome')}
            error={errors.nome}
          />

          <InputField
            id="cpf"
            label="CPF"
            register={register('cpf', {onChange(event) {
              setValue('cpf', maskCPF(event.target.value))
            },})}
            error={errors.cpf}
          />

          <InputField
            id="email"
            label="Email (Login)"
            register={register('username')}
            error={errors.username}
          />

          {/* <InputField
            id="email_institucional"
            label="Email Institucional"
            register={register('email_institucional')}
            error={errors.email_institucional}
          /> */}

          <InputField
            id="rgm"
            label="Matricula (RGM)"
            register={register('rgm', {onChange(event) {
              setValue('rgm', maskRGM(event.target.value))
            },})}
            error={errors.rgm}
          />

          <InputField
            id="telefone"
            label="Telefone"
            register={register('telefone', {onChange(event) {
              setValue('telefone', maskPhone(event.target.value))
            },})}
            error={errors.telefone}
          />

          {/* <InputField
              id="periodo"
              label="Periodo"
              placeholder='Digite seu período aqui...'
              register={register('periodo')}
              error={errors.periodo}
          /> */}

          <SelectField
            id = "periodo"
            label = "Período"
            register={register('periodo')}
            error = {errors.periodo}
            isInvalidOption={!watch().periodo}
            defaultValue = ""
            options = {[
              {value: 1, label: "1°"},
              {value: 2, label: "2º"},
              {value: 3, label: "3º"},
              {value: 4, label: "4º"},
              {value: 5, label: "5°"},
              {value: 6, label: "6°"},
              {value: 7, label: "7º"},
              {value: 8, label: "8º"}
            ]}
          />

          <SelectField
            id = "curso"
            label = "Curso"
            register={register('curso')}
            error = {errors.curso}
            isInvalidOption={!watch().curso}
            defaultValue = ""
            options = {[
              {value: "ADS", label: "Análise e Desenvolvimento de Sistemas"},
              {value: "CC", label: "Ciência da Computação"},
              {value: "CD", label: "Ciência de Dados"},
              // {value: "gti", label: "Gestão da Tecnologia da Informação"},
              {value: "redescomp", label: "Redes de Computadores"},
              // {value: "SI", label: "Sistemas para Internet"},
              {value: "OTR", label: "Outro"}
            ]}
          />

          {watch().curso === 'OTR' && (
            <div className="col-span-2 md:col-span-1 w-full">
              <InputField
                id="outro_curso"
                label= "Informe seu curso"
                register={register('outro_curso')}
                error={errors.outro_curso}
              />
            </div>
          )}

          <InputField
            id="password"
            type='password'
            label= "Senha"
            register={register('password')}
            error={errors.password}
          />

          <InputField
            id="confirmPassword"
            type='password'
            label= "Confirmar Senha"
            register={register('confirmPassword')}
            error={errors.confirmPassword}
          />

          {/* <div className='md:col-span-2'>
          <TextareaField
            id="experienciaprevia"
            label="Experiência Prévia"
            placeholder="Insira aqui sua experiência prévia"
            register={register}
          />
          </div> */}

          <div className='relative col-span-2 flex flex-col gap-2'>
            <button
              type='button'
              onClick={() => setOpenModal(true)}
              className='text-white text-lg underline w-full cursor-pointer hover:text-secondary-1 hover:drop-shadow-primary-4 hover:drop-shadow transition-colors'
            >
              Termo de Consentimento para Tratamento de Dados Pessoais
            </button>
            <Checkbox
              id='terms'
              label='Li e aceito os termos do presente Termo de Consentimento para Tratamento de Dados Pessoais, em conformidade com a LGPD.'
              checked={watch().acceptTerms}
              register={register('acceptTerms')}
              className='text-xs sm:text-sm text-justify'
            />
            {errors.acceptTerms &&
              <span className='absolute -bottom-5 text-secondary-1 italic text-xs md:text-sm'>{errors.acceptTerms.message}</span>
            }
            <ModalBase
              openModal={openModal}
              setOpenModal={setOpenModal}
              className="bg-primary-1 w-full max-w-[800px]"
            >
              <div className="text-white flex flex-col gap-4 text-justify font-light p-2 sm:p-6">
                <h1 className='font-bold text-2xl text-center'>Termo de Consentimento para Tratamento de Dados Pessoais</h1>
                <p className='indent-8'>Ao utilizar este site, o(a) usuário(a) declara estar ciente e de acordo com a coleta, uso, tratamento e armazenamento de seus dados pessoais pela <span className='font-bold'>Fábrica de Software</span> nos termos da Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD).</p>
                <ol className='flex flex-col gap-4 list-decimal list-inside marker:font-bold *:space-y-2'>
                  <li className='[&>p]:pt-2 [&>span]:font-bold [&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-8'>
                    <span>DOS DADOS COLETADOS</span>
                    <p>Ao utilizar este site e consentir com este termo, o(a) usuário(a) autoriza a coleta e o tratamento dos seguintes dados pessoais:</p>
                    <ul>
                      <li>Nome completo;</li>
                      <li>E-mail;</li>
                      <li>CPF;</li>
                      <li>Código de Matrícula da Unipê - RGM;</li>
                      <li>Endereço IP e dados de localização;</li>
                      <li>Informações de navegação (cookies e tecnologias similares);</li>
                      <li>Outras informações fornecidas voluntariamente pelo usuário ao utilizar os serviços, preencher formulários ou interagir com o site.</li>
                    </ul>
                  </li>
                  <li className='[&>p]:pt-2 [&>span]:font-bold [&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-8'>
                    <span>FINALIDADE DA COLETA</span>
                    <p>Os dados coletados poderão ser utilizados para as seguintes finalidades, em conformidade com os arts. 7º, I e V da LGPD:</p>
                    <ul>
                      <li>Identificação e autenticação do usuário;</li>
                      <li>Melhorar a experiência do usuário no site;</li>
                      <li>Enviar comunicações relevantes, caso autorizado;</li>
                      <li>Cumprir obrigações legais e regulatórias;</li>
                      <li>Prevenção à fraude e segurança da informação.</li>
                      <li>Aperfeiçoamento dos produtos, serviços e experiência do usuário.</li>
                      <li>Viabilizar a prestação de serviços oferecidos no site.</li>
                    </ul>
                  </li>
                  <li className='[&>p]:pt-2 [&>span]:font-bold [&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-8'>
                    <span>DAS FINALIDADES DO TRATAMENTO</span>
                    <p>Os dados coletados poderão ser utilizados para as seguintes finalidades, em conformidade com os arts. 7º, I e V da LGPD:</p>
                    <ul>
                      <li>Prestação dos serviços ofertados no site;</li>
                      <li>Cumprimento de obrigações legais;</li>
                      <li>Proteção dos interesses da empresa em qualquer tipo de conflito, inclusive demandas judiciais.</li>
                      <li>Não comercializamos os dados dos usuários.</li>
                    </ul>
                  </li>
                  <li className='[&>p]:pt-2 [&>span]:font-bold'>
                    <span>DO ARMAZENAMENTO E COMPARTILHAMENTO</span>
                    <p>Os dados pessoais serão armazenados em ambiente seguro e controlado, podendo ser compartilhados com terceiros <span className='font-bold'>apenas quando estritamente necessário</span>, respeitando os princípios da finalidade, necessidade, adequação e segurança (arts. 6º e 7º, V, da LGPD), e mediante cláusulas contratuais que garantam a confidencialidade e o correto tratamento dos dados.</p>
                  </li>
                  <li className='[&>p]:pt-2 [&>span]:font-bold [&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-8'>
                    <span>DOS DIREITOS DO TITULAR</span>
                    <p>Nos termos do <span className='font-bold'>art. 18 da LGPD</span>, o(a) titular poderá, a qualquer momento e mediante requisição, exercer os seguintes direitos:</p>
                    <ul>
                      <li>Confirmação da existência de tratamento;</li>
                      <li>Acesso aos dados;</li>
                      <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                      <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
                      <li>Portabilidade dos dados;</li>
                      <li>Revogação do consentimento;</li>
                      <li>Eliminação dos dados pessoais tratados com consentimento, ressalvadas as hipóteses legais de guarda;</li>
                      <li>Informações sobre entidades públicas ou privadas com as quais os dados foram compartilhados;</li>
                      <li>Oposição ao tratamento realizado com base em interesse legítimo.</li>
                    </ul>
                    <p>Para exercer seus direitos, o(a) titular deverá entrar em contato com o Encarregado pelo Tratamento de Dados por meio do e-mail: <span className='underline font-bold'>suporte@fabricadesoftware.com</span> ou <span className='underline font-bold'>fabricadesoftwareunipe@gmail.com</span></p>
                  </li>
                  <li className='[&>p]:pt-2 [&>span]:font-bold [&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-8'>
                    <span>DA REVOGAÇÃO DO CONSENTIMENTO</span>
                    <p>Nos termos do art. 8º, §5º da LGPD, o consentimento ora concedido poderá ser revogado a qualquer momento, mediante manifestação expressa do titular, por meio de solicitação direcionada ao e-mail informado acima, sendo garantida a eliminação dos dados pessoais, salvo nas hipóteses legais de necessidade de manutenção para cumprimento de obrigação legal ou regulatória.</p>
                  </li>
                </ol>
              </div>
            </ModalBase>
          </div>

          <div className="col-span-2 flex flex-col items-center gap-4 mt-6">
            <ButtonSubmit
              isLoading={isloading}
              label='Cadastrar-se'
            />
            <Link
              href={'/sign-in'}
              className="text-white font-light text-base md:text-[18px] underline"
            >
              Já é cadastrado? Entre aqui
            </Link>
          </div>

          

        </form>

      </div>
    </main>
  )
}