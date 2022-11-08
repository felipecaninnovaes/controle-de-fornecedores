import { AppRoutes } from "./Routes";
import {create_database} from "./modules/db"

function App() {
  create_database()
  return (
  <div className="h-screen w-screen font-roboto justify-center flex flex-row items-center bg-SC_background">
    <AppRoutes/>
  </div>
  )

}

export default App;