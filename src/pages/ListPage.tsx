import { cloneElement, useEffect, useState } from "react"
import Modal from 'react-modal';
import { select_from_database, delete_in_database } from "../modules/db"
// import { FiTrash2, FiEdit } from "react-icons/fi";

import './popUp.css'

import { insert_db, edit_db } from "../modules/db"


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
  }



  const [fornecedores, setFornecedores] = useState<Fornecedores[] | null[]>([]);
  const [value, setvalue] = useState("");
  useEffect(() => {
    async function apiCall() {
      const apiResponse: any = await select_from_database();
      localStorage.setItem("databaseModified","0");
      console.log("DataBase Updated")
      setFornecedores(apiResponse);
    }
    apiCall();
  }, [value]);

  var intervalId = window.setInterval(function(){
    let updateKey = localStorage.getItem('databaseModified')
    if(updateKey === "1"){
      setvalue(value + 1) 
    }else {
      
    }
    console.log(updateKey)
  }, 3000);

  return (
    <div>
        <Modal
          className="absolute pr-5 pb-5 pt-2 pl-2 rounded-md justify-center bg-SC_background3 shadow-xl"
          overlayClassName={"Overlay"}
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
          onAfterClose={() => {
            setvalue(value + 1)
          }}
        >
          <div className="bg-SC_background3 mt-4 ml-3">
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
              <a className="font-bold px-2 w-full">Pago em:</a>
              <input type={"date"} className="rounded-md border-solid w-full p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                onChange={(e) => setPagamento(e.currentTarget.value)}
                placeholder="Insira a data"
                value={pagamento}
              />
            </div>
            <div>
              <a className="font-bold px-2">Fornecedor:</a>
              <input className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                onChange={(e) => setFornecedor(e.currentTarget.value)}
                placeholder="Insira o nome do fornecedor..."
                value={fornecedor}
              />
            </div>
            <div>
              <a className="font-bold px-2">CNPJ:</a>
              <input type="number" id="input" className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                onChange={(e) => setCnpj(e.currentTarget.value)}
                placeholder="Insira o nome do fornecedor..."
                value={cnpj}
              />
            </div>
            <div>
              <a className="font-bold px-2">Valor:</a>
              <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                onChange={(e) => setValor(e.currentTarget.value)}
                placeholder="Insira o valor do pagamento..."
                value={valor}
              />
            </div><div>
              <a className="font-bold px-2">Multa:</a>
              <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                onChange={(e) => setMulta(e.currentTarget.value)}
                placeholder="Insira o nome o valor da multa..."
                value={multa}
              />
            </div>
            <div>
              <a className="font-bold px-2">Juros:</a>
              <input type="number" step="0.01" min="0" max="100000000000" className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                onChange={(e) => setJuros(e.currentTarget.value)}
                placeholder="Insira o valor do juros..."
                value={juros}
              />
            </div>
            <div>
              <a className="font-bold px-2">Banco:</a>
              <input className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                onChange={(e) => setBanco(e.currentTarget.value)}
                placeholder="Insira o nome do banco pago..."
                value={banco}
              />
              <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 bg-SC_button text-white text-md font-bold hover:bg-SC_button_hover transition-colors" type="button" onClick={() => {
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
              <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 bg-SC_button_excluir text-white text-md font-bold hover:bg-SC_button_excluir_hover transition-colors" type="button" onClick={() => {
                handleCloseModal()
              }}>
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      <div className="tableClass"></div>
    <table className="text-xl w-full rounded-md"
      // onMouseEnter={() => { setvalue(value + 1) }}
    >
      <thead>
        <tr>
          <th className="border border-SC_border1 bg-SC_background4 p-2">ID</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">MES REFRENCIA</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">DATA DE PAGAMENTO</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">FORNECEDOR</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">CNPJ</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">VALOR</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">MULTA</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">JUROS</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">BANCO</th>
          <th className="border border-SC_border1 bg-SC_background4 p-2">ACOES</th>
        </tr>
      </thead>
      {fornecedores.map(data => {
        return (
          <tbody key={String(data?.id)}>
            <tr className="border-solid">
              <td className="border-t border-b border-l border-SC_border1 text-center border-spacing-4">{data?.id}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center">{data?.mes}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center ">{data?.dataPagamento}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center ">{data?.fornecedor}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center ">{data?.cnpj}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center ">{data?.valor}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center p-2">{data?.multa}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center ">{data?.juros}</td>
              <td className="border-t border-b border-l border-SC_border1 text-center">{data?.banco}</td>
              <td className="border-t border-b border-l border-r border-SC_border1 text-center">
                <div className="space-x-2">
                <button className="rounded-md w-autojustify-center uppercase border-solid p-2 bg-SC_button_excluir text-white text-sm font-bold hover:bg-SC_button_excluir_hover transition-colors" title="button" onClick={() => { delete_in_database(String(data?.id)); setvalue(value + 1) }} > 
                 EXCLUIR {/* <FiTrash2 color="white" /> */}
                </button>
                <button className="rounded-md w-auto justify-center uppercase border-solid p-2 bg-SC_button_edit text-white text-sm font-bold hover:bg-SC_button_edit_hover transition-colors" title="button" onClick={() => {
                  handleOpenModal(
                    String(data?.id),
                    String(data?.dataPagamento),
                    String(data?.fornecedor),
                    String(data?.cnpj),
                    String(data?.valor),
                    String(data?.multa),
                    String(data?.juros),
                    String(data?.banco)
                  )
                }} >
                  EDITAR
                </button>
                </div>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
    </div>
  );

}

export default ListView