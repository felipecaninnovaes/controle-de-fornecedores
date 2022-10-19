import { useEffect, useState } from "react"
import { select_from_database } from "../modules/db"
// import parser from 'html-react-parser'

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
      const apiResponse: any = await select_from_database(2);
      console.log(apiResponse);
      setFornecedores(apiResponse);
    }
    apiCall();
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto">
      {fornecedores.map(data => {
        return (
          <ol className=" flex flex-row pb-2 pt-2 mt-3 text-mt border-solid border-2 border-SC_border1"><li key={data?.id}>{data?.id} {data?.dataPagamento} {data?.fornecedor} {data?.valor} {data?.banco}</li></ol>
        )
      })}
    </div>
  );

}

export default ListView