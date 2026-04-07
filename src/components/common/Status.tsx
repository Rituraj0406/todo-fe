import { useTheme } from "@mui/material";
import type { Todo } from "../../features/todos/todoTypes";
import CustomLinearProgress from "./CustomLinearProgress";

interface StatusProps {
    todos: Todo[];
}

function Status({ todos }: StatusProps) {
    const theme = useTheme()
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    const progress = todos.length > 0 ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0;

    const trackColor =
  theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.1)"
    : "#e5e7eb";
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span>{completed} of {total} completed</span>
                <span>{pct}%</span>
            </div>
            <div>
                <CustomLinearProgress height={8} variant="determinate"
                    value={progress}
                    barColor="linear-gradient(90deg,#4f46e5,#6366f1)"
                    trackColor={trackColor}
                />
            </div>
        </div>
    )
}

export default Status;