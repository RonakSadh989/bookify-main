import React, { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar'

import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase";

const ViewMyBooking = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(30)
    firebase.listAll().then((books) => setBooks(books.docs));
    setProgress(100)
  }, [firebase]);
  if(books.length === 0){
    return ( <div className="home-main"><h1>No Booking</h1></div>  )
  }
  return (
    <div className="home-main">
       <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <h1>My Booking</h1>

        {books.map((book) => (
          (book.data().userID === firebase.User.uid)?

          <BookCard
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            bookID ={book.id}
            name = {book.data().book}
            btn_display= ""
            {...book.data()}
            btn= "Cancel"
          />
          : ""
        ))}

    </div>
  );
};

export default ViewMyBooking;
