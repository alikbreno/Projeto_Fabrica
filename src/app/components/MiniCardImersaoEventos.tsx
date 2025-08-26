import React from 'react';

type MiniCardImersaoEventosProps = {
  palestrante: string;
  sintese: string;
  material: string;
  status: string[];
};

export default function MiniCardImersaoEventos({
  palestrante,
  sintese,
  material,
  status,
}: MiniCardImersaoEventosProps) {

const isPalestra = status.includes('Palestras');
const cardBackGroundColor = isPalestra ? 'bg-[#A742FFCC]' : 'bg-[#35F8FF80]';
const labelBackGroundColor = isPalestra ? 'bg-[#410477CC]' : 'bg-[#012B2C80]';

  return (
    <div className={`flex flex-col items-center ${cardBackGroundColor} w-full max-w-[450px] rounded-[15px] text-white gap-4 p-4 mx-auto`}>

      <div className="w-full max-w-[350px] flex flex-col gap-2">

        <div className="flex">
          <div className={`w-[100px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}>
            Palestrante
          </div>
          <div className="flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px]">
            {palestrante || 'Não informado'}
          </div>
        </div>

        <div className="flex">
          <div className={`w-[100px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}>
            Síntese
          </div>
          <div className="flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px]">
            {sintese || 'Não disponível'}
          </div>
        </div>

        <div className="flex">
          <div className={`w-[100px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}>
            Material
          </div>
          <div className="flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px]">
            {material || 'Não disponível'}
          </div>
        </div>

      </div>
    </div>
  );
}
