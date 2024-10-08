import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/Login/SignUp';
import DataTable from './containers/DataTable';
import Navbar from './components/navbar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dataTable' element={<DataTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
