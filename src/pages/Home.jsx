import React, { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase";
import "../css/home.css"

const HomePage = () => {
  
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(30)
    firebase.listAllBooks().then((books) => setBooks(books.docs));
    setProgress(100)
  }, [firebase]);
 

  return (
    <div className="home-main">
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
     <h1>Book List</h1>
        {books.map((book) => (
          <BookCard
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            // btn_display = "none"
            {...book.data()}
          />
        ))}
    
    </div>
  );
};

export default HomePage;
