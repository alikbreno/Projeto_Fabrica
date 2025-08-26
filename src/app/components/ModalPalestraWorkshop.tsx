import { z } from "zod";
import InputField from "./InputField";
import ModalBase from "./shared/ModalBase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskDate } from "../utils/InputMasks";
import { useEffect } from "react";

export const schema = z.object({
  titulo: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  data: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  horario: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  local: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  palestrante: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  sintese: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  material: z
    .string()
    .min(1, { message: "Preenchimento obrigatório" }),
  imagem: z
    .string() // VER COMO VAI FICAR AQUI
    .min(1, { message: "Preenchimento obrigatório" }),
  infoAdicional: z
    .string()
    .optional()
})

export type FormPalestraWorkshop = z.infer<typeof schema>;

export type PalestraWorkshop = FormPalestraWorkshop & {
  status: string
}

type ModalPalestraWorkshopProps = {
  tipo: "Criar" | "Modificar";
  nome: "Palestra" | "Workshop";
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
  onSubmit: (data: FormPalestraWorkshop) => void;
  itemSelecionado?: PalestraWorkshop
};

export default function ModalPalestraWorkshop({
  tipo,
  nome,
  setOpenModal,
  openModal,
  onSubmit,
  itemSelecionado
}: ModalPalestraWorkshopProps) {

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
      if (itemSelecionado) {
        reset({
          titulo: itemSelecionado.titulo,
          data: itemSelecionado.data,
          horario: itemSelecionado.horario,
          local: itemSelecionado.local,
          palestrante: itemSelecionado.palestrante,
          sintese: itemSelecionado.sintese,
          material: itemSelecionado.material,
          imagem: itemSelecionado.imagem,
          infoAdicional: itemSelecionado.infoAdicional,
        });
      }
    }, [itemSelecionado, reset]);

  const handleSave = (data: FormPalestraWorkshop) => {
    onSubmit(data)
    reset()
    setOpenModal(false)
  }

  return (
    <ModalBase
      openModal={openModal}
      setOpenModal={setOpenModal}
      viewCloseButton
      className="bg-primary-1 w-full max-w-[500px]"
    >
      <main className="px-5 pb-5 pt-3">
        <h1 className="px-5 text-[28px] text-white font-coolvetica">
          {tipo} {nome}
        </h1>
        <div className="px-5">
          <div className="w-full h-[3px] mt-3 mb-10 bg-white"/>
        </div>
        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col items-center gap-10">
          <InputField
            id="titulo"
            label={`Nome d${nome === "Palestra" ? "a" : "o"} ${nome}`}
            register={register("titulo")}
            className="peer-focus:bg-primary-1 bg-primary-1"
            error={errors.titulo}
          />
          <div className="flex gap-5">
            <InputField
              id="data"
              label="Data"
              register={register("data", {
                onChange(event) {
                  setValue("data", maskDate(event.target.value));
                },
              })}
              className="peer-focus:bg-primary-1 bg-primary-1"
              error={errors.data}
            />
            <InputField
              id="horario"
              label="Horário"
              register={register("horario")}
              className="peer-focus:bg-primary-1 bg-primary-1"
              error={errors.horario}
            />
          </div>
          <div className="flex gap-5">
            <InputField
              id="local"
              label="Local"
              register={register("local")}
              className="peer-focus:bg-primary-1 bg-primary-1"
              error={errors.local}
            />
            <InputField
              id="palestrante"
              label="Palestrante"
              register={register("palestrante")}
              className="peer-focus:bg-primary-1 bg-primary-1"
              error={errors.palestrante}
            />
          </div>
          <div className="flex gap-5">
            <InputField
              id="sintese"
              label="Síntese"
              register={register("sintese")}
              className="peer-focus:bg-primary-1 bg-primary-1"
              error={errors.sintese}
            />
            <InputField
              id="material"
              label="Material"
              register={register("material")}
              className="peer-focus:bg-primary-1 bg-primary-1"
              error={errors.material}
            />
          </div>
          <InputField
            id="imagem"
            label="Imagem"
            register={register("imagem")}
            className="peer-focus:bg-primary-1 bg-primary-1"
            error={errors.imagem}
          />
          <InputField
            id="infoAdicional"
            label="Informação adicional"
            register={register("infoAdicional")}
            className="peer-focus:bg-primary-1 bg-primary-1"
          />
          <button
            type="submit"
            className="bg-secondary-2 w-full sm:max-w-[200px] hover:brightness-90 cursor-pointer transition text-white rounded-[10px] py-3 font-roboto text-[18px]"
          >
            {tipo === "Modificar" ? "Salvar": tipo}
          </button>
          </form>
      </main>
    </ModalBase>
  );
}
