import { getDatabase,set,ref } from 'firebase/database';

import './App.css';
import { Home } from './pages/Home';
import { LoginPage } from './pages/loginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/signupPage/RegisterPage';
import { useEffect, useState } from 'react';
import { useFirebase,firebaseApp } from './context/firebase';
import {Product} from './pages/productPage/Product';
import { Dashboard } from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import EditAboutDetail from './components/EditAboutDetail';


const db=getDatabase(firebaseApp);

function App() {

  const { getItems,user } = useFirebase();
  
  console.log("this is the current user",user);
  const [items, setItems] = useState([]);
  console.log(getItems);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems);
        console.log(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [getItems]);

  return (
    <div className="App">
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-about-detail/:id" element={<EditAboutDetail />} />
      </Routes>
       <ToastContainer position="top-center" autoClose={1000}/>
    </div>
  );
}

export default App;
