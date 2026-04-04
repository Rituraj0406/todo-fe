import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
// import TodoInput from './components/TodoInput'
// import TodoList from './components/TodoList'
// import { useAppSelector } from './hooks/reduxHooks';
import Login from './pages/Login';
import SignUp from './pages/Signup/index';
import RequireAuth from './components/auth/REquiredAuth';
import Home from './pages/Home/Home';

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
    // <div className='max-w-115 mx-auto flex flex-col gap-2'>
    //   <h1 className='text-3xl font-bold text-center mb-6 mt-4'>Todo Tasks</h1>
    //   <TodoInput/>
    //   <TodoList
    //     todo={todos}
    //   />
    // </div>
  )
}

export default App
