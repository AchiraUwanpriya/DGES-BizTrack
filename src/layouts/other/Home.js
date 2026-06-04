import React, { useEffect } from "react";
import { Box } from "@mui/material";
import NewCarousel from "../../components/Carousel/NewCarousel";
import HeaderComponent from "../../components/Cards/HeaderComponent";
const Home = () => {
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (
      metaThemeColor &&
      window.CSS &&
      CSS.supports("color", "var(--fake-var)")
    ) {
      const gradient =
        "linear-gradient(to right, var(--start-color), var(--end-color))";
      document.body.classList.add("gradient-theme");
      metaThemeColor.setAttribute("content", gradient);
    } else {
      metaThemeColor.setAttribute("content", "#fff");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginLeft: 1,
          marginRight: 1,
          overflow: "auto",
          // Add bottom padding on desktop so fixed BottomNavigation doesn't overlap content
          paddingBottom: { md: "100px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 0.9,
            overflow: "auto",
            flexWrap: "wrap",
            borderRadius: 2,
            backgroundColor: "white",
            //marginBottom: 1,
            marginTop: 1,
          }}
        >
          <NewCarousel />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HeaderComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
