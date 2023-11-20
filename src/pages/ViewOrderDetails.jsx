import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import "../css/vieworder.css"
export default function ViewOrderDetails() {
  const params = useParams();

  const firebase = useFirebase();
  const [orders, setorders] = useState([]);
  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setorders(orders.docs));
    
  }, [firebase, params.bookId]);
  
    if(orders.length === 0){
      return ( <div className="home-main"><h1>No Orders</h1></div>  )
    }
   

  return (
    <div className="home-main">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
      
        return (
          <div
            key={order.id}
            className="viewOrder">
            <h5>Order by: {data.userdisplayName}</h5>
           

            <h6>Qty: {data.qty}</h6>
            <p>Email: {data.buyerEmailEmail}</p>
          </div>
        );
      })}
    </div>
  );
}
