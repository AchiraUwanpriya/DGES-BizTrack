// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Alert,
//   CircularProgress,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
//   FormControlLabel,
//   Checkbox,
//   FormGroup,
// } from '@mui/material';
// import {
//   CheckCircle,
//   Camera,
//   LocationOn,
//   AccessTime,
//   Person,
//   Logout,
//   Login,
// } from '@mui/icons-material';
// import bgImage from "../../assets/images/Attend.jpg";
// import axios from "axios";

// const BASE_URL = 'http://localhost:51976/Attendance';

// const getAuthHeaders = () => ({
//   'Content-Type': 'application/json',
//   'auth-key': (localStorage.getItem('token') || '').replace(/"/g, ''),
// });

// // ─── COMPONENT ────────────────────────────────────────────────────────────────
// const AttendanceEntry = () => {
//   const [currentScreen, setCurrentScreen] = useState('main');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const [checkedIn, setCheckedIn] = useState(false);
//   const [checkedOut, setCheckedOut] = useState(false);
//   const [checkInTime, setCheckInTime] = useState(null);

//   const [checkOutTime, setCheckOutTime] = useState(null);
//   const [attendanceRecord, setAttendanceRecord] = useState(null);

//   const [siteLocation, setSiteLocation] = useState(null);
//   const [siteProNo, setSiteProNo] = useState('');

//   const [location, setLocation] = useState(null);
//   const [validatingLocation, setValidatingLocation] = useState(false);

//   // Manual attendance state
//   const [manualData, setManualData] = useState({
//     date: '',
//     checkInTime: '',
//     checkOutTime: '',
//     reason: '',
//     submitCheckIn: true,
//     submitCheckOut: false,
//   });

//   const [cameraActive, setCameraActive] = useState(false);
//   const [cameraMode, setCameraMode] = useState('checkin');
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [faceDetecting, setFaceDetecting] = useState(false);

//   // ─── HELPERS ────────────────────────────────────────────────────────────────

//   const getCurrentDate = () => new Date().toISOString().split('T')[0];
//   const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

//   const formatDateTimeForAPI = (date = new Date()) => {
//     const pad = (n) => String(n).padStart(2, '0');
//     const month = pad(date.getMonth() + 1);
//     const day = pad(date.getDate());
//     const year = date.getFullYear();
//     let hours = date.getHours();
//     const minutes = pad(date.getMinutes());
//     const seconds = pad(date.getSeconds());
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12;
//     return `${month}/${day}/${year} ${pad(hours)}:${minutes}:${seconds} ${ampm}`;
//   };

//   const calculateWorkHours = (checkIn, checkOut) => {
//     const [inHour, inMin] = checkIn.split(':').map(Number);
//     const [outHour, outMin] = checkOut.split(':').map(Number);
//     let hours = outHour - inHour;
//     let minutes = outMin - inMin;
//     if (minutes < 0) { hours--; minutes += 60; }
//     return `${hours}h ${minutes}m`;
//   };

//   // ─── API: FETCH SITE LOCATION ────────────────────────────────────────────────
//   const fetchSiteLocation = async () => {
//     const serviceNo = localStorage.getItem('ServiceNo');
//     if (!serviceNo) throw new Error('Service number not found. Please log in again.');

//     const response = await fetch(
//       `${BASE_URL}/GetDGESLocbySno?p_sno=${serviceNo}`,
//       { headers: getAuthHeaders() }
//     );
//     if (!response.ok) throw new Error('Failed to fetch site location.');

//     const data = await response.json();
//     if (data.StatusCode !== 200 || !data.ResultSet || data.ResultSet.length === 0) {
//       throw new Error('No site location found for your service number.');
//     }

//     const record = data.ResultSet[0];
//     setSiteProNo(record.Pro_no);
//     setSiteLocation({ latitude: parseFloat(record.Lat), longitude: parseFloat(record.Lon) });

//     return { lat: parseFloat(record.Lat), lon: parseFloat(record.Lon), proNo: record.Pro_no };
//   };
 
//   const validateLocationWithinSite = (deviceLat, deviceLng, siteLat, siteLng) => {
//     const RADIUS_KM = 0.02;
//     const R = 6371;
//     const dLat = (deviceLat - siteLat) * (Math.PI / 180);
//     const dLng = (deviceLng - siteLng) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(siteLat * (Math.PI / 180)) *
//         Math.cos(deviceLat * (Math.PI / 180)) *
//         Math.sin(dLng / 2) ** 2;
//     const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return distance <= RADIUS_KM;
//   };

//   // ─── GET DEVICE LOCATION ─────────────────────────────────────────────────────
//   const getDeviceLocation = () => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation is not supported by your browser.'));
//         return;
//       }
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//           resolve({ latitude, longitude });
//         },
//         () => reject(new Error('Unable to access location. Please enable location services.'))
//       );
//     });
//   };

//   // ─── VALIDATE LOCATION ───────────────────────────────────────────────────────
//   const validateLocation = async () => {
//     setValidatingLocation(true);
//     try {
//       const site = await fetchSiteLocation();
//       const device = await getDeviceLocation();
//       const isWithin = validateLocationWithinSite(
//         device.latitude, device.longitude, site.lat, site.lon
//       );
//       if (!isWithin) throw new Error('You are not within the designated site area .');
//       return { device, site };
//     } finally {
//       setValidatingLocation(false);
//     }
//   };

//   // ─── API: POST ATTENDANCE ─────────────────────────────────────────────────────
   
