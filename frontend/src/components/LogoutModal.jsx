import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const LogoutModal = forwardRef(function LogoutModal(props,ref) {
  const navigate = useNavigate();
  const dialog = useRef();
  const dispatch = useDispatch();
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close:() => {
        dialog.current.close();
      }
    };
  });

  function handleLogout(){
    dialog.current.close();
    toast("Logged out! Redirecting to home.");
    dispatch(authActions.logout());
    navigate("/shop");
  }

  function handleCancel(){
    dialog.current.close();
  }

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>Log Out</h2>
      <p>Are you sure you want to log out? </p>
      <form method="dialog">
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="button" onClick={handleLogout}>Confirm</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default LogoutModal;