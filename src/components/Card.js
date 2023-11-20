import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/card.css"

import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setURL] = useState(null);


  useEffect(() => {
    if(!props.imageURL){
      return null
    }
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
   
  }, [firebase, props.imageURL]);
   function cancel(){
    firebase.cancelOrder(props.bookID).then(value=>window.location.reload())
   }
   function deleteOr(){
    firebase.deleteOrder(props.bookID).then(value=>window.location.reload())
   }

  return (
    <div className="card" >
      <div>
      <img src={url} alt="" />
      </div>
      <div>
      <h2>{props.name}</h2>
      <p>&#8377; {props.price}</p>
      <button onClick={(e) => navigate(props.link)} >View</button>
      <button  onClick={(props.btn === "Cancel")? cancel : deleteOr} style={{display: (props.bookID)?"":"none"}} >{props.btn}</button>
      </div>
    </div>
  );
};


export default BookCard;
