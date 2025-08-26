"use client";
import React from "react";

/**
 * Lista de projetos e seus status.
 * Para adicionar/remover projetos, basta editar este array.
 */
const projetos = [
  { nome: "F360", status: "andamento" },
  { nome: "ProconPB", status: "andamento" },
  { nome: "EscalaPRO", status: "andamento" },
  { nome: "AgendaCT", status: "andamento" },
  { nome: "Conte", status: "concluido" },
  { nome: "Btor", status: "concluido" },
];

/**
 * Indicadores de pessoas.
 * Pode ser facilmente integrado a uma API futuramente.
 */
const indicadores = [
  { label: "Imersionistas", valor: 134, link: "#" },
  { label: "Extensionistas", valor: 48, link: "#" },
];

/**
 * Dados da Imersão.
 */
const imersao = {
  titulo: "Imersão Fábrica de Software 2025.1",
  progresso: 50, // porcentagem concluída
  imagem:
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80",
};

export default function DashboardAdmin() {
  return (
    <div className="bg-gradient-to-br from-primary-1 via-primary-3 to-primary-6 flex flex-col min-h-screen w-full grow overflow-x-hidden p-4 sm:p-8">
      {/* Título principal */}
      <h1 className="font-coolvetica text-white text-2xl mb-6">
        Painel Administrativo
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Coluna Esquerda: Imersão + Projetos */}
        <div className="flex flex-col gap-10 w-full">
          {/* Card Imersões */}
          <section className="relative w-full max-w-6xl mx-auto">
            {/* Sombra deslocada atrás do card */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#D0A30F] rounded-2xl -z-10" />
            <div className="bg-[#29242F] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 min-h-[120px]">
              <div className="flex-1 flex flex-col justify-center">
                <div className="font-coolvetica text-white text-lg mb-2">
                  Imersões
                </div>
                <div className="text-white/90 text-base mb-3">
                  {imersao.titulo}
                </div>
                {/* Barra de progresso */}
                <div className="flex items-center gap-4 mt-1">
                  <div className="relative h-5 w-full bg-[#F5F5F5] rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-5 bg-[#FFC311] rounded-full"
                      style={{ width: `${imersao.progresso}%` }}
                    />
                  </div>
                  <span className="text-white text-base">
                    {imersao.progresso}%
                  </span>
                </div>
              </div>
              {/* Imagem de Imersão */}
              <picture>
                <img
                  src={imersao.imagem}
                  alt="Imersão"
                  className="w-24 h-20 object-cover rounded-lg"
                />
              </picture>
              
            </div>
          </section>

          {/* Card Projetos */}
          <section className="relative w-full max-w-6xl mx-auto">
            {/* Sombra deslocada atrás do card */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#D0A30F] rounded-2xl -z-10" />
            <div className="bg-[#29242F] rounded-2xl p-6 pb-8">
              <div className="font-coolvetica text-white text-lg mb-4 text-center">
                Projetos
              </div>
              <div className="bg-[#18161B] rounded-xl p-2 sm:p-4 overflow-x-auto">
                {/* Tabela de Projetos */}
                <table className="w-full text-white min-w-[350px]">
                  <tbody>
                    {projetos.map(({ nome, status }) => (
                      <tr className="h-14" key={nome}>
                        <td className="font-roboto text-base border-b border-white/30 pl-4 text-left">
                          {nome}
                        </td>
                        <td className="border-b border-white/30 pr-4 text-right">
                          {status === "andamento" ? (
                            <span className="bg-[#D0A30F] text-white px-4 py-1 rounded-md text-sm font-bold shadow">
                              Em andamento
                            </span>
                          ) : (
                            <span className="bg-green-700 text-white px-4 py-1 rounded-md text-sm font-bold shadow">
                              Concluído
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Coluna Direita: Indicadores */}
        <div className="flex flex-col gap-8 w-full max-w-xs mx-auto">
          {indicadores.map(({ label, valor, link }) => (
            <section className="relative w-full min-h-[260px]" key={label}>
              {/* Sombra deslocada amarela */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#D0A30F] rounded-2xl -z-10" />
              <div className="bg-[#18161B] rounded-2xl p-6 flex flex-col items-center justify-center h-full">
                <div className="w-full text-white font-coolvetica text-base border-b border-white/80 text-center pb-2">
                  {label}
                </div>
                <div className="text-3xl font-coolvetica text-white my-5">
                  {valor}
                </div>
                <div className="text-white/80 text-base mt-auto">
                  ao total.{" "}
                  <a href={link} className="underline">
                    Veja mais
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
