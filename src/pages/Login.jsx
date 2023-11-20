import React, { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import logo from "../images/logo.jpeg";
import google from "../images/google.png";
import up_left_guy from "../images/up-left-guy.svg";
import up_right_guy from "../images/up-right-guy.svg";
import "../css/login.css";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
export default function LoginPage(props) {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [progress, setProgress] = useState(0)
  const SignIn = async (e) => {
    e.preventDefault();
    setProgress(30)
    console.log("Logging a user...");
    await firebase.signIn(email, password);
    setProgress(100)
  };
  const create = ()=>{
    setTimeout(() => {
       firebase.createUser(email, password, name, sessionStorage.getItem("uid"))    
    }, 2000);
  }
  const Signup = async (e) => {
    e.preventDefault();
    console.log("Signing up a user...");
    await firebase.signUp(email, password).then((value) =>create())
  }
  const signGoogle = (e) => {
    e.preventDefault();
    firebase.signUpGoogle();
  };
  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      firebase.getUserById(sessionStorage.getItem("uid")).then((value) =>sessionStorage.setItem("username", value.data().username))
      navigate("/");
    }
  }, [firebase, navigate ]);
  return (
    <>
    <LoadingBar
    color='#f11946'
    progress={progress}
    onLoaderFinished={() => setProgress(0)}
  />
      <div className="login-main">
        <div className="login-left">
          <div>
            <img src={logo} alt="" />
            <h1>BOOKIFY</h1>
          </div>
          <h1>{props.sign === "In" ? "Log In" : "Sign Up"}</h1>
          <p>Welcome back! Please enter your details.</p>

          <form action="">{
            (props.sign !== "In") ?
           <> <label htmlFor="">User Name</label>
            <br />
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your Username"
              onChange={(e) => {
                setname(e.target.value);
              }}
              value={name}
            />
            <br /> </> : ""}
            <label htmlFor="">Email</label>
            <br />
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter your Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
            />
            <br />
            <label htmlFor="">Password</label>
            <br />
            <input
              type="password"
              name=""
              id=""
              placeholder="Enter your Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
            />
            <br />
            <p href="">Forgot Password</p>
            <br />
            <button className='btn-in' onClick={(props.sign === "In")? SignIn : Signup} >Sign {props.sign}</button>
            <br />
            <button onClick={signGoogle}>
              <img src={google} alt="" />
              Sign In with Google
            </button>
          </form>
          <p>
            {" "}
            {props.sign === "In"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span onClick={()=> (props.sign === "In")?navigate("/register"): navigate("/login")}> Sign {props.sign === "In" ? "Up" : "In"}</span>
          </p>
        </div>
        <div className="login-right">
          <img src={up_left_guy} alt="" />
          <p>BOOKIFY</p>
          <img src={up_right_guy} alt="" />
        </div>
      </div>
    </>
  );
}
