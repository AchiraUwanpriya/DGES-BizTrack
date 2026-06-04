// import React from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   Button,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import {
//   Paper,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";

// const ModalContainer = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   maxWidth: "600px",
//   maxHeight: "90vh",
//   backgroundColor: theme.palette.background.paper,
//   borderRadius: "12px",
//   boxShadow: theme.shadows[24],
//   overflow: "hidden",
//   display: "flex",
//   flexDirection: "column",
// }));

// const Header = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderBottom: `1px solid ${theme.palette.divider}`,
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
// }));

// const Content = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   overflowY: "auto",
//   "&::-webkit-scrollbar": {
//     width: "6px",
//   },
//   "&::-webkit-scrollbar-track": {
//     background: theme.palette.grey[100],
//   },
//   "&::-webkit-scrollbar-thumb": {
//     background: theme.palette.grey[400],
//     borderRadius: "3px",
//   },
// }));

// const Footer = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2, 3),
//   borderTop: `1px solid ${theme.palette.divider}`,
//   display: "flex",
//   justifyContent: "flex-end",
//   backgroundColor: theme.palette.grey[50],
// }));

// const Section = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(3),
//   "&:last-child": {
//     marginBottom: 0,
//   },
// }));

// const SectionTitle = styled(Typography)(({ theme }) => ({
//   color: theme.palette.primary.main,
//   fontWeight: 600,
//   marginBottom: theme.spacing(1),
// }));

// const TermsModal = ({ open, handleClose }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="terms-modal-title"
//       aria-describedby="terms-modal-description"
//     >
//       <ModalContainer>
//         <Header>
//           <Typography variant="h5" component="h2" id="terms-modal-title">
//             Terms and Conditions
//           </Typography>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{ color: "inherit" }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Header>

//         <Content>
//           <Section>
//             <SectionTitle variant="subtitle1">
//               Bungalow Reservation
//             </SectionTitle>
//             <Typography variant="body1" color="text.secondary">
//               <p>
//                 Finance Division shall receive email (nehb@cdl.lk) requests for
//                 reservations from Executives of the Company before the beginning
//                 of every quarter of the particular year. The reservation
//                 starting time is at 13.00 pm on the prior announced day before
//                 beginning of 1st day of each quarter. Each applicant is able to
//                 reserve in two options based on preferences.
//               </p>
//               <p>
//                 You can view the updated reservation list on your computer at
//                 the following location (SLDEA (P:)
//               </p>
//               <p>
//                 In case if an identified executive reserves April/ May season or
//                 School Vacation consecutively, the priority will be given to
//                 next applicants.
//               </p>
//               <p>
//                 Maximum head count 16 (including children) where Max 12 Adults
//                 (above 18 years) allowed and Executive should accompany his/ her
//                 guests.
//               </p>
//               <p>
//                 Maximum allowed stay during April/ May season will be 03 nights.
//                 Any extended day can be allocated only 03 days before the visit
//                 and subject to availability.
//               </p>
//               <p>
//                 Retired executives can reserve within 10 days lead time from 1st
//                 day of reservation and stay up to 03 nights except for April/
//                 May season and Government School Vacations where priority will
//                 be given to Current executives.
//               </p>
//               <p>
//                 Upon confirmation of reservation, each applicant is expected to
//                 carry the attached “Application for Reservation” authorized by
//                 Finance Division Executive and hand over to the Bungalow
//                 Caretaker at the first day of Check in.
//               </p>
//               <p>
//                 <b>
//                   Check in : 14.00 Hrs <br />
//                   Check out : 12. 00 noon
//                 </b>
//               </p>
//               <p>
//                 A Guest Register is maintained at the Bungalow to sign the
//                 arrival date and time and departure date and time.
//               </p>
//             </Typography>
//           </Section>


//           <Section>
//   {/* <SectionTitle variant="subtitle1">
//     General Guidelines & Rules
//   </SectionTitle> */}

//   <Typography variant="body1" color="text.secondary">
//     <b>Before Planning Your Visit</b>
//     <ul>
//       <li>
//         <b>Booking Procedure:</b> Please use the booking app for bungalow
//         reservations. You will receive the reservation confirmation and
//         check-in QR code to your mobile phone and email address.
//       </li>

//       <li>
//         <b>Occupancy Limits:</b>
//         <ul>
//           <li>Main Bungalow – Maximum of 16 guests, including children</li>
//           <li>Lower Garden Suite – Maximum of 4 guests, including children</li>
//         </ul>
//         Exceeding the approved occupancy is strictly prohibited.
//       </li>