//   const postAttendance = async ({ barcodeNo, barcodeDate, pStatus, hstatus, latitude, longitude, reason = ' ', clockNo }) => {
//     const body = {
//       p_barcode_no: barcodeNo,
//       p_barcode_date: barcodeDate,
//       p_employee_type: '0',
//       p_clock_no: clockNo,   
//       p_status: pStatus,
//       p_hstatus: hstatus,
//       p_latitude: String(latitude),
//       p_longitude: String(longitude),
//       p_reason: reason,
//     };

//     const response = await fetch(
//       'http://localhost:51976/Attendance/DGESPostAttendance',
//       { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body) }
//     );

//     if (!response.ok) throw new Error('Failed to submit attendance. Please try again.');

//     const data = await response.json();
//     if (data.StatusCode && data.StatusCode !== 200 && data.StatusCode !== 201) {
//       throw new Error(data.Message || 'Attendance submission failed.');
//     }
//     return data;
//   };

//   // ─── CHECK IN HANDLER ────────────────────────────────────────────────────────
//   const handleCheckIn = async () => {
//     setLoading(true);
//     setMessage({ type: '', text: '' });
//     try {
//       await validateLocation();
//       const currentTime = getCurrentTime();
//       setCheckInTime(currentTime);
//       setCameraMode('checkin');
//       setCurrentScreen('camera');
//       setMessage({ type: 'success', text: 'Location validated! Please take a selfie for check-in verification.' });
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//     }
//     setLoading(false);
//   };

//   // ─── CHECK OUT HANDLER ───────────────────────────────────────────────────────
//   const handleCheckOut = async () => {
//     setLoading(true);
//     setMessage({ type: '', text: '' });
//     try {
//       await validateLocation();
//       setCameraMode('checkout');
//       setCurrentScreen('camera');
//       setMessage({ type: 'success', text: 'Location validated! Please take a selfie for check-out verification.' });
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//     }
//     setLoading(false);
//   };

//   // ─── CAMERA CONTROLS ─────────────────────────────────────────────────────────
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       }
//     } catch {
//       setMessage({ type: 'error', text: 'Unable to access camera. Please grant camera permissions.' });
//     }
//   };

// const capturePhoto = () => {
//   setFaceDetecting(true);
//   if (videoRef.current && canvasRef.current) {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
    
//     const videoWidth = video.videoWidth;
//     const videoHeight = video.videoHeight;
    
//     canvas.width = videoWidth;
//     canvas.height = videoHeight;
    
//     ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    
//     const imageData = canvas.toDataURL('image/jpeg', 0.9); 
    
//     setCapturedImage(imageData);
//     stopCamera();
    
//     setTimeout(() => {
//       setFaceDetecting(false);
//       setMessage({ type: 'success', text: `Face detected! Selfie captured successfully for ${cameraMode}.` });
//     }, 1500);
//   }
// };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       setCameraActive(false);
//     }
//   };

//   const retakePhoto = () => {
//     setCapturedImage(null);
//     startCamera();
//   };

//   // ─── SUBMIT ATTENDANCE (after selfie) ────────────────────────────────────────
//   const submitAttendance = async () => {
//     setLoading(true);
//     try {
//       const now = new Date();
//       const barcodeDate = formatDateTimeForAPI(now);

//       if (cameraMode === 'checkin') {
//         await postAttendance({
//           barcodeNo: siteProNo,
//           barcodeDate,
//           pStatus: 'I',
//           hstatus: 'I',
//           latitude: location.latitude,
//           longitude: location.longitude,
//           clockNo: 31,
//         });

//         const currentTime = getCurrentTime();
//         const record = {
//           checkInTime: currentTime,
//           checkInDate: getCurrentDate(),
//           checkInPhoto: capturedImage,
//           checkInLocation: location,
//           status: 'checked_in',
//         };
//         setAttendanceRecord(record);
//         setCheckedIn(true);
//         setCheckInTime(currentTime);

//         setMessage({ type: 'success', text: `Check-in successful! Time: ${currentTime}` });

//         setTimeout(() => {
//           setCurrentScreen('main');
//           setCapturedImage(null);
//           setLoading(false);
//         }, 2000);

//       } else {
//         // Check-out: p_clock_no = 32
//         const checkoutTime = getCurrentTime();

//         await postAttendance({
//           barcodeNo: siteProNo,
//           barcodeDate,
//           pStatus: 'O',
//           hstatus: 'O',
//           latitude: location.latitude,
//           longitude: location.longitude,
//           clockNo: 32,
//         });

//         setCheckOutTime(checkoutTime);
//         const totalHours = checkInTime ? calculateWorkHours(checkInTime, checkoutTime) : null;
//         const completeRecord = {
//           ...attendanceRecord,
//           checkOutTime: checkoutTime,
//           checkOutDate: getCurrentDate(),
//           checkOutPhoto: capturedImage,
//           checkOutLocation: location,
//           status: 'completed',
//           totalHours,
//         };
//         setAttendanceRecord(completeRecord);
//         setCheckedOut(true);

//         setMessage({
//           type: 'success',
//           text: `Check-out successful! Time: ${checkoutTime}.${totalHours ? ` Total hours: ${totalHours}` : ''}`,
//         });

//         setTimeout(() => {
//           resetForm();
//           setLoading(false);
//         }, 3000);
//       }
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//       setLoading(false);
//     }
//   };

//   // ─── MANUAL SUBMIT ───────────────────────────────────────────────────────────
//   const handleManualSubmit = async () => {
//     const { date, checkInTime: ciTime, checkOutTime: coTime, reason, submitCheckIn, submitCheckOut } = manualData;

