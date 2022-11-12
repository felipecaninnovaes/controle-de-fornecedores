import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { select_from_database, delete_in_database } from "../modules/db"
import { useForm, SubmitHandler } from "react-hook-form";

import './popUp.css'
import { edit_db } from "../modules/db"
import ReactInputMask from "react-input-mask";


interface IFornecedores {
  id: String,
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

  const { register, handleSubmit, setValue, reset, getValues } = useForm<IFornecedores>({
    defaultValues: {
      banco: "",
      cnpj: "",
      dataPagamento: "",
      fornecedor: "",
      juros: "",
      multa: "",
      valor: ""
    }
  });
  const onSubmit: SubmitHandler<IFornecedores> = async data => {
    edit_db(data.id, data.fornecedor, data.cnpj, data.dataPagamento, data.valor, data.multa, data.juros, data.banco)
    reset()
    localStorage.setItem("databaseModified", "1");
    handleCloseModal()
  };

  const [modalIsOpen, setIsOpen] = useState(false)

  function handleOpenModal(id: String, dataPagamento: String, fornecedor: String, cnpj: String, valor: String, multa: String, juros: String, banco: String) {
    const mesVa = String(dataPagamento).split("/")
    const dataV: String = String(mesVa[2] + "-" + mesVa[1] + "-" + mesVa[0])
    setValue('id', id)
    setValue('fornecedor', fornecedor)
    setValue('cnpj', cnpj)
    setValue('dataPagamento', dataV)
    setValue('valor', valor)
    setValue('multa', multa)
    setValue('juros', juros)
    setValue('banco', banco)
    setIsOpen(true)
  }
  function handleCloseModal() {
    setIsOpen(false)
    localStorage.setItem("databaseModified", "1");
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

  const [fornecedores, setFornecedores] = useState<IFornecedores[] | null[]>([]);
  const [value, setvalue] = useState("");
  useEffect(() => {
    async function apiCall() {
      const apiResponse: any = await select_from_database();
      localStorage.setItem("databaseModified", "0");
      console.log("DataBase Updated")
      setFornecedores(apiResponse);
    }
    apiCall();
  }, [value]);

  var intervalId = window.setInterval(function () {
    let updateKey = localStorage.getItem('databaseModified')
    if (updateKey === "1") {
      setvalue(value + 1)
    } else {

    }
    // console.log(updateKey)
  }, 3000);


  return (
    <div>
      <Modal
        className="absolute xl:w-30% 2xl:w-20%  pr-5 pb-5 pt-2 pl-2 rounded-md justify-center bg-SC_background3 shadow-xl"
        overlayClassName={"Overlay"}
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        onAfterClose={() => {
          setvalue(value + 1)
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-SC_background3 mt-4 ml-3">
            <div>
              <label className="font-bold px-2">ID: </label>
              <input disabled required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                {...register("id", { required: true, maxLength: 20 })} />

              <label className="font-bold px-2">Fornecedor: </label>
              <input maxLength={28} required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                {...register("fornecedor", { required: true, maxLength: 28 })} />

              <label className="font-bold px-2">CNPJ: </label>
              <ReactInputMask mask="99.999.999/9999-99" className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                {...register("cnpj", { required: true, maxLength: 60 })}/>

              <label className="font-bold px-2">Data de pagamento: </label>
              <input maxLength={20} required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                type='date'
                {...register("dataPagamento", { required: true, maxLength: 20 })} />

              <label className="font-bold px-2">Valor: </label>
              <input maxLength={20} type="number" required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                {...register("valor", { required: true, maxLength: 20 })} />

              <label className="font-bold px-2">Multa: </label>
              <input maxLength={20} type="number" required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                {...register("multa", { required: true, maxLength: 20 })} />

              <label className="font-bold px-2">Juros: </label>
              <input maxLength={20} type="number" required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                {...register("juros", { required: true, maxLength: 20 })} />

              <label className="font-bold px-2">Banco: </label>
              <input maxLength={20} required className="w-full rounded-md border-solid p-2 bg-SC_input placeholder:text-gray-500 placeholder:text-sm"
                {...register("banco", { required: true, maxLength: 20 })} />
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
          </div>
        </form>
      </Modal>
      <div className="tableClass"></div>
      <table className="text-md w-full rounded-md"
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
                      EXCLUIR
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