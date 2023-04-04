import React from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type Props = {};

export default function Custom404(props: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        "& > *": { m: 1 },
      }}>
      <Typography variant="h3" component="h3">
        Page Not Found 404
      </Typography>
      <Button variant="contained">
        <Link href="/"> Go to home</Link>
      </Button>
    </Box>
  );
}
