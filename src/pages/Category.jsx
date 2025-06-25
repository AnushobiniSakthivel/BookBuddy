import { useState } from 'react';
import BookCard from '../components/BookCard';

const Category = () => {
  const [books] = useState([
    {
      title: "The Great Escape",
      price: 399,
      image: "/images/escape.jpg",
      link: "https://archive.org/details/greatescape0000bric_w7l5/page/n4/mode/1up"
    },
    {
      title: "Mindset",
      price: 349,
      image: "/images/mindset.jpg",
      link: "https://adrvantage.com/wp-content/uploads/2023/02/Mindset-The-New-Psychology-of-Success-Dweck.pdf"
    },
    {
      title: "Astrophysics 101",
      price: 499,
      image: "/images/astronomy.jpg",
      link: "https://oceanofpdf.com/genres/astronomy/pdf-astronomy-january-2024-download/"
    },
    {
      title: "Learn Python",
      price: 599,
      image: "/images/python.jpg",
      link: "https://books.google.co.in/books/about/Learn_Python_Programming.html?id=abtLEAAAQBAJ&printsec=frontcover"
    },
    {
      title: "Fairy Tales",
      price: 769,
      image: "/images/fairy.jpg",
      link: "https://books.google.co.in/books/about/A_First_Book_of_Fairy_Tales.html?id=q60BEQAAQBAJ&printsec=frontcover"
    },
    {
      title: "Marvel Adventures",
      price: 939,
      image: "/images/marvel.jpg",
      link: "https://books.google.co.in/books/about/Marvel_Adventures_The_Avengers_Vol_1.html?id=zTt9DwAAQBAJ&printsec=frontcover"
    },
    {
      title: "The Catcher in the Rye",
      price: 799,
      image: "/images/catcher.jpg",
      link: "https://books.google.co.in/books?id=ScdAEQAAQBAJ&pg=PA5"
    },
    {
      title: "Lord of the Rings",
      price: 879,
      image: "/images/lord.jpg",
      link: "https://books.google.co.in/books/about/The_Lord_of_the_Rings.html?id=GWorEAAAQBAJ&printsec=frontcover"
    },
    {
      title: "Jane Eyre",
      price: 999,
      image: "/images/jane.jpg",
      link: "https://books.google.co.in/books?id=oIg_EQAAQBAJ&pg=PT6"
    }
  ]);

  return (
    <main className="home-main">
      <section className="category-section" id="bookSection">
        <h2>Book Categories</h2>
        <div className="categories">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Category;