//     if (!date || !reason) {
//       setMessage({ type: 'error', text: 'Please fill in the date and reason.' });
//       return;
//     }
//     if (!submitCheckIn && !submitCheckOut) {
//       setMessage({ type: 'error', text: 'Please select at least Check-In or Check-Out.' });
//       return;
//     }
//     if (submitCheckIn && !ciTime) {
//       setMessage({ type: 'error', text: 'Please provide a Check-In time.' });
//       return;
//     }
//     if (submitCheckOut && !coTime) {
//       setMessage({ type: 'error', text: 'Please provide a Check-Out time.' });
//       return;
//     }

//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       const site = await fetchSiteLocation();
//       const device = await getDeviceLocation();
//       const [year, month, day] = date.split('-');

//       if (submitCheckIn) {
//         // Manual check-in: p_clock_no = 31
//         const [inHour, inMin] = ciTime.split(':');
//         const checkInDT = new Date(year, month - 1, day, inHour, inMin, 0);
//         await postAttendance({
//           barcodeNo: site.proNo,
//           barcodeDate: formatDateTimeForAPI(checkInDT),
//           pStatus: 'I',
//           hstatus: 'P',
//           latitude: device.latitude,
//           longitude: device.longitude,
//           reason,
//           clockNo: 33,
//         });
//       }

//       if (submitCheckOut) {
//         // Manual check-out: p_clock_no = 32
//         const [outHour, outMin] = coTime.split(':');
//         const checkOutDT = new Date(year, month - 1, day, outHour, outMin, 0);
//         await postAttendance({
//           barcodeNo: site.proNo,
//           barcodeDate: formatDateTimeForAPI(checkOutDT),
//           pStatus: 'O',
//           hstatus: 'P',
//           latitude: device.latitude,
//           longitude: device.longitude,
//           reason,
//           clockNo: 32,
//         });
//       }

//       const submitted = [submitCheckIn && 'Check-In', submitCheckOut && 'Check-Out'].filter(Boolean).join(' & ');
//       setMessage({ type: 'success', text: `Manual ${submitted} submitted for approval. Date: ${date}` });
//       setManualData({ date: '', checkInTime: '', checkOutTime: '', reason: '', submitCheckIn: true, submitCheckOut: false });
//       setTimeout(() => setCurrentScreen('main'), 2000);
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//     }

//     setLoading(false);
//   };

//   // ─── RESET ───────────────────────────────────────────────────────────────────
//   const resetForm = () => {
//     setCurrentScreen('main');
//     setCheckedIn(false);
//     setCheckedOut(false);
//     setCheckInTime(null);
//     setCheckOutTime(null);
//     setLocation(null);
//     setSiteLocation(null);
//     setSiteProNo('');
//     setCapturedImage(null);
//     setAttendanceRecord(null);
//     setMessage({ type: '', text: '' });
//     setCameraMode('checkin');
//   };

//   useEffect(() => { return () => stopCamera(); }, []);

//   // ─── SCREENS ──────────────────────────────────────────────────────────────────

//   const canCheckIn  = true;
//   const canCheckOut = true;

//   const renderMainScreen = () => (
//     <Container maxWidth="sm" sx={{ py: 1 }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
//         <Box
//           sx={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             height: 100,
//             borderRadius: 2,
//             mb: 3,
//             display: 'flex',
//             alignItems: 'flex-end',
//             justifyContent: 'flex-start',
//             padding: 2,
//             boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//           }}
//         />

//         {message.text && (
//           <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage({ type: '', text: '' })}>
//             {message.text}
//           </Alert>
//         )}

//         {validatingLocation && (
//           <Alert severity="info" sx={{ mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <CircularProgress size={16} />
//               Validating your location...
//             </Box>
//           </Alert>
//         )}

//         {checkedIn && !checkedOut && (
//           <Alert severity="info" sx={{ mb: 2 }}>
//             <strong>Currently Checked In</strong><br />
//             Check-in time: {checkInTime}
//           </Alert>
//         )}

//         {checkedOut && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             <strong>Attendance Completed for Today</strong><br />
//             Check-in: {attendanceRecord?.checkInTime || checkInTime} | Check-out: {attendanceRecord?.checkOutTime}<br />
//             {attendanceRecord?.totalHours && <>Total Hours: {attendanceRecord.totalHours}</>}
//           </Alert>
//         )}

