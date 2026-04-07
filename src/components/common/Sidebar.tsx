import {
    Box,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Chip
} from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";

const drawerWidth = 260;

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    categoryFilter: string;
    setCategoryFilter: (val: string) => void;
}

export default function Sidebar({ mobileOpen, handleDrawerToggle, categoryFilter, setCategoryFilter }: SidebarProps) {
    const { counts } = useAppSelector(state => state.todos);

    const categories = [
        { name: "All", count: counts.all },
        { name: "Work", count: counts.categories.work },
        { name: "Learning", count: counts.categories.learning },
        { name: "Personal", count: counts.categories.personal }
    ];

    const priorities = [
        { name: "High", count: counts.priorities.high, color: "#ef4444" },
        { name: "Medium", count: counts.priorities.medium, color: "#f59e0b" },
        { name: "Low", count: counts.priorities.low, color: "#22c55e" }
    ];

    const drawerContent = (
        <>
            {/* Header */}
            <Box mb={4}>
                <Typography variant="h5" fontWeight="bold">
                    tasks.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Stay focused. Stay clear.
                </Typography>
            </Box>

            {/* Categories */}
            <Box>
                <Typography
                    variant="caption"
                    sx={{ letterSpacing: 1, color: "gray" }}
                >
                    CATEGORIES
                </Typography>
                <List>
                    {categories.map((item) => (
                        <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    setCategoryFilter(item.name.toLowerCase());
                                }}
                                sx={{
                                    borderRadius: "12px",
                                    background: categoryFilter === item.name.toLowerCase()
                                        ? "linear-gradient(90deg,#4f46e5,#6366f1)"
                                        : "transparent",
                                    color: categoryFilter === item.name.toLowerCase() ? "#fff" : "#374151",
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Typography>{item.name}</Typography>

                                <Chip
                                    label={item.count}
                                    size="small"
                                    sx={{
                                        background: categoryFilter === item.name.toLowerCase()
                                            ? "rgba(255,255,255,0.2)"
                                            : "#e5e7eb",
                                        color: categoryFilter === item.name.toLowerCase() ? "#fff" : "#374151"
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Priority */}
            <Typography
                variant="caption"
                sx={{ letterSpacing: 1, color: "gray" }}
            >
                PRIORITIES
            </Typography>
            <List>
                {priorities.map((item) => (
                    <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderRadius: "10px",
                                cursor: "default",

                                "&:hover": {
                                    backgroundColor: "transparent"
                                }
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background: item.color
                                    }}
                                />
                                <Typography>{item.name}</Typography>
                            </Box>

                            <Typography color="text.secondary">
                                {item.count}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Dark Mode */}
            <Box mt="auto">
                <Box
                    sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "10px",
                        textAlign: "center",
                        cursor: "pointer"
                    }}
                >
                    🌙 Dark mode
                </Box>
            </Box>
        </>
    );
    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>

            {/* ✅ Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        padding: "20px",
                        background: "#f9fafb"
                    }
                }}
            >
                {drawerContent}
            </Drawer>

            {/* ✅ Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        padding: "20px",
                        background: "#f9fafb"
                    }
                }}
                open
            >
                {drawerContent}
            </Drawer>

        </Box>
    );
}