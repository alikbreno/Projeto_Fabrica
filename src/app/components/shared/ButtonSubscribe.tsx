"use client";

import React, { useState } from "react";
import ModalForm from "../ModalForm";

export default function ButtonSubscribe({ status }: { status: string }) {
  const [openModal, setOpenModal] = useState(false);

  const changeModal = () => {
    if (status === "Inscrever-se") setOpenModal(true);
  };

  return (
    <div>
      <div className='min-w-[120px]'>
        <button
          onClick={changeModal}
          className={`${
            status === "Inscrever-se"
              ? 'bg-secondary-2  cursor-pointer hover:bg-secondary-1 transition'
              : 'bg-[#FFAD3BCF] italic'
          } w-full py-2 px-4 rounded-[15px] `}
        >
          {status}
        </button>
      </div>
      <ModalForm openModal={openModal} setOpenModal={setOpenModal}/>
    </div>
  );
}
