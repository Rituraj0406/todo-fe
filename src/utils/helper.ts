export const sortByOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'priority', label: 'Priority' },
];

export function formatDate(date: Date): string {
    const now = new Date();

    const diff = Math.floor(
        (now.getTime() - date.getTime()) / 1000
    );

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}