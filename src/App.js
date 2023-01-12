import {BrowserRouter,Route,Routes,Link} from "react-router-dom"
import { Homepage } from "./views/home";

function App() {
    
  
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Homepage/>}></Route>
         
       
      </Routes>
      </BrowserRouter>
    );
  }

  export default App ;