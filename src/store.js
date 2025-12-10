import { atom } from 'nanostores';

export const lang = atom('es');
export const theme = atom('dark');

export const translations = {
    es: {
        heroTitle: "e-Books",
        heroSubtitle: "Tu biblioteca digital, ",
        heroSubtitleHighlight: "reinventada.",
        heroDescription: "Explora nuestra colección curada y descubre nuevos títulos con una experiencia inmersiva.",
        libraryTitle: "Biblioteca",
        libraryDesc: "Sumérgete en un universo de conocimiento. Explora nuestros títulos más destacados seleccionados para ti.",
        searchPlaceholder: "Buscar por título, autor o contenido...",
        notifications: "Notificaciones",
        enableNotifications: "Activar notificaciones",
        disableNotifications: "Desactivar notificaciones",
        notificationBody: "Recibirás avisos mientras lees.",
        notificationDisabled: "Notificaciones desactivadas.",
        noResults: "No se encontraron libros",
        tryAgain: "Intenta con otros términos de búsqueda",
        suggestionText: "¿Quizás buscabas este libro?",
        buyUSA: "Comprar USA",
        buyArg: "Comprar Argentina",
        listen: "Escuchar descripción",
        close: "Cerrar",
        author: "Autor:"
    },
    en: {
        heroTitle: "e-Books",
        heroSubtitle: "Your digital library, ",
        heroSubtitleHighlight: "reinvented.",
        heroDescription: "Explore our curated collection and discover new stories with an immersive experience.",
        libraryTitle: "Library",
        libraryDesc: "Dive into a universe of knowledge. Explore our featured titles selected just for you.",
        searchPlaceholder: "Search by title, author, or content...",
        notifications: "Notifications",
        enableNotifications: "Enable notifications",
        disableNotifications: "Disable notifications",
        notificationBody: "You will receive alerts while reading.",
        notificationDisabled: "Notifications disabled.",
        noResults: "No books found",
        tryAgain: "Try with other search terms",
        suggestionText: "Maybe you were looking for this book?",
        buyUSA: "Buy USA",
        buyArg: "Buy Argentina",
        listen: "Listen to description",
        close: "Close",
        author: "Author:"
    }
};
