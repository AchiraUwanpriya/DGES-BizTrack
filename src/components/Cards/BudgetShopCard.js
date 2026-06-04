// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
// import { getGetBudgetShopPriceList } from "../../action/BudgetShop";
// import Loader from "../Utility/Loader";
// import NotFound from "../Utility/NotFound";

// export default function BudgetShopCard({ searchTerm }) {
//   const { responseBody, loading } = useSelector((state) => state.budgetItem);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getGetBudgetShopPriceList(""));
//   }, [dispatch]);

//   const filteredItems = useMemo(() => {
//     return responseBody.filter((item) =>
//       item.MaterialDescription.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [responseBody, searchTerm]);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             width: "100%",
//             overflow: "auto",
//           }}
//         >
//           <Grid container rowSpacing={0.1}>
//             {filteredItems.length > 0 ? (
//               filteredItems.map((item, index) => (
//                 <Grid item xs={12} sx={{ padding: 1 }} key={index}>
//                   <Card sx={{ padding: 1, boxShadow: 3 }}>
//                     <CardActionArea>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           flexDirection: "row",
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flexDirection: "column",
//                             padding: 1,
//                           }}
//                         >
//                           <img
//                             src={require("../../assets/icons/food.png")}
//                             alt="First slide"
//                             style={{ borderRadius: "10px", height: 60 }}
//                           />
//                           <Typography gutterBottom fontSize={8}>
//                             {item.MaterialCode}
//                           </Typography>
//                         </div>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             width: "100%",
//                             padding: "10px 5px",
//                           }}
//                         >
//                           <Typography
//                             gutterBottom
//                             fontSize={12}
//                             fontWeight={600}
//                           >
//                             {item.MaterialDescription}
//                           </Typography>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                             }}
//                           >
//                             <Typography fontSize={12}>
//                               Balance Qty: {item.BalanceQuantity} {item.Unit}
//                             </Typography>
//                             <Typography fontSize={15} fontWeight={600}>
//                               Price: {item.SellingPrice} Rs
//                             </Typography>
//                           </div>
//                         </div>
//                       </div>
//                     </CardActionArea>
//                   </Card>
//                 </Grid>
//               ))
//             ) : (
//               <NotFound text="No Products Found!" />
//             )}
//           </Grid>
//         </Box>
//       )}
//     </>
//   );
// }



import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography,
  Checkbox,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import { getGetBudgetShopPriceList } from "../../action/BudgetShop";
import Loader from "../Utility/Loader";
import NotFound from "../Utility/NotFound";

export default function BudgetShopCard({ searchTerm, selectedItems, setSelectedItems }) {
  const { responseBody, loading } = useSelector((state) => state.budgetItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGetBudgetShopPriceList(""));
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return responseBody;
    return responseBody.filter((item) =>
      item.MaterialDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [responseBody, searchTerm]);

  const handleCheckboxChange = (materialCode) => {
    setSelectedItems((prev) => ({
      ...prev,
      [materialCode]: {
        ...prev[materialCode],
        selected: !prev[materialCode]?.selected,
        quantity: prev[materialCode]?.quantity || "",
      },
    }));
  };

  const handleQuantityChange = (materialCode, value, maxQty) => {
    if (Number(value) > Number(maxQty)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Can't Exceed the Balance Quantity!",
      });
      value = maxQty;
    }
    setSelectedItems((prev) => ({
      ...prev,
      [materialCode]: {
        ...prev[materialCode],
        quantity: value,
        selected: true,
      },
    }));
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", ml: 1 }}>
        {searchTerm ? "Search Results" : "All Results"}
      </Typography>

      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", overflow: "auto" }}>
          <Grid container rowSpacing={1}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Grid item xs={12} sx={{ padding: 1 }} key={item.MaterialCode}>
                  <Card sx={{ padding: 1, boxShadow: 3, position: "relative" }}>
                    <Checkbox
                      checked={selectedItems[item.MaterialCode]?.selected || false}
                      onChange={() => handleCheckboxChange(item.MaterialCode)}
                      sx={{ position: "absolute", top: 30, left: 5 }}
                    />
                    <CardActionArea>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          paddingLeft: 5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 1,
                          }}
                        >
                          <img
                            src={require("../../assets/icons/food.png")}
                            alt="First slide"
                            style={{ borderRadius: "10px", height: 60 }}
                          />
                          <Typography fontSize={8}>{item.MaterialCode}</Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            padding: "10px 5px",
                          }}
                        >
                          <Typography fontSize={12} fontWeight={600}>
                            {item.MaterialDescription}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              mt: -0.5,
                            }}
                          >
                            <Typography fontSize={12}>
                              Balance Qty: {item.BalanceQuantity} {item.Unit}
                            </Typography>
                            <Typography fontSize={15} fontWeight={600}>
                              Price: Rs {item.SellingPrice}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            mt: 1,
                          }}
                        >
                          <TextField
                            size="small"
                            type="number"
                            label="Add QTY"
                            variant="outlined"
                            value={selectedItems[item.MaterialCode]?.quantity || ""}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.MaterialCode,
                                e.target.value,
                                item.BalanceQuantity
                              )
                            }
                            disabled={!selectedItems[item.MaterialCode]?.selected}
                            sx={{ width: 95 }}
                            inputProps={{ min: 1 }}
                          />
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <NotFound text="No Products Found!" />
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}
