import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import Navbar from "../../components/common/Navbar";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { getTodos } from "../../features/todos/todoSlice";
import Sidebar from "../../components/common/Sidebar";
import { Box, Toolbar } from "@mui/material";

function Home() {
    const { todos } = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    return (
        <Box className="flex">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            {/* Main content Area */}
            <Box component="main" className="flex-1 p-3 w-[calc(100%-240px)]">
                <Navbar handleDrawerToggle={handleDrawerToggle} />
                {/* VERY IMPORTANT (push content below AppBar) */}
                <Toolbar />
                <div className='max-w-115 mx-auto flex flex-col gap-2'>
                    <h1 className='text-3xl font-bold text-center mb-6 mt-4'>Todo Tasks</h1>
                    <TodoInput />
                    <TodoList
                        todo={todos}
                    />
                </div>
            </Box>
            <Outlet />
        </Box>
    )
}

export default Home;