import React from 'react'

function Failed() {
  return (
    <div className="card">
      <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto", display:"flex", justifyContent:"center", alignContent:"center"}}>
        <i className="checkmark" style={{color:"red"}}>!</i>
      </div>
      <h1 style={{color:"red"}}>Failed</h1>
      <p>Your payment failed.Try again</p>
    </div>
  )
}

export default Failed