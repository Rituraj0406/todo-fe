import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Typography,
    Checkbox,
    IconButton,
    Chip,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Todo } from "../features/todos/todoTypes";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatDate } from "../utils/helper";

interface Props {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string) => void;
}

const categoryColors: Record<string, string> = {
    Work: "#3b5bdb",
    Learning: "#0ca678",
    Personal: "#f76707"
};

const priorityColors: Record<string, string> = {
    High: "#ef4444",
    Medium: "#f59e0b",
    Low: "#22c55e"
};

const TodoItem: React.FC<Props> = ({
    todo,
    onToggle,
    onDelete,
    onEdit
}) => {
    const [hovered, setHovered] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editText, setEditText] = useState(todo.task);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    const handleDelete = () => {
        setDeleting(true);
        setTimeout(() => onDelete(todo._id), 300);
    };

    const handleSave = () => {
        if (editText.trim() && editText !== todo.task) {
            onEdit(todo._id, editText.trim());
        }
        setEditing(false);
    };

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                display: "flex",
                gap: 1.5,
                p: 2,
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                mb: 1,
                background: "#fff",
                transition: "all 0.25s ease",
                opacity: deleting ? 0 : 1,
                transform: deleting
                    ? "translateX(40px) scale(0.95)"
                    : "none",
                boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.08)" : "none"
            }}
        >
            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo._id)}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                    color: "#9ca3af", // unchecked color
                    "&.Mui-checked": {
                        color: "#6366f1" // checked color (your theme)
                    }
                }}
            />

            <Box flex={1}>
                {editing ? (
                    <TextField
                        inputRef={inputRef}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") setEditing(false);
                        }}
                        variant="standard"
                        fullWidth
                    />
                ) : (
                    <Typography
                        onDoubleClick={() => !todo.completed && setEditing(true)}
                        sx={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            color: todo.completed ? "text.secondary" : "text.primary",
                            cursor: "pointer"
                        }}
                    >
                        {todo.task}
                    </Typography>
                )}

                {/* Meta */}
                <Box mt={1} display="flex" gap={2} alignItems="center" flexWrap="wrap">
                    {/* Priority Dot */}
                    <Box display="flex" alignItems="center" gap={0.8}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: priorityColors[todo.priority] || "#cbd5e1"
                            }}
                        />
                        {/* <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: "0.7rem", textTransform: "capitalize" }}>
                            {todo.priority}
                        </Typography> */}
                    </Box>

                    <Chip
                        label={todo.category}
                        size="small"
                        sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            background: categoryColors[todo.category] + "15",
                            color: categoryColors[todo.category],
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}
                    />

                    <Typography fontSize="0.7rem" color="text.secondary">
                        {formatDate(new Date(todo.createdAt))}
                    </Typography>
                </Box>
            </Box>

            {/* Actions */}
            <Box
                sx={{
                    display: "flex",
                    opacity: hovered ? 1 : 0,
                    transition: "0.2s"
                }}
            >
                {!todo.completed && (
                    <IconButton onClick={() => setEditing(true)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                )}

                <IconButton onClick={handleDelete}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default TodoItem;