import type { Todo } from "../../features/todos/todoTypes";
import CustomLinearProgress from "./CustomLinearProgress";

interface StatusProps {
    todos: Todo[];
}

function Status({ todos }: StatusProps) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    console.log('print:--', total, completed, pct)
    const progress = todos.length > 0 ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0;
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span>{completed} of {total} completed</span>
                <span>{pct}%</span>
            </div>
            <div>
                <CustomLinearProgress height={8} variant="determinate"
                    value={progress}
                    barColor="#4f46e5"
                    trackColor="#e5e7eb"
                />
            </div>
        </div>
    )
}

export default Status;