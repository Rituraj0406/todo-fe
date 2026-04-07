import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../features/auth/authSlice";
import { toggleTheme } from "../../features/theme/themeSlice";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


const drawerWidth = 240;

interface NavbarProps {
    handleDrawerToggle: () => void;
}

const Navbar = ({ handleDrawerToggle }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const { mode } = useAppSelector((state) => state.theme);


    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (

        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                // ml: { sm: `${drawerWidth}px` },
                ml: `${drawerWidth}px`,
                background: 'linear-gradient(90deg,#4f46e5,#6366f1)',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box className="flex justify-between w-full items-center">
                    <Typography variant="h6" noWrap component="div">
                        tasks.
                    </Typography>

                    <Box className="flex items-center gap-4">
                        <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>

                        {user && (
                            <Avatar
                                sx={{
                                    width: 34,
                                    height: 34,
                                    // background: theme.palette.primary.main,
                                    fontSize: 13,
                                    fontWeight: 700,
                                    border: "2px solid",
                                    // borderColor: theme.palette.divider,
                                    cursor: "pointer",
                                }}
                            >
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </Avatar>
                        )}
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
        // <nav className="bg-sky-500 text-white shadow-lg">
        //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="flex justify-between h-16">
        //             <div className="flex items-center">
        //                 <h1 className="text-xl font-bold">Todo App</h1>
        //             </div>
        //             <div className="flex items-center space-x-4">
        //                 {user && (
        //                     <span className="text-sm">
        //                         Welcome, {user.name || user.email}
        //                     </span>
        //                 )}
        //                 <button
        //                     onClick={handleLogout}
        //                     className="bg-red-300 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        //                 >
        //                     Logout
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </nav>
    );
};

export default Navbar;