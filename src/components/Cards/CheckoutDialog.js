import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Divider,
  Button,
  CircularProgress,
  Fade,
  Slide
} from '@mui/material';
import {
  ExitToApp as ExitToAppIcon,
  Close as CloseIcon,
  Comment as CommentIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  VerifiedUser as VerifiedUserIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const CheckoutDialog = ({
  open,
  onClose,
  reservationNo,
  checkoutFeedbackType,
  setCheckoutFeedbackType,
  checkoutComment,
  setCheckoutComment,
  validationError,
  setValidationError,
  isSubmitting,
  handleCheckoutSubmit,
  theme,
  isMobile
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setValidationError('');
      }}
      maxWidth="sm"
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
      <DialogTitle sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        py: 2.5,
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
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, position: 'relative', zIndex: 1 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            <ExitToAppIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Guest Checkout
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Complete reservation checkout process
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton 
            onClick={() => {
              onClose();
              setValidationError('');
            }} 
            sx={{ 
              color: 'white',
              position: 'relative',
              zIndex: 1,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      
      {/* Content */}
      <DialogContent sx={{ p: 0, bgcolor: '#fafafa' }}>
        <Box sx={{ p: isMobile ? 2 : 3 }}>
          {/* Reservation Info Card */}
          <Card sx={{ 
            mb: 3, 
            bgcolor: 'white', 
            borderRadius: 3, 
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.info.main, 
                  width: 48, 
                  height: 48 
                }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Reservation #{reservationNo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ready for checkout process
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Validation Error */}
          {validationError && (
            <Fade in={!!validationError}>
              <Card sx={{ 
                mb: 3, 
                bgcolor: '#ffebee', 
                borderLeft: '4px solid #f44336', 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(244,67,54,0.15)'
              }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                  <ErrorIcon color="error" />
                  <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                    {validationError}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          )}

          {/* Condition Assessment Card */}
          <Card sx={{ 
            bgcolor: 'white', 
            borderRadius: 3, 
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: `2px solid ${theme.palette.primary.main}`,
            overflow: 'hidden'
          }}>
            {/* Card Header */}
            <Box sx={{ 
              bgcolor: `${theme.palette.primary.main}15`,
              p: 2.5,
              borderBottom: `1px solid ${theme.palette.primary.main}30`
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  width: 32, 
                  height: 32 
                }}>
                  <CommentIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.primary.dark,
                    mb: 0.5
                  }}>
                    Bungalow Condition Assessment
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please evaluate the current condition of the bungalow
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <CardContent sx={{ p: 3 }}>
              {/* Condition Selection */}
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormLabel 
                  component="legend" 
                  sx={{ 
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 2,
                    '&.Mui-focused': {
                      color: 'text.primary'
                    }
                  }}
                >
                  How is the bungalow condition after checkout?
                </FormLabel>
                
                <RadioGroup
                  value={checkoutFeedbackType}
                  onChange={(e) => {
                    setCheckoutFeedbackType(e.target.value);
                    setValidationError('');
                  }}
                  sx={{ gap: 1 }}
                >
                  {/* Good Condition Option */}
                  <Card sx={{ 
                    border: checkoutFeedbackType === 'good' ? `2px solid ${theme.palette.success.main}` : '2px solid transparent',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    bgcolor: checkoutFeedbackType === 'good' ? '#e8f5e8' : 'grey.50',
                    '&:hover': {
                      bgcolor: checkoutFeedbackType === 'good' ? '#e8f5e8' : 'grey.100',
                      cursor: 'pointer'
                    }
                  }}>
                    <CardContent sx={{ py: 2, px: 2.5 }}>
                      <FormControlLabel 
                        value="good" 
                        control={<Radio sx={{ color: theme.palette.success.main }} />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 0.5 }}>
                            <Avatar sx={{ 
                              bgcolor: theme.palette.success.main, 
                              width: 28, 
                              height: 28 
                            }}>
                              <ThumbUpIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Excellent Condition
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Bungalow is clean and ready for the next guest
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ margin: 0, width: '100%' }}
                      />
                    </CardContent>
                  </Card>

                  {/* Issues Option */}
                  <Card sx={{ 
                    border: checkoutFeedbackType === 'bad' ? `2px solid ${theme.palette.error.main}` : '2px solid transparent',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    bgcolor: checkoutFeedbackType === 'bad' ? '#ffebee' : 'grey.50',
                    '&:hover': {
                      bgcolor: checkoutFeedbackType === 'bad' ? '#ffebee' : 'grey.100',
                      cursor: 'pointer'
                    }
                  }}>
                    <CardContent sx={{ py: 2, px: 2.5 }}>
                      <FormControlLabel 
                        value="bad" 
                        control={<Radio sx={{ color: theme.palette.error.main }} />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 0.5 }}>
                            <Avatar sx={{ 
                              bgcolor: theme.palette.error.main, 
                              width: 28, 
                              height: 28 
                            }}>
                              <ThumbDownIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Issues Found
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Problems detected that need attention
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ margin: 0, width: '100%' }}
                      />
                    </CardContent>
                  </Card>
                </RadioGroup>
              </FormControl>
              
              {/* Issues Detail Section */}
              {checkoutFeedbackType === "bad" && (
                <Fade in={checkoutFeedbackType === "bad"} timeout={300}>
                  <Box sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Box sx={{ 
                      bgcolor: '#fff3e0', 
                      borderRadius: 2, 
                      p: 2.5, 
                      mb: 3,
                      border: '1px solid #ffb74d'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <WarningIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                          Detailed Report Required
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Please provide comprehensive details about the bungalow condition, cleanliness issues, 
                        damage, or maintenance requirements to help our team address these concerns effectively.
                      </Typography>
                    </Box>
                    
                    <TextField
                      fullWidth
                      label="Describe Issues & Required Actions"
                      multiline
                      rows={5}
                      value={checkoutComment}
                      onChange={(e) => {
                        setCheckoutComment(e.target.value);
                        setValidationError('');
                      }}
                      placeholder="Please specify: damaged items, cleanliness issues, maintenance needs, broken fixtures, stains, etc. Be as detailed as possible to help our maintenance team."
                      variant="outlined"
                      required
                      error={!!validationError}
                      helperText={
                        validationError 
                          ? validationError 
                          : `${checkoutComment.length}/500 characters remaining`
                      }
                      inputProps={{ maxLength: 500 }}
                      sx={{ 
                        '& .MuiInputBase-root': {
                          bgcolor: 'white',
                          borderRadius: 2,
                          '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                            }
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main
                        }
                      }}
                    />
                  </Box>
                </Fade>
              )}
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
      
      {/* Footer */}
      <DialogActions sx={{ 
        p: 3, 
        bgcolor: 'white',
        borderTop: '1px solid #f0f0f0',
        gap: 2
      }}>
        <Button
          onClick={() => {
            onClose();
            setValidationError('');
          }}
          disabled={isSubmitting}
          variant="outlined"
          sx={{ 
            borderRadius: 3, 
            minWidth: 120, 
            textTransform: 'none',
            fontWeight: 500,
            py: 1.2
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCheckoutSubmit}
          disabled={isSubmitting}
          startIcon={isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <VerifiedUserIcon />
          )}
          sx={{ 
            borderRadius: 3, 
            minWidth: 180, 
            textTransform: 'none',
            fontWeight: 600,
            py: 1.2,
            px: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
            },
            '&.Mui-disabled': { 
              backgroundColor: theme.palette.action.disabledBackground,
              transform: 'none',
              boxShadow: 'none'
            }
          }}
        >
          {isSubmitting 
            ? "Processing Checkout..." 
            : checkoutFeedbackType === "good"
              ? "Complete Checkout"
              : "Submit Issues Report"
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutDialog;