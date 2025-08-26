import React from 'react';

type MiniCardPalestrasProps = {
  palestrante: string;
  sintese: string;
  material: string;
  status: string;
};

export default function MiniCardPalestras({
  palestrante,
  sintese,
  material,
  // status,
}: MiniCardPalestrasProps) {
  const cardBackGroundColor = 'bg-[#5A0477E5]';
  const labelBackGroundColor = 'bg-[#410477CC]';

  return (
    <div className={`flex flex-col items-center ${cardBackGroundColor} w-full max-w-[450px] rounded-[15px] text-white gap-4 p-4 mx-auto shadow-[10px_5px_5px_0px_#FFC31180]`}>
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
          <div className="flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px] text-center px-2">
            {sintese || 'Não disponível'}
          </div>
        </div>

        <div className="flex">
          <div className={`w-[100px] ${labelBackGroundColor} border-r border-white border-[2px] flex items-center justify-center text-[18px]`}>
            Material
          </div>
          <div className="flex-1 flex items-center justify-center border-r border-white border-[2px] text-[18px] break-all">
            {material ? (
              <a href={material} target="_blank" rel="noopener noreferrer" className="underline">
                Acessar
              </a>
            ) : 'Não disponível'}
          </div>
        </div>
      </div>
    </div>
  );
}
