import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Chip,
  Paper,
  Avatar,
  CircularProgress,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const GuestDetailsModal = ({
  open,
  onClose,
  guestDetails,
  loadingPriorityList,
  getGradeFromRemarks,
  isCurrentUserReservation,
  currentUserServiceNo,
}) => {
  if (!guestDetails) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
        }
      }}
    >
      <Box
        sx={theme => ({
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: theme.palette.primary.contrastText,
          p: 3,
          position: 'relative',
          overflow: 'hidden'
        })}
      >
        <Box
          sx={theme => ({
            position: 'absolute',
            top: -50,
            right: -50,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.15)'
          })}
        />
        <Box
          sx={theme => ({
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.08)'
          })}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
              Guest Details
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              sx={theme => ({
                color: theme.palette.primary.contrastText,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.25)',
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(255, 255, 255, 0.35)'
                }
              })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<HotelIcon sx={{ fontSize: 16 }} />}
              label={guestDetails?.bungalowType}
              size="small"
              sx={theme => ({
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.25)',
                color: theme.palette.primary.contrastText,
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              })}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, opacity: 0.9 }} />
              <Typography variant="body2" sx={{ opacity: 0.95, fontWeight: 500 }}>
                {guestDetails?.date}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
              <PeopleIcon sx={{ fontSize: 16, opacity: 0.9 }} />
              <Typography variant="body2" sx={{ opacity: 0.95, fontWeight: 500 }}>
                {guestDetails?.totalCount || 0} guests
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {loadingPriorityList ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: 8,
            gap: 3
          }}>
            <Box sx={{ position: 'relative' }}>
              <CircularProgress
                size={60}
                thickness={4}
                sx={theme => ({
                  color: theme.palette.primary.main,
                  animationDuration: '1.5s'
                })}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <PersonIcon sx={theme => ({ fontSize: 24, color: theme.palette.primary.main, opacity: 0.7 })} />
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                Loading Guest Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
                Please wait while we fetch the information
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            {/* Primary Guest Section */}
            {guestDetails?.primaryGuest ? (
              <Paper
                elevation={0}
                sx={theme => ({
                  p: 2.5,
                  mb: 3,
                  background: guestDetails?.primaryGuest?.isCurrentUser
                    ? theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.15) 100%)'
                      : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
                    : guestDetails?.primaryGuest?.grade
                      ? theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, rgba(117, 117, 117, 0.2) 0%, rgba(117, 117, 117, 0.15) 100%)`
                        : `linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)`
                      : theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(120, 120, 120, 0.2) 0%, rgba(100, 100, 100, 0.15) 100%)'
                        : 'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)',
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: guestDetails?.primaryGuest?.isCurrentUser
                    ? '#4caf50'
                    : guestDetails?.primaryGuest?.grade
                      ? '#757575'
                      : '#9e9e9e',
                  position: 'relative',
                  overflow: 'hidden'
                })}
              >
                <Box
                  sx={theme => ({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 60,
                    height: 60,
                    background: guestDetails?.primaryGuest?.isCurrentUser
                      ? 'rgba(76, 175, 80, 0.1)'
                      : guestDetails?.primaryGuest?.grade
                        ? 'rgba(117, 117, 117, 0.1)'
                        : theme.palette.mode === 'dark'
                          ? 'rgba(120, 120, 120, 0.1)'
                          : 'rgba(158, 158, 158, 0.1)',
                    borderBottomLeftRadius: 40
                  })}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Primary Guest
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      Main contact & booking holder
                    </Typography>
                  </Box>
                  {guestDetails?.primaryGuest?.grade && (
                    <Chip
                      icon={<WorkspacePremiumIcon sx={{ fontSize: 14 }} />}
                      label={guestDetails?.primaryGuest?.isCurrentUser
                        ? `Grade ${guestDetails.primaryGuest.grade}`
                        : `Grade ${guestDetails.primaryGuest.grade}`}
                      size="small"
                      sx={theme => ({
                        ml: 'auto',
                        bgcolor: guestDetails?.primaryGuest?.isCurrentUser
                          ? '#e8f5e9'
                          : '#f5f5f5',
                        color: guestDetails?.primaryGuest?.isCurrentUser
                          ? '#2E7D32'
                          : '#757575',
                        fontWeight: 700,
                        border: '1px solid',
                        borderColor: guestDetails?.primaryGuest?.isCurrentUser
                          ? '#4caf50'
                          : '#757575',
                        fontSize: '0.75rem',
                        height: 26
                      })}
                    />
                  )}
                  {!guestDetails?.primaryGuest?.grade && !guestDetails?.primaryGuest?.isCurrentUser && (
                    <Chip
                      label="Pending Reservation"
                      size="small"
                      sx={theme => ({
                        ml: 'auto',
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : '#f5f5f5',
                        color: theme.palette.mode === 'dark' ? 'grey.300' : '#757575',
                        fontWeight: 500,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'grey.700' : '#bdbdbd',
                        fontSize: '0.75rem',
                        height: 26
                      })}
                    />
                  )}
                </Box>

                <Box sx={theme => ({
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: guestDetails?.primaryGuest?.isCurrentUser
                    ? '#e8f5e9'
                    : guestDetails?.primaryGuest?.grade
                      ? '#f5f5f5'
                      : '#f5f5f5',
                  p: 2,
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: guestDetails?.primaryGuest?.isCurrentUser
                    ? '#4caf50'
                    : guestDetails?.primaryGuest?.grade
                      ? '#757575'
                      : '#9e9e9e',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                    : '0 2px 8px rgba(0, 0, 0, 0.08)'
                })}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{
                      fontWeight: 600,
                      color: guestDetails?.primaryGuest?.isCurrentUser
                        ? '#2E7D32'
                        : guestDetails?.primaryGuest?.grade
                          ? '#757575'
                          : 'text.primary',
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      {guestDetails?.primaryGuest?.isCurrentUser ? (
                        <PersonIcon sx={{
                          color: '#4CAF50',
                          fontSize: 20
                        }} />
                      ) : guestDetails?.primaryGuest?.grade ? (
                        <WorkspacePremiumIcon sx={{
                          color: '#757575',
                          fontSize: 20
                        }} />
                      ) : (
                        <ScheduleIcon sx={{
                          color: '#757575',
                          fontSize: 20
                        }} />
                      )}
                      {guestDetails.primaryGuest.name}
                    </Typography>
                    <Typography variant="caption" sx={{
                      color: guestDetails?.primaryGuest?.isCurrentUser
                        ? '#2E7D32'
                        : guestDetails?.primaryGuest?.grade
                          ? '#757575'
                          : 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5
                    }}>
                      <ScheduleIcon sx={{ fontSize: 12 }} />
                      Priority: {guestDetails.primaryGuest.priority}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ) : (
              <Paper
                elevation={0}
                sx={theme => ({
                  p: 2.5,
                  mb: 3,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.5)'
                    : '#f8fafc',
                  borderRadius: 2.5,
                  border: '1px dashed',
                  borderColor: theme.palette.divider,
                  textAlign: 'center'
                })}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  No primary guest found for this date
                </Typography>
              </Paper>
            )}

            {/* Additional Guests Section */}
            <Paper
              elevation={0}
              sx={theme => ({
                p: 2.5,
                border: '1px solid',
                borderColor: theme.palette.divider,
                borderRadius: 2.5,
                background: theme.palette.background.paper
              })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <GroupIcon />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Additional Guests
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Waiting list
                  </Typography>
                </Box>
                <Chip
                  label={`${guestDetails?.additionalGuests?.length || 0} guests`}
                  size="small"
                  sx={{
                    bgcolor: '#f0fdf4',
                    color: '#059669',
                    fontWeight: 700,
                    border: '1px solid #a7f3d0',
                    fontSize: '0.75rem',
                    height: 28
                  }}
                />
              </Box>

              {guestDetails?.additionalGuests &&
                guestDetails.additionalGuests.length > 0 ? (
                <Box sx={{ maxHeight: 320, overflow: 'auto', pr: 1 }}>
                  {guestDetails.additionalGuests.map((guest, index) => {
                    const isCurrentGuest = guestDetails.currentGuest &&
                      guestDetails.currentGuest.reservationNo === guest.Res_no;
                    const isCurrentUserGuest = guest.isCurrentUser || false;
                    const gradeColor = guest.grade ? '#757575' : '#757575';
                    const gradeBgColor = guest.grade ? '#f5f5f5' : '#f5f5f5';

                    return (
                      <Box
                        key={index}
                        sx={theme => ({
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          mb: 1.5,
                          borderRadius: 2,
                          background: isCurrentUserGuest
                            ? theme.palette.mode === 'dark'
                              ? 'rgba(76, 175, 80, 0.3)'
                              : '#e8f5e9'
                            : isCurrentGuest
                              ? theme.palette.mode === 'dark'
                                ? 'rgba(59, 130, 246, 0.2)'
                                : '#dbeafe'
                              : gradeBgColor,
                          border: '2px solid',
                          borderColor: isCurrentUserGuest
                            ? '#4CAF50'
                            : isCurrentGuest
                              ? theme.palette.primary.main
                              : '#757575',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 4px 12px rgba(0,0,0,0.3)'
                              : '0 4px 12px rgba(0,0,0,0.05)',
                            borderColor: isCurrentUserGuest
                              ? '#45a049'
                              : isCurrentGuest
                                ? theme.palette.primary.dark
                                : '#616161'
                          }
                        })}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <Avatar
                            sx={{
                              width: 42,
                              height: 42,
                              bgcolor: isCurrentUserGuest ? '#4CAF50' : (guest.grade ? '#757575' : '#757575'),
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              border: '2px solid',
                              borderColor: 'background.paper',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                          >
                            {isCurrentUserGuest ? (
                              <PersonIcon sx={{ fontSize: 20 }} />
                            ) : guest.grade ? (
                              guest.grade
                            ) : (
                              'P'
                            )}
                          </Avatar>

                          {isCurrentUserGuest && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: '#FF9800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid',
                                borderColor: 'background.paper'
                              }}
                            >
                              <PersonIcon sx={{ fontSize: 10, color: 'white' }} />
                            </Box>
                          )}
                          {index === 0 && !isCurrentGuest && !isCurrentUserGuest && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: '#10b981',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid',
                                borderColor: 'background.paper'
                              }}
                            >
                              <PriorityHighIcon sx={{ fontSize: 10, color: 'white' }} />
                            </Box>
                          )}
                        </Box>

                        <Box sx={{ ml: 1.5, flex: 1 }}>
                          <Typography variant="body1" sx={{
                            fontWeight: 600,
                            color: isCurrentUserGuest ? '#2E7D32' : (isCurrentGuest ? 'primary.main' : (guest.grade ? '#757575' : 'text.primary')),
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}>
                            {isCurrentUserGuest ? (
                              <PersonIcon sx={{
                                fontSize: 16,
                                color: '#4CAF50'
                              }} />
                            ) : guest.grade ? (
                              <WorkspacePremiumIcon sx={{
                                fontSize: 16,
                                color: isCurrentGuest ? theme => theme.palette.primary.main : '#757575'
                              }} />
                            ) : (
                              <ScheduleIcon sx={{
                                fontSize: 16,
                                color: isCurrentGuest ? theme => theme.palette.primary.main : '#757575'
                              }} />
                            )}
                            {guest.displayName}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                            <Typography variant="caption" sx={{
                              color: isCurrentUserGuest ? '#2E7D32' : 'text.secondary',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}>
                              <ScheduleIcon sx={{ fontSize: 12 }} />
                              Priority {guest.Res_Priority}
                            </Typography>
                            {index === 0 && !isCurrentGuest && !isCurrentUserGuest && (
                              <Typography variant="caption" sx={{
                                color: '#059669',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                              }}>
                                <ArrowUpwardIcon sx={{ fontSize: 12 }} />
                                Next
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <Box sx={{
                  textAlign: 'center',
                  py: 5,
                  px: 2
                }}>
                  <Box
                    sx={theme => ({
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2.5
                    })}
                  >
                    <GroupIcon sx={theme => ({ fontSize: 36, color: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.400', opacity: 0.5 })} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                    No Additional Guests
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 280, mx: 'auto', lineHeight: 1.6 }}>
                    Only the primary guest is booked for this date.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={theme => ({
        px: 3,
        pb: 3,
        pt: 2,
        borderTop: '1px solid',
        borderColor: theme.palette.divider
      })}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={theme => ({
            borderRadius: 2,
            px: 4,
            py: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 14px rgba(25, 118, 210, 0.4)'
              : '0 4px 14px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              boxShadow: theme.palette.mode === 'dark'
                ? '0 6px 20px rgba(25, 118, 210, 0.5)'
                : '0 6px 20px rgba(25, 118, 210, 0.4)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease'
          })}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestDetailsModal;