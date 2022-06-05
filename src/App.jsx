//Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import About from './Pages/About';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import DeleteProduct from './Pages/DeleteProduct';
import AllOrders from './Pages/AllOrders';
import PlaceOrder from './Pages/PlaceOrder';
//Components
import Navbar from './Components/Navbar';
import Cart from './Components/Cart';
import CategoryDetails from './Components/CategoryDetails';
//React / React-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { React, useState, useEffect } from "react";
//toastify
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);

  const checkForUser = () => {
    if (JSON.parse(localStorage.getItem("currUser") !== null))
      setUser(JSON.parse(localStorage.getItem("currUser")));
    else setUser(undefined);
  };

  const checkForOpenOrder = () => {
    //ls - Local Storage
    // let lsUser = JSON.parse(localStorage.getItem("currUser"));
    // if (JSON.parse(localStorage.getItem("openOrder") !== null) && (lsUser.userID === user.userID))
    if (JSON.parse(localStorage.getItem("openOrder") !== null))
      setCart(JSON.parse(localStorage.getItem("openOrder")));
    else setCart(undefined);
  };

  useEffect(() => {
    checkForUser();
    checkForOpenOrder();
  }, []);

  const handleAddToCart = async (item) => {
    
    const arr = [item];
    if (cart === undefined) {
      await setCart(arr);
    }

    toast.success(item.title + " added to Cart!", {
      position: "top-right",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    if ((localStorage.getItem("openOrder") === null) || (localStorage.getItem("openOrder") === undefined)) {
      localStorage.setItem("openOrder", JSON.stringify([{ UserId: user.userID, OrderId: 1, ProductId: item.id, Product_Name: item.title, ProductImg: item.img, ProductBG: item.bg, Product_Desc: item.desc, Price: item.price, Amount: item.amount, AllProductPrice:(item.amount*item.price), OrderTotalPrice: 0 }]))
    }
    else {
      var currOrder = JSON.parse(localStorage.getItem("openOrder"));
      let sameProduct = currOrder.find((x) => x.ProductId === item.id);
      let index = currOrder.indexOf(sameProduct);

      if (index < 0) {
        let AllOrdersData = JSON.parse(localStorage.getItem("AllOrders"));
        currOrder.push({ UserId: user.userID, OrderId: AllOrdersData[AllOrdersData.length - 1].OrderId + 1, ProductId: item.id, Product_Name: item.title, ProductImg: item.img, ProductBG: item.bg, Product_Desc: item.desc, Price: item.price, Amount: item.amount, AllProductPrice:(item.amount*item.price), OrderTotalPrice: 0 });
        localStorage.setItem("openOrder", JSON.stringify(currOrder));
      }
      else {
        currOrder[index].Amount += 1;
        localStorage.setItem("openOrder", JSON.stringify(currOrder));
      }
    }
    setCart(currOrder);
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].Amount += d;

    if (arr[ind].Amount === 0)
      arr[ind].Amount = 1;
    setCart([...arr]);

    var currOrder = JSON.parse(localStorage.getItem("openOrder"));
    let sameProduct = currOrder.find((x) => x.ProductId === item.ProductId);
    let index = currOrder.indexOf(sameProduct);

    currOrder[index].Amount+=d;
    currOrder[index].TotalPrice =(currOrder[index].Amount*currOrder[index].Price);

    localStorage.setItem("openOrder", JSON.stringify(currOrder));
    setCart(currOrder);
  };

  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar user={user} setUser={setUser} setCart={setCart} size={cart === undefined ? 0 : cart.length} />}>
            <Route index element={<Home />} />
            <Route path="Home" element={<Home user={user} setUser={setUser} cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} handleChange={handleChange} />} />
            <Route path="About" element={<About user={user} setUser={setUser} cart={cart} setCart={setCart} handleChange={handleChange} />} />
            <Route path="AddProduct" element={<AddProduct user={user} setUser={setUser} cart={cart} setCart={setCart} handleChange={handleChange} />} />
            <Route path="EditProduct" element={<EditProduct user={user} setUser={setUser} cart={cart} setCart={setCart} handleChange={handleChange} />} />
            <Route path="DeleteProduct" element={<DeleteProduct user={user} setUser={setUser} cart={cart} setCart={setCart} handleChange={handleChange} />} />
            <Route path="AllOrders" element={<AllOrders user={user} setUser={setUser} cart={cart} setCart={setCart} handleChange={handleChange} />} />
            <Route path="Login" element={<Login user={user} setUser={setUser} />} />
            <Route path="/category/:CategoryDetails" element={<CategoryDetails user={user} setUser={setUser} cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} handleChange={handleChange} />} />
            <Route path="Cart" element={<Cart user={user} setUser={setUser} cart={cart} setCart={setCart} handleChange={handleChange} />} />
            <Route path="PlaceOrder" element={<PlaceOrder user={user} cart={cart} setCart={setCart} handleChange={handleChange} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        limit={1}
      />
    </div>
  );
}

export default App;