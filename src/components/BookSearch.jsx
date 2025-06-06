import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export default function BookSearch({ books }) {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const filteredBooks = Array.isArray(books)
    ? books.filter((book) => {
        const { title, author, description } = book.data;
        const body = book.body || "";
        const query = search.toLowerCase();
        return (
          title.toLowerCase().includes(query) ||
          author.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          body.toLowerCase().includes(query)
        );
      })
    : [];

// Sugerencia "IA" local: buscar el libro más parecido si no hay resultados
useEffect(() => {
  // Función para calcular la distancia de Levenshtein entre dos strings
  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] =
          a[i - 1] === b[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + 1
              );
      }
    }
    return matrix[a.length][b.length];
  }

  if (filteredBooks.length === 0 && search.length > 2 && Array.isArray(books)) {
    const queryWords = search.toLowerCase().split(" ");
    let bestBook = null;
    let bestScore = -Infinity;

    books.forEach((book) => {
      const { title, author, description } = book.data;
      const body = book.body || "";
      const text = `${title} ${author} ${description} ${body}`.toLowerCase();

      // Ponderación: título (3), autor (2), descripción (1)
      let score = 0;

      queryWords.forEach((word) => {
        // Coincidencia exacta en título
        if (title.toLowerCase() === word) score += 10;
        // Coincidencia parcial en título
        else if (title.toLowerCase().includes(word)) score += 6;

        // Coincidencia exacta en autor
        if (author.toLowerCase() === word) score += 6;
        // Coincidencia parcial en autor
        else if (author.toLowerCase().includes(word)) score += 3;

        // Coincidencia exacta en descripción
        if (description.toLowerCase() === word) score += 3;
        // Coincidencia parcial en descripción
        else if (description.toLowerCase().includes(word)) score += 1;

        // Coincidencia exacta/parcial en el body
        if (body.toLowerCase() === word) score += 2;
        else if (body.toLowerCase().includes(word)) score += 1;
      });

      // Suma inversa de la distancia de Levenshtein (más bajo = más parecido)
      score += Math.max(
        0,
       8 - levenshtein(text, search.toLowerCase())
      );

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

  // Solicita permiso y activa/desactiva notificaciones push
  const handleToggleNotifications = async () => {
    if (!('Notification' in window)) {
      alert('Las notificaciones no son compatibles con este navegador.');
      return;
    }
    if (!notificationsEnabled) {
      // Activar notificaciones
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification('Notificaciones activadas', { body: 'Recibirás avisos mientras lees.' });
      }
    } else {
      // Desactivar notificaciones (no hay API estándar para revocar, solo dejar de enviar)
      setNotificationsEnabled(false);
      alert('Notificaciones desactivadas. ¡Disfruta tu lectura sin interrupciones!');
    }
  };

  // Función para validar dominios de confianza en los enlaces de compra
  function isTrustedUrl(url) {
    try {
      const trustedDomains = [
        "amazon.com",
        "mercadolibre.com",
        "mercadolibre.com.ar"
        // agrega más dominios de confianza aquí si lo necesitas
      ];
      const parsed = new URL(url);
      return trustedDomains.some(domain => parsed.hostname.endsWith(domain));
    } catch {
      return false;
    }
  }

  // Función para validar rutas de imágenes seguras (solo locales)
  function isTrustedImage(src) {
    // Permite solo rutas que empiezan con "/" (carpeta pública del proyecto)
    return typeof src === "string" && src.startsWith("/");
  }

  return (
    <>
      <div className="relative w-full max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="¿Qué buscas?"
          className="border rounded px-4 py-2 w-full pr-10" // espacio para la cruz
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedBook(null); // Limpiar selección al buscar
          }}
        />
        {search && (
          <button
            type="button"
            aria-label="Borrar búsqueda"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-700 hover:text-red-800 focus:outline-none"
            onClick={() => setSearch("")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {selectedBook && (
        <div className="mb-4 p-4 bg-yellow-50 opacity-75 shadow-md shadow-gray-400 rounded-xl">
          <button
            className="mb-4 px-4 py-2 ml-1 text-black bg-yellow-50 opacity-75 shadow-md shadow-gray-400 rounded-xl transition hover:bg-yellow-200 hover:text-gray-800 hover:opacity-100"
            onClick={() => setSelectedBook(null)}
          >
            Volver a la lista
          </button>
          <div className="flex flex-col md:flex-row gap-8 mt-4 items-start md:items-center">
            <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
              {isTrustedImage(selectedBook.data.img) && (
                <img
                  src={selectedBook.data.img}
                  alt={selectedBook.data.title}
                  className="w-56 h-auto max-h-80 object-contain rounded-xl shadow-lg bg-white p-2"
                  style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
                />
              )}
            </div>
            <div className="flex flex-col justify-center w-full">
              <h1 className="text-3xl font-bold mb-2 text-black">{selectedBook.data.title}</h1>
              <h2 className="text-xl font-semibold mb-2 text-black">{selectedBook.data.author}</h2>
              <p className="text-black mb-2">{selectedBook.data.description}</p>
              <button
                className="mb-2 px-3 py-1 bg-blue-200 text-blue-900 rounded hover:bg-blue-300 transition w-max flex items-center gap-2"
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    const utter = new window.SpeechSynthesisUtterance(selectedBook.data.description);
                    utter.lang = 'es-ES';
                    window.speechSynthesis.speak(utter);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1 icon icon-tabler icons-tabler-outline icon-tabler-volume">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M15 8a5 5 0 0 1 0 8" />
                  <path d="M17.7 5a9 9 0 0 1 0 14" />
                  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                </svg>
                Escuchar descripción
              </button>
              {selectedBook.data.buy && (
                <div className="flex gap-4 mt-2">
                  {isTrustedUrl(selectedBook.data.buy.usa) && (
                    <a
                      href={selectedBook.data.buy.usa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      Comprar USA
                    </a>
                  )}
                  {isTrustedUrl(selectedBook.data.buy.argentina) && (
                    <a
                      href={selectedBook.data.buy.argentina}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      Comprar Argentina
                    </a>
                  )}
                </div>
              )}
              {selectedBook.body && (
                <div className="prose prose-gray dark:prose-invert mt-6 text-black">
                  <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{selectedBook.body}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {filteredBooks.length === 0 && suggestion && !selectedBook && (
        <button
          type="button"
          className="w-full text-left mb-4 p-4 bg-yellow-50 opacity-75 shadow-md shadow-gray-400 rounded-xl hover:bg-yellow-100 transition cursor-pointer"
          onClick={() => setSelectedBook(suggestion)}
          aria-label={`Ver detalles de ${suggestion.data.title}`}
        >
          <p>
            <strong className="text-black">¿Quizás buscabas este libro?</strong>
          </p>
          <div className="flex mt-2">
            {isTrustedImage(suggestion.data.img) && (
              <img
                src={suggestion.data.img}
                alt={suggestion.data.title}
                className="w-24 h-32 object-cover rounded mr-4"
              />
            )}
            <div>
              <h2 className="text-lg font-bold text-black">{suggestion.data.title}</h2>
              <p className="text-black">{suggestion.data.description}</p>
              <button
                className="mb-2 px-3 py-1 bg-blue-200 text-blue-900 rounded hover:bg-blue-300 transition w-max flex items-center gap-2"
                onClick={e => {
                  e.stopPropagation();
                  if ('speechSynthesis' in window) {
                    const utter = new window.SpeechSynthesisUtterance(suggestion.data.description);
                    utter.lang = 'es-ES';
                    window.speechSynthesis.speak(utter);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1 icon icon-tabler icons-tabler-outline icon-tabler-volume">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M15 8a5 5 0 0 1 0 8" />
                  <path d="M17.7 5a9 9 0 0 1 0 14" />
                  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                </svg>
                Escuchar descripción
              </button>
              <p className="text-black">Autor: {suggestion.data.author}</p>
            </div>
          </div>
        </button>
      )}
      <button
        onClick={handleToggleNotifications}
        className={`fixed top-4 right-4 flex items-center gap-2 px-3 py-1 rounded transition z-50 shadow-lg ${notificationsEnabled ? 'bg-red-200 text-black hover:bg-red-300' : 'bg-green-200 text-black hover:bg-green-300'}`}
        aria-label={notificationsEnabled ? 'Desactivar notificaciones' : 'Activar notificaciones'}
      ><p>notificaciones</p>
        {notificationsEnabled ? (
          // Icono campana con barra (notificaciones desactivadas)
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-5">
           <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M18 8a6 6 0 0 0-12 0c0-3.31 2.69-6 6-6s6 2.69 6 6z" />
            <path d="M6 8v5c0 1.1-.9 2-2 2h16c-1.1 0-2-.9-2-2V8" />
          </svg>
        ) : (
          // Icono campana (notificaciones activadas)
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-5">
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
            <path d="M6.26 6.26A6 6 0 0 0 6 8c0 5-2 6-2 6h16" />
            <path d="M18 8a6 6 0 0 0-9.33-5" />
            <path d="M1 1l22 22" />
          </svg>
        )}
      </button>
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
                {isTrustedImage(img) && (
                  <img
                    className={`mr-5 w-48 rounded-lg transition-transform duration-500 ${selectedBook ? "scale-110" : ""}`}
                    src={img}
                    alt={title}
                  />
                )}
              </button>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-black">{description}</p>
                <p className="text-black">Autor: {author}</p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
