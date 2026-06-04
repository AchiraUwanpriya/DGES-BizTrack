import React from "react";
import { Modal, Box, Typography, IconButton, Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";
const style = {
  position: "absolute",
  top: "48%", 
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 366,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 1,
  textAlign: "left", 
  fontFamily: "Arial, sans-serif",
};

const TelephoneModal = ({ open, onClose, data }) => {
  const { Service_no, Name, Telephone, Email, Designation } = data || {};
  const hasImage = Boolean(Service_no);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="telephone-modal-title"
      aria-describedby="telephone-modal-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <div className="img-box" style={{}}>
          <img
            src={
              hasImage
                ? `${axios.defaults.baseURL}home/DGESGetUserImg?serviceNo=${Service_no}`.replace(
                    /"/g,

                    ""
                  )
                : require("../../assets/images/man.png")
            }
            style={{
              height: "100px",
            }}
            alt="User profile"
          />
        </div>

        {Name && (
          <Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Grid item>
              <PersonIcon color="primary" fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Name:</strong> {Name}
              </Typography>
            </Grid>
          </Grid>
        )}

        {Email && (
          <Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Grid item>
              <EmailIcon color="secondary" fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Email:</strong> {Email}
              </Typography>
            </Grid>
          </Grid>
        )}

        {Telephone && (
          <Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Grid item>
              <PhoneIcon color="success" fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Mobile Number:</strong> {Telephone}
              </Typography>
            </Grid>
          </Grid>
        )}

        {Designation && (
          <Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Grid item>
              <WorkIcon color="action" fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Designation:</strong> {Designation}
              </Typography>
            </Grid>
          </Grid>
        )}

        {(Telephone || Email) && (
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{ mt: 2 }}
          >
            {Telephone && (
              <Grid item>
                <a href={`tel:${Telephone}`} style={{ textDecoration: "none" }}>
                  <IconButton
                    color="primary"
                    sx={{
                      border: "1px solid",
                      borderRadius: 2,
                      padding: 1,
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </a>
              </Grid>
            )}

            {Email && (
              <Grid item>
                <a href={`mailto:${Email}`} style={{ textDecoration: "none" }}>
                  <IconButton
                    color="secondary"
                    sx={{
                      border: "1px solid",
                      borderRadius: 2,
                      padding: 1,
                      backgroundColor: "rgba(233, 30, 99, 0.1)",
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </a>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default TelephoneModal;
