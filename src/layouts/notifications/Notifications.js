import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Avatar,
  Paper,
  Button,
  Chip,
  Divider,
  Checkbox,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Notification from "../../assets/icons/Notification.png";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Utility/Loader";
import axios from "axios";

const Notifications = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({ mobileNo: "" });
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const userResponse = await axios.get(
        `${axios.defaults.baseURL}/login/DGESGetUserByServiceNo`
      );
      const userData = userResponse.data.ResultSet[0];
      const mobileNo = userData.MobileNo;
      setUserInfo({ mobileNo });

      const countResponse = await axios.get(
        `${axios.defaults.baseURL}Notification/DGESGetUnSeenCount?P_PHONENO=${mobileNo}`
      );
      setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);

      const notificationResponse = await axios.get(
        `${axios.defaults.baseURL}Notification/DGESGetNotification?P_PHONENO=${mobileNo}`
      );
      const notifications = notificationResponse.data.ResultSet || [];

      const updatedNotifications = notifications.map((item) => ({
        ...item,
        id: item.S_no, 
        read: item.Status === "Y" ,
        Qstatus: item.Qstatus 
      }));

      setData(updatedNotifications);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleMarkRead = async (id) => {
  //   try {
  //     await axios.get(
  //       `${axios.defaults.baseURL}Notification/MarkReadNotifications?P_SERIAL_NO=${id}`
  //     );
      
  //     const updatedData = data.map((item) =>
  //       item.S_no === id ? { ...item, Status: "Y", read: true } : item
  //     );
  //     setData(updatedData);
      
  //     const countResponse = await axios.get(
  //       `${axios.defaults.baseURL}Notification/GetUnSeenCount?P_PHONENO=${userInfo.mobileNo}`
  //     );
  //     setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);
      
  //     window.dispatchEvent(new Event("messageRead"));
  //   } catch (error) {
  //     console.error("Error marking notification as read:", error);
  //   }
  // };

  // const handleMarkSelectedRead = async () => {
  //   try {
  //     await Promise.all(
  //       selectedItems.map(id => 
  //         axios.get(
  //           `${axios.defaults.baseURL}Notification/MarkReadNotifications?P_SERIAL_NO=${id}`
  //         )
  //       )
  //     );
      
  //     const updatedData = data.map(item => 
  //       selectedItems.includes(item.S_no) 
  //         ? { ...item, Status: "Y", read: true } 
  //         : item
  //     );
  //     setData(updatedData);
      
  //     const countResponse = await axios.get(
  //       `${axios.defaults.baseURL}Notification/GetUnSeenCount?P_PHONENO=${userInfo.mobileNo}`
  //     );
  //     setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);
      
  //     setSelectedItems([]);
  //     setSelectionMode(false);
  //     window.dispatchEvent(new Event("messageRead"));
  //   } catch (error) {
  //     console.error("Error marking selected as read:", error);
  //   }
  // };

  // const handleMarkAllRead = async () => {
  //   try {
  //     const unreadItems = data.filter(item => !item.read);
      
  //     await Promise.all(
  //       unreadItems.map(item => 
  //         axios.get(
  //           `${axios.defaults.baseURL}Notification/MarkReadNotifications?P_SERIAL_NO=${item.S_no}`
  //         )
  //       )
  //     );
      
  //     const updatedData = data.map(item => ({
  //       ...item,
  //       Status: "Y",
  //       read: true
  //     }));
  //     setData(updatedData);
      
  //     setUnreadCount(0);
  //     window.dispatchEvent(new Event("messageRead"));
  //   } catch (error) {
  //     console.error("Error marking all as read:", error);
  //   }
  // };

  const handleMarkRead = async (id) => {
  try {
    const item = data.find(item => item.S_no === id);
    await axios.get(
      `${axios.defaults.baseURL}Notification/MarkReadNotifications?P_SERIAL_NO=${id}&P_Qstatus=${item.Qstatus}`
    );
    
    const updatedData = data.map((item) =>
      item.S_no === id ? { ...item, Status: "Y", read: true } : item
    );
    setData(updatedData);
    
    const countResponse = await axios.get(
      `${axios.defaults.baseURL}Notification/DGESGetUnSeenCount?P_PHONENO=${userInfo.mobileNo}`
    );
    setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);
    
    window.dispatchEvent(new Event("messageRead"));
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

const handleMarkSelectedRead = async () => {
  try {
    await Promise.all(
      selectedItems.map(id => {
        const item = data.find(item => item.S_no === id);
        return axios.get(
          `${axios.defaults.baseURL}Notification/MarkReadNotifications?P_SERIAL_NO=${id}&Qstatus=${item.Qstatus}`
        );
      })
    );
    
    const updatedData = data.map(item => 
      selectedItems.includes(item.S_no) 
        ? { ...item, Status: "Y", read: true } 
        : item
    );
    setData(updatedData);
    
    const countResponse = await axios.get(
      `${axios.defaults.baseURL}Notification/DGESGetUnSeenCount?P_PHONENO=${userInfo.mobileNo}`
    );
    setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);
    
    setSelectedItems([]);
    setSelectionMode(false);
    window.dispatchEvent(new Event("messageRead"));
  } catch (error) {
    console.error("Error marking selected as read:", error);
  }
};

const handleMarkAllRead = async () => {
  try {
    const unreadItems = data.filter(item => !item.read);
    
    await Promise.all(
      unreadItems.map(item => 
        axios.get(
          `${axios.defaults.baseURL}Notification/MarkReadNotifications?P_SERIAL_NO=${item.S_no}&P_Qstatus=${item.Qstatus}`
        )
      )
    );
    
    const updatedData = data.map(item => ({
      ...item,
      Status: "Y",
      read: true
    }));
    setData(updatedData);
    
    setUnreadCount(0);
    window.dispatchEvent(new Event("messageRead"));

    setSelectionMode(false);
    setSelectedItems([]);
  } catch (error) {
    console.error("Error marking all as read:", error);
  }
};


  const handleNotificationClick = (item) => {
    if (selectionMode) {
      toggleItemSelection(item.S_no);
    } else {
      if (!item.read) {
        handleMarkRead(item.S_no);
      }
      navigate(`/notifications/NotificationMessage`, {
        state: { item },
      });
    }
  };

  const handleItemPress = (itemId) => {
     
    const timer = setTimeout(() => {
      setSelectionMode(true);
      toggleItemSelection(itemId);
    }, 500);  
    setLongPressTimer(timer);
  };

  const handleItemRelease = () => {
     
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedItems([]);
  };

  const filteredData = data.filter((item) =>
    item.Subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayData = searchTerm ? filteredData : data;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader text="Loading Notifications..." />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {selectionMode ? (
            <Toolbar sx={{ 
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 1,
              mb: 2,
              justifyContent: 'space-between'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  edge="start" 
                  color="inherit" 
                  onClick={exitSelectionMode}
                  sx={{ mr: 2 }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6">
                  {selectedItems.length} selected
                </Typography>
              </Box>
              <Box>
                 
                <Button
                  variant="contained"
                  size="small"
                  onClick={selectedItems.length > 0 ? handleMarkSelectedRead : handleMarkAllRead}
                  startIcon={<DoneAllIcon />}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#43a047",
                      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  {selectedItems.length > 0 ? "Mark selected" : "Mark all as read"}
                </Button>
              </Box>
            </Toolbar>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexShrink: 0,
              }}
            >
              <Typography variant="h5" component="h2">
                Latest News
              </Typography>
              {/* Empty box to maintain layout - no buttons shown in normal mode */}
              <Box sx={{ width: 48 }} /> 
            </Box>
          )}

          {/* Search Bar */}
          {!selectionMode && (
            <Paper
              sx={{
                p: "2px 6px",
                mb: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                backgroundColor: "#F5F5F5",
                flexShrink: 0,  
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
          )}

          <Box
            sx={{
              flex: 1,  
              display: "flex",
              flexDirection: "column",
              minHeight: 0,  
            }}
          >
            {!selectionMode && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    flexShrink: 0, 
                    mb: 1,
                  }}
                >
                  {searchTerm ? "Search Results" : "All Messages"}
                </Typography>
                <Divider sx={{ mb: 2, flexShrink: 0 }} />
              </>
            )}

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              {displayData.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {displayData.map((item) => (
                    <ListItem
                      key={item.S_no}
                      divider
                      sx={{
                        bgcolor: item.read ? "action.hover" : "background.default",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        mb: 1,
                        "&:hover": {
                          backgroundColor: "action.selected",
                        },
                        pl: selectionMode ? 1 : 2,
                      }}
                      onClick={() => handleNotificationClick(item)}
                      onTouchStart={() => handleItemPress(item.S_no)}
                      onTouchEnd={handleItemRelease}
                      onMouseDown={() => handleItemPress(item.S_no)}
                      onMouseUp={handleItemRelease}
                      onMouseLeave={handleItemRelease}
                    >
                      {selectionMode && (
                        <Checkbox
                          checked={selectedItems.includes(item.S_no)}
                          onChange={() => toggleItemSelection(item.S_no)}
                          onClick={(e) => e.stopPropagation()}
                          sx={{ mr: 1 }}
                        />
                      )}
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Avatar
                          sx={{
                            mr: 2,
                            width: 35,
                            height: 35,
                            bgcolor: item.read ? 'action.hover' : 'background.default',
                            '& img': {
                              objectFit: 'contain',
                              padding: '6px'
                            }
                          }}
                          src={Notification}
                          variant="circular"
                        />
                        {!item.read && !selectionMode && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: selectionMode ? 56 : 8,
                              top: 12,
                              width: 8,
                              height: 8,
                              bgcolor: "primary.main",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </Box>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontWeight: item.read ? "normal" : "bold",
                              fontSize: "14px",
                              color: item.read ? "text.secondary" : "text.primary",
                            }}
                          >
                            {item.Subject}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                              sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "12px",
                                color: item.read ? "text.secondary" : "text.primary",
                              }}
                            >
                              {item.Message}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 0.8,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "12px" }}
                              >
                                {formatDate(item.Created_date)}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" sx={{ ml: 2, mt: 2 }}>
                  {searchTerm
                    ? "No matching results found."
                    : "No notifications available."}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Notifications;