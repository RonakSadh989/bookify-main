import React from "react";
import "../css/book.css";
export default function Book(props) {
  return (
    <div className="book">
      <div>
        <img src={props.url} alt="" />
      </div>
      <div>
        <h2>Name : {props.name}</h2>
        <h2>Price : {props.price}</h2>
        <p>Owner : {props.username}</p>
        <p>Owner Email : {props.email}</p>
        <label>Quantity: </label>
        <input
          type="text"
          placeholder="Enter Quantity"
          onChange={props.on}
          value={props.value == null ? "" : props.value}
        />
        <br />
        <button onClick={props.click}>Buy Now</button>
      </div>
    </div>
  );
}