//       <li>
//         <b>Room & Facility Amenities – Main Bungalow:</b> Four (04) rooms with
//         two double beds each, standard linen (extra blankets may not be
//         available), attached bathrooms, hot water facilities, electric room
//         heaters. Toilet paper, two towels and a mini soap are provided in each
//         bathroom. Guests are required to bring additional toiletries. Flat-screen
//         TV, tea-making facilities, refrigerator, iron and ironing board, and
//         karaoke speaker system are available in common areas.
//       </li>

//       <li>
//         <b>Room & Facility Amenities – Lower Garden Suite:</b> Single room with a
//         king-size bed and a convertible sofa-bed, standard linen (extra blankets
//         may not be available), attached bathroom, hot water facility, electric
//         room heater, pantry with sink, microwave oven, mini refrigerator,
//         flat-screen TV, iron and ironing board, and tea-making facilities. Toilet
//         paper, one towel and a mini soap are provided. Guests must bring
//         additional toiletries.
//       </li>

//       <li>
//         <b>Privacy Between Two Entities:</b> The Main Bungalow and Lower Garden
//         Suite are operated as two separate entities. Guests are requested to
//         avoid disturbances and respect each other’s privacy.
//       </li>

//       <li>
//         <b>Standard Check-in / Check-out:</b> Check-in at <b>2.00 p.m.</b> and
//         Check-out at <b>12.30 p.m.</b>
//       </li>

//       <li>
//         <b>Early / Late Check-in & Check-out:</b> Up to six (06) hours may be
//         provided free of charge subject to availability, operational
//         requirements, and minimum two (02) hour preparation window for the
//         Caretaker.
//       </li>

//       <li>
//         <b>Meal Preparation:</b> Guests must provide required food items and dry
//         rations. The Caretaker will prepare all three meals. Guests are requested
//         to allow sufficient preparation time. This service is not applicable to
//         the Lower Garden Suite.
//       </li>
//     </ul>
//   </Typography>

//   <Divider sx={{ my: 2 }} />

//   <Typography variant="body1" color="text.secondary">
//     <b>On Your Arrival</b>
//     <ul>
//       <li>
//         Present your reservation QR code (digital preferred) to the Caretaker
//         upon arrival.
//       </li>
//       <li>
//         Outdoor shoes and slippers are strictly not permitted inside the
//         bungalow. Please use the designated shoe racks.
//       </li>
//       <li>
//         Obtain allocated room keys and keep them in your custody until check-out.
//         Non-allocated rooms will remain locked.
//       </li>
//     </ul>
//   </Typography>

//   <Divider sx={{ my: 2 }} />

//   <Typography variant="body1" color="text.secondary">
//     <b>During Your Stay</b>
//     <ul>
//       <li>
//         <b>Noise & Conduct:</b> Quiet hours are from <b>10.00 p.m. – 8.00 a.m.</b>.
//         Loud music and disruptive behavior are not permitted.
//       </li>
//       <li>
//         <b>Cleanliness:</b> Maintain cleanliness, dispose waste properly using
//         segregated bins, and clean common areas after use.
//       </li>
//       <li>Washing plates and cutlery is on a self-service basis.</li>
//       <li>
//         <b>Safe Handling:</b> Use all appliances and facilities carefully,
//         especially when used by children.
//       </li>
//       <li><b>Pets:</b> Pets are not allowed.</li>
//       <li>
//         <b>Smoking:</b> Smoking inside the bungalow is strictly prohibited.
//         Allowed only in designated outdoor areas.
//       </li>
//       <li>
//         <b>Parking:</b> Park vehicles only in designated areas without blocking
//         entrances. Lower Garden Suite has parking for one vehicle only.
//       </li>
//       <li>
//         <b>Security:</b> Ensure doors and windows are securely locked when leaving
//         the premises.
//       </li>
//       <li>
//         <b>Drinking Water:</b> Tap water is safe; however bottled or boiled water
//         is recommended.
//       </li>
//       <li>
//         <b>Waste Disposal:</b> Sanitary napkins and child diapers must be taken
//         back by guests.
//       </li>
//     </ul>
//   </Typography>

//   <Divider sx={{ my: 2 }} />

//   <Typography variant="body1" color="text.secondary">
//     <b>Curated Garden & Outdoor Areas</b>
//     <ul>
//       <li>Help preserve the landscaped garden.</li>
//       <li>Do not walk on curated grass; use designated paths only.</li>
//       <li>Littering is strictly prohibited.</li>
//       <li>
//         Guests may engage in light gardening under Caretaker guidance without
//         disturbing plant layouts.
//       </li>
//     </ul>
//   </Typography>

//   <Divider sx={{ my: 2 }} />

