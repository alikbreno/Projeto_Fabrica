'use client'

import React from 'react';
import { CgMathPlus } from "react-icons/cg";

type Props = {
    onOpenModal: () => void;
}

export default function CardCreateProjectAdmin({onOpenModal}: Props){

    return( 
            <div
                onClick={onOpenModal} 
                className='flex flex-col items-center justify-center w-full sm:min-w-[300px] h-[450px]  rounded-[20px] bg-[#E8E8E880] border-[2px] border-[#676767] cursor-pointer'>

                <CgMathPlus 
                    onClick={onOpenModal}
                    className='cursor-pointer text-black text-[20px] w-full min-h-[100px] hover:scale-105 transition'
                />

            </div>
    )
}
