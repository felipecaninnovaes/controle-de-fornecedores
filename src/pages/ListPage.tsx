import { useEffect, useState } from "react"
import { select_from_database, delete_in_database } from "../modules/db"
import { FaTrashAlt } from "react-icons/fa";

interface Fornecedores {
  id: String,
  mes: String,
  fornecedor: String,
  dataPagamento: String,
  valor: String,
  banco: String,
}

export const ListView = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedores[] | null[]>([]);

  
  useEffect(() => {
    async function apiCall() {
      const apiResponse: any = await select_from_database();
      setFornecedores(apiResponse);
    }
    apiCall();
  }, []);

  return (
    <table className="border-spacing-4 text-xl">
      <thead>
        <tr>
          <th className="border-spacing-4">ID</th>
          <th>MES REFRENCIA</th>
          <th className="pl-2">DATA DE PAGAMENTO</th>
          <th>FORNECEDOR</th>
          <th>VALOR</th>
          <th>BANCO</th>
        </tr>
      </thead>
      {fornecedores.map(data => {
        return (
          <tbody key={data?.id}>
            <tr className=" border-solid border border-SC_border1" key={data?.id}><td className="border border-slate-700 border-spacing-4">{data?.id}</td><td className="border border-slate-700">{data?.mes}</td><td className="border border-slate-700">{data?.dataPagamento}</td><td className="border border-slate-700">{data?.fornecedor}</td><td className="border border-slate-700">{data?.valor}</td><td className="border border-slate-700">{data?.banco}</td>
            <td><button onClick={() =>{delete_in_database(data?.id)}} ><FaTrashAlt color="red"/></button></td>  
            </tr>
          </tbody>
          
        )
      })}
    </table>
  );

}

export default ListView