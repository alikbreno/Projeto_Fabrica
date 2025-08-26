import React from 'react';


type CardImersaoEventosProps = {
    imagem: string;
    titulo: string;
    data: string;
    horario: string;
    local: string;
    palestrante: string;
    sintese: string;
    material: string;
    status: string[];
    onClickDetalhes: () => void
}

function CardImersaoEventos({imagem, titulo, data, horario, local, status, onClickDetalhes}: CardImersaoEventosProps, ref: React.Ref<HTMLDivElement>){

    const isPalestra = status.includes('Palestras');
    const cardBackGroundColor = isPalestra ? 'bg-[#A742FFCC]' : 'bg-[#35F8FF80]';
    const labelBackGroundColor = isPalestra ? 'bg-[#410477CC]' : 'bg-[#012B2C80]';

    return(
        <div ref={ref} className={`flex flex-col items-center ${cardBackGroundColor} w-full max-w-[450px] h-[350px] rounded-[20px] text-white gap-4 mx-auto`}>
            <div className='w-full'>
                <picture>
                    <img 
                        src={imagem}
                        alt={`Logo ${titulo}`}
                        className="w-full h-[120px] "
                    />
                </picture>
            </div>

            <h1 className='text-[24px] text-center font-roboto'>{titulo}</h1>

            <div className='w-full max-w-[350px] flex flex-col gap-2'>

                <div className='flex'>
                    <div className={`w-[80px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}>
                        Data
                    </div>
                    <div className='flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px] '>
                        {data}
                    </div>
                </div>

                <div className='flex'>
                    <div className={`w-[80px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}>
                        Horário
                    </div>
                    <div className='flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px] '>
                        {horario}
                    </div>
                </div>

                <div className='flex'>
                    <div className={`w-[80px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}>
                        Local
                    </div>
                    <div className='flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px] '>
                        {local}
                    </div>
                </div>

            </div>

            <div>
                <a 
                    onClick={onClickDetalhes} 
                    className='text-white underline text-[16px] cursor-pointer'
                >
                    Ver detalhes
                </a>
            </div>
        </div>
    )
}

export default React.forwardRef(CardImersaoEventos);



