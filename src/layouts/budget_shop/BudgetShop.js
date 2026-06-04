// import React, { useEffect } from "react";
// import {
//   Box,
//   InputAdornment,
//   TextField,
//   Typography,
//   Button,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import BudgetShopCard from "../../components/Cards/BudgetShopCard";
// import SearchIcon from "@mui/icons-material/Search";
// import { getGetBudgetShopPriceList } from "../../action/BudgetShop";
// import { useNavigate } from "react-router-dom";

// const BudgetShop = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     document
//       .querySelector('meta[name="theme-color"]')
//       ?.setAttribute("content", "#004AAD");
//   }, []);

//   const handleSearch = () => {
//     dispatch(getGetBudgetShopPriceList(searchTerm.trim()));
//   };



//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <Box id="header" sx={{ position: "sticky", top: 0 }}>
//         {/* Header with Budget Shop Price List and Back Button */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginLeft: 2,
//             marginRight: 2,
//             marginBottom: 1,
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: "bold" ,mt:1}}>
//             Budget Shop Price List
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate(-1)}
//             sx={{ textTransform: "none",mt:1 }}
//           >
//             Back
//           </Button>
//         </Box>

//         {/* Search Bar */}
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5, mb: 1 }}>
//           <Box
//             sx={{
//               display: "flex",
//               width: "65%",
//               marginLeft: -13,

//             }}
//           >
//             <TextField
//               size="small"
//               id="search"
//               label="Search Here"
//               value={searchTerm}
//               variant="outlined"
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//               sx={{ width: "100%" }}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment
//                     position="end"
//                     onClick={handleSearch}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           flexGrow: 1,
//           marginLeft: 1,
//           marginRight: 1,
//           marginBottom: "70px",
//         }}
//       >
//         <Box sx={{ flexGrow: 1, overflow: "auto" }}>
//           <BudgetShopCard searchTerm={searchTerm} />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default BudgetShop;


import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BudgetShopCard from "../../components/Cards/BudgetShopCard";
import { getGetBudgetShopPriceList } from "../../action/BudgetShop";
import { useNavigate } from "react-router-dom";
import CartModal from "../../components/Utility/CartModal";
import CartHistoryModal from "../../components/Utility/CartHistoryModal";

const BudgetShop = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { responseBody } = useSelector((state) => state.budgetItem);

  const [selectedItems, setSelectedItems] = useState({});
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false); //this is for history

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#004AAD");
  }, []);

  const handleSearch = () => {
    dispatch(getGetBudgetShopPriceList(searchTerm.trim()));
  };

  const handleOpenCart = () => {
    setCartModalOpen(true);
  };

  const handleCloseModal = () => {
    setCartModalOpen(false);
  };

  //this is for history

  const handleOpenHistory = () => {
    setHistoryModalOpen(true);
  };

  const handleCloseHistory = () => {
    setHistoryModalOpen(false);
  };

  const [cartHistoryItems, setCartHistoryItems] = useState([]);


  const handleRemoveItem = (materialCode) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev };
      if (newItems[materialCode]) {
        newItems[materialCode].selected = false;
        newItems[materialCode].quantity = "";
      }
      return newItems;
    });
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) return responseBody;
    return responseBody.filter((item) =>
      item.MaterialDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [responseBody, searchTerm]);

  const cartItems = Object.entries(selectedItems)
    .filter(([_, value]) => value.selected)
    .map(([materialCode, value]) => {
      const item = responseBody.find((i) => i.MaterialCode === materialCode);
      return {
        ...item,
        quantity: value.quantity || 1,
      };
    });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Box id="header">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
            Budget Shop Price List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none", mt: 1 }}
          >
            Back
          </Button>
        </Box>

        {/* Search Bar, History and Cart buttons*/}
        <Box
          sx={{
            display: "flex",
            mt: 1.5,
            mb: 1,
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 2,
            // gap: 0.5,
          }}
        >
          <Box sx={{ display: "flex", width: "45%", marginLeft: 2 }}>
            <TextField
              size="small"
              label="Search Here"
              value={searchTerm}
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleSearch}
                    style={{ cursor: "pointer" }}
                  ></InputAdornment>
                ),
              }}
            />
          </Box>

          {/* History Button */}
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenHistory} //this is for history
            sx={{ textTransform: "none" }}
          >
            History
          </Button>

          {/* Cart Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenCart}

          >
            Cart ({cartItems.length})
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: 1,
          marginRight: 1,
          marginBottom: "70px",
        }}
      >
        <BudgetShopCard
          searchTerm={searchTerm}
          filteredItems={filteredItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </Box>

      {/* Cart Modal */}
      <CartModal
        open={cartModalOpen}
        handleClose={handleCloseModal}
        cartItems={cartItems}
        handleRemoveItem={handleRemoveItem}
        setCartHistoryItems={setCartHistoryItems} 
        handleOpenHistory={handleOpenHistory}     
      />


      {/* History Modal */}
      <CartHistoryModal
        open={historyModalOpen}
        handleClose={handleCloseHistory}
        cartItems={cartHistoryItems} 
      />

    </Box>
  );
};

export default BudgetShop;
