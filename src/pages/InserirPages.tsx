import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListView from "./ListPage";
import Modal from "react-modal";
import InputMask from "react-input-mask";
import { useForm, SubmitHandler } from "react-hook-form";

import { insert_db, export_xlsx } from "../modules/db"

interface IFornecedores {
  id: String | null,
  mes: String,
  fornecedor: String,
  cnpj: String,
  dataPagamento: String,
  valor: String,
  multa: String,
  juros: String,
  banco: String,
}
export default function InserirPages() {


  const { register, handleSubmit, reset } = useForm<IFornecedores>({
    defaultValues: {
      banco: "",
      cnpj: "",
      dataPagamento: "",
      fornecedor: "",
      valor: "1.00",
      juros: "0.00",
      multa: "0.00"
    }
  });
  const onSubmit: SubmitHandler<IFornecedores> = async data => {
    await insert_db(data.fornecedor, data.cnpj, data.dataPagamento, data.valor, data.multa, data.juros, data.banco)
    reset()
    localStorage.setItem("databaseModified", "1");
    handleCloseModal()
  };




  const [modalIsOpen, setIsOpen] = useState(false)
  async function handleOpenModal() {
    setIsOpen(true)
  }
  function handleCloseModal() {
    setIsOpen(false)
  }

  let [periodo, setPerido] = useState("");

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
      <div className="h-268 w-268 bg-SC_background flex flex-col rounded-lg px-5">
        <div className="mb-2 flex justify-end">
          <button type="button" className="rounded-md w-auto justify-center uppercase border-solid p-2 mt-2  bg-SC_button text-white text-sm font-bold hover:bg-SC_button_hover transition-colors" title="button" onClick={() => {
            handleOpenModal()
          }} >
            NOVO LANCAMENTO
          </button>
        </div>
        <Modal
          className="fixed xl:w-30% 2xl:w-20% pr-5 pb-5 pt-2 pl-2 rounded-md flex justify-center bg-SC_background3 shadow-xl"
          overlayClassName={"Overlay"}
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={handleCloseModal}
          style={customStyles}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-SC_background3 mt-4 ml-3">

              <label className="font-bold px-2">Fornecedor: </label>
              <input required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm" 
              {...register("fornecedor", {required: true, maxLength: 20 })} />

              <label className="font-bold px-2">CNPJ: </label>
              <InputMask mask="99.999.999/9999-99" required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm" 
              type='text'
              {...register("cnpj", { required: true, maxLength: 20 })} />

              <label className="font-bold px-2">Data de pagamento: </label>
              <input required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm" 
              type='date'
              {...register("dataPagamento", { required: true, maxLength: 20 })} />

              <label className="font-bold px-2">Valor: </label>
              <input required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm" 
              {...register("valor", { required: true, maxLength: 20 })} />
              
              <label className="font-bold px-2">Multa: </label>
              <input type="number" step={0.01} placeholder="100.54" className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm" 
              {...register("multa", { required: false, maxLength: 20 })} />
              
              <label className="font-bold px-2">Juros: </label>
              <input required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm" 
              {...register("juros", { required: true, maxLength: 20 })} />
              
              <label className="font-bold px-2">Banco: </label>
              <input required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm" 
              {...register("banco", { required: true, maxLength: 20 })} />
            </div>
            <div>
              <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 bg-SC_button text-white text-md font-bold hover:bg-SC_button_hover transition-colors" type="submit"
              >
                Inserir
              </button>
              <button className="rounded-md w-full justify-center uppercase border-solid p-2 mt-6 bg-SC_button_excluir text-white text-md font-bold hover:bg-SC_button_excluir_hover transition-colors" type="button" onClick={() => {
                handleCloseModal()
              }}>
                Fechar
              </button>
            </div>
          </form>
        </Modal>
        <div className="h-50% bg-SC_background3 rounded-lg border-solid border-2 ">
          <div className="overflow-y-auto h-full w-full p-2" onLoad={() => { useEffect(() => { }) }}>
            <ListView />
          </div>
        </div>
        <div className="h-100 flex flex-row items-end pb-2 pt-2">
          <div className="top-1">
            <a className="font-bold px-2">Mes de referencia:</a>
            <input type={"month"} className="w-56 rounded-md border-solid p-2  bg-SC_input placeholder:bg-white"
              onChange={(e) => setPerido(e.currentTarget.value)}
              placeholder="Insira o mes de referencia"
            />
          </div>
          <button className="rounded-md w-auto justify-center uppercase border-solid p-2 ml-2 bg-SC_button text-white text-sm font-bold hover:bg-SC_button_hover transition-colors" type="button" onClick={() => {
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
    </div >
  );
}