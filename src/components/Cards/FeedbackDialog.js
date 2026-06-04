import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  IconButton,
  Divider,
  Avatar,
  Stack,
  Badge,
  Fade,
  Slide,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  Comment as CommentIcon,
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon
} from "@mui/icons-material";

const bungalowTypeMap = {
  "1": "Main Bungalow",
  "2": "Family Bungalow",
};

const FeedbackDialog = ({
  open,
  onClose,
  reservationNo,
  data,
  feedbackData,
  feedbackLoadingById,
  feedbackErrorById,
  onCheckout,
  isMobile,
  theme,
  language,
  t
}) => {
  const muiTheme = useTheme();
  const isSmallMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const reservation = data?.find(item => item.Res_no === reservationNo);

  const canUpdateStatus = (reservation) => {
    const disallowedStatuses = ["Check Out", "O", "Completed", "Closed"];
    return !disallowedStatuses.includes(reservation.Res_CheckStatus);
  };

  const canCheckout = reservation && canUpdateStatus(reservation);

  // Helper function to get bungalow name
  const getBungalowName = (bungalowId) => {
    if (bungalowId === "1") return t('mainBungalow');
    if (bungalowId === "2") return t('lowerGardenSuite');
    return `${t('bungalow')} ${bungalowId}`;
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'B':
        return {
          label: t('badCondition'),
          color: 'error',
          icon: <ThumbDownIcon sx={{ fontSize: isMobile ? 14 : 16 }} />,
          bgColor: '#ffebee'
        };
      case 'A':
        return {
          label: t('agreed'),
          color: 'success',
          icon: <ThumbUpIcon sx={{ fontSize: isMobile ? 14 : 16 }} />,
          bgColor: '#e8f5e8'
        };
      default:
        return {
          label: t('pending'),
          color: 'default',
          icon: <InfoIcon sx={{ fontSize: isMobile ? 14 : 16 }} />,
          bgColor: '#f5f5f5'
        };
    }
  };

  const FeedbackCard = ({ feedback, index }) => {
    const statusConfig = getStatusConfig(feedback.Feed_CareTStatus);

    return (
      <Fade in={true} timeout={300 * (index + 1)}>
        <Card
          sx={{
            mb: isMobile ? 1.5 : 2,
            borderRadius: isMobile ? 2 : 3,
            boxShadow: isMobile ? '0 1px 6px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: isMobile ? 'none' : 'translateY(-2px)',
              boxShadow: isMobile ? '0 1px 6px rgba(0,0,0,0.06)' : '0 8px 24px rgba(0,0,0,0.12)'
            }
          }}
        >
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            {/* Header */}
            <Box sx={{
              display: 'flex',
              flexDirection: isSmallMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isSmallMobile ? 'flex-start' : 'center',
              mb: 2,
              gap: isSmallMobile ? 1 : 0
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}
                >
                  #{feedback.Feed_Id}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{
                    fontWeight: 600,
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}>
                    {t('feedback')} #{feedback.Feed_Id}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <HomeIcon sx={{ fontSize: isMobile ? 14 : 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      {getBungalowName(feedback.Feed_Banglowid)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Chip
                icon={statusConfig.icon}
                label={statusConfig.label}
                color={statusConfig.color}
                size={isMobile ? "small" : "medium"}
                sx={{
                  fontWeight: 500,
                  px: 1,
                  mt: isSmallMobile ? 0.5 : 0,
                  '& .MuiChip-icon': {
                    ml: 0.5
                  }
                }}
              />
            </Box>

            <Divider sx={{ my: isMobile ? 1.5 : 2 }} />

            {/* Content */}
            <Stack spacing={isMobile ? 2 : 2.5}>
              {/* Guest Report */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <PersonIcon sx={{ fontSize: isMobile ? 16 : 18, color: theme.palette.primary.main }} />
                  <Typography variant="subtitle2" sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}>
                    {t('guestFeedback')}
                  </Typography>
                </Box>
                <Box sx={{
                  bgcolor: '#f8f9fa',
                  borderRadius: isMobile ? 1.5 : 2,
                  p: isMobile ? 1.5 : 2,
                  borderLeft: `4px solid ${theme.palette.primary.main}`
                }}>
                  <Typography variant="body2" sx={{
                    lineHeight: 1.6,
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}>
                   {feedback.Feed_Report || t('noGuestFeedback')}
                  </Typography>
                </Box>
              </Box>

              {/* Caregiver Report */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AssignmentIcon sx={{ fontSize: isMobile ? 16 : 18, color: theme.palette.secondary.main }} />
                  <Typography variant="subtitle2" sx={{
                    fontWeight: 600,
                    color: theme.palette.secondary.main,
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}>
                   {feedback.Feed_CareTReport || t('caregiverResponse')}
                  </Typography>
                </Box>
                <Box sx={{
                  bgcolor: statusConfig.bgColor,
                  borderRadius: isMobile ? 1.5 : 2,
                  p: isMobile ? 1.5 : 2,
                  borderLeft: `4px solid ${statusConfig.color === 'error' ? theme.palette.error.main :
                    statusConfig.color === 'success' ? theme.palette.success.main : theme.palette.grey[400]}`
                }}>
                  <Typography variant="body2" sx={{
                    lineHeight: 1.6,
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}>
                    {feedback.Feed_CareTReport || t('noCaregiverResponse')}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Fade>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? 0 : 4,
          maxHeight: '90vh'
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: isMobile ? 2 : 2.5,
          pr: isMobile ? 1 : 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 1 : 1.5,
          position: 'relative',
          zIndex: 1,
          maxWidth: isMobile ? '80%' : '100%'
        }}>
          <Avatar sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40
          }}>
            <CommentIcon fontSize={isMobile ? "small" : "medium"} />
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{
              fontWeight: 600,
              mb: 0.5,
              lineHeight: 1.2
            }}>
              {t('guestFeedbackTitle')}
            </Typography>
            <Typography variant="body2" sx={{
              opacity: 0.9,
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }}>
              {t('reservation')} #{reservationNo}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            position: 'relative',
            zIndex: 1,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            p: isMobile ? 0.5 : 1
          }}
          size={isMobile ? "small" : "medium"}
        >
          <CloseIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{
        p: 0,
        bgcolor: '#fafafa',
        overflow: 'hidden'
      }}>
        <Box sx={{ p: isMobile ? 1.5 : 3 }}>
          {feedbackLoadingById[reservationNo] ? (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: isMobile ? 4 : 6,
              gap: 2
            }}>
              <CircularProgress size={isMobile ? 36 : 48} thickness={4} />
              <Typography variant="body1" color="text.secondary" sx={{
                fontWeight: 500,
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}>
                {t('loadingFeedback')}
              </Typography>
            </Box>
          ) : feedbackErrorById[reservationNo] ? (
            <Card sx={{
              bgcolor: '#ffebee',
              borderLeft: '4px solid #f44336',
              borderRadius: isMobile ? 1.5 : 2
            }}>
              <CardContent sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: isMobile ? 2 : 3
              }}>
                <ErrorIcon color="error" fontSize={isMobile ? "small" : "medium"} />
                <Box>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} color="error" gutterBottom>
                    {t('errorLoading')}
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                    {feedbackErrorById[reservationNo]}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : feedbackData[reservationNo]?.length > 0 ? (
            <Box>
              {/* Stats Header */}
              <Card sx={{
                mb: isMobile ? 2 : 3,
                bgcolor: 'white',
                borderRadius: isMobile ? 2 : 3,
                boxShadow: isMobile ? '0 1px 6px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: isSmallMobile ? 'column' : 'row',
                    alignItems: isSmallMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    gap: isSmallMobile ? 2 : 0
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Badge badgeContent={feedbackData[reservationNo].length} color="primary">
                        <StarIcon sx={{
                          fontSize: isMobile ? 24 : 28,
                          color: theme.palette.primary.main
                        }} />
                      </Badge>
                      <Box>
                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
                          {t('totalFeedbackEntries')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                          fontSize: isMobile ? '0.75rem' : '0.875rem'
                        }}>
                          {t('reviewExperience')}
                        </Typography>
                      </Box>
                    </Box>
                    {canCheckout && (
                      <Button
                        variant="contained"
                        onClick={onCheckout}
                        startIcon={<ExitToAppIcon />}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 3,
                          px: isMobile ? 2 : 3,
                          py: isMobile ? 0.75 : 1.2,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          '&:hover': {
                            transform: isMobile ? 'none' : 'translateY(-1px)',
                            boxShadow: isMobile ? '0 4px 12px rgba(0,0,0,0.15)' : '0 6px 16px rgba(0,0,0,0.2)'
                          },
                          minWidth: isSmallMobile ? '100%' : 'auto',
                          mt: isSmallMobile ? 1 : 0
                        }}
                      >
                        {t('checkOutGuest')}
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>

              {/* Feedback Cards */}
              <Box sx={{
                maxHeight: isMobile ? 'calc(100vh - 280px)' : '60vh',
                overflowY: 'auto',
                pr: isMobile ? 0 : 1,
                WebkitOverflowScrolling: 'touch'
              }}>
                {feedbackData[reservationNo].map((feedback, index) => (
                  <FeedbackCard key={index} feedback={feedback} index={index} />
                ))}
              </Box>
            </Box>
          ) : (
            <Card sx={{
              textAlign: 'center',
              bgcolor: 'white',
              borderRadius: isMobile ? 2 : 3,
              boxShadow: isMobile ? '0 1px 6px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.08)'
            }}>
              <CardContent sx={{ p: isMobile ? 3 : 4 }}>
                <InfoIcon sx={{
                  fontSize: isMobile ? 36 : 48,
                  color: theme.palette.info.main,
                  mb: 2
                }} />
                <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ fontWeight: 600 }}>
                  {t('noFeedbackAvailable')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  mb: 3,
                  maxWidth: 400,
                  mx: 'auto',
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}>
                  {t('noFeedbackDescription')}
                </Typography>
                {canCheckout && (
                  <Button
                    variant="contained"
                    onClick={onCheckout}
                    startIcon={<ExitToAppIcon />}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 3,
                      px: isMobile ? 2 : 3,
                      py: isMobile ? 0.75 : 1.2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    {t('checkOutGuest')}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </DialogContent>

      {/* Footer */}
      <DialogActions sx={{
        p: isMobile ? 2 : 3,
        bgcolor: 'white',
        borderTop: '1px solid #f0f0f0'
      }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          sx={{
            borderRadius: 3,
            px: 3,
            py: isMobile ? 0.5 : 1,
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100
          }}
        >
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;