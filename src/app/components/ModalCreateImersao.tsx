'use client'

import React from "react";
import { schema, FormData } from "./ModalModifiedImersao";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskDate } from "../utils/InputMasks";
import InputField from "./InputField";
import ModalBase from "@/app/components/shared/ModalBase";

type ModalCreateImersaoProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onCreate: (data: FormData) => void;
};

export default function ModalCreateImersao({
  openModal,
  setOpenModal,
  onCreate
}: ModalCreateImersaoProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleRegister(data: FormData) {
    onCreate(data);
    reset();
  }

  return (
    <ModalBase
      openModal={openModal}
      setOpenModal={setOpenModal}
      titleTooltip="Fechar modal de criação de imersão"
      className="bg-primary-1 w-full max-w-[500px]"
    >
      <div className="flex flex-col gap-5 px-10 py-5">
        <h2 className="pl-5 text-[28px] text-white font-coolvetica font-semibold">
          Criar Imersão
        </h2>
        <div className="px-5">
          <div className="bg-white mb-5 h-[4px] rounded-[5px] w-full" />
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid grid-cols-1 md:gap-y-10 gap-y-6 w-full"
        >
          <InputField
            id="nome_imersao"
            label="Nome da Imersão"
            register={register("nome_imersao")}
            error={errors.nome_imersao}
            className="peer-focus:bg-primary-1 bg-primary-1"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              id="data_inicio"
              label="Data Início"
              register={register("data_inicio", {
                onChange(event) {
                  setValue("data_inicio", maskDate(event.target.value));
                },
              })}
              error={errors.data_inicio}
              className="flex-1 peer-focus:bg-primary-1 bg-primary-1"
            />

            <InputField
              id="data_final"
              label="Data Final"
              register={register("data_final", {
                onChange(event) {
                  setValue("data_final", maskDate(event.target.value));
                },
              })}
              error={errors.data_final}
              className="flex-1 peer-focus:bg-primary-1 bg-primary-1"
            />

          </div>

          <div className="flex min-w-30 md:min-w-[20px] justify-center">
            <button
              type="submit"
              className="bg-secondary-1 hover:brightness-90 cursor-pointer transition text-white rounded-[10px] w-full max-w-[100px] md:max-w-[200px] py-3 font-roboto text-[18px]"
            >
            Criar
            </button>
          </div>
        </form>
      </div>
    </ModalBase>
  );
}
