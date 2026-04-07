import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  filter: "all" | "active" | "completed";
}

const messages = {
  all: {
    icon: "✦",
    title: "Clean slate.",
    sub: "Add your first task above to get started."
  },
  active: {
    icon: "◎",
    title: "All caught up!",
    sub: "No active tasks. Enjoy the moment."
  },
  completed: {
    icon: "◉",
    title: "Nothing done yet.",
    sub: "Complete some tasks and they'll appear here."
  }
};

const EmptyState: React.FC<Props> = ({ filter }) => {
  const m = messages[filter];

  return (
    <Box
      textAlign="center"
      py={6}
      sx={{ animation: "fadeUp 0.4s ease both" }}
    >
      <Typography sx={{
        fontSize: "2rem",
        mb: 1,
        opacity: 0.4
      }}>
        {m.icon}
      </Typography>

      <Typography sx={{
        fontWeight: 700,
        fontSize: "1.2rem",
        mb: 0.5
      }}>
        {m.title}
      </Typography>

      <Typography sx={{
        fontSize: "0.85rem",
        color: "text.secondary"
      }}>
        {m.sub}
      </Typography>
    </Box>
  );
};

export default EmptyState;