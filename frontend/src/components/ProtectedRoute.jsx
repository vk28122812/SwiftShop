
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
  const items = useSelector(state=>state.cart);
  const cartQuantity = items.reduce((total,item) => total+item.cartQuantity, 0);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/shop" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;