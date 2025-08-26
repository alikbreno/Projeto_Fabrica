'use client';

import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskDate } from "../utils/InputMasks";
import InputField from "./InputField";
import ModalBase from "@/app/components/shared/ModalBase";

export const schema = z.object({
  nome_projeto: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  nome_empresa: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  descricao: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  data_inicio: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  data_final: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  imagem: z
    .string()
    .optional(),
});

export type FormData = z.infer<typeof schema>;

export type Projeto = FormData & {
  id: string;
  status: string;
};

type ModalModifiedProjectProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onEdit: (data: FormData) => void;
  projetoSelecionado: Projeto | null;
};

export default function ModalModifiedProject({
  openModal,
  setOpenModal,
  onEdit,
  projetoSelecionado
}: ModalModifiedProjectProps) {
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
    if (projetoSelecionado) {
      reset({
        nome_projeto: projetoSelecionado.nome_projeto,
        nome_empresa: projetoSelecionado.nome_empresa,
        descricao: projetoSelecionado.descricao,
        data_inicio: projetoSelecionado.data_inicio,
        data_final: projetoSelecionado.data_final,
        imagem: projetoSelecionado.imagem,
      });
    }
  }, [projetoSelecionado, reset]);

  function handleEdit(data: FormData) {
    onEdit(data);
    reset();
    setOpenModal(false);
  }

  return (
    <ModalBase
      openModal={openModal}
      setOpenModal={setOpenModal}
      titleTooltip="Fechar modal de edição de projeto"
      className="bg-primary-1 w-full max-w-[500px]"
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-[28px] text-white font-coolvetica font-semibold text-center">
          Modificar Projeto
        </h2>
        <div className="bg-white h-[5px] rounded-[5px] w-full" />

        <form
          onSubmit={handleSubmit(handleEdit)}
          className="grid grid-cols-1 gap-y-6 w-full"
        >
          <InputField
            id="nome_projeto"
            label="Nome do Projeto"
            register={register("nome_projeto")}
            error={errors.nome_projeto}
            className="bg-primary-1 peer-focus:bg-primary-1"
          />

          <InputField
            id="nome_empresa"
            label="Empresa do Projeto"
            register={register("nome_empresa")}
            error={errors.nome_empresa}
            className="bg-primary-1 peer-focus:bg-primary-1"
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
              className="bg-primary-1 peer-focus:bg-primary-1"
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
              className="bg-primary-1 peer-focus:bg-primary-1"
            />
          </div>

          <InputField
            id="descricao"
            label="Descrição"
            register={register("descricao")}
            error={errors.descricao}
            className="bg-primary-1 peer-focus:bg-primary-1"
          />

          <InputField
            id="imagem"
            label="Imagem (URL)"
            register={register("imagem")}
            error={errors.imagem}
            className="bg-primary-1 peer-focus:bg-primary-1"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-secondary-1 hover:brightness-90 transition text-white rounded-[10px] w-full max-w-[100px] py-3 font-roboto text-[18px]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </ModalBase>
  );
}
