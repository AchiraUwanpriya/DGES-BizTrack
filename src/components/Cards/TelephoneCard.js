import React, { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import TelephoneModal from "../Utility/TelephoneModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    wordWrap: "break-word",
    whiteSpace: "normal",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor !== "" ? bgcolor : theme.palette.action.hover,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  padding: 0,
  margin: 0,
  cursor: "pointer",
}));

export default function TelephoneCard({ data }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const mappedItems = useMemo(() => {
    return data?.length > 0 ? (
      <>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 800, width: "100%" }}
        >
          <Table
            stickyHeader
            aria-label="telephone card table"
            sx={{ width: "100%" }}
          >
            <TableHead>
              <TableRow sx={{ height: 32 }}>
                <StyledTableCell
                  align="center"
                  sx={{
                    width: "10%",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "4px",
                    lineHeight: "1.2"
                  }}
                >
                  Extension
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  sx={{
                    width: "50%",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "4px",
                    lineHeight: "1.2"
                  }}
                >
                  Name
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  sx={{
                    width: "40%",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "4px",
                    lineHeight: "1.2"
                  }}
                >
                  Telephone
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow key={index} onClick={() => handleRowClick(row)}>
                  <StyledTableCell
                  style={{fontSize: "12px"}}
                    align="center"
                    sx={{  padding: "8px",fontSize: "12px" }}
                  >
                    {row.Extension}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{fontSize: "12px"}}
                    sx={{
                      width: "40%",
                      wordBreak: "break-word",
                      padding: "8px",
                      
                    }}
                  >
                    {row.Name}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      width: "40%",
                      wordBreak: "break-word",
                      padding: "8px",
                      
                    }}
                  >
                    <a
                      href={`tel:${row.Telephone}`}
                      style={{ textDecoration: "none", color: "inherit",fontSize: "12px" }}
                    >
                      {row.Telephone}
                    </a>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedRow && (
          <TelephoneModal
            open={open}
            onClose={handleClose}
            data={selectedRow}
            serviceno={selectedRow.Service_no}
            name={selectedRow.Name}
            email={selectedRow.Email || "email@example.com"}
            designation={selectedRow.Designation || "N/A"} 
          />
        )}
      </>
    ) : (
      // <Typography variant="h6" color="error">
      //   No Data Found!
      // </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //height: "80vh",
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", color: "#000" }}>
          OOPS!!! No Data Found
        </Typography>
      </div>
    );
  }, [data, open, selectedRow]);

  return <>{mappedItems}</>;
}
