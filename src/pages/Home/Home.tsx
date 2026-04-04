import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import Navbar from "../../components/Navbar";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { getTodos } from "../../features/todos/todoSlice";

function Home() {
  const {todos} = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

    return (
        <div>
            <Navbar />
            <Outlet />
            <div className='max-w-115 mx-auto flex flex-col gap-2'>
                <h1 className='text-3xl font-bold text-center mb-6 mt-4'>Todo Tasks</h1>
                <TodoInput />
                <TodoList
                    todo={todos}
                />
            </div>
        </div>
    )
}

export default Home;