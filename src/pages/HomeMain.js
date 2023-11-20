import React from "react";
import "../css/main.css";
import { useFirebase } from "../context/Firebase";
import up_left_guy from "../images/up-left-guy.svg";
import up_right_guy from "../images/up-right-guy.svg";
import middle_guy from "../images/middle-guy.svg";
import money_saved from "../images/money-saved.svg";
import our_story from "../images/our-story.svg";
import subject_covered from "../images/subject-covered.svg";
import book_trade from "../images/book-trade.svg";
import down_left_guy from "../images/down-left-guy.svg";
import down_right_guy from "../images/down-right-guy.svg";
import arrow from "../images/67e9efa1-f718-4cf3-ab03-4089c456bb23.svg";
import tweet from "../images/c17a4c7c-e5de-4313-812d-224dec358447.svg";
import insta from "../images/e26b3fcd-d941-472f-bc0c-0d97bd52b6d8.svg";


export default function HomeMain() {
  const firebase = useFirebase();
 if(firebase.isLoggedIn){
    firebase.getUserById(sessionStorage.getItem("uid")).then((value) =>sessionStorage.setItem("username", value.data().username))
 }
  return (
    <div className="main">
      
      <main>
        <img src={up_left_guy} alt="" />
        <p>BOOKIFY</p>
        <ul>
          <li>
            <a href="#/book/list">Sell</a>
          </li>
          <li>
            <a href="#/home">Purchase</a>
          </li>
          <li>
            <a href="#/">About</a>
          </li>
        </ul>
        <img src={up_right_guy} alt="" />
      </main>
      <section id="studies">
        <img src={middle_guy} alt="" />
        <div>
          <h1>Revolutionize Your Studies</h1>
          <p>
            Gone are the days of hunting for textbooks at the library or
            splurging on new ones. Bookify is here to reshape the way students
            buy and trade their schoolbooks. Dare to break free from the
            shackles of the overpriced textbook market!
          </p>
        </div>
      </section>
      <section id="ready">
        <h1>Ready to embark on the textbook adventure?</h1>
        <div>
          <button>
            <a href="#/book/orders">My Books</a>
          </button>
          <button>
            <a href="#/book/booking">My Orders</a>
          </button>
        </div>
      </section>
      <section id="boxes">
        <div className="box">
          <img src={book_trade} alt="" />
          <div>
            <p>Book Traded</p>
            <p>25,000 happy students</p>
          </div>
          <img src={arrow} alt="" />
        </div>
        <div className="box">
          <img src={money_saved} alt="" />
          <div>
            <p>Money Saved</p>
            <p>$1 million in wallets</p>
          </div>
          <img src={arrow} alt="" />
        </div>
        <div className="box">
          <img src={subject_covered} alt="" />
          <div>
            <p>Subjects Covered</p>
            <p>300+ diverse fields</p>
          </div>
          <img src={arrow} alt="" />
        </div>
      </section>
      <section id="img">
        <img src={down_left_guy} alt="" />
        <img src={down_right_guy} alt="" />
      </section>
      <section id="story">
        <div>
          <h1>Our Story</h1>
          <p>
            Books were cluttering up our rooms and eating away at our
            savings—but that’s when the idea of Bookify was born. <br /> <br />{" "}
            With a noble mission in sight and creativity as our fuel, we aspired
            to change the way students trade books, and built Bookify from the
            ground up. <br /> <br />
            Now, we’re a thriving community, as rich and diverse as the books we
            trade.
          </p>
        </div>
        <div>
          <img src={our_story} alt="" />
        </div>
      </section>
      <footer>
        <div>
          <ul>
            <li>Help</li>
            <li>FAQ</li>
            <li
              onClick={() => {
                firebase.signOutUser();
                sessionStorage.removeItem("uid")
              }}
            >
              Log Out
            </li>
            <li>Contact</li>
          </ul>
          <ul>
            <li>Account</li>
            <li>Login</li>
            <li>Sign-up</li>
            <li>
              <a href="#/book/list">List</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#/register">Register</a>
            </li>
            <li>
              <a href="#/login">Login</a>
            </li>
            <li>
              <a href="#/book/orders">Books</a>
            </li>
            <li>
              <a href="#/book/booking">booking</a>
            </li>
          </ul>
        </div>
        <div>
          <p>
            <span>&#169;</span> 2023 Bookify, the textbook revolution
          </p>
          <div>
            <img src={insta} alt="" />
            <img src={tweet} alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
}
