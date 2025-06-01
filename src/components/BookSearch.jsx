import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function BookSearch({ books }) {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = Array.isArray(books)
    ? books.filter((book) => {
        const { title, author, description } = book.data;
        const query = search.toLowerCase();
        return (
          title.toLowerCase().includes(query) ||
          author.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query)
        );
      })
    : [];

  // Sugerencia "IA" local: buscar el libro más parecido si no hay resultados
  useEffect(() => {
    if (filteredBooks.length === 0 && search.length > 2 && Array.isArray(books)) {
      const queryWords = search.toLowerCase().split(" ");
      let bestBook = null;
      let bestScore = 0;
      books.forEach((book) => {
        const text = `${book.data.title} ${book.data.author} ${book.data.description}`.toLowerCase();
        let score = 0;
        queryWords.forEach((word) => {
          if (text.includes(word)) score++;
        });
        if (score > bestScore) {
          bestScore = score;
          bestBook = book;
        }
      });
      setSuggestion(bestScore > 0 ? bestBook : null);
    } else {
      setSuggestion(null);
    }
  }, [search, filteredBooks, books]);

  // Si hay libro seleccionado, solo mostrar ese
  const booksToShow = selectedBook ? [selectedBook] : filteredBooks;

  return (
    <>
      <input
        type="text"
        placeholder="¿Qué buscas?"
        className="border rounded px-4 py-2 w-full max-w-md mx-auto mb-6"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedBook(null); // Limpiar selección al buscar
        }}
      />
      {selectedBook && (
        <div className="mb-4 p-4 bg-yellow-50 opacity-75 shadow-md shadow-gray-400 rounded-xl">
          <button
            className="mb-4 px-4 py-2 ml-1 text-gray-600 bg-yellow-50 opacity-75 shadow-md shadow-gray-400 rounded-xl transition hover:bg-yellow-200 hover:text-gray-800 hover:opacity-100"
            onClick={() => setSelectedBook(null)}
          >
            Volver a la lista
          </button>
          <div className="flex flex-col md:flex-row gap-8 mt-4 items-start md:items-center">
            <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
              <img
                src={selectedBook.data.img}
                alt={selectedBook.data.title}
                className="w-56 h-auto max-h-80 object-contain rounded-xl shadow-lg bg-white p-2"
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <h1 className="text-3xl font-bold mb-2 text-gray-600">{selectedBook.data.title}</h1>
              <h2 className="text-xl font-semibold mb-2 text-gray-600">{selectedBook.data.author}</h2>
              <p className="text-gray-700 mb-2">{selectedBook.data.description}</p>
              {selectedBook.data.buy && (
                <div className="flex gap-4 mt-2">
                  <a
                    href={selectedBook.data.buy.usa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  >
                    Comprar USA
                  </a>
                  <a
                    href={selectedBook.data.buy.argentina}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  >
                    Comprar Argentina
                  </a>
                </div>
              )}
              {selectedBook.body && (
                <div className="prose prose-gray dark:prose-invert mt-6 text-gray-600">
                  <ReactMarkdown>{selectedBook.body}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {filteredBooks.length === 0 && suggestion && !selectedBook && (
        <div className="mb-4 p-4 bg-yellow-50 opacity-75 shadow-md shadow-gray-400 rounded-xl">
          <p>
            <strong className="text-gray-600">¿Quizás buscabas este libro?</strong>
          </p>
          <div className="flex mt-2">
            <img
              src={suggestion.data.img}
              alt={suggestion.data.title}
              className="w-24 h-32 object-cover rounded mr-4"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-600">{suggestion.data.title}</h2>
              <p className="text-gray-600">{suggestion.data.description}</p>
              <p className="text-gray-600">Autor: {suggestion.data.author}</p>
            </div>
          </div>
        </div>
      )}
      <div className="mb-5 h-90 grid gap-6 grid-cols-1 md:grid-cols-2">
        {!selectedBook && booksToShow.map((book) => {
          const { slug, data } = book;
          const { title, author, img, description } = data;
          return (
            <article className="flex" key={slug}>
              <button
                type="button"
                className="mb-2 xl:mb-0 focus:outline-none transition hover:scale-110"
                onClick={() => setSelectedBook(book)}
              >
                <img
                  className={`mr-5 w-48 rounded-lg transition-transform duration-500 ${selectedBook ? "scale-110" : ""}`}
                  src={img}
                  alt={title}
                />
              </button>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-600">{description}</p>
                <p className="text-gray-600">Autor: {author}</p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
