import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axios from "axios";

export default function StaticCards() {
  return (
    <>
      <Card sx={{ width: 100, height: 100, borderRadius: "50%" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image={require("../../assets/images/custom/delivery-image.png")}
            alt="img"
          />
        </CardActionArea>
      </Card>

     
    </>
  );
}
