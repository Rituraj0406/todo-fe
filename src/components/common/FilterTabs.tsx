import React from "react";
import { Box, Button } from "@mui/material";

export type FilterOption = "all" | "active" | "completed";

interface FilterTabsProps {
    filters: FilterOption[];
    value: FilterOption;
    onChange: (value: FilterOption) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
    filters,
    value,
    onChange
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "4px",
                background: "#e5e7eb",
                borderRadius: "10px",
                p: "4px",
                mb: 2
            }}
        >
            {filters.map((f) => {
                const isActive = value === f;

                return (
                    <Button
                        key={f}
                        onClick={() => onChange(f)}
                        fullWidth
                        sx={{
                            textTransform: "capitalize",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            borderRadius: "8px",
                            px: 1,
                            py: 0.6,
                            minWidth: 0,

                            backgroundColor: isActive ? "#fff" : "transparent",
                            color: isActive ? "#111827" : "#6b7280",
                            boxShadow: isActive
                                ? "0 1px 4px rgba(0,0,0,0.1)"
                                : "none",

                            "&:hover": {
                                backgroundColor: isActive ? "#fff" : "#f3f4f6"
                            }
                        }}
                    >
                        {f}
                    </Button>
                );
            })}
        </Box>
    );
};

export default FilterTabs;