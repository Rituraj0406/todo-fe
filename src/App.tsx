import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
// import TodoInput from './components/TodoInput'
// import TodoList from './components/TodoList'
import { useAppSelector } from './hooks/reduxHooks';
import Login from './pages/Login';
import SignUp from './pages/Signup/index';
import Home from './pages/Home/Home';
import RequireAuth from './components/auth/RequiredAuth';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMemo, useEffect } from 'react';

function App() {
  const { mode } = useAppSelector((state) => state.theme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4f46e5', // Indigo-600 equivalent
          },
          secondary: {
            main: '#f43f5e', // Rose-500 equivalent
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300'>
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Navigate to='/login' replace/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>

          <Route
            path='/home'
            element={
              <RequireAuth>
                <Home/>
              </RequireAuth>
            }
          >
            {/* protected routes */}
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
