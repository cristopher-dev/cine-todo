# cine-todo – Desarrollador React

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

## Pruebas Unitarias con Jest y React Testing Library

Se ha implementado un conjunto de pruebas unitarias utilizando Jest y React Testing Library para validar la funcionalidad y comportamiento de los componentes de la aplicación. Estas pruebas aseguran que el código funcione como se espera y facilitan la detección temprana de errores durante el desarrollo.

### Configuración de Pruebas

- **Jest**: Framework de pruebas para JavaScript que proporciona la estructura principal para nuestras pruebas.
- **React Testing Library**: Utilizado para renderizar y probar componentes de React en un entorno de pruebas.
- **Jest DOM**: Proporciona matchers adicionales específicos para DOM para hacer las aserciones más expresivas y claras.

La configuración de Jest se encuentra en los siguientes archivos:
- `jest.config.cjs`: Configuración principal de Jest
- `jest.setup.ts`: Configuración adicional y extensiones para las pruebas
- `tsconfig.test.json`: Configuración de TypeScript específica para pruebas

### Estructura de Pruebas

Las pruebas se organizan en la carpeta `src/__tests__/` y siguen una estructura similar a los componentes de la aplicación:

- `simple.test.tsx`: Pruebas básicas para verificar la configuración correcta de Jest
- `MovieList.test.tsx`: Pruebas para el componente MovieList
- `MovieForm.test.tsx`: Pruebas para el componente MovieForm
- `App.simple.test.tsx`: Pruebas simplificadas para el componente principal App

### Pruebas Implementadas

#### Componente MovieList

- Verifica que se muestre un mensaje cuando no hay películas
- Comprueba que la lista de películas se renderice correctamente
- Valida que se llame a la función de eliminar cuando se hace clic en el botón "Eliminar"
- Verifica que se llame a la función de editar cuando se hace clic en el botón "Editar"

#### Componente MovieForm

- Comprueba que el formulario se renderice correctamente con campos vacíos
- Verifica que el formulario se inicialice con datos cuando se está en modo de edición
- Prueba la validación de campos obligatorios
- Valida el formato del año (debe ser un número de 4 dígitos)
- Comprueba que el formulario envíe los datos correctamente cuando se completa con información válida
- Verifica que se llame a la función de cancelar cuando se hace clic en el botón "Cancelar"

#### Componente App

- Prueba que los elementos principales de la interfaz se rendericen correctamente
- Verifica la interacción con localStorage para guardar y recuperar películas
- Comprueba la funcionalidad de filtrado por búsqueda
- Valida la funcionalidad de ordenamiento de películas

### Cómo Ejecutar las Pruebas

Para ejecutar todas las pruebas:

```bash
npm test
```

Para ejecutar pruebas específicas:

```bash
npm test -- --testPathPattern=MovieList
```

Para ejecutar las pruebas en modo de observación (que actualiza automáticamente cuando se modifican los archivos):

```bash
npm run test:watch
```

## Mejoras Futuras (con más tiempo)

- **Validación más robusta:** Implementar una librería de validación de esquemas (ej. Zod o Yup) para el formulario, permitiendo reglas más complejas y mensajes de error más detallados.
- **Ampliación de Pruebas:** Añadir pruebas de integración y pruebas end-to-end utilizando herramientas como Cypress para evaluar flujos completos de usuario.
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
   cd "cine-todo"
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

5. **Ejecutar las pruebas unitarias:**

   ```bash
   npm test
   ```

   Para ejecutar pruebas específicas:

   ```bash
   npm test -- --testPathPattern=MovieList
   ```

   Para ejecutar pruebas en modo de observación:

   ```bash
   npm run test:watch
   ```

---

_Herramientas externas utilizadas: Ninguna más allá de Vite para la creación del proyecto y las herramientas de desarrollo estándar de React y TypeScript._

# Reflexión sobre React

Trabajar con React para esta aplicación de lista de películas fue, en general, una experiencia fluida y productiva, especialmente gracias a su modelo de componentes y el ecosistema de herramientas como Vite. La principal **limitación** que encontré, inherente a la propia biblioteca y no un defecto, es la gestión del estado a medida que la aplicación crece. Si bien `useState` y `useEffect` son suficientes para una aplicación pequeña como esta, la propagación de props (prop drilling) y la sincronización del estado entre componentes no directamente relacionados podrían volverse engorrosas en un proyecto más grande. Por ejemplo, si la lógica de edición o los filtros se volvieran más complejos y necesitaran ser accedidos o modificados desde múltiples niveles de componentes, la gestión manual del estado se complicaría.

El **patrón o práctica más útil** para mantener el código escalable en este contexto fue la **descomposición en componentes pequeños y enfocados**, cada uno con su propia responsabilidad bien definida. `MovieForm` se encarga solo de la entrada de datos y validación básica, `MovieList` de la presentación y las acciones sobre cada película, y `App` orquesta el estado general y la lógica de negocio. Esta separación no solo hace que el código sea más fácil de entender y modificar, sino que también facilita la reutilización. Además, el uso de TypeScript desde el inicio, definiendo interfaces claras como `Movie`, ayudó a prevenir errores comunes y a mejorar la predictibilidad del flujo de datos entre componentes, lo cual es crucial para la escalabilidad y el mantenimiento a largo plazo.
