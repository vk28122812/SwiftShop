import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/LogoutModal.jsx";
import SignUp from "./components/SignUp.jsx";
import Checkout from "./components/Checkout.jsx";
import Success from "./components/Success.jsx";
import Failed from "./components/Failed.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shop" element={<Shop />} />
        
        <Route element={<ProtectedRoute/>}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success/>}/>
          <Route path="/failed" element={<Failed/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App;
