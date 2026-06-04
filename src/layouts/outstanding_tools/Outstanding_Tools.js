import React from "react";
import { Box , Button } from "@mui/material";
import ToolsCard from "../../components/Cards/ToolsCard";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Outstanding_Tools = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        mt: 1,
      }}
    >
   <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 2 }}>
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
      sx={{ textTransform: "none" }}
         >
       Back
       </Button>
      </Box>
      <Typography variant="h6" sx={{ marginLeft: 2,marginBottom: 1 ,fontWeight: "bold" }}>
        Outstanding Tools
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginLeft: 1,
          marginRight: 1,
          marginBottom: "70px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <ToolsCard />
        </Box>
      </Box>
    </Box>
  );
};
export default Outstanding_Tools;