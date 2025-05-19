# Test Técnico – Desarrollador React

Esta es una aplicación de React que permite visualizar y organizar tus películas favoritas.

## Decisiones Técnicas Clave

- **Framework/Librería:** Se utilizó React con Vite y TypeScript. Vite fue elegido por su rápida configuración y entorno de desarrollo ágil. TypeScript se incluyó para mejorar la calidad del código y la mantenibilidad, aprovechando el tipado estático.
- **Estructura de Componentes:** La aplicación se dividió en componentes reutilizables (`App`, `MovieForm`, `MovieList`) para una mejor organización y separación de responsabilidades.
  - `App.tsx`: Componente principal que maneja el estado general de la aplicación (lista de películas, ordenamiento, término de búsqueda) y la lógica de almacenamiento en `localStorage`.
  - `MovieForm.tsx`: Formulario para agregar y editar películas. Incluye validaciones básicas.
  - `MovieList.tsx`: Muestra la lista de películas y maneja la lógica para iniciar la edición o eliminación de una película.
- **Manejo de Estado:** Se utilizó el hook `useState` de React para el estado local de los componentes y para el estado global de la lista de películas en `App.tsx`. Para una aplicación más grande, se consideraría el uso de `useReducer` o una librería de manejo de estado como Zustand o Redux Toolkit.
- **Almacenamiento Local:** Las películas se guardan en `localStorage` utilizando `useEffect` para persistir los datos entre sesiones del navegador.
- **Estilos:** Se utilizó CSS puro en un archivo `App.css` para los estilos. Se evitó el uso de bibliotecas de componentes UI según la restricción. Se implementó un diseño responsive básico utilizando media queries.
- **IDs Únicos:** Se usó `crypto.randomUUID()` para generar IDs únicos para cada película al agregarla, lo cual es una API moderna y sencilla para este propósito.
- **Bonus Implementados:**
  - Búsqueda por nombre.
  - Edición de películas ya cargadas.
  - Uso de TypeScript.
  - Manejo de errores básicos (validación de campos vacíos, formato de año, URL de póster).
  - Animaciones sutiles (hover en items de película, transiciones en botones).

## Mejoras Futuras (con más tiempo)

- **Validación más robusta:** Implementar una librería de validación de esquemas (ej. Zod o Yup) para el formulario, permitiendo reglas más complejas y mensajes de error más detallados.
- **Pruebas Unitarias e Integración:** Agregar pruebas utilizando Jest y React Testing Library para asegurar la fiabilidad de los componentes y la lógica de la aplicación.
- **Optimización del rendimiento:** Para listas muy grandes, se podría virtualizar la lista de películas para mejorar el rendimiento del renderizado.
- **Mejoras de Accesibilidad (A11y):** Realizar una auditoría de accesibilidad más exhaustiva y aplicar mejoras (ej. atributos ARIA adicionales, mejor contraste, navegación por teclado completa).
- **Gestión de estado más avanzada:** Para funcionalidades más complejas o un equipo más grande, integrar una solución de manejo de estado global más robusta.
- **Animaciones más elaboradas:** Utilizar librerías como Framer Motion para animaciones más fluidas y complejas al agregar, eliminar o reordenar elementos.
- **Feedback visual al usuario:** Mejorar el feedback al agregar o editar películas (ej. notificaciones toast).
- **Despliegue:** Configurar un pipeline de CI/CD para desplegar la aplicación automáticamente (ej. con Vercel o Netlify).
- **Separación de lógica de negocio:** Extraer la lógica de `localStorage` y otras operaciones de datos a custom hooks o servicios dedicados para desacoplar los componentes.

## Cómo Ejecutar el Proyecto Localmente

1. **Clonar el repositorio (si aplica) o descargar los archivos.**
2. **Navegar a la carpeta del proyecto:**

   ```bash
   cd "Test-Tecnico–Desarrollador React/my-movie-app"
   ```

3. **Instalar las dependencias:**

   ```bash
   npm install
   ```

4. **Ejecutar la aplicación en modo de desarrollo:**

   ```bash
   npm run dev
   ```

   Esto iniciará la aplicación y generalmente la abrirá en `http://localhost:5173` (o un puerto similar) en tu navegador.

---

*Herramientas externas utilizadas: Ninguna más allá de Vite para la creación del proyecto y las herramientas de desarrollo estándar de React y TypeScript.*
