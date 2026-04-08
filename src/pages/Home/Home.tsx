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
    TextField,
    useTheme
} from "@mui/material";
import Status from "../../components/common/Status";
import SearchIcon from '@mui/icons-material/Search';
import AddTodo from "../../components/todo/AddTodo";
import FilterTabs, { type FilterOption } from "../../components/common/FilterTabs";
import { sortByOptions } from "../../utils/helper";
import TodoList from "../../components/todo/TodoList";

function Home() {
    const theme = useTheme();
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
                    : filter === "completed"
                        ? todo.completed
                        : !todo.completed;
            const matchesCategory = categoryFilter === "all"
                ? true
                : todo.category.toLowerCase() === categoryFilter;
            return matchesSearch && matchesFilter && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "newest") {
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            }
            if (sortBy === "oldest") {
                return (
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
            }
            if (sortBy === "priority") {
                const order: Record<string, number> = {
                    high: 0,
                    medium: 1,
                    low: 2
                };
                return order[a.priority] - order[b.priority];
            }
            return 0;
        })

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
            <Box
                component="main"
                className="flex-1 px-4 py-5 md:px-7 md:py-8 w-[calc(100%-240px)] h-screen overflow-y-auto"
                sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                }}
            >
                <div className='flex flex-col gap-6'>
                    <Box className="flex justify-between items-center w-full">
                        <Box>
                            <Typography
                                variant="h5"
                                className="text-black dark:text-white font-extrabold mb-1"
                                sx={{
                                    fontWeight: 800,
                                    mb: 1,
                                    color: theme.palette.text.primary
                                }}
                            >
                                All Tasks
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
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
                                        borderColor: "divider"
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main"
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main"
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
                                backgroundColor: theme.palette.background.paper,
                                transition: "all 0.2s ease"
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.divider
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main
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