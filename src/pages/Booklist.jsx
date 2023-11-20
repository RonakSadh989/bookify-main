import React, { useEffect, useState } from "react";
import "../css/booklist.css";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useAlert } from "react-alert";
import up_left_guy from "../images/up-left-guy.svg";
import up_right_guy from "../images/up-right-guy.svg";
import logo from "../images/logo.jpeg";
export default function Booklist() {
  const [Name, setName] = useState("");
  const [studentID, setstudentID] = useState("");
  const [Price, setPrice] = useState("");
  const [CoverPic, setCoverPic] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();
  const alert = useAlert();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Name===""){
      alert.show("Enter name");
    }
    if(studentID===""){
      alert.show("Enter student ID");
    }
    if(Price===""){
      alert.show("Enter Price");
    }
    if(CoverPic===""){
      alert.show("Enter Cover");
    }
    else{
      await firebase
      .CreateNewListing(Name, studentID, Price, CoverPic)
      .then(
        (value) =>
        console.log(value) + navigate("/#/home") + alert.show("Book Created")
        );
      }
  };
  useEffect(() => {
    if (!firebase.isLoggedIn) {
      // navigate to home
      alert.show("Please Log In");
      navigate("/");
    }
  }, [firebase, navigate, alert]);
  return (
    <div className="booklist-main">
      <div>
      <div>
            <img src={logo} alt="" />
            <h1>BOOKIFY</h1>
          </div>
        <h1>Enter Book Detalils</h1>
        <form>
          <label htmlFor="">Name of the Book</label> <br />
          <input
            type="text"
            placeholder="Enter Book Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={Name}
          />{" "}
          <br />
          <label htmlFor="">Student ID</label> <br />
          <input
            type="text"
            placeholder="Enter Student ID"
            onChange={(e) => {
              setstudentID(e.target.value);
            }}
            value={studentID}
          />{" "}
          <br />
          <label htmlFor="">Price</label> <br />
          <input
            type="text"
            placeholder="Enter Book Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={Price}
          />{" "}
          <br />
          <label htmlFor="">Cover Picture</label> <br />
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setCoverPic(e.target.files[0]);
            }}
          />{" "}
          <br />
          <button onClick={handleSubmit}>Create Book</button>
        </form>
      </div>
      <div className="login-right">
        <img src={up_left_guy} alt="" />
        <p>BOOKIFY</p>
        <img src={up_right_guy} alt="" />
      </div>
    </div>
  );
}