//   <Typography variant="body1" color="text.secondary">
//     <b>Lower Garden Suite – Meal & Usage Guidelines</b>
//     <ul>
//       <li>Microwave is provided for heating food only.</li>
//       <li>Cooking meals is not permitted.</li>
//       <li>
//         Guests are allocated the lower garden and should not use upper garden
//         facilities.
//       </li>
//     </ul>
//   </Typography>

//   <Divider sx={{ my: 2 }} />

//   <Typography variant="body1" color="text.secondary">
//     <b>During Check-out</b>
//     <ul>
//       <li>Hand over all keys to the Caretaker using QR system.</li>
//       <li>
//         Declare damages or missing items via the booking app to avoid penalties.
//       </li>
//       <li>Online feedback submission is mandatory.</li>
//       <li>
//         Report maintenance issues and certify corrective actions where
//         applicable.
//       </li>
//       <li>
//         Guests are encouraged to record feedback in the Guest Book.
//       </li>
//     </ul>
//   </Typography>

//   <Typography variant="body2" sx={{ mt: 2 }}>
//     For unresolved issues, please contact the Holiday Bungalow In-Charge
//     Executive <b>Mr. Kumara</b> on <b>077 967 5550</b>.
//   </Typography>
// </Section>

//         </Content>

//         <Content>
//           <Section>
//             <SectionTitle variant="subtitle1">Bungalow Rates</SectionTitle>
//             <Typography variant="body1" color="text.secondary">
//               <p>
//                 The following per day rates will be charged without meals for
//                 main bungalow basis:
//               </p>
//             </Typography>
//             <Typography variant="body1" color="#1976d2">
//               <p>
//                 Main Bunglow:
//               </p>
//             </Typography>
//             <Paper elevation={3} sx={{ mt: 2, borderRadius: 2 }}>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#1976d2",
//                         color: "white",
//                         borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     ></TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#1976d2",
//                         color: "white",
//                         borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Per day rate Rs.
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       April/ May season (1st April to 15th May)
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 10,000.00
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Week Ends (Friday noon to Monday noon) or Mercantile
//                       Holidays or Government School Vacations
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 7,000.00
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Week Days (Monday noon to Friday noon)
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 5,000.00
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       External business client / retired
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 15,000.00
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </Paper>



//             <Typography  sx={{ mt: 4 }} variant="body1" color="#1976d2">
//               <p>
//                 Lower Garden Suite:
//               </p>
//             </Typography>
//             <Paper elevation={3} sx={{ mt: 2, borderRadius: 2 }}>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#1976d2",
//                         color: "white",
//                         borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     ></TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#1976d2",
//                         color: "white",
//                         borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Per day rate Rs.
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       April/ May season (1st April to 15th May)
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 3,000.00
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Week Ends (Friday noon to Monday noon) or Mercantile
//                       Holidays or Government School Vacations
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 3,000.00
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Week Days (Monday noon to Friday noon)
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 2,000.00
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       External business client / retired
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderRight: "1px solid #e0e0e0",
//                         textAlign: "center",
//                         padding: "12px",
//                       }}
//                     >
//                       Rs. 5,000.00
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </Paper>
//           </Section>
//           <Typography variant="body1" color="text.secondary">
//             <p>
//               In case of property damages by users, such cost will be charged to
//               executive who reserved the bungalow. It is advisable to check with
//               caretakers before using systems.
//             </p>
//           </Typography>
//         </Content>

//         <Footer>
//           <Button
//             variant="contained"
//             onClick={handleClose}
//             sx={{
//               borderRadius: "20px",
//               px: 4,
//               py: 1,
//               textTransform: "none",
//               fontWeight: 600,
//             }}
//           >
//             I Understand
//           </Button>
//         </Footer>
//       </ModalContainer>
//     </Modal>
//   );
// };

// export default TermsModal;





