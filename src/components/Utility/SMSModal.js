// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
// } from "@mui/material";
// import { Done as DoneIcon, Close as CloseIcon } from "@mui/icons-material";
// const SMSModal = ({ open, onClose }) => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = () => {
//     // Fetch data from an API or any other source
//     // and update the 'data' state variable
//     const sampleData = [
//       { id: 1, message: "Message 1", read: false },
//       { id: 2, message: "Message 2", read: false },
//       { id: 3, message: "Message 3", read: false },
//     ];
//     setData(sampleData);
//   };
//   const handleMarkRead = (id) => {
//     setData((prevData) =>
//       prevData.map((item) => (item.id === id ? { ...item, read: true } : item))
//     );
//   };
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="sms-modal-title"
//       aria-describedby="sms-modal-description"
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: "80%",
//           maxWidth: 600,
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <Typography id="sms-modal-title" variant="h5" component="h2">
//             Latest News
//           </Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <List>
//           {data.map((item) => (
//             <ListItem
//               key={item.id}
//               divider
//               sx={{
//                 bgcolor: item.read ? "action.hover" : "inherit",
//               }}
//             >
//               <ListItemText
//                 primary={item.message}
//                 secondary={item.read ? "Read" : "Unread"}
//               />
//               <ListItemSecondaryAction>
//                 <IconButton
//                   edge="end"
//                   onClick={() => handleMarkRead(item.id)}
//                   disabled={item.read}
//                 >
//                   <DoneIcon />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Modal>
//   );
// };
// export default SMSModal;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputBase,
  Avatar,
  Paper,
} from "@mui/material";
import {
  Done as DoneIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import icon from "../../assets/images/BT2.png";
import axios from "axios";
const SMSModal = ({ open, onClose }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({
    mobileNo: "",
    email: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data first
        const userResponse = await axios.get("login/DGESGetUserByServiceNo");
        const userData = userResponse.data.ResultSet[0];
        setUserInfo({
          mobileNo: userData.MobileNo,
          email: userData.Email,
        });
        // Fetch notification data using the user info
        const { mobileNo, email } = userInfo;
        const notificationResponse = await axios.get(
          `Notification/DGESGetNotification?P_PHONENO=${mobileNo}&P_MAIL=${email}`
        );
        setData(notificationResponse.data.ResultSet);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleMarkRead = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    setData(updatedData);
    const readMessages = JSON.parse(localStorage.getItem("readMessages")) || [];
    if (!readMessages.includes(id)) {
      readMessages.push(id);
      localStorage.setItem("readMessages", JSON.stringify(readMessages));
    }
  };
  // Filter messages based on search term
  // Filter messages based on the Subject
  const filteredData = data.filter((item) =>
    item.Subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="sms-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: "90%",
          maxHeight: "80%",
          height: "90%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography id="sms-modal-title" variant="h5" component="h2">
            Latest News
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Search Bar */}
        <Paper
          sx={{
            p: "2px 6px",
            mb: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            backgroundColor: "#F5F5F5",
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Paper>
        {/* Message List with max 5 items visible */}
        {/* Message List */}
        <Box sx={{ maxHeight: "80%", overflowY: "auto" }}>
          {/* Show 'Search Results' heading if there's a search term */}
          {searchTerm && (
            <>
              <Typography variant="h6">Search Results</Typography>
              <List>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <ListItem
                      key={item.id}
                      divider
                      sx={{
                        bgcolor: item.read
                          ? "action.hover"
                          : "background.default",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ mr: 2 }} src={icon} />
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ fontWeight: item.read ? "normal" : "bold" }}
                          >
                            {item.Subject}
                          </Typography>
                        }
                        secondary={item.Message}
                      />
                      <IconButton
                        edge="end"
                        onClick={() => handleMarkRead(item.id)}
                        disabled={item.read}
                      >
                        <DoneIcon />
                      </IconButton>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    No matching results found.
                  </Typography>
                )}
              </List>
            </>
          )}

          {/* Show 'All Results' if there's no search term */}
          {!searchTerm && (
            <>
              <Typography variant="h6">All Results</Typography>
              <List>
                {data.map((item) => (
                  <ListItem
                    key={item.id}
                    divider
                    sx={{
                      bgcolor: item.read
                        ? "action.hover"
                        : "background.default",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ mr: 2 }} src={icon} />
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ fontWeight: item.read ? "normal" : "bold" }}
                        >
                          {item.Subject}
                        </Typography>
                      }
                      secondary={item.Message}
                    />
                    <IconButton
                      edge="end"
                      onClick={() => handleMarkRead(item.id)}
                      disabled={item.read}
                    >
                      <DoneIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
export default SMSModal;
