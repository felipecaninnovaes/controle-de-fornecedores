import { AppRoutes } from "./Routes";
import {create_database} from "./modules/db"

function App() {
  create_database()
  return (
  <div >
    <AppRoutes/>
  </div>
  )


}

export default App;