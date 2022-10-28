import { useEffect, useState } from "react"
import { select_from_database, delete_in_database } from "../modules/db"
import { FiTrash2, FiEdit } from "react-icons/fi";
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
  let [fornecedor, setFornecedor] = useState("");
  let [cnpj, setCnpj] = useState("");
  let [valor, setValor] = useState("");
  let [multa, setMulta] = useState("");
  let [juros, setJuros] = useState("");
  let [banco, setBanco] = useState("");


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
    <table className="border-spacing-4 text-xl w-full rounded-md" onMouseEnter={() => { setvalue(time) }} >
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
                <button title="button" onClick={() => { delete_in_database(idS); setvalue(times) }} >
                  <FiEdit color="blue" />
                </button>
              </td>
            </tr>
          </tbody>

        )
      })}
    </table>
  );

}

export default ListView