# 📚 e-Books: Next-Gen Library Experience

![Project Banner](https://img.shields.io/badge/Status-Active-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> **Una plataforma de descubrimiento de libros re-imaginada.**  
> Combinando rendimiento estático con interactividad avanzada para crear una experiencia de usuario única y memorable.

🔗 **[Ver Demo en Vivo](https://nicolasrovetta.github.io/e-book/)**

---

## ✨ Características Destacadas ("The WOW Factor")

Este no es otro catálogo de libros estático. He implementado características avanzadas de UI/UX para diferenciar la experiencia:

### 🎲 Modo Serendipia
¿Indeciso? Un sistema interactivo que selecciona un libro al azar por ti, con animaciones de carga y celebración para gamificar el descubrimiento.

### 🧠 Filtros por "Vibes" (Análisis de Sentimiento)
Abandonamos los géneros tradicionales. Un motor de filtrado basado en palabras clave semánticas permite buscar libros por estado de ánimo:
- 🤯 **Explota Cabezas** (Futuro, Ciencia)
- 🧘‍♂️ **Zen / Profundo** (Filosofía)
- 🌑 **Oscuro** (Thriller, Terror)

### 🌌 Vista 3D CoverFlow
Interactividad inmersiva con **SwiperJS** y **Framer Motion**. Los usuarios pueden alternar entre una grilla eficiente y una vista de carrusel 3D cinematográfica.

---

## 🛠️ Tech Stack & Arquitectura

Diseñado con un enfoque en **Performance** (Core Web Vitals) y **Accesibilidad**.

| Tecnología | Uso Principal |
|------------|---------------|
| **Astro** 🚀 | Framework principal. Generación estática (SSG) para carga instantánea. |
| **React** ⚛️ | "Islas de interactividad" para componentes complejos (Search, Modal, Carousel). |
| **TailwindCSS** 🎨 | Sistema de diseño utility-first, responsivo y modo oscuro. |
| **Nanostores** 📦 | Gestión de estado global ligero (temas, idioma) entre islas. |
| **Framer Motion** 🎬 | Animaciones fluidas (micro-interacciones, transiciones de entrada). |
| **SwiperJS** 🖼️ | Carruseles táctiles y efectos 3D acelerados por hardware. |

---

## 🚀 Optimizaciones y Seguridad

- **Sanitización de Contenido:** Uso de `rehype-sanitize` para renderizar Markdown de forma segura y prevenir XSS.
- **Validación de Dominios:** Los enlaces de compra externa se verifican contra una lista blanca (Amazon, MercadoLibre) para seguridad del usuario.
- **React Portals:** Modales renderizados fuera del árbol DOM principal para evitar conflictos de apilamiento (z-index wars).
- **Web Speech API:** Accesibilidad nativa integrada para leer descripciones en voz alta.

---

## � Instalación

Si deseas correr este proyecto localmente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/NicolasRovetta/e-book.git

# 2. Instalar dependencias
pnpm install

# 3. Correr servidor de desarrollo
pnpm dev
```

---

## � Autor

**Nicolás Rovetta**  
*Desarrollador Frontend enfocado en crear experiencias web excepcionales.*

[LinkedIn](https://www.linkedin.com/in/nicolas-rovetta/) • [GitHub](https://github.com/NicolasRovetta)
