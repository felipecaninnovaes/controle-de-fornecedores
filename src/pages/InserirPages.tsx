import { useEffect, useRef, useState } from "react";

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { insert_db, export_xlsx } from "../modules/db"
import { ListView } from "./ListPage";




export default function InserirPages() {
  // select()

  let [pagamento, setPagamento] = useState("");
  let [fornecedor, setFornecedor] = useState("");
  let [cnpj, setCnpj] = useState("");
  let [valor, setValor] = useState("");
  let [multa, setMulta] = useState("");
  let [juros, setJuros] = useState("");
  let [banco, setBanco] = useState("");

  let [periodo, setPerido] = useState("");
  let [data, setData] = useState("");

  async function Inserir() {
    insert_db(fornecedor, cnpj, pagamento, valor, multa, juros, banco)
    localStorage.setItem('load', banco)
  }

  async function exportXlSX() {
    export_xlsx(periodo)
  }
  return (
    <div className="h-screen w-screen justify-center flex flex-row items-center bg-SC_background">

      <div className="h-268 w-268 bg-SC_background2 flex flex-col rounded-lg shadow-2xl py-5 px-5">
        <div className="flex flex-row pb-5">
          <div>
            <a className="font-bold px-2">Pago em:</a>
            <input type={"date"} className="w-268 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
              onChange={(e) => setPagamento(e.currentTarget.value)}
              placeholder="Insira a data"
              value={pagamento}
            />
          </div>
          <div>
            <a className="font-bold px-2">Fornecedor:</a>
            <input id="input" className="w-268 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
              onChange={(e) => setFornecedor(e.currentTarget.value)}
              placeholder="Insira o nome do fornecedor..."
              value={fornecedor}
            />
          </div>
          <div>
            <a className="font-bold px-2">CNPJ:</a>
            <input id="input" className="w-268 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
              onChange={(e) => setCnpj(e.currentTarget.value)}
              placeholder="Insira o nome do fornecedor..."
              value={cnpj}
            />
          </div>
          <div>
            <a className="font-bold px-2">Valor:</a>
            <input type="number" step="0.01" min="0" max="100000000000" className="w-268 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
              onChange={(e) => setValor(e.currentTarget.value)}
              placeholder="Insira o valor do pagamento..."
              value={valor}
            />
          </div><div>
            <a className="font-bold px-2">Multa:</a>
            <input type="number" step="0.01" min="0" max="100000000000" className="w-268 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
              onChange={(e) => setMulta(e.currentTarget.value)}
              placeholder="Insira o nome o valor da multa..."
              value={multa}
            />
          </div>
          <div>
            <a className="font-bold px-2">Juros:</a>
            <input type="number" step="0.01" min="0" max="100000000000" className="w-268 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
              onChange={(e) => setJuros(e.currentTarget.value)}
              placeholder="Insira o valor do juros..."
              value={juros}
            />
          </div>
          <div>
            <a className="font-bold px-2">Banco:</a>
            <input className="w-268 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
              onChange={(e) => setBanco(e.currentTarget.value)}
              placeholder="Insira o nome do banco pago..."
              value={banco}
            />
          </div>
          <button className="rounded-md border-solid p-2 mt-6 shadow-gray-400 shadow-md bg-SC_button text-white text-md font-bold hover:bg-SC_button_hover transition-colors" type="button" onClick={() => {
            Inserir()
            setBanco("");
            setValor("");
            setFornecedor("");
            setPagamento("");
          }}>
            Inserir
          </button>
        </div>
        <div className="h-85 bg-SC_background3 rounded-lg border-solid border-2 border-SC_border1">
          <div className="overflow-y-auto h-full w-full p-2" onLoad={() => { useEffect(() => { }) }}>
            <ListView />
          </div>
        </div>
        <div className="h-100 flex flex-row items-end pb-2 pt-2">
          <div className="top-1">
            <a className="font-bold px-2">Mes de referencia:</a>
            <input type={"month"} className="w-56 rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:bg-white"
              onChange={(e) => setPerido(e.currentTarget.value)}
              placeholder="Insira o mes de referencia"
            />
          </div>
          <button className="rounded-md border-solid p-2 ml-2 shadow-gray-400 shadow-md bg-lime-700 text-white text-md font-bold hover:bg-lime-900 transition-colors" type="button" onClick={() => {
            exportXlSX()
          }}>
            Exportar para Exel
          </button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}