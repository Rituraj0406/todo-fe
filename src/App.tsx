import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
// import TodoInput from './components/TodoInput'
// import TodoList from './components/TodoList'
// import { useAppSelector } from './hooks/reduxHooks';
import Login from './pages/Login';
import SignUp from './pages/Signup/index';
import Home from './pages/Home/Home';
import RequireAuth from './components/auth/RequiredAuth';

function App() {
  // const {todos} = useAppSelector((state) => state.todos);

  return (
    <div className='min-h-screen flex flex-col'>
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
  )
}

export default App
