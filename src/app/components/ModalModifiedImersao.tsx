'use client';

import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskDate } from "../utils/InputMasks";
import InputField from "./InputField";
import ModalBase from "@/app/components/shared/ModalBase";

export const schema = z.object({
  nome_imersao: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  data_inicio: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  data_final: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
});

export type FormData = z.infer<typeof schema>;

export type Imersao = FormData & {
  id: string;
  status: string;
};

type ModalModifiedImersaoProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onEdit: (data: FormData) => void;
  imersaoSelecionada: Imersao | null;
};

export default function ModalModifiedImersao({
  openModal,
  setOpenModal,
  onEdit,
  imersaoSelecionada
}: ModalModifiedImersaoProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (imersaoSelecionada) {
      reset({
        nome_imersao: imersaoSelecionada.nome_imersao,
        data_inicio: imersaoSelecionada.data_inicio,
        data_final: imersaoSelecionada.data_final,
      });
    }
  }, [imersaoSelecionada, reset]);

  function handleEdit(data: FormData) {
    onEdit(data);
    reset();
    setOpenModal(false);
  }

  return (
    <ModalBase
      openModal={openModal}
      setOpenModal={setOpenModal}
      titleTooltip="Fechar modal de edição de imersão"
      className="bg-primary-1 w-full max-w-[500px]"
    >
      <div className="flex flex-col gap-5 px-10 py-5">
        <h2 className="pl-5 text-[28px] text-white font-coolvetica font-semibold">
          Modificar imersão
        </h2>
        <div className="px-5">
          <div className="bg-white mb-5 h-[4px] rounded-[5px] w-full" />
        </div>
        <form
          onSubmit={handleSubmit(handleEdit)}
          className="grid grid-cols-1 md:gap-y-10 gap-y-6 w-full"
        >
          <InputField
            id="nome_imersao"
            label="Nome do imersão"
            register={register("nome_imersao")}
            error={errors.nome_imersao}
            className=" peer-focus:bg-primary-1 bg-primary-1"
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </ModalBase>
  );
}
