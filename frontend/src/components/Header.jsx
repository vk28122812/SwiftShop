import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartModal from "./CartModal.jsx";
import LogoutModal from "./LogoutModal.jsx";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const cartModal = useRef();
  const logoutModal = useRef();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let greeting;
  if (isAuthenticated) {
    greeting = `Welcome, ${user.name}!`;
  }
  function handleOpenCartClick() {
    cartModal.current.open();
  }
  function handleOpenLogoutModal() {
    logoutModal.current.open();
  }
  function handleLogin() {
    navigate("/login");
  }
  function handleCheckout(){
    cartModal.current.close();
    toast("Proceeding to checkout...");
    navigate("/checkout");
  }
  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button onClick={handleCheckout}>Checkout</button>
        {/* <button onClick={() => cartModal.current.handlePayment()}>Checkout</button> */}
      </>
    );
  }

  return (
    <>
      <CartModal
        key="cart"
        ref={cartModal}
        title="Your Cart"
        actions={modalActions}
      />
      <LogoutModal key="logout" ref={logoutModal} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" onClick={()=>navigate("/")}/>
          {/* <h1>SwiftShop</h1> */}
          <div id="greet">
            <h1  onClick={()=>navigate("/")}>Swift Shop</h1>
            {isAuthenticated && <h4>{greeting}</h4>}
          </div>
        </div>
        <p className="buttons">
          <button onClick={handleOpenCartClick}>
            <i className="fa-solid fa-cart-shopping"></i>({cartQuantity})
          </button>
          {isAuthenticated ? (
            <button title="Log Out" onClick={handleOpenLogoutModal}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          ) : (
            <button title="Log In" onClick={handleLogin}>
              <i className="fas fa-sign-in-alt"></i>
            </button>
          )}
        </p>
      </header>
    </>
  );
}
