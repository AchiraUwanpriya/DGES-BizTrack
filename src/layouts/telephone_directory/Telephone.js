import TelephoneCard from "../../components/Cards/TelephoneCard";
import { GetTelephoneCard } from "../../action/Telephone";
import React, { useEffect, useState, useMemo,  } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { Box, InputAdornment, TextField, Grid, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotFound from "../../components/Utility/NotFound";
import Loader from "../../components/Utility/Loader";
import { useNavigate } from 'react-router-dom';

const Telephone = () => {
  const dispatch = useDispatch();
  const { responseBody, loading, msg } = useSelector(
    (state) => state.telephoneCard
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(GetTelephoneCard());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      dispatch(GetTelephoneCard(searchQuery));
    } else {
      dispatch(GetTelephoneCard(""));
    }
  };

  const navigate = useNavigate();

  const filteredItems = useMemo(() => {
    return responseBody?.filter((row) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        row.Name.toLowerCase().includes(lowerCaseQuery) ||
        row.Telephone.includes(lowerCaseQuery) ||
        row.Extension.includes(lowerCaseQuery) ||
        row.FirstName?.toLowerCase().includes(lowerCaseQuery) ||
        row.LastName?.toLowerCase().includes(lowerCaseQuery) ||
        row.Designation?.toLowerCase().includes(lowerCaseQuery) ||
        row.DDescription?.toLowerCase().includes(lowerCaseQuery) ||
        row.VNo?.toLowerCase().includes(lowerCaseQuery) ||
        row.Initials.toLowerCase().includes(lowerCaseQuery) ||
        row.Nic.toLowerCase().includes(lowerCaseQuery) ||
        row.DOB.toLowerCase().includes(lowerCaseQuery) ||
        row.Gender.toLowerCase().includes(lowerCaseQuery) ||
        row.DCode.toLowerCase().includes(lowerCaseQuery) ||
        row.DeptCode.toLowerCase().includes(lowerCaseQuery) ||
        row.DeptDesc.toLowerCase().includes(lowerCaseQuery) ||
        //row.LCode.toLowerCase().includes(lowerCaseQuery) ||
        row.ContactCity.toLowerCase().includes(lowerCaseQuery) ||
        row.Phone.toLowerCase().includes(lowerCaseQuery) ||
        row.WorkCategory.toLowerCase().includes(lowerCaseQuery) ||
        row.Abbreviation.toLowerCase().includes(lowerCaseQuery) ||
        row.LDesc.toLowerCase().includes(lowerCaseQuery) ||
        row.OfzMobile.toLowerCase().includes(lowerCaseQuery)

        // row.Name.toLowerCase().includes(lowerCaseQuery) || // Original condition
        // row.Telephone.includes(lowerCaseQuery) ||
        // row.Extension.includes(lowerCaseQuery)
      );
    });
  }, [responseBody, searchQuery]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : responseBody?.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 1,
              mb: 1,
            }}
          >

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginLeft: 2,
                
              }}
            >
              <TextField
                size="small"
                id="search"
                label="Search"
                value={searchQuery}
                variant="outlined"
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={handleSearch}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 2,
                marginRight: 2,
                

              }}
            >

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                sx={{ textTransform: "none" }}
              >
                Back
              </Button>
            </Box>
          </Box>

          <Grid container rowSpacing={0}>
            <TelephoneCard data={filteredItems} />
          </Grid>
        </>
      ) : (
        <NotFound text={msg} />
      )}
    </div>
  );
};

export default Telephone;
