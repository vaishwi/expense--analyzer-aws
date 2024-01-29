
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReceiptList from './pages/ReceiptList';
import Logout from './pages/Logout';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
         <Routes>
           <Route element={<SignUp />} path="/signup" />
           <Route element={<SignIn />} path="/signin" />
           <Route element={<Logout />} path="/logout" />
           <Route element={<SignIn />} path="/" />
           <Route element={<Home />} path="/home" />
           <Route element={<ReceiptList />} path="/receiptlist" />
         </Routes>
       </BrowserRouter>

    </div>
  );
}

export default App;

// https://www.npmjs.com/package/amazon-cognito-identity-js

// https://stackoverflow.com/questions/69269863/module-not-found-cant-resolve-emotion-react-in-e-frontend-node-modules-m

// https://smartdevpreneur.com/align-buttons-in-material-ui-using-the-box-component/#How_to_Align_Right_in_MUI
