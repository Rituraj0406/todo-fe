import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { addTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from "../../features/todos/todoSlice";
import Sidebar from "../../components/common/Sidebar";
import {
    Box,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    Typography,
    TextField
} from "@mui/material";
import Status from "../../components/common/Status";
import SearchIcon from '@mui/icons-material/Search';
import AddTodo from "../../components/todo/AddTodo";
import FilterTabs, { type FilterOption } from "../../components/common/FilterTabs";
import { sortByOptions } from "../../utils/helper";
import TodoList from "../../components/TodoList";

function Home() {
    const { todos } = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterOption>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const handleAddTodo = (data: { task: string; category: "Work" | "Learning" | "Personal"; priority: "High" | "Medium" | "Low" }) => {
        dispatch(addTodo({ ...data, completed: false }));
    }

    const handleToggleTodo = (_id: string) => {
        const todo = todos.find(t => t._id === _id);
        if (todo) {
            dispatch(toggleTodo({ _id, completed: todo.completed }));
        }
    }
    const handleDeleteTodo = (_id: string) => {
        dispatch(deleteTodo(_id));
    }

    const handleEditTodo = (_id: string, task: string) => {
        dispatch(updateTodo({ _id, task }));
    }

    const filteredTodos = [...todos]
        .filter((todo) => {
            const matchesSearch = todo.task
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesFilter = 
                filter === "all"
                    ? true
                    :filter === "completed"
                    ? todo.completed
                    : !todo.completed;
            const matchesCategory = categoryFilter === "all"
                ? true
                : todo.category.toLowerCase() === categoryFilter;
            return matchesSearch && matchesFilter && matchesCategory; 
        })
        .sort((a, b) => {
            if(sortBy === "newest") {
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            }
            if(sortBy === "oldest") {
                return (
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
            }
            if(sortBy === "priority") {
                const order: Record<string, number> = {
                    high: 0,
                    medium: 1,
                    low: 2
                };
                return order[a.priority] - order[b.priority];
            }
            return 0;
        })

    console.log(filteredTodos);

    const date = new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" });

    return (
        <Box className="flex">
            {/* Sidebar */}
            <Sidebar 
                mobileOpen={mobileOpen} 
                handleDrawerToggle={handleDrawerToggle} 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter}
            />
            {/* Main content Area */}
            <Box component="main" className="flex-1 px-4 py-5 md:px-7 md:py-8 w-[calc(100%-240px)] h-screen overflow-y-auto">
                <div className='flex flex-col gap-6'>
                    <Box className="flex justify-between items-center w-full">
                        <Box>
                            <Typography variant="h5" className="text-black font-extrabold mb-1">
                                All Tasks
                            </Typography>
                            <Typography variant="caption" >
                                {date}
                            </Typography>
                        </Box>
                        <FormControl>
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    minWidth: 160,
                                    height: 40,
                                    // text inside
                                    "& .MuiSelect-select": {
                                        padding: "8px 12px",
                                        display: "flex",
                                        alignItems: "center"
                                    },
                                    // border styling
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderRadius: "10px",
                                        borderColor: "#e5e7eb"
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#6366f1"
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#4f46e5"
                                    }
                                }}
                            >
                                {sortByOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Status todos={todos} />
                    {/* Search Bar */}
                    <TextField
                        value={search}
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        sx={{
                            minWidth: 220,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                background: "#f9fafb"
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e5e7eb"
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#6366f1"
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4f46e5"
                            }
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <AddTodo onAdd={handleAddTodo} />
                    <FilterTabs filters={['all', 'active', 'completed']}
                        value={filter}
                        onChange={setFilter}
                    />
                    <TodoList
                        todos={filteredTodos}
                        filter={filter}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                        onEdit={handleEditTodo}
                    />
                </div>
            </Box>
            <Outlet />
        </Box>
    )
}

export default Home;