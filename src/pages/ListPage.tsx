import { useEffect, useState } from "react"
import { select_from_database } from "../modules/db"
// import parser from 'html-react-parser'

interface Fornecedores {
    id: String,
    mes: String,
    fornecedor: String,
    data_pagamento: String,
    valor: String,
    banco: String,
}
export const ListView = () => {
    const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function apiCall() {
      const apiResponse = await select_from_database(2);
      
      console.log(apiResponse);
      setData(apiResponse);
    }
    apiCall();
  }, []);
  const names = ['']
  return (
    <div>
    </div>
  )

}

export default ListView