import React from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  maxHeight: "90vh",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: theme.shadows[24],
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: "auto",
  flex: 1, // This makes it take all available space
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: "3px",
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "flex-end",
  backgroundColor: theme.palette.grey[50],
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "&:last-child": {
    marginBottom: 0,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const TermsModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="terms-modal-title"
      aria-describedby="terms-modal-description"
    >
      <ModalContainer>
        <Header>
          <Typography variant="h5" component="h2" id="terms-modal-title">
            Terms and Conditions
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ color: "inherit" }}
          >
            <CloseIcon />
          </IconButton>
        </Header>

        {/* SINGLE Content component that contains ALL content */}
        <Content>
          {/* Bungalow Reservation Section */}
          <Section>
            <SectionTitle variant="subtitle1">
              Bungalow Reservation
            </SectionTitle>
            <Typography variant="body1" color="text.secondary">
              <p>
                Finance Division shall receive email (nehb@cdl.lk) requests for
                reservations from Executives of the Company before the beginning
                of every quarter of the particular year. The reservation
                starting time is at 13.00 pm on the prior announced day before
                beginning of 1st day of each quarter. Each applicant is able to
                reserve in two options based on preferences.
              </p>
              <p>
                You can view the updated reservation list on your computer at
                the following location (SLDEA (P:)
              </p>
              <p>
                In case if an identified executive reserves April/ May season or
                School Vacation consecutively, the priority will be given to
                next applicants.
              </p>
              <p>
                Maximum head count 16 (including children) where Max 12 Adults
                (above 18 years) allowed and Executive should accompany his/ her
                guests.
              </p>
              <p>
                Maximum allowed stay during April/ May season will be 03 nights.
                Any extended day can be allocated only 03 days before the visit
                and subject to availability.
              </p>
              <p>
                Retired executives can reserve within 10 days lead time from 1st
                day of reservation and stay up to 03 nights except for April/
                May season and Government School Vacations where priority will
                be given to Current executives.
              </p>
              <p>
                Upon confirmation of reservation, each applicant is expected to
                carry the attached “Application for Reservation” authorized by
                Finance Division Executive and hand over to the Bungalow
                Caretaker at the first day of Check in.
              </p>
              <p>
                <b>
                  Check in : 14.00 Hrs <br />
                  Check out : 12. 00 noon
                </b>
              </p>
              <p>
                A Guest Register is maintained at the Bungalow to sign the
                arrival date and time and departure date and time.
              </p>
            </Typography>
          </Section>

          {/* General Guidelines Section */}
          <Section>
            <Typography variant="body1" color="text.secondary">
              <b>Before Planning Your Visit</b>
              <ul>
                <li>
                  <b>Booking Procedure:</b> Please use the booking app for bungalow
                  reservations. You will receive the reservation confirmation and
                  check-in QR code to your mobile phone and email address.
                </li>
                <li>
                  <b>Occupancy Limits:</b>
                  <ul>
                    <li>Main Bungalow – Maximum of 16 guests, including children</li>
                    <li>Lower Garden Suite – Maximum of 4 guests, including children</li>
                  </ul>
                  Exceeding the approved occupancy is strictly prohibited.
                </li>
                <li>
                  <b>Room & Facility Amenities – Main Bungalow:</b> Four (04) rooms with
                  two double beds each, standard linen (extra blankets may not be
                  available), attached bathrooms, hot water facilities, electric room
                  heaters. Toilet paper, two towels and a mini soap are provided in each
                  bathroom. Guests are required to bring additional toiletries. Flat-screen
                  TV, tea-making facilities, refrigerator, iron and ironing board, and
                  karaoke speaker system are available in common areas.
                </li>
                <li>
                  <b>Room & Facility Amenities – Lower Garden Suite:</b> Single room with a
                  king-size bed and a convertible sofa-bed, standard linen (extra blankets
                  may not be available), attached bathroom, hot water facility, electric
                  room heater, pantry with sink, microwave oven, mini refrigerator,
                  flat-screen TV, iron and ironing board, and tea-making facilities. Toilet
                  paper, one towel and a mini soap are provided. Guests must bring
                  additional toiletries.
                </li>
                <li>
                  <b>Privacy Between Two Entities:</b> The Main Bungalow and Lower Garden
                  Suite are operated as two separate entities. Guests are requested to
                  avoid disturbances and respect each other's privacy.
                </li>
                <li>
                  <b>Standard Check-in / Check-out:</b> Check-in at <b>2.00 p.m.</b> and
                  Check-out at <b>12.30 p.m.</b>
                </li>
                <li>
                  <b>Early / Late Check-in & Check-out:</b> Up to six (06) hours may be
                  provided free of charge subject to availability, operational
                  requirements, and minimum two (02) hour preparation window for the
                  Caretaker.
                </li>
                <li>
                  <b>Meal Preparation:</b> Guests must provide required food items and dry
                  rations. The Caretaker will prepare all three meals. Guests are requested
                  to allow sufficient preparation time. This service is not applicable to
                  the Lower Garden Suite.
                </li>
              </ul>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              <b>On Your Arrival</b>
              <ul>
                <li>
                  Present your reservation QR code (digital preferred) to the Caretaker
                  upon arrival.
                </li>
                <li>
                  Outdoor shoes and slippers are strictly not permitted inside the
                  bungalow. Please use the designated shoe racks.
                </li>
                <li>
                  Obtain allocated room keys and keep them in your custody until check-out.
                  Non-allocated rooms will remain locked.
                </li>
              </ul>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              <b>During Your Stay</b>
              <ul>
                <li>
                  <b>Noise & Conduct:</b> Quiet hours are from <b>10.00 p.m. – 8.00 a.m.</b>.
                  Loud music and disruptive behavior are not permitted.
                </li>
                <li>
                  <b>Cleanliness:</b> Maintain cleanliness, dispose waste properly using
                  segregated bins, and clean common areas after use.
                </li>
                <li>Washing plates and cutlery is on a self-service basis.</li>
                <li>
                  <b>Safe Handling:</b> Use all appliances and facilities carefully,
                  especially when used by children.
                </li>
                <li><b>Pets:</b> Pets are not allowed.</li>
                <li>
                  <b>Smoking:</b> Smoking inside the bungalow is strictly prohibited.
                  Allowed only in designated outdoor areas.
                </li>
                <li>
                  <b>Parking:</b> Park vehicles only in designated areas without blocking
                  entrances. Lower Garden Suite has parking for one vehicle only.
                </li>
                <li>
                  <b>Security:</b> Ensure doors and windows are securely locked when leaving
                  the premises.
                </li>
                <li>
                  <b>Drinking Water:</b> Tap water is safe; however bottled or boiled water
                  is recommended.
                </li>
                <li>
                  <b>Waste Disposal:</b> Sanitary napkins and child diapers must be taken
                  back by guests.
                </li>
              </ul>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              <b>Curated Garden & Outdoor Areas</b>
              <ul>
                <li>Help preserve the landscaped garden.</li>
                <li>Do not walk on curated grass; use designated paths only.</li>
                <li>Littering is strictly prohibited.</li>
                <li>
                  Guests may engage in light gardening under Caretaker guidance without
                  disturbing plant layouts.
                </li>
              </ul>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              <b>Lower Garden Suite – Meal & Usage Guidelines</b>
              <ul>
                <li>Microwave is provided for heating food only.</li>
                <li>Cooking meals is not permitted.</li>
                <li>
                  Guests are allocated the lower garden and should not use upper garden
                  facilities.
                </li>
              </ul>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              <b>During Check-out</b>
              <ul>
                <li>Hand over all keys to the Caretaker using QR system.</li>
                <li>
                  Declare damages or missing items via the booking app to avoid penalties.
                </li>
                <li>Online feedback submission is mandatory.</li>
                <li>
                  Report maintenance issues and certify corrective actions where
                  applicable.
                </li>
                <li>
                  Guests are encouraged to record feedback in the Guest Book.
                </li>
              </ul>
            </Typography>

            <Typography variant="body2" sx={{ mt: 2 }}>
              For unresolved issues, please contact the Holiday Bungalow In-Charge
              Executive <b>Mr. Thushara</b> on <b>077 253 3988</b>.
            </Typography>
          </Section>

          {/* Bungalow Rates Section */}
          <Section>
            <SectionTitle variant="subtitle1">Bungalow Rates</SectionTitle>
            <Typography variant="body1" color="text.secondary">
              <p>
                The following per day rates will be charged without meals for
                main bungalow basis:
              </p>
            </Typography>
            <Typography variant="body1" color="#1976d2">
              <p>
                Main Bungalow:
              </p>
            </Typography>
            <Paper elevation={3} sx={{ mt: 2, borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Per day rate Rs.
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      April/ May season (1st April to 15th May)
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 10,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Week Ends (Friday noon to Monday noon) or Mercantile
                      Holidays or Government School Vacations
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 7,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Week Days (Monday noon to Friday noon)
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 5,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      External business client / retired
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 15,000.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Typography sx={{ mt: 4 }} variant="body1" color="#1976d2">
              <p>
                Lower Garden Suite:
              </p>
            </Typography>
            <Paper elevation={3} sx={{ mt: 2, borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Per day rate Rs.
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      April/ May season (1st April to 15th May)
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 3,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Week Ends (Friday noon to Monday noon) or Mercantile
                      Holidays or Government School Vacations
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 3,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Week Days (Monday noon to Friday noon)
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 2,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      External business client / retired
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid #e0e0e0",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      Rs. 5,000.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            
            <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
              <p>
                In case of property damages by users, such cost will be charged to
                executive who reserved the bungalow. It is advisable to check with
                caretakers before using systems.
              </p>
            </Typography>
          </Section>
        </Content>

        <Footer>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              borderRadius: "20px",
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            I Understand
          </Button>
        </Footer>
      </ModalContainer>
    </Modal>
  );
};

export default TermsModal;