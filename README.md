
# e-Books: Plataforma de Libros Electrónicos

¡Bienvenido a **e-Books**! Este proyecto es una plataforma web moderna para explorar, buscar y compartir libros electrónicos, desarrollada con [Astro](https://astro.build/), React y TailwindCSS.

---

## 🚀 Enfoque del sitio

- **Seguridad ante todo:**
  - Sanitización automática de contenido Markdown para evitar XSS.
  - Validación de enlaces externos (solo dominios de confianza como Amazon y Mercado Libre).
  - Solo se permiten imágenes locales para proteger la privacidad y evitar contenido malicioso.

- **Experiencia de usuario:**
  - Búsqueda inteligente de libros con sugerencias.
  - Lectura de descripciones en voz alta (Web Speech API).
  - Notificaciones para mejorar la interacción.

- **Diseño moderno:**
  - Interfaz responsiva y atractiva con TailwindCSS y efectos visuales.

---

## 🛠️ Tecnologías y librerías utilizadas

- **Astro**: Framework principal para el sitio estático y SSR.
- **React**: Componentes interactivos (búsqueda, efectos, etc).
- **TailwindCSS**: Estilos rápidos y modernos.
- **react-markdown**: Renderizado seguro de contenido Markdown.
- **rehype-sanitize**: Sanitización de HTML generado desde Markdown.

### Instalaciones clave

- `pnpm add react-markdown rehype-sanitize`
- `pnpm add -D tailwindcss @tailwindcss/typography`

---

## 📦 Estructura del proyecto

```text
/
├── public/           # Imágenes y recursos estáticos
├── src/
│   ├── components/   # Componentes React (BookSearch, Atropos, etc)
│   ├── content/      # Libros en formato Markdown
│   ├── layouts/      # Layouts Astro
│   └── pages/        # Páginas Astro
├── tailwind.config.js
├── astro.config.mjs
└── package.json
```

---

## 🧑‍💻 Comandos útiles

| Comando            | Acción                                      |
|--------------------|---------------------------------------------|
| `pnpm install`     | Instala las dependencias                    |
| `pnpm dev`         | Inicia el servidor de desarrollo            |
| `pnpm build`       | Genera la versión de producción             |
| `pnpm preview`     | Previsualiza el sitio antes de desplegar    |

---

## 📚 ¿Cómo agregar libros?

Agrega archivos `.md` en `src/content/books/` siguiendo el esquema de los ejemplos existentes. El contenido se mostrará automáticamente en la plataforma.

---

## 🌐 Más información

- [Documentación de Astro](https://docs.astro.build)
- [TailwindCSS](https://tailwindcss.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)

¡Esperamos que disfrutes explorando y compartiendo libros en e-Books! 🚀
