import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
// import 'reactjs-popup/dist/index.css';
import ListView from "./ListPage";
import { insert_db, export_xlsx } from "../modules/db"

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
export default function InserirPages() {
  const [modalIsOpen, setIsOpen] = useState(false)

  function handleOpenModal() {
    setIsOpen(true)
  }
  function handleCloseModal() {
    setIsOpen(false)
  }

  let [pagamento, setPagamento] = useState("");
  let [id, setId] = useState("");
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

  return (
    <div className="h-screen w-screen font-sans justify-center flex flex-row items-center bg-SC_background">
      <div className="h-268 w-268 bg-SC_background flex flex-col rounded-lg  py-5 px-5">
        <div>
          <button type="button" className="rounded-md w-auto justify-center uppercase border-solid p-2 mt-2  bg-SC_button_edit text-white text-sm font-bold hover:bg-SC_button_edit_hover transition-colors" title="button" onClick={() => {
            handleOpenModal()
          }} >
            EDITAR
          </button>
        </div>
        <Modal className="absolute w-96 h-auto pr-3 pb-5 pt-2 pl-2 rounded-md justify-center bg-SC_background shadow-xl"
          overlayClassName={"Overlay"}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
        >
          <div className="h-auto w-full font-sans justify-center flex flex-col items-center bg-SC_background">
            <div className="h-auto w-full bg-SC_background flex flex-col rounded-lg">
              <div className="flex flex-col">
                <div>
                  <a className="font-bold px-2">ID:</a>
                  <input className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setFornecedor(e.currentTarget.value)}
                    placeholder="Gerado automaticamente..."
                    value={id}
                    disabled
                  />
                </div>
                <div>
                  <a className="font-bold px-2">Pago em:</a>
                  <input type={"date"} className="w-full rounded-md border-solid p-2  bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setPagamento(e.currentTarget.value)}
                    placeholder="Insira a data"
                    value={pagamento}
                  />
                </div>
                <div>
                  <a className="font-bold px-2">Fornecedor:</a>
                  <input className="w-full rounded-md border-solid p-2  bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setFornecedor(e.currentTarget.value)}
                    placeholder="Insira o nome do fornecedor..."
                    value={fornecedor}
                  />
                </div>
                <div>
                  <a className="font-bold px-2">CNPJ:</a>
                  <input type="number" id="input" className="w-full rounded-md border-solid p-2  bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setCnpj(e.currentTarget.value)}
                    placeholder="Insira o nome do fornecedor..."
                    value={cnpj}
                  />
                </div>
                <div>
                  <a className="font-bold px-2">Valor:</a>
                  <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2  bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setValor(e.currentTarget.value)}
                    placeholder="Insira o valor do pagamento..."
                    value={valor}
                  />
                </div><div>
                  <a className="font-bold px-2">Multa:</a>
                  <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2  bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setMulta(e.currentTarget.value)}
                    placeholder="Insira o nome o valor da multa..."
                    value={multa}
                  />
                </div>
                <div>
                  <a className="font-bold px-2">Juros:</a>
                  <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2  bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setJuros(e.currentTarget.value)}
                    placeholder="Insira o valor do juros..."
                    value={juros}
                  />
                </div>
                <div>
                  <a className="font-bold px-2">Banco:</a>
                  <input className="w-full rounded-md border-solid p-2  bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                    onChange={(e) => setBanco(e.currentTarget.value)}
                    placeholder="Insira o nome do banco pago..."
                    value={banco}
                  />
                </div>
                <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 shadow-gray-400 shadow-md  text-white text-md font-bold bg-SC_button hover:bg-SC_button_hover transition-colors" type="button" onClick={() => {
                  Inserir()
                  setId('')
                  setPagamento('')
                  setFornecedor('')
                  setCnpj('')
                  setValor('')
                  setMulta('')
                  setJuros('')
                  setBanco('')
                  localStorage.setItem("mykey", "1");
                }}>
                  Inserir
                </button>
                <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 shadow-gray-400 shadow-md  text-white text-md font-bold bg-red-500 hover:bg-red-600 transition-colors" type="button" onClick={() => {
                  handleCloseModal()
                }}>
                  Fechar
                </button>
              </div>
              {/* <div className="h-100 flex flex-row items-end pb-2 pt-2">
              <div className="top-1">
                <a className="font-bold px-2">Mes de referencia:</a>
                <input type={"month"} className="w-56 rounded-md border-solid p-2  bg-SC_input placeholder:bg-white"
                  onChange={(e) => setPerido(e.currentTarget.value)}
                  placeholder="Insira o mes de referencia"
                />
              </div>
              <button className="rounded-md border-solid p-2 ml-2  bg-lime-700 text-white text-md font-bold hover:bg-lime-900 transition-colors" type="button" onClick={() => {
                exportXlSX()
              }}>
                Exportar para Exel
              </button>
            </div> */}
            </div>
          </div>
        </Modal>
        <div className="h-268 w-268 bg-SC_background flex flex-col rounded-lg  py-5 px-5">
          <ListView />
        </div>
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
  )
}