//         <Grid container spacing={2}>
//           {/* ── CHECK IN BUTTON ── */}
//           <Grid item xs={12} sm={6}>
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{
//                 py: 2,
//                 fontSize: '1.1rem',
//                 fontWeight: 'bold',
//                 backgroundColor: canCheckIn ? '#1976d2' : '#9e9e9e',
//                 '&:hover': {
//                   backgroundColor: canCheckIn ? '#1565c0' : '#9e9e9e',
//                 },
//                 cursor: canCheckIn ? 'pointer' : 'not-allowed',
//               }}
//               onClick={handleCheckIn}
//               disabled={loading || !canCheckIn}
//               startIcon={
//                 loading && cameraMode === 'checkin'
//                   ? <CircularProgress size={20} color="inherit" />
//                   : checkedIn
//                     ? <CheckCircle />
//                     : <Login />
//               }
//             >
//               {checkedIn ? 'Checked In' : loading ? 'Processing...' : 'Check In'}
//             </Button>
//           </Grid>

//           {/* ── CHECK OUT BUTTON ── */}
//           <Grid item xs={12} sm={6}>
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{
//                 py: 2,
//                 fontSize: '1.1rem',
//                 fontWeight: 'bold',
//                 backgroundColor: canCheckOut ? '#f57c00' : '#9e9e9e',
//                 '&:hover': {
//                   backgroundColor: canCheckOut ? '#ef6c00' : '#9e9e9e',
//                 },
//                 cursor: canCheckOut ? 'pointer' : 'not-allowed',
//               }}
//               onClick={handleCheckOut}
//               disabled={loading || !canCheckOut}
//               startIcon={
//                 loading && cameraMode === 'checkout'
//                   ? <CircularProgress size={20} color="inherit" />
//                   : checkedOut
//                     ? <CheckCircle />
//                     : <Logout />
//               }
//             >
//               {checkedOut ? 'Checked Out' : loading ? 'Processing...' : 'Check Out'}
//             </Button>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Card sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
//           <CardContent>
//             <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
//               Today's Attendance
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//               <AccessTime sx={{ mr: 1, color: '#1976d2' }} />
//               <Typography variant="body2">Current Time: {getCurrentTime()}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//               <LocationOn sx={{ mr: 1, color: '#1976d2' }} />
//               <Typography variant="body2">
//                 {location
//                   ? `Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
//                   : 'Location: Not detected'}
//               </Typography>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Person sx={{ mr: 1, color: '#1976d2' }} />
//               <Typography variant="body2">
//                 Device: {localStorage.getItem('deviceName') || 'Mobile Device'}
//               </Typography>
//             </Box>
//           </CardContent>
//         </Card>

//         <Button
//           fullWidth variant="outlined"
//           sx={{ py: 1.5, mb: 2, borderColor: '#1976d2', color: '#1976d2', fontWeight: 'bold', '&:hover': { backgroundColor: '#f0f7ff' } }}
//           onClick={() => setCurrentScreen('manual')}
//         >
//           Manual Attendance Request
//         </Button>

//       </Paper>
//     </Container>
//   );
// const renderCameraScreen = () => (
//   <Container maxWidth="sm" sx={{ py: 4 }}>
//     <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
//         {cameraMode === 'checkin' ? 'Check-in Selfie Verification' : 'Check-out Selfie Verification'}
//       </Typography>

//       {message.text && (
//         <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
//       )}

//       {!capturedImage ? (
//         <>
//           <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
//             Take a selfie to {cameraMode === 'checkin' ? 'check in' : 'check out'}
//           </Typography>
//           <Box sx={{ position: 'relative', mb: 2, borderRadius: 2, overflow: 'hidden', backgroundColor: '#000', height: 400 }}>
//             {!cameraActive && (
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f5f5f5' }}>
//                 <Typography color="textSecondary">Camera will appear here</Typography>
//               </Box>
//             )}
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               style={{ 
//                 width: '100%', 
//                 height: '100%', 
//                 objectFit: 'cover',
//                 display: cameraActive ? 'block' : 'none'
//               }}
//             />
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
//           </Box>

//           {!cameraActive ? (
//             <Button fullWidth variant="contained" startIcon={<Camera />} onClick={startCamera}
//               sx={{ py: 1.5, mb: 1, backgroundColor: '#1976d2', fontWeight: 'bold' }}>
//               Open Camera
//             </Button>
//           ) : (
//             <Button fullWidth variant="contained"
//               startIcon={faceDetecting ? <CircularProgress size={20} color="inherit" /> : <Camera />}
//               onClick={capturePhoto} disabled={faceDetecting}
//               sx={{ py: 1.5, mb: 1, backgroundColor: '#1976d2', fontWeight: 'bold' }}>
//               {faceDetecting ? 'Verifying Face...' : 'Capture Selfie'}
//             </Button>
//           )}
//         </>
//       ) : (
//         <>
//           <Box sx={{ 
//             mb: 2, 
//             borderRadius: 2, 
//             overflow: 'hidden', 
//             backgroundColor: '#f5f5f5',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             maxHeight: 400
//           }}>
//             <img 
//               src={capturedImage} 
//               alt="Captured selfie" 
//               style={{ 
//                 width: 'auto',
//                 maxWidth: '100%',
//                 height: 'auto',
//                 maxHeight: 400,
//                 objectFit: 'contain'
//               }} 
//             />
//           </Box>
//           <Chip icon={<CheckCircle />} label="Face Verified" color="success" variant="outlined" sx={{ mb: 2, width: '100%' }} />
//           <Button fullWidth variant="contained"
//             sx={{ py: 1.5, mb: 1, backgroundColor: '#28a745', fontWeight: 'bold', '&:hover': { backgroundColor: '#218838' } }}
//             onClick={submitAttendance} disabled={loading}
//             startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}>
//             {loading ? 'Submitting...' : `Confirm ${cameraMode === 'checkin' ? 'Check-in' : 'Check-out'}`}
//           </Button>
//           <Button fullWidth variant="outlined"
//             sx={{ py: 1.5, borderColor: '#1976d2', color: '#1976d2', fontWeight: 'bold' }}
//             onClick={retakePhoto} disabled={loading}>
//             Retake Photo
//           </Button>
//         </>
//       )}

//       <Button fullWidth variant="text" sx={{ mt: 2, color: '#999' }}
//         onClick={() => { stopCamera(); setCurrentScreen('main'); setCapturedImage(null); }}>
//         Cancel
//       </Button>
//     </Paper>
//   </Container>
// );
//   const renderManualScreen = () => (
//     <Container maxWidth="sm" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
//           Manual Attendance Request
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
//           Select what you need to submit. Your current location will be recorded.
//         </Typography>

//         {message.text && (
//           <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
//         )}

//         {/* ── What to submit ── */}
//         <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
//           Submit for:
//         </Typography>
//         <FormGroup row sx={{ mb: 2 }}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={manualData.submitCheckIn}
//                 onChange={(e) => setManualData({ ...manualData, submitCheckIn: e.target.checked })}
//                 color="primary"
//               />
//             }
//             label="Check-In"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={manualData.submitCheckOut}
//                 onChange={(e) => setManualData({ ...manualData, submitCheckOut: e.target.checked })}
//                 color="warning"
//               />
//             }
//             label="Check-Out"
//           />
//         </FormGroup>

//         {/* ── Date ── */}
//         <TextField
//           fullWidth type="date" label="Date"
//           value={manualData.date}
//           onChange={(e) => setManualData({ ...manualData, date: e.target.value })}
//           InputLabelProps={{ shrink: true }}
//           sx={{ mb: 2 }}
//         />

//         {/* ── Check-In Time ── */}
//         {manualData.submitCheckIn && (
//           <TextField
//             fullWidth type="time" label="Check-In Time"
//             value={manualData.checkInTime}
//             onChange={(e) => setManualData({ ...manualData, checkInTime: e.target.value })}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mb: 2 }}
//           />
//         )}

//         {/* ── Check-Out Time ── */}
//         {manualData.submitCheckOut && (
//           <TextField
//             fullWidth type="time" label="Check-Out Time"
//             value={manualData.checkOutTime}
//             onChange={(e) => setManualData({ ...manualData, checkOutTime: e.target.value })}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mb: 2 }}
//           />
//         )}

//         {/* ── Reason ── */}
//         <TextField
//           fullWidth multiline rows={4}
//           label="Reason for Manual Request"
//           placeholder="Forgot to check in/out, Technical issues, etc."
//           value={manualData.reason}
//           onChange={(e) => setManualData({ ...manualData, reason: e.target.value })}
//           sx={{ mb: 3 }}
//         />

//         <Button
//           fullWidth variant="contained" size="large"
//           sx={{ py: 1.5, mb: 1, backgroundColor: '#1976d2', fontWeight: 'bold', '&:hover': { backgroundColor: '#1565c0' } }}
//           onClick={handleManualSubmit} disabled={loading}
//           startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
//         >
//           {loading ? 'Submitting...' : 'Submit for Approval'}
//         </Button>

//         <Button
//           fullWidth variant="outlined"
//           sx={{ py: 1.5, borderColor: '#999', color: '#666', fontWeight: 'bold' }}
//           onClick={() => setCurrentScreen('main')} disabled={loading}
//         >
//           Cancel
//         </Button>
//       </Paper>
//     </Container>
//   );

//   return (
//     <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
//       {currentScreen === 'main' && renderMainScreen()}
//       {currentScreen === 'camera' && renderCameraScreen()}
//       {currentScreen === 'manual' && renderManualScreen()}
//     </Box>
//   );
// };

// export default AttendanceEntry;









import React, { useState, useRef, useEffect } from 'react';
import {
  Container, Paper, TextField, Button, Box, Typography, Alert,
  CircularProgress, Card, CardContent, Grid, Chip, Divider,
  FormControlLabel, Checkbox, FormGroup,
} from '@mui/material';
import {
  CheckCircle, Camera, LocationOn, AccessTime, Person, Logout, Login,
} from '@mui/icons-material';
import bgImage from "../../assets/images/Attend.jpg";

const BASE_URL = 'https://esystems.cdl.lk/backendDGES/BizTrack/Attendance';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'auth-key': (localStorage.getItem('token') || '').replace(/"/g, ''),
});

const AttendanceEntry = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [attendanceRecord, setAttendanceRecord] = useState(null);

  const [siteLocation, setSiteLocation] = useState(null);
  const [siteProNo, setSiteProNo] = useState('');
  const [location, setLocation] = useState(null);
  const [validatingLocation, setValidatingLocation] = useState(false);

  const [isOutsideLocation, setIsOutsideLocation] = useState(false);

  const [manualData, setManualData] = useState({
    date: '', checkInTime: '', checkOutTime: '', reason: '',
    submitCheckIn: true, submitCheckOut: false,
  });

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraMode, setCameraMode] = useState('checkin');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [faceDetecting, setFaceDetecting] = useState(false);

  // ─── HELPERS ────────────────────────────────────────────────────────────────

  const getCurrentDate = () => new Date().toISOString().split('T')[0];
  const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

  const formatDateTimeForAPI = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, '0');
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${month}/${day}/${year} ${pad(hours)}:${minutes}:${seconds} ${ampm}`;
  };

  const calculateWorkHours = (checkIn, checkOut) => {
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    let hours = outHour - inHour;
    let minutes = outMin - inMin;
    if (minutes < 0) { hours--; minutes += 60; }
    return `${hours}h ${minutes}m`;
  };

  // ─── API: FETCH SITE LOCATION ────────────────────────────────────────────────

  const fetchSiteLocation = async () => {
    const serviceNo = localStorage.getItem('ServiceNo');
    if (!serviceNo) throw new Error('Service number not found. Please log in again.');

    const response = await fetch(
      `${BASE_URL}/GetDGESLocbySno?p_sno=${serviceNo}`,
      { headers: getAuthHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch site location.');

    const data = await response.json();
    if (data.StatusCode !== 200 || !data.ResultSet || data.ResultSet.length === 0) {
      throw new Error('No site location found for your service number.');
    }

    const record = data.ResultSet[0];
    setSiteProNo(record.Pro_no);
    setSiteLocation({ latitude: parseFloat(record.Lat), longitude: parseFloat(record.Lon) });

    return { lat: parseFloat(record.Lat), lon: parseFloat(record.Lon), proNo: record.Pro_no };
  };

  const validateLocationWithinSite = (deviceLat, deviceLng, siteLat, siteLng) => {
    const RADIUS_KM = 0.02;
    const R = 6371;
    const dLat = (deviceLat - siteLat) * (Math.PI / 180);
    const dLng = (deviceLng - siteLng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(siteLat * (Math.PI / 180)) *
      Math.cos(deviceLat * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return distance <= RADIUS_KM;
  };

  // ─── GET DEVICE LOCATION ─────────────────────────────────────────────────────

  const getDeviceLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        () => reject(new Error('Unable to access location. Please enable location services.'))
      );
    });
  };

  // ─── VALIDATE LOCATION ───────────────────────────────────────────────────────

  const validateLocation = async () => {
    setValidatingLocation(true);
    try {
      const site = await fetchSiteLocation();
      const device = await getDeviceLocation();
      const isWithin = validateLocationWithinSite(
        device.latitude, device.longitude, site.lat, site.lon
      );
      return { device, site, isWithin }; 
    } finally {
      setValidatingLocation(false);
    }
  };

  // ─── API: POST ATTENDANCE ─────────────────────────────────────────────────────

  const postAttendance = async ({ barcodeNo, barcodeDate, pStatus, hstatus, latitude, longitude, reason = ' ', clockNo }) => {
    const body = {
      p_barcode_no: barcodeNo,
      p_barcode_date: barcodeDate,
      p_employee_type: '0',
      p_clock_no: clockNo,
      p_status: pStatus,
      p_hstatus: hstatus,
      p_latitude: String(latitude),
      p_longitude: String(longitude),
      p_reason: reason,
    };

    const response = await fetch(
      'https://esystems.cdl.lk/backendDGES/BizTrack/Attendance/DGESPostAttendance',
      { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body) }
    );

    if (!response.ok) throw new Error('Failed to submit attendance. Please try again.');

    const data = await response.json();
    if (data.StatusCode && data.StatusCode !== 200 && data.StatusCode !== 201) {
      throw new Error(data.Message || 'Attendance submission failed.');
    }
    return data;
  };

  // ─── CHECK IN HANDLER ────────────────────────────────────────────────────────

  const handleCheckIn = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const { isWithin } = await validateLocation();

      setIsOutsideLocation(!isWithin); 

      const currentTime = getCurrentTime();
      setCheckInTime(currentTime);
      setCameraMode('checkin');
      setCurrentScreen('camera');

      setMessage({
        type:  'success' ,
        text:  'Location validated! Please take a selfie for check-in verification.'
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
    setLoading(false);
  };

  // ─── CHECK OUT HANDLER ─────────────────────────────────────────────────────── 

  const handleCheckOut = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const { isWithin } = await validateLocation();

      setIsOutsideLocation(!isWithin);

      setCameraMode('checkout');
      setCurrentScreen('camera');

      setMessage({
        type: isWithin ? 'success' : 'warning',
        text: isWithin
          ? 'Location validated! Please take a selfie for check-out verification.'
          : '⚠️ You are outside the designated site area. Check-out will be marked accordingly.',
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
    setLoading(false);
  };

  // ─── CAMERA CONTROLS ─────────────────────────────────────────────────────────

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch {
      setMessage({ type: 'error', text: 'Unable to access camera. Please grant camera permissions.' });
    }
  };

  const capturePhoto = () => {
    setFaceDetecting(true);
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageData);
      stopCamera();
      setTimeout(() => {
        setFaceDetecting(false);
        setMessage({ type: 'success', text: `Face detected! Selfie captured successfully for ${cameraMode}.` });
      }, 1500);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      setCameraActive(false);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // ─── SUBMIT ATTENDANCE (after selfie) ────────────────────────────────────────

  const submitAttendance = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const barcodeDate = formatDateTimeForAPI(now);

      if (cameraMode === 'checkin') {
        await postAttendance({
          barcodeNo: siteProNo,
          barcodeDate,
          pStatus: 'I',
          hstatus: isOutsideLocation ? 'B' : 'I',   
          latitude: location.latitude,
          longitude: location.longitude,
          clockNo: isOutsideLocation ? 33 : 31,       
        });

        const currentTime = getCurrentTime();
        const record = {
          checkInTime: currentTime,
          checkInDate: getCurrentDate(),
          checkInPhoto: capturedImage,
          checkInLocation: location,
          status: 'checked_in',
        };
        setAttendanceRecord(record);
        setCheckedIn(true);
        setCheckInTime(currentTime);
        setMessage({ type: 'success', text: `Check-in successful! Time: ${currentTime}` });

        setTimeout(() => {
          setCurrentScreen('main');
          setCapturedImage(null);
          setLoading(false);
        }, 2000);

      } else {
        const checkoutTime = getCurrentTime();

        await postAttendance({
          barcodeNo: siteProNo,
          barcodeDate,
          pStatus: 'O',
          hstatus: isOutsideLocation ? 'B' : 'O',   
          latitude: location.latitude,
          longitude: location.longitude,
          clockNo: isOutsideLocation ? 33 : 32,       
        });

        setCheckOutTime(checkoutTime);
        const totalHours = checkInTime ? calculateWorkHours(checkInTime, checkoutTime) : null;
        const completeRecord = {
          ...attendanceRecord,
          checkOutTime: checkoutTime,
          checkOutDate: getCurrentDate(),
          checkOutPhoto: capturedImage,
          checkOutLocation: location,
          status: 'completed',
          totalHours,
        };
        setAttendanceRecord(completeRecord);
        setCheckedOut(true);
        setMessage({
          type: 'success',
          text: `Check-out successful! Time: ${checkoutTime}.${totalHours ? ` Total hours: ${totalHours}` : ''}`,
        });

        setTimeout(() => {
          resetForm();
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    }
  };

  // ─── MANUAL SUBMIT ───────────────────────────────────────────────────────────

  const handleManualSubmit = async () => {
    const { date, checkInTime: ciTime, checkOutTime: coTime, reason, submitCheckIn, submitCheckOut } = manualData;

    if (!date || !reason) {
      setMessage({ type: 'error', text: 'Please fill in the date and reason.' });
      return;
    }
    if (!submitCheckIn && !submitCheckOut) {
      setMessage({ type: 'error', text: 'Please select at least Check-In or Check-Out.' });
      return;
    }
    if (submitCheckIn && !ciTime) {
      setMessage({ type: 'error', text: 'Please provide a Check-In time.' });
      return;
    }
    if (submitCheckOut && !coTime) {
      setMessage({ type: 'error', text: 'Please provide a Check-Out time.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const site = await fetchSiteLocation();
      const device = await getDeviceLocation();
      const [year, month, day] = date.split('-');

      if (submitCheckIn) {
        const [inHour, inMin] = ciTime.split(':');
        const checkInDT = new Date(year, month - 1, day, inHour, inMin, 0);
        await postAttendance({
          barcodeNo: site.proNo,
          barcodeDate: formatDateTimeForAPI(checkInDT),
          pStatus: 'I',
          hstatus: 'P',
          latitude: device.latitude,
          longitude: device.longitude,
          reason,
          clockNo: 33,
        });
      }

      if (submitCheckOut) {
        const [outHour, outMin] = coTime.split(':');
        const checkOutDT = new Date(year, month - 1, day, outHour, outMin, 0);
        await postAttendance({
          barcodeNo: site.proNo,
          barcodeDate: formatDateTimeForAPI(checkOutDT),
          pStatus: 'O',
          hstatus: 'P',
          latitude: device.latitude,
          longitude: device.longitude,
          reason,
          clockNo: 32,
        });
      }

      const submitted = [submitCheckIn && 'Check-In', submitCheckOut && 'Check-Out'].filter(Boolean).join(' & ');
      setMessage({ type: 'success', text: `Manual ${submitted} submitted for approval. Date: ${date}` });
      setManualData({ date: '', checkInTime: '', checkOutTime: '', reason: '', submitCheckIn: true, submitCheckOut: false });
      setTimeout(() => setCurrentScreen('main'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }

    setLoading(false);
  };

  // ─── RESET ───────────────────────────────────────────────────────────────────

  const resetForm = () => {
    setCurrentScreen('main');
    setCheckedIn(false);
    setCheckedOut(false);
    setCheckInTime(null);
    setCheckOutTime(null);
    setLocation(null);
    setSiteLocation(null);
    setSiteProNo('');
    setCapturedImage(null);
    setAttendanceRecord(null);
    setMessage({ type: '', text: '' });
    setCameraMode('checkin');
    setIsOutsideLocation(false); 
  };

  useEffect(() => { return () => stopCamera(); }, []);

  // ─── SCREENS ──────────────────────────────────────────────────────────────────

  const canCheckIn = true;
  const canCheckOut = true;

  const renderMainScreen = () => (
    <Container maxWidth="sm" sx={{ py: 1 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
        <Box
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 100,
            borderRadius: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            padding: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        />

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage({ type: '', text: '' })}>
            {message.text}
          </Alert>
        )}

        {validatingLocation && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
              Validating your location...
            </Box>
          </Alert>
        )}

        {checkedIn && !checkedOut && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Currently Checked In</strong><br />
            Check-in time: {checkInTime}
          </Alert>
        )}

        {checkedOut && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Attendance Completed for Today</strong><br />
            Check-in: {attendanceRecord?.checkInTime || checkInTime} | Check-out: {attendanceRecord?.checkOutTime}<br />
            {attendanceRecord?.totalHours && <>Total Hours: {attendanceRecord.totalHours}</>}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth variant="contained" size="large"
              sx={{
                py: 2, fontSize: '1.1rem', fontWeight: 'bold',
                backgroundColor: canCheckIn ? '#1976d2' : '#9e9e9e',
                '&:hover': { backgroundColor: canCheckIn ? '#1565c0' : '#9e9e9e' },
                cursor: canCheckIn ? 'pointer' : 'not-allowed',
              }}
              onClick={handleCheckIn}
              disabled={loading || !canCheckIn}
              startIcon={
                loading && cameraMode === 'checkin'
                  ? <CircularProgress size={20} color="inherit" />
                  : checkedIn ? <CheckCircle /> : <Login />
              }
            >
              {checkedIn ? 'Checked In' : loading ? 'Processing...' : 'Check In'}
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth variant="contained" size="large"
              sx={{
                py: 2, fontSize: '1.1rem', fontWeight: 'bold',
                backgroundColor: canCheckOut ? '#f57c00' : '#9e9e9e',
                '&:hover': { backgroundColor: canCheckOut ? '#ef6c00' : '#9e9e9e' },
                cursor: canCheckOut ? 'pointer' : 'not-allowed',
              }}
              onClick={handleCheckOut}
              disabled={loading || !canCheckOut}
              startIcon={
                loading && cameraMode === 'checkout'
                  ? <CircularProgress size={20} color="inherit" />
                  : checkedOut ? <CheckCircle /> : <Logout />
              }
            >
              {checkedOut ? 'Checked Out' : loading ? 'Processing...' : 'Check Out'}
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Card sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
              Today's Attendance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTime sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body2">Current Time: {getCurrentTime()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body2">
                {location
                  ? `Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                  : 'Location: Not detected'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body2">
                Device: {localStorage.getItem('deviceName') || 'Mobile Device'}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Button
          fullWidth variant="outlined"
          sx={{ py: 1.5, mb: 2, borderColor: '#1976d2', color: '#1976d2', fontWeight: 'bold', '&:hover': { backgroundColor: '#f0f7ff' } }}
          onClick={() => setCurrentScreen('manual')}
        >
          Manual Attendance Request
        </Button>
      </Paper>
    </Container>
  );

  const renderCameraScreen = () => (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          {cameraMode === 'checkin' ? 'Check-in Selfie Verification' : 'Check-out Selfie Verification'}
        </Typography>

        {/* ✅ Show outside-location warning banner on camera screen */}
        {isOutsideLocation && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            ⚠️ You are outside the designated site area. This attendance will be marked as outside-location.
          </Alert>
        )}

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
        )}

        {!capturedImage ? (
          <>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Take a selfie to {cameraMode === 'checkin' ? 'check in' : 'check out'}
            </Typography>
            <Box sx={{ position: 'relative', mb: 2, borderRadius: 2, overflow: 'hidden', backgroundColor: '#000', height: 400 }}>
              {!cameraActive && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f5f5f5' }}>
                  <Typography color="textSecondary">Camera will appear here</Typography>
                </Box>
              )}
              <video
                ref={videoRef} autoPlay playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: cameraActive ? 'block' : 'none' }}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </Box>

            {!cameraActive ? (
              <Button fullWidth variant="contained" startIcon={<Camera />} onClick={startCamera}
                sx={{ py: 1.5, mb: 1, backgroundColor: '#1976d2', fontWeight: 'bold' }}>
                Open Camera
              </Button>
            ) : (
              <Button fullWidth variant="contained"
                startIcon={faceDetecting ? <CircularProgress size={20} color="inherit" /> : <Camera />}
                onClick={capturePhoto} disabled={faceDetecting}
                sx={{ py: 1.5, mb: 1, backgroundColor: '#1976d2', fontWeight: 'bold' }}>
                {faceDetecting ? 'Verifying Face...' : 'Capture Selfie'}
              </Button>
            )}
          </>
        ) : (
          <>
            <Box sx={{
              mb: 2, borderRadius: 2, overflow: 'hidden', backgroundColor: '#f5f5f5',
              display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: 400,
            }}>
              <img src={capturedImage} alt="Captured selfie"
                style={{ width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: 400, objectFit: 'contain' }}
              />
            </Box>
            <Chip icon={<CheckCircle />} label="Face Verified" color="success" variant="outlined" sx={{ mb: 2, width: '100%' }} />
            <Button fullWidth variant="contained"
              sx={{ py: 1.5, mb: 1, backgroundColor: '#28a745', fontWeight: 'bold', '&:hover': { backgroundColor: '#218838' } }}
              onClick={submitAttendance} disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}>
              {loading ? 'Submitting...' : `Confirm ${cameraMode === 'checkin' ? 'Check-in' : 'Check-out'}`}
            </Button>
            <Button fullWidth variant="outlined"
              sx={{ py: 1.5, borderColor: '#1976d2', color: '#1976d2', fontWeight: 'bold' }}
              onClick={retakePhoto} disabled={loading}>
              Retake Photo
            </Button>
          </>
        )}

        <Button fullWidth variant="text" sx={{ mt: 2, color: '#999' }}
          onClick={() => { stopCamera(); setCurrentScreen('main'); setCapturedImage(null); setIsOutsideLocation(false); }}>
          Cancel
        </Button>
      </Paper>
    </Container>
  );

  const renderManualScreen = () => (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          Manual Attendance Request
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
          Select what you need to submit. Your current location will be recorded.
        </Typography>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
        )}

        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Submit for:</Typography>
        <FormGroup row sx={{ mb: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={manualData.submitCheckIn}
              onChange={(e) => setManualData({ ...manualData, submitCheckIn: e.target.checked })} color="primary" />}
            label="Check-In"
          />
          <FormControlLabel
            control={<Checkbox checked={manualData.submitCheckOut}
              onChange={(e) => setManualData({ ...manualData, submitCheckOut: e.target.checked })} color="warning" />}
            label="Check-Out"
          />
        </FormGroup>

        <TextField fullWidth type="date" label="Date" value={manualData.date}
          onChange={(e) => setManualData({ ...manualData, date: e.target.value })}
          InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />

        {manualData.submitCheckIn && (
          <TextField fullWidth type="time" label="Check-In Time" value={manualData.checkInTime}
            onChange={(e) => setManualData({ ...manualData, checkInTime: e.target.value })}
            InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
        )}

        {manualData.submitCheckOut && (
          <TextField fullWidth type="time" label="Check-Out Time" value={manualData.checkOutTime}
            onChange={(e) => setManualData({ ...manualData, checkOutTime: e.target.value })}
            InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
        )}

        <TextField fullWidth multiline rows={4} label="Reason for Manual Request"
          placeholder="Forgot to check in/out, Technical issues, etc."
          value={manualData.reason}
          onChange={(e) => setManualData({ ...manualData, reason: e.target.value })}
          sx={{ mb: 3 }} />

        <Button fullWidth variant="contained" size="large"
          sx={{ py: 1.5, mb: 1, backgroundColor: '#1976d2', fontWeight: 'bold', '&:hover': { backgroundColor: '#1565c0' } }}
          onClick={handleManualSubmit} disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}>
          {loading ? 'Submitting...' : 'Submit for Approval'}
        </Button>

        <Button fullWidth variant="outlined"
          sx={{ py: 1.5, borderColor: '#999', color: '#666', fontWeight: 'bold' }}
          onClick={() => setCurrentScreen('main')} disabled={loading}>
          Cancel
        </Button>
      </Paper>
    </Container>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {currentScreen === 'main' && renderMainScreen()}
      {currentScreen === 'camera' && renderCameraScreen()}
      {currentScreen === 'manual' && renderManualScreen()}
    </Box>
  );
};

export default AttendanceEntry;