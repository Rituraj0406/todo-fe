# Todo Full Stack App

A React + TypeScript + Vite TODO application with authentication, protected routes, and Redux state management.

## Overview

This project is a client-side TODO application built with:

- **React 19**
- **TypeScript**
- **Vite**
- **Redux Toolkit**
- **React Router v7**
- **Axios**
- **Tailwind CSS**
- **Formik + Yup** for form validation


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

The app supports:

- user registration and login
- protected `/home` route
- todo fetching for authenticated users
- adding, toggling, and deleting todos
- token-based API authentication using `localStorage`

## Features

- **Auth flow**: register, login, logout
- **Protected pages**: access `/home` only when authenticated
- **Todo CRUD**: list, add, toggle complete, delete
- **Navbar**: app title and logout button
- **Optimistic UI updates** for toggling todos

## Required Backend Contract

The frontend expects a backend API with endpoints such as:

- `POST /auth/register`
- `POST /auth/login`
- `GET /todos`
- `POST /todos`
- `PUT /todos/:id`
- `DELETE /todos/:id`

The API should return a valid token on login/register when authentication is successful.

## Environment Variables

Create a `.env` file in the project root with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

- `VITE_API_BASE_URL`: backend API base URL
- `GOOGLE_CLIENT_ID`: optional Google OAuth client ID used by the login flow

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal to use the app locally.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    Navbar.tsx
    TodoInput.tsx
    TodoItem.tsx
    TodoList.tsx
    auth/
      LoginForm.tsx
      SignUpForm.tsx
      RequiredAuth.tsx
  features/
    auth/
      authSlice.ts
      authTypes.ts
    todos/
      todoSlice.ts
      todoTypes.ts
    snackbar/
      snackbarSlice.ts
  hooks/
    reduxHooks.ts
  pages/
    Home/
      Home.tsx
    Login/
      index.tsx
    Signup/
      index.tsx
  services/
    api.ts
  store/
    store.ts
  utils/
    helper.ts

public/
  (static assets)

package.json
README.md
vite.config.ts
```

## Important Files

- `src/services/api.ts` - Axios instance with auth token interceptor
- `src/features/auth/authSlice.ts` - auth actions and state management
- `src/features/todos/todoSlice.ts` - todo CRUD state management
- `src/pages/Home/Home.tsx` - home page with todo list and input
- `src/components/Navbar.tsx` - top navigation with logout

## How Authentication Works

- On login/register, the app saves `token` and `user` to `localStorage`
- `src/services/api.ts` adds `Authorization: Bearer <token>` to protected requests
- `src/components/auth/RequiredAuth.tsx` redirects unauthenticated users to `/login`

## Usage

1. Register a new user
2. Log in with email and password
3. Use the home page to view and manage todos
4. Click the logout button in the top-right corner to sign out

## GitHub Notes

This README is ready to use in GitHub. It provides setup instructions, usage, and important implementation details for contributors and reviewers.

## Troubleshooting

- If todos fail to load after login, verify the backend token response and `VITE_API_BASE_URL`.
- If registration creates a user but not a token, log in instead of relying on automatic auth.
- Use browser DevTools to inspect network requests and localStorage values.

## License

This repository is provided as-is for learning and development purposes.
