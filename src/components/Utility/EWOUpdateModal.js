import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

const EWOUpdateModal = ({
  open,
  onClose,
  ewoNumber,
  onUpdate,
  loadEwoApi = "JobAllocation/LoadEWONO",
  updateEwoApi = "JobAllocation/UpdateTempEWONO",
}) => {
  const [newEwoNumber, setNewEwoNumber] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setNewEwoNumber(ewoNumber || "");
      setLoading(true);

      axios
        .get(loadEwoApi)
        .then((response) => {
          const { ResultSet } = response.data;
          if (ResultSet) {
            const ewoNumbers = ResultSet.map((item) => item.EWONO);
            setOptions(ewoNumbers);
          }
        })
        .catch(() => {
          Swal.fire("Error", "Failed to load data.", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [open, loadEwoApi, ewoNumber]);

  const handleUpdate = async () => {
    const result = await Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update the EWO Number?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);

        const params = {
          P_EWO_NO: ewoNumber,
          P_EWONO: newEwoNumber,
        };

        const response = await axios.post(updateEwoApi, null, { params });
        if (response.status === 200) {
          Swal.fire("Success", "EWO Number updated successfully.", "success");
          onUpdate(newEwoNumber); 
          onClose();
        } else {
          Swal.fire("Error", "Failed to update EWO Number.", "error");
        }
      } catch {
        Swal.fire("Error", "An error occurred during update.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const formatOptions = options.map((option) => ({
    label: option.length > 10 ? `${option.slice(0, 10)}...` : option,
    value: option,
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
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

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Update EWO Number
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Select
              options={formatOptions} 
              value={formatOptions.find(
                (option) => option.value === newEwoNumber
              )} 
              onChange={(selectedOption) =>
                setNewEwoNumber(selectedOption?.value || "")
              } 
              placeholder="Select EWO Number"
              isClearable
            />
          </>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={loading || !newEwoNumber || newEwoNumber === ewoNumber}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EWOUpdateModal;