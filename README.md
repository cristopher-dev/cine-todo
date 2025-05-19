# cine-todo – React Developer

This is a React application that allows you to view and organize your favorite movies.

## Key Technical Decisions

- **Framework/Library:** React with Vite and TypeScript was used. Vite was chosen for its quick setup and agile development environment. TypeScript was included to improve code quality and maintainability, leveraging static typing.
- **Component Structure:** The application was divided into reusable components (`App`, `MovieForm`, `MovieList`) for better organization and separation of concerns.
  - `App.tsx`: Main component that handles the general state of the application (movie list, sorting, search term) and the logic for storage in `localStorage`.
  - `MovieForm.tsx`: Form for adding and editing movies. Includes basic validations.
  - `MovieList.tsx`: Displays the movie list and handles the logic to initiate editing or deleting a movie.
- **State Management:** React's `useState` hook was used for local component state and for the global state of the movie list in `App.tsx`. For a larger application, the use of `useReducer` or a state management library like Zustand or Redux Toolkit would be considered.
- **Local Storage:** Movies are saved in `localStorage` using `useEffect` to persist data between browser sessions.
- **Styles:** Pure CSS was used in an `App.css` file for styling. The use of UI component libraries was avoided according to the restriction. A basic responsive design was implemented using media queries.
- **Unique IDs:** `crypto.randomUUID()` was used to generate unique IDs for each movie when adding it, which is a modern and simple API for this purpose.
- **Implemented Bonus Features:**
  - Search by name.
  - Editing of already loaded movies.
  - Use of TypeScript.
  - Basic error handling (validation of empty fields, year format, poster URL).
  - Subtle animations (hover on movie items, transitions on buttons).

## Unit Tests with Jest and React Testing Library

A set of unit tests has been implemented using Jest and React Testing Library to validate the functionality and behavior of the application components. These tests ensure that the code works as expected and facilitate early detection of errors during development.

### Test Configuration

- **Jest**: JavaScript testing framework that provides the main structure for our tests.
- **React Testing Library**: Used to render and test React components in a test environment.
- **Jest DOM**: Provides additional DOM-specific matchers to make assertions more expressive and clear.

The Jest configuration can be found in the following files:

- `jest.config.cjs`: Main Jest configuration
- `jest.setup.ts`: Additional configuration and extensions for tests
- `tsconfig.test.json`: TypeScript configuration specific for tests

### Test Structure

The tests are organized in the `src/__tests__/` folder and follow a structure similar to the application components:

- `simple.test.tsx`: Basic tests to verify the correct Jest configuration
- `MovieList.test.tsx`: Tests for the MovieList component
- `MovieForm.test.tsx`: Tests for the MovieForm component
- `App.simple.test.tsx`: Simplified tests for the main App component

### Implemented Tests

#### MovieList Component

- Verifies that a message is displayed when there are no movies
- Checks that the movie list renders correctly
- Validates that the delete function is called when the "Delete" button is clicked
- Verifies that the edit function is called when the "Edit" button is clicked

#### MovieForm Component

- Checks that the form renders correctly with empty fields
- Verifies that the form initializes with data when in edit mode
- Tests required field validation
- Validates the year format (must be a 4-digit number)
- Checks that the form submits data correctly when completed with valid information
- Verifies that the cancel function is called when the "Cancel" button is clicked

#### App Component

- Tests that the main interface elements render correctly
- Verifies interaction with localStorage to save and retrieve movies
- Checks the search filtering functionality
- Validates the movie sorting functionality

### How to Run the Tests

To run all tests:

```bash
npm test
```

To run specific tests:

```bash
npm test -- --testPathPattern=MovieList
```

To run tests in watch mode (which automatically updates when files are modified):

```bash
npm run test:watch
```

## Future Improvements (with more time)

- **More robust validation:** Implement a schema validation library (e.g., Zod or Yup) for the form, allowing more complex rules and more detailed error messages.
- **Test Expansion:** Add integration tests and end-to-end tests using tools like Cypress to evaluate complete user flows.
- **Performance optimization:** For very large lists, the movie list could be virtualized to improve rendering performance.
- **Accessibility (A11y) Improvements:** Conduct a more thorough accessibility audit and apply improvements (e.g., additional ARIA attributes, better contrast, complete keyboard navigation).
- **Advanced state management:** For more complex functionalities or a larger team, integrate a more robust global state management solution.
- **More elaborate animations:** Use libraries like Framer Motion for smoother and more complex animations when adding, removing, or reordering elements.
- **Visual feedback to the user:** Improve feedback when adding or editing movies (e.g., toast notifications).
- **Deployment:** Configure a CI/CD pipeline to automatically deploy the application (e.g., with Vercel or Netlify).
- **Business logic separation:** Extract `localStorage` logic and other data operations to dedicated custom hooks or services to decouple components.

## How to Run the Project Locally

1. **Clone the repository (if applicable) or download the files.**
2. **Navigate to the project folder:**

   ```bash
   cd "cine-todo"
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Run the application in development mode:**

   ```bash
   npm run dev
   ```

   This will start the application and usually open it at `http://localhost:5173` (or a similar port) in your browser.

5. **Run the unit tests:**

   ```bash
   npm test
   ```

   To run specific tests:

   ```bash
   npm test -- --testPathPattern=MovieList
   ```

   To run tests in watch mode:

   ```bash
   npm run test:watch
   ```

---

_External tools used: None beyond Vite for project creation and standard React and TypeScript development tools._

# Reflection on React

Working with React for this movie list application was, overall, a smooth and productive experience, especially thanks to its component model and the ecosystem of tools like Vite. The main **limitation** I found, inherent to the library itself and not a defect, is state management as the application grows. While `useState` and `useEffect` are sufficient for a small application like this, prop drilling and state synchronization between components that are not directly related could become cumbersome in a larger project. For example, if editing logic or filters became more complex and needed to be accessed or modified from multiple component levels, manual state management would become complicated.

The **most useful pattern or practice** for keeping the code scalable in this context was the **decomposition into small, focused components**, each with its own well-defined responsibility. `MovieForm` handles only data input and basic validation, `MovieList` handles presentation and actions on each movie, and `App` orchestrates the general state and business logic. This separation not only makes the code easier to understand and modify, but also facilitates reuse. Additionally, using TypeScript from the start, defining clear interfaces like `Movie`, helped prevent common errors and improve predictability of data flow between components, which is crucial for long-term scalability and maintenance.
