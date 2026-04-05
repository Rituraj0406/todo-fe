import {
    Box,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Chip
} from "@mui/material";

const drawerWidth = 260;

// ✅ Dummy Data (later replace with API)
const categories = [
    { name: "All", count: 6, active: true },
    { name: "Work", count: 3 },
    { name: "Learning", count: 2 },
    { name: "Personal", count: 1 }
];

const priorities = [
    { name: "High", count: 2, color: "#ef4444" },
    { name: "Medium", count: 3, color: "#f59e0b" },
    { name: "Low", count: 1, color: "#22c55e" }
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
                            sx={{
                                borderRadius: "12px",
                                background: item.active
                                    ? "linear-gradient(90deg,#4f46e5,#6366f1)"
                                    : "transparent",
                                color: item.active ? "#fff" : "#374151",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography>{item.name}</Typography>

                            <Chip
                                label={item.count}
                                size="small"
                                sx={{
                                    background: item.active
                                        ? "rgba(255,255,255,0.2)"
                                        : "#e5e7eb",
                                    color: item.active ? "#fff" : "#374151"
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>

        {/* Priority */}
        <List>
            {priorities.map((item) => (
                <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderRadius: "10px"
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

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

export default function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
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
    // return (
    //     <Drawer
    //         variant="permanent"
    //         sx={{
    //             width: drawerWidth,
    //             flexShrink: 0,
    //             "& .MuiDrawer-paper": {
    //                 width: drawerWidth,
    //                 boxSizing: "border-box",
    //                 padding: "20px",
    //                 background: "#f9fafb"
    //             }
    //         }}
    //     >
    //         {/* Header */}
    //         <Box mb={4}>
    //             <Typography variant="h5" fontWeight="bold">
    //                 tasks.
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary">
    //                 Stay focused. Stay clear.
    //             </Typography>
    //         </Box>

    //         {/* Categories */}
    //         <Box mb={4}>
    //             <Typography
    //                 variant="caption"
    //                 sx={{ letterSpacing: 1, color: "gray" }}
    //             >
    //                 CATEGORIES
    //             </Typography>

    //             <List>
    //                 {categories.map((item) => (
    //                     <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
    //                         <ListItemButton
    //                             sx={{
    //                                 borderRadius: "12px",
    //                                 background: item.active
    //                                     ? "linear-gradient(90deg,#4f46e5,#6366f1)"
    //                                     : "transparent",
    //                                 color: item.active ? "#fff" : "#374151",
    //                                 display: "flex",
    //                                 justifyContent: "space-between"
    //                             }}
    //                         >
    //                             <Typography>{item.name}</Typography>

    //                             <Chip
    //                                 label={item.count}
    //                                 size="small"
    //                                 sx={{
    //                                     background: item.active
    //                                         ? "rgba(255,255,255,0.2)"
    //                                         : "#e5e7eb",
    //                                     color: item.active ? "#fff" : "#374151"
    //                                 }}
    //                             />
    //                         </ListItemButton>
    //                     </ListItem>
    //                 ))}
    //             </List>
    //         </Box>

    //         {/* Priority */}
    //         <Box mb={4}>
    //             <Typography
    //                 variant="caption"
    //                 sx={{ letterSpacing: 1, color: "gray" }}
    //             >
    //                 PRIORITY
    //             </Typography>

    //             <List>
    //                 {priorities.map((item) => (
    //                     <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
    //                         <ListItemButton
    //                             sx={{
    //                                 display: "flex",
    //                                 justifyContent: "space-between",
    //                                 borderRadius: "10px"
    //                             }}
    //                         >
    //                             <Box display="flex" alignItems="center" gap={1}>
    //                                 <Box
    //                                     sx={{
    //                                         width: 10,
    //                                         height: 10,
    //                                         borderRadius: "50%",
    //                                         background: item.color
    //                                     }}
    //                                 />
    //                                 <Typography>{item.name}</Typography>
    //                             </Box>

    //                             <Typography color="text.secondary">
    //                                 {item.count}
    //                             </Typography>
    //                         </ListItemButton>
    //                     </ListItem>
    //                 ))}
    //             </List>
    //         </Box>

    //         {/* Dark Mode Button */}
    //         <Box mt="auto">
    //             <Box
    //                 sx={{
    //                     border: "1px solid #e5e7eb",
    //                     borderRadius: "12px",
    //                     padding: "10px",
    //                     textAlign: "center",
    //                     cursor: "pointer"
    //                 }}
    //             >
    //                 🌙 Dark mode
    //             </Box>
    //         </Box>
    //     </Drawer>
    // );
}