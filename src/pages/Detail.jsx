import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Book from "../components/Book";

export default function BookDetailPage() {
  const params = useParams();
  const [data, setdata] = useState(null);
  const [url, seturl] = useState(null);
  const [qty, setQty] = useState(null);
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setdata(value.data()));
  }, [firebase, params.bookId]);
  useEffect(() => {
    if (data) {
      const imageURl = data.imageURL;
      firebase.getImageURL(imageURl).then((url) => seturl(url));
      sessionStorage.setItem("owner", data.userEmail);
      sessionStorage.setItem("book", data.name);
      sessionStorage.setItem("imageURl", imageURl);
      sessionStorage.setItem("price", data.price);
      sessionStorage.setItem("displayName", data.displayName);
      sessionStorage.setItem("studentID", data.studentID);
    }
  }, [data, firebase]);

  if (data === null) {
    return <h1>Loading...</h1>;
  }
  const place = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    const result1 = await firebase.orderDoc(qty);
    console.log("Order Placed:", result);
    console.log("Order Docced", result1);
  };
  const on = (e) => {
    setQty(e.target.value);
  };

  return (
    <Book
      name={data.name}
      url={url}
      price={data.price}
      username={data.userdisplayName}
      email={data.userEmail}
      on={on}
      value={qty}
      click={place}
    />
  );
}
