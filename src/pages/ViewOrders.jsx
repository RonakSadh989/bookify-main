import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import LoadingBar from 'react-top-loading-bar'
import BookCard from "../components/Card";
export default function ViewOrders() {
  const [books, setbooks] = useState([]);
  const [progress, setProgress] = useState(0)
  const firebase = useFirebase();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      setProgress(30)
      firebase
      .fetchMyBooks(firebase.User.uid)
      .then((books) => setbooks(books.docs));
      setProgress(100)
    }
  }, [firebase]);
  if(books.length === 0){
    return ( <div className="home-main"><h1>No Books</h1></div>  )
  }
  if (!firebase.isLoggedIn) {
    return <h1>Please Log in</h1>;
  }
  return (
    <div className="home-main">
         <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1>My Books</h1>
      {books.map((book) => (
        <BookCard
          link={`/book/orders/${book.id}`}
          bookID  = {book.id}
          key={book.id}
          id={book.id}
          {...book.data()}
          btn = "Delete Book"
        />
      ))}
    </div>
  );
}
