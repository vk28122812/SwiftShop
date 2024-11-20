import React from 'react';

function Success() {

  return (
    <div className="card">
      <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto", display:"flex", justifyContent:"center", alignContent:"center", color:"green"}}>
        <i className="checkmark">✓</i>
      </div>
      <h1 style={{color:"green"}}>Success</h1>
      <p >We received your purchase request;<br /> we'll be in touch shortly!</p>
    </div>
  );
}
export default Success;