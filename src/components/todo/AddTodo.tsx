import { useState } from "react";
import {
    Box,
    TextField,
    // IconButton,
    Button,
    Typography,
    Chip,
    Collapse,
    useTheme
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CATEGORIES = [
    { id: "Work", label: "Work" },
    { id: "Learning", label: "Learning" },
    { id: "Personal", label: "Personal" }
] as const;

const PRIORITIES = [
    { id: "High", label: "High", color: "#ef4444" },
    { id: "Medium", label: "Medium", color: "#f59e0b" },
    { id: "Low", label: "Low", color: "#22c55e" }
] as const;

interface AddTodoProps {
    onAdd: (todo: { task: string; category: "Work" | "Learning" | "Personal"; priority: "High" | "Medium" | "Low" }) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState<"Work" | "Learning" | "Personal">("Work");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();

    const handleSubmit = () => {
        if (!task.trim()) return;
        onAdd({ task: task.trim(), category, priority });
        setTask("");
        setExpanded(false);
    };

    return (
        <Box
            sx={{
                border: "1.5px solid",
                borderColor: expanded ? "primary.main" : "divider",
                borderRadius: "14px",
                p: 1.5,
                transition: "all 0.2s ease",
                boxShadow: expanded ? `0 0 0 3px ${theme.palette.primary.main}33` : "none",
                mb: 3,
                background: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)"
            }}
        >
            {/* Input Row */}
            <Box display="flex" alignItems="center" gap={1}>
                <AddIcon sx={{ color: "primary.main" }} />

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Add a new task…"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onFocus={() => setExpanded(true)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                        if (e.key === "Escape") setExpanded(false);
                    }}
                    slotProps={{
                        input: { disableUnderline: true }
                    }}
                />

                {task.trim() && (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleSubmit}
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            background: 'linear-gradient(90deg,#4f46e5,#6366f1)',
                            fontWeight: 600
                        }}
                    >
                        Add
                    </Button>
                )}
            </Box>

            {/* Expanded Section */}
            <Collapse in={expanded}>
                <Box
                    mt={2}
                    pt={1.5}
                    sx={{ borderTop: "1px solid", borderColor: "divider" }}
                    display="flex"
                    gap={3}
                    flexWrap="wrap"
                >
                    {/* Category */}
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            CATEGORY
                        </Typography>

                        <Box mt={1} display="flex" gap={1}>
                            {CATEGORIES.map((c) => (
                                <Chip
                                    key={c.id}
                                    label={c.label}
                                    onClick={() => setCategory(c.id)}
                                    color={category === c.id ? "primary" : "default"}
                                    variant={category === c.id ? "filled" : "outlined"}
                                    sx={{ textTransform: "capitalize" }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Priority */}
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            PRIORITY
                        </Typography>

                        <Box mt={1} display="flex" gap={1}>
                            {PRIORITIES.map((p) => (
                                <Chip
                                    key={p.id}
                                    label={p.label}
                                    onClick={() => setPriority(p.id)}
                                    variant={priority === p.id ? "filled" : "outlined"}
                                    sx={{
                                        textTransform: "capitalize",
                                        borderColor: p.color,
                                        color: priority === p.id ? "#fff" : p.color,
                                        background:
                                            priority === p.id ? p.color : "transparent",
                                        "&:hover": {
                                            background: priority === p.id ? p.color : theme.palette.mode === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
}