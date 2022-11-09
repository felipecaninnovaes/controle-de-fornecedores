import { cloneElement, useEffect, useState } from "react"
import Modal from 'react-modal';
import { select_from_database, delete_in_database } from "../modules/db"
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './popUp.css'

import { insert_db, edit_db } from "../modules/db"
import { useNavigate } from "react-router-dom";
import test from "node:test";


interface Fornecedores {
  id: String | null,
  mes: String,
  cnpj: String,
  fornecedor: String,
  dataPagamento: String,
  valor: String,
  multa: String,
  juros: String,
  banco: String,
}

export const ListView = () => {
  let [pagamento, setPagamento] = useState("");
  let [id, setId] = useState("");
  let [fornecedor, setFornecedor] = useState("");
  let [cnpj, setCnpj] = useState("");
  let [valor, setValor] = useState("");
  let [multa, setMulta] = useState("");
  let [juros, setJuros] = useState("");
  let [banco, setBanco] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false)

  function handleOpenModal(id: String, dataPagamento: String, fornecedor: String, cnpj: String, valor: String, multa: String, juros: String, banco: String) {
    const mesVa = String(dataPagamento).split("/")
    const dataV: String = String(mesVa[2] + "/" + mesVa[1] + "/" + mesVa[0])
    setId(String(id))
    setPagamento(String(dataV))
    setFornecedor(String(fornecedor))
    setCnpj(String(cnpj))
    setValor(String(valor))
    setMulta(String(multa))
    setJuros(String(juros))
    setBanco(String(banco))
    setIsOpen(true)
  }
  function handleCloseModal() {
    setIsOpen(false)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  async function Inserir() {
    insert_db(fornecedor, cnpj, pagamento, valor, multa, juros, banco)
    localStorage.setItem('load', banco)
  }

  async function Editar() {
    edit_db(id, fornecedor, cnpj, pagamento, valor, multa, juros, banco)
    localStorage.setItem('load', banco)
    console.log('rodou')
  }



  const [fornecedores, setFornecedores] = useState<Fornecedores[] | null[]>([]);
  const [value, setvalue] = useState("");
  useEffect(() => {
    async function apiCall() {
      const apiResponse: any = await select_from_database();
      setFornecedores(apiResponse);
    }
    apiCall();
  }, [value]);

  const d = new Date();
  let time = String(d.getTime());
  return (
    <table className="border-spacing-4 text-xl w-full rounded-md"
    onMouseEnter={() => { setvalue(time) }} 
    >
      <thead>
        <tr>
          <th className="border-spacing-4">ID</th>
          <th>MES REFRENCIA</th>
          <th className="pl-2">DATA DE PAGAMENTO</th>
          <th>FORNECEDOR</th>
          <th>CNPJ</th>
          <th>VALOR</th>
          <th>MULTA</th>
          <th>JUROS</th>
          <th>BANCO</th>
        </tr>
      </thead>
      {fornecedores.map(data => {
        let idS: String = String(data?.id) as string
        const d = new Date();
        let times = String(d.getTime());

        return (
          <tbody key={String(data?.id)}>
            <tr className=" border-solid border border-SC_border1"><td className="border  border-spacing-4">{data?.id}</td><td className="border">{data?.mes}</td><td className="border ">{data?.dataPagamento}</td><td className="border ">{data?.fornecedor}</td><td className="border ">{data?.cnpj}</td><td className="border ">{data?.valor}</td><td className="border ">{data?.multa}</td><td className="border ">{data?.juros}</td>
              <td className="border">{data?.banco}</td>
              <td className="border">
                <button title="button" onClick={() => { delete_in_database(idS); setvalue(times) }} >
                  <FiTrash2 color="red" />
                </button>
              </td>
              <td className="border">
                <button title="button" onClick={() => {
                  handleOpenModal(String(idS),
                    String(data?.dataPagamento),
                    String(data?.fornecedor),
                    String(data?.cnpj),
                    String(data?.valor),
                    String(data?.multa),
                    String(data?.juros),
                    String(data?.banco)
                  )
                }} >
                  <FiEdit color="blue" />
                </button>
                <Modal
                  className="absolute pr-5 pb-5 pt-2 pl-2 rounded-md justify-center bg-SC_background3"
                  overlayClassName={"Overlay"}
                  isOpen={modalIsOpen}
                  onRequestClose={handleCloseModal}
                  style={customStyles}
                  onAfterClose={() => {
                    setvalue(time)
                  }}
                >
                  <div className="bg-SC_background3 mt-4 ml-3">
                    <div>
                      <a className="font-bold px-2">ID:</a>
                      <input className="w-full rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setFornecedor(e.currentTarget.value)}
                        placeholder="Gerado automaticamente..."
                        value={id}
                        disabled
                      />
                    </div>
                    <div>
                      <a className="font-bold px-2 w-full">Pago em:</a>
                      <input type={"date"} className="rounded-md border-solid w-full p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setPagamento(e.currentTarget.value)}
                        placeholder="Insira a data"
                        value={pagamento}
                      />
                    </div>
                    <div>
                      <a className="font-bold px-2">Fornecedor:</a>
                      <input className="w-full rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setFornecedor(e.currentTarget.value)}
                        placeholder="Insira o nome do fornecedor..."
                        value={fornecedor}
                      />
                    </div>
                    <div>
                      <a className="font-bold px-2">CNPJ:</a>
                      <input type="number" id="input" className="w-full rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setCnpj(e.currentTarget.value)}
                        placeholder="Insira o nome do fornecedor..."
                        value={cnpj}
                      />
                    </div>
                    <div>
                      <a className="font-bold px-2">Valor:</a>
                      <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setValor(e.currentTarget.value)}
                        placeholder="Insira o valor do pagamento..."
                        value={valor}
                      />
                    </div><div>
                      <a className="font-bold px-2">Multa:</a>
                      <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setMulta(e.currentTarget.value)}
                        placeholder="Insira o nome o valor da multa..."
                        value={multa}
                      />
                    </div>
                    <div>
                      <a className="font-bold px-2">Juros:</a>
                      <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setJuros(e.currentTarget.value)}
                        placeholder="Insira o valor do juros..."
                        value={juros}
                      />
                    </div>
                    <div>
                      <a className="font-bold px-2">Banco:</a>
                      <input className="w-full rounded-md border-solid p-2 shadow-gray-400 shadow-md bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                        onChange={(e) => setBanco(e.currentTarget.value)}
                        placeholder="Insira o nome do banco pago..."
                        value={banco}
                      />
                      <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 shadow-gray-400 shadow-md bg-SC_button text-white text-md font-bold hover:bg-SC_button_hover transition-colors" type="button" onClick={() => {
                        Editar()
                        setId('')
                        setPagamento('')
                        setFornecedor('')
                        setCnpj('')
                        setValor('')
                        setMulta('')
                        setJuros('')
                        setBanco('')
                        handleCloseModal()
                      }}>
                        Inserir
                      </button>
                      <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 shadow-gray-400 shadow-md bg-red-500 text-white text-md font-bold hover:bg-red-600 transition-colors" type="button" onClick={() => {
                        handleCloseModal()
                      }}>
                        Fechar
                      </button>
                    </div>
                  </div>
                </Modal>
              </td>
            </tr>
          </tbody>

        )
      })}
    </table>
  );

}

export default ListView