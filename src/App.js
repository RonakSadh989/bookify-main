import "bootstrap/dist/css/bootstrap.min.css"
// PAGES
import LoginPage from "./pages/Login"
import Home from "./pages/Home";
import Booklist from "./pages/Booklist";
import BookDetailPage from "./pages/Detail";
import ViewOrders from "./pages/ViewOrders";
import ViewOrderDetails from "./pages/ViewOrderDetails";
import ViewMyBooking from "./pages/ViewMyBooking";

import MyNav from "./components/Navbar"
// CSS
import './App.css';

import { Routes, Route} from "react-router-dom";
import HomeMain from "./pages/HomeMain";
import { useFirebase } from "./context/Firebase";

function App() {
  const firebase = useFirebase()
  return (
   <>
   {/* <MyNav/> */}
    <Routes>
     <Route path="/" element={firebase.isLoggedIn?<HomeMain />:<LoginPage sign="In"/>}/>
     <Route path="/home" element={<Home/>}/>
     <Route path="/register" element={<LoginPage sign="Up"/>}/>
     <Route path="/login" element={<LoginPage sign="In"/>}/>
     <Route path="/book/list" element={<Booklist/>}/>
     <Route path="/book/orders" element={<ViewOrders/>}/>
     <Route path="/book/booking" element={<ViewMyBooking/>}/>
     <Route path="/book/view/:bookId" element={<BookDetailPage/>}/>
     <Route path="/book/orders/:bookId" element={<ViewOrderDetails/>}/>
    </Routes>
   </>

  );
}

export default App;
