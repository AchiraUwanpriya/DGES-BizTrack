import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Fade,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Container
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { KpiCard } from "../../components/Charts/KpiCard";
import { DivisionBreakdown } from "../../components/Charts/DivisionBreakdown";
import { TraineesOverview } from "../../components/Charts/TraineesOverview";
import WeeklyAttendanceTrend from "../../components/Charts/WeeklyAttendanceTrend";
import { EmployeeTypeChart } from "../../components/Charts/EmployeeTypeChart";
import { CDPLCBreakdown } from "../../components/Charts/CDPLCBreakdown";
import QuickAccessSection from "../../components/Cards/QuickAccessSection";
import {
  GetCdlBasedDivison,
  GetTraineeBasedTypes,
  GetTraineeDivisionAttendance,
  GetAllStrength,
  GetAllAttendance,
  GetCDLWeekAttendance,
} from "../../action/Attendance";
import { EmployeeStrengthAttendanceChart } from "../../components/Charts/EmployeeStrengthAttendanceChart";

// ─── KPI Card Skeleton ────────────────────────────────────────────────────────
const KpiCardSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)",
        borderRadius: "20px",
        padding: isMobile ? "16px" : "24px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 4px 24px rgba(0,74,173,0.06)",
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s infinite",
          borderRadius: "20px",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: isMobile ? 1.5 : 2.5 }}>
        <Box
          sx={{
            width: isMobile ? "40%" : "45%",
            height: isMobile ? 10 : 13,
            backgroundColor: "rgba(0,74,173,0.12)",
            borderRadius: "6px",
          }}
        />
        <Box
          sx={{
            width: isMobile ? 30 : 38,
            height: isMobile ? 30 : 38,
            backgroundColor: "rgba(0,74,173,0.1)",
            borderRadius: "10px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: isMobile ? "50%" : "55%",
          height: isMobile ? 24 : 34,
          backgroundColor: "rgba(0,74,173,0.14)",
          borderRadius: "8px",
          mb: isMobile ? 1 : 1.5,
        }}
      />
      <Box
        sx={{
          width: isMobile ? "30%" : "35%",
          height: isMobile ? 9 : 11,
          backgroundColor: "rgba(0,74,173,0.08)",
          borderRadius: "6px",
        }}
      />
    </Box>
  );
};

// ─── Chart Skeleton ───────────────────────────────────────────────────────────
const ChartSkeleton = ({ height = 300 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #f7f9ff 0%, #eef2ff 100%)",
        borderRadius: "20px",
        padding: isMobile ? "16px" : "24px",
        height: isMobile ? height * 0.8 : height,
        overflow: "hidden",
        border: "1px solid rgba(0,74,173,0.06)",
        boxShadow: "0 4px 24px rgba(0,74,173,0.05)",
        "@keyframes shimmer2": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer2 1.8s infinite",
          borderRadius: "20px",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: isMobile ? 2 : 3 }}>
        <Box
          sx={{
            width: isMobile ? "35%" : "28%",
            height: isMobile ? 16 : 20,
            backgroundColor: "rgba(0,74,173,0.1)",
            borderRadius: "6px",
          }}
        />
        <Box
          sx={{
            width: isMobile ? "20%" : "16%",
            height: isMobile ? 16 : 20,
            backgroundColor: "rgba(0,74,173,0.07)",
            borderRadius: "6px",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: isMobile ? 0.8 : 1.5, height: "70%" }}>
        {[65, 80, 50, 90, 70, 85, 60].map((h, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: `${h}%`,
              backgroundColor: "rgba(0,74,173,0.08)",
              borderRadius: "6px 6px 0 0",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// ─── Navigation Drawer Component ───────────────────────────────────────────────
const NavigationDrawer = ({ open, onClose, activeTab, onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { 
      id: 0, 
      label: 'HR Dashboard', 
      icon: <PeopleAltIcon />, 
      color: '#004AAD',
      description: 'Employee attendance and performance metrics'
    },
    { 
      id: 1, 
      label: 'Financial Dashboard', 
      icon: <AccountBalanceIcon />, 
      color: '#10b981',
      description: 'Budget tracking and fiscal overview'
    },
    { 
      id: 2, 
      label: 'Sales Performance', 
      icon: <TrendingUp />, 
      color: '#f59e0b',
      description: 'Sales metrics and targets',
      disabled: true
    },
    { 
      id: 3, 
      label: 'Customer Support', 
      icon: <Users />, 
      color: '#8b5cf6',
      description: 'Support ticket analytics',
      disabled: true
    },
    { 
      id: 4, 
      label: 'Overview', 
      icon: <DashboardIcon />, 
      color: '#ef4444',
      description: 'High-level business overview',
      disabled: true
    },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '85%' : 320,
          maxWidth: 320,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          background: 'linear-gradient(135deg, #ffffff 0%, #fafcff 100%)',
          boxShadow: '8px 0 32px rgba(0,74,173,0.12)',
        }
      }}
    >
      <Box sx={{ p: isMobile ? 2 : 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: isMobile ? 2 : 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DashboardIcon sx={{ color: 'white', fontSize: isMobile ? 16 : 18 }} />
            </Box>
            <Typography
              sx={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dashboards
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: isMobile ? 1.5 : 2, borderColor: 'rgba(0,74,173,0.08)' }} />

        {/* Menu Items */}
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleTabClick(item.id)}
                disabled={item.disabled}
                selected={activeTab === item.id}
                sx={{
                  borderRadius: '12px',
                  py: isMobile ? 1 : 1.5,
                  px: isMobile ? 1.5 : 2,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    backgroundColor: `${item.color}12`,
                    '&:hover': {
                      backgroundColor: `${item.color}20`,
                    },
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                    },
                    '& .MuiListItemText-primary': {
                      color: item.color,
                      fontWeight: 600,
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0,74,173,0.04)',
                    transform: 'translateX(4px)',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isMobile ? 32 : 40,
                    color: activeTab === item.id ? item.color : '#64748b',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {React.cloneElement(item.icon, { 
                    fontSize: isMobile ? 'small' : 'medium' 
                  })}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={!isMobile ? item.description : null}
                  primaryTypographyProps={{
                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                    fontWeight: activeTab === item.id ? 600 : 500,
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem',
                    sx: { color: 'text.secondary', mt: 0.5 }
                  }}
                />
                {item.disabled && !isMobile && (
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.04)',
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      color: 'text.secondary',
                      fontSize: '0.7rem'
                    }}
                  >
                    Coming Soon
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: isMobile ? 1.5 : 2, borderColor: 'rgba(0,74,173,0.08)' }} />

        {/* Footer Info */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'block',
              textAlign: 'center',
              fontSize: isMobile ? '0.65rem' : '0.75rem'
            }}
          >
            © 2024 Dashboard v2.0
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

// ─── Improved KpiCard Component (if not already in your KpiCard.js) ───────────
// Note: This is the updated KpiCard component - replace this in your KpiCard.js file
const ImprovedKpiCard = ({ 
  label, 
  target, 
  icon: Icon, 
  sparkColor, 
  delay, 
  suffix = "" 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:360px)');
  
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffffff 0%, #fafcff 100%)",
        borderRadius: "20px",
        padding: isSmallMobile ? "12px" : (isMobile ? "16px" : "24px"),
        boxShadow: "0 4px 24px rgba(0,74,173,0.08)",
        border: "1px solid rgba(0,74,173,0.06)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: !isMobile ? "translateY(-4px)" : "none",
          boxShadow: !isMobile ? "0 12px 32px rgba(0,74,173,0.12)" : "0 4px 24px rgba(0,74,173,0.08)",
        },
      }}
    >
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start",
        mb: isSmallMobile ? 1 : (isMobile ? 1.5 : 2.5) 
      }}>
        <Typography
          sx={{
            fontSize: isSmallMobile ? "10px" : (isMobile ? "12px" : "14px"),
            fontWeight: 600,
            color: "#64748b",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            width: isSmallMobile ? 28 : (isMobile ? 32 : 38),
            height: isSmallMobile ? 28 : (isMobile ? 32 : 38),
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${sparkColor}12`,
            color: sparkColor,
          }}
        >
          <Icon size={isSmallMobile ? 14 : (isMobile ? 16 : 20)} />
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: isSmallMobile ? "20px" : (isMobile ? "24px" : "32px"),
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.2,
          mb: isSmallMobile ? 0.3 : (isMobile ? 0.5 : 1),
        }}
      >
        {typeof target === 'number' ? target.toLocaleString() : target || 0}
        {suffix && (
          <span style={{ 
            fontSize: isSmallMobile ? '12px' : (isMobile ? '14px' : '18px'), 
            marginLeft: '2px',
            fontWeight: 500
          }}>
            {suffix}
          </span>
        )}
      </Typography>

      {!isSmallMobile && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: isMobile ? 40 : 60,
              height: "4px",
              backgroundColor: "#e2e8f0",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "70%",
                height: "100%",
                backgroundColor: sparkColor,
                borderRadius: "2px",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: isMobile ? "10px" : "12px",
              color: "#94a3b8",
            }}
          >
            vs last period
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// ─── KPI Cards Grid ───────────────────────────────────────────────────────────
const KpiCardsGrid = ({
  loadingStates,
  kpiAttendance,
  kpiActualStrength,
  kpiEligiblePercentage,
  kpiActualPercentage,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:360px)');
  const isMediumMobile = useMediaQuery('(min-width:361px) and (max-width:480px)');

  const cards = [
    {
      label: "Total Attendance",
      target: kpiAttendance,
      icon: UserCheck,
      sparkColor: "#8b5cf6",
      accent: "rgba(139,92,246,0.12)",
      accentSolid: "#8b5cf6",
      delay: 1,
      suffix: undefined,
    },
    {
      label: "Actual Strength",
      target: kpiActualStrength,
      icon: Users,
      sparkColor: "#004AAD",
      accent: "rgba(0,74,173,0.12)",
      accentSolid: "#004AAD",
      delay: 0,
      suffix: undefined,
    },
    {
      label: "Eligible Percentage",
      target: kpiEligiblePercentage,
      icon: Clock,
      sparkColor: "#f43f5e",
      accent: "rgba(244,63,94,0.12)",
      accentSolid: "#f43f5e",
      delay: 2,
      suffix: "%",
    },
    {
      label: "Actual Percentage",
      target: kpiActualPercentage,
      icon: TrendingUp,
      sparkColor: "#06b6d4",
      accent: "rgba(6,182,212,0.12)",
      accentSolid: "#06b6d4",
      delay: 3,
      suffix: "%",
    },
  ];

  // Option 1: Responsive grid layout (recommended for better readability)
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: isSmallMobile ? "1fr" : "repeat(2, 1fr)", // 1 col on very small, 2 cols on small
          sm: "repeat(2, 1fr)", // 2 cols on small tablets
          md: "repeat(4, 1fr)", // 4 cols on desktop
        },
        gap: {
          xs: isSmallMobile ? "8px" : "10px",
          sm: "12px",
          md: "16px",
          lg: "20px",
        },
        marginBottom: "20px",
      }}
    >
      {cards.map((card, index) =>
        loadingStates.allAttendance ? (
          <KpiCardSkeleton key={index} />
        ) : (
          <ImprovedKpiCard
            key={index}
            label={card.label}
            target={card.target}
            icon={card.icon}
            sparkColor={card.sparkColor}
            delay={card.delay}
            suffix={card.suffix}
          />
        )
      )}
    </Box>
  );

  // Option 2: Horizontal scroll on mobile (if you prefer keeping all cards visible)
  /*
  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: isSmallMobile ? "8px" : "12px",
          marginBottom: "20px",
          pb: 2, // padding bottom for scrollbar
          mx: -1, // negative margin to allow full width scroll
          px: 1, // padding to maintain spacing
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#004AAD",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e2e8f0",
            borderRadius: "4px",
          },
        }}
      >
        {cards.map((card, index) =>
          loadingStates.allAttendance ? (
            <Box key={index} sx={{ minWidth: isSmallMobile ? "180px" : "220px" }}>
              <KpiCardSkeleton />
            </Box>
          ) : (
            <Box key={index} sx={{ minWidth: isSmallMobile ? "180px" : "220px" }}>
              <ImprovedKpiCard
                label={card.label}
                target={card.target}
                icon={card.icon}
                sparkColor={card.sparkColor}
                delay={card.delay}
                suffix={card.suffix}
              />
            </Box>
          )
        )}
      </Box>
    );
  }

  // Desktop view - grid layout
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      {cards.map((card, index) =>
        loadingStates.allAttendance ? (
          <KpiCardSkeleton key={index} />
        ) : (
          <ImprovedKpiCard
            key={index}
            label={card.label}
            icon={card.icon}
            sparkColor={card.sparkColor}
            delay={card.delay}
            suffix={card.suffix}
          />
        )
      )}
    </Box>
  );
  */
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:360px)');

  const {
    divisionData,
    traineeTypes,
    traineeDivision,
    allAttendance,
    allAttendance1,
    loading,
    weeklyAttendance,
  } = useSelector((state) => state.attendanceCard);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cachedAllAttendance, setCachedAllAttendance] = useState(null);
  const [cachedAllAttendance1, setCachedAllAttendance1] = useState(null);
  const [cachedTraineeTypes, setCachedTraineeTypes] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [loadingStates, setLoadingStates] = useState({
    divisionData: true,
    traineeTypes: true,
    traineeDivision: true,
    allAttendance: true,
    allAttendance1: true,
    weeklyAttendance: true,
  });

  const today = new Date().toISOString().split("T")[0];

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const cachedTrainee = localStorage.getItem("dashboard_traineeTypes");
    if (cachedTrainee) {
      setCachedTraineeTypes(JSON.parse(cachedTrainee));
      setLoadingStates((prev) => ({ ...prev, traineeTypes: false }));
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (divisionData && divisionData.length > 0)
      setLoadingStates((prev) => ({ ...prev, divisionData: false }));
  }, [divisionData]);

  useEffect(() => {
    if (traineeTypes && traineeTypes.length > 0) {
      setLoadingStates((prev) => ({ ...prev, traineeTypes: false }));
      localStorage.setItem("dashboard_traineeTypes", JSON.stringify(traineeTypes));
    }
  }, [traineeTypes]);

  useEffect(() => {
    if (traineeDivision && traineeDivision.length > 0)
      setLoadingStates((prev) => ({ ...prev, traineeDivision: false }));
  }, [traineeDivision]);

  useEffect(() => {
    if (allAttendance && allAttendance.length > 0) {
      setLoadingStates((prev) => ({ ...prev, allAttendance: false }));
      localStorage.setItem("dashboard_allAttendance", JSON.stringify(allAttendance));
    }
  }, [allAttendance]);

    useEffect(() => {
    if (allAttendance1 && allAttendance1.length > 0) {
      setLoadingStates((prev) => ({ ...prev, allAttendance1: false }));
      localStorage.setItem("dashboard_allAttendance1", JSON.stringify(allAttendance1));
    }
  }, [allAttendance1]);

  useEffect(() => {
    if (weeklyAttendance && weeklyAttendance.length > 0)
      setLoadingStates((prev) => ({ ...prev, weeklyAttendance: false }));
  }, [weeklyAttendance]);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) metaThemeColor.setAttribute("content", "#004AAD");

    const fetchData = async () => {
      try {
        if (!cachedAllAttendance) dispatch(GetAllStrength(today, today));
         if (!cachedAllAttendance1) dispatch(GetAllAttendance(today, today));
        if (!cachedTraineeTypes) dispatch(GetTraineeBasedTypes(today));
        dispatch(GetCdlBasedDivison(today, today));
        dispatch(GetTraineeDivisionAttendance(today, today));
        dispatch(GetCDLWeekAttendance(today));
      } catch (error) {
        console.error("Error dispatching actions:", error);
      }
    };

    fetchData();
  }, [dispatch, cachedAllAttendance, cachedTraineeTypes, today,cachedAllAttendance1]);

  // ── Transforms ──
  const transformedDivisionData =
    divisionData?.map((item) => ({
      division: item.V_DIVNAME || item.HLD_DIV_CODE || "Unknown",
      rate: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
      categories: {
        executive: {
          st: parseInt(item.STRENGTH_EXECUTIVE) || 0,
          at: parseInt(item.ATTENDANCE_EXECUTIVE) || 0,
          percent: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
        },
        supervisory: {
          st: parseInt(item.STRENGTH_SUPERVISORY) || 0,
          at: parseInt(item.ATTENDANCE_SUPERVISORY) || 0,
          percent: parseFloat(item.PERCENTAGE_SUPERVISORY) || 0,
        },
        clerical: item.STRENGTH_CLERICAL
          ? { st: parseInt(item.STRENGTH_CLERICAL) || 0, at: 0, percent: 0 }
          : null,
      },
    })) || [];

  const transformedTraineeByDivision =
    traineeDivision
      ?.map((item) => ({
        division: item.V_DIVNAME || item.HLD_DIV_CODE || "Unknown",
        clerical_strength: parseInt(item.STRENGTH_CLERICAL) || 0,
        clerical_attendance: parseInt(item.ATTENDANCE_CLERICAL) || 0,
        industrial_strength: parseInt(item.STRENGTH_INDUSTRIAL) || 0,
        industrial_attendance: parseInt(item.ATTENDANCE_INDUSTRIAL) || 0,
        total_strength:
          (parseInt(item.STRENGTH_CLERICAL) || 0) +
          (parseInt(item.STRENGTH_INDUSTRIAL) || 0),
        total_attendance:
          (parseInt(item.ATTENDANCE_CLERICAL) || 0) +
          (parseInt(item.ATTENDANCE_INDUSTRIAL) || 0),
        total_percent: 0,
      }))
      .map((item) => ({
        ...item,
        total_percent:
          item.total_strength > 0
            ? Math.round((item.total_attendance / item.total_strength) * 100)
            : 0,
      })) || [];

  const employeeTypeData = cachedTraineeTypes || traineeTypes || [];

  const totalEmployees =
    divisionData?.reduce(
      (sum, item) =>
        sum +
        (parseInt(item.STRENGTH_EXECUTIVE) || 0) +
        (parseInt(item.STRENGTH_SUPERVISORY) || 0),
      0
    ) || 0;

  const totalAttendance =
    divisionData?.reduce(
      (sum, item) =>
        sum +
        (parseInt(item.ATTENDANCE_EXECUTIVE) || 0) +
        (parseInt(item.ATTENDANCE_SUPERVISORY) || 0),
      0
    ) || 0;

  const attendanceRate =
    totalEmployees > 0 ? Math.round((totalAttendance / totalEmployees) * 100) : 0;

  const totalAttendanceItem = (allAttendance || []).find((item) => {
    const typeValue =
      item?.Type || item?.TYPE || item?.EmployeeType || item?.employeeType;
    return typeof typeValue === "string" && typeValue.toUpperCase() === "TOTAL";
  });

  const kpiActualStrength =
    parseInt(totalAttendanceItem?.ActualStrength) || totalEmployees || 0;
  const kpiAttendance =
    parseInt(totalAttendanceItem?.Attendance) || totalAttendance || 0;
  const kpiEligiblePercentageRaw = parseFloat(totalAttendanceItem?.EligiblePercentage);
  const kpiActualPercentageRaw = parseFloat(totalAttendanceItem?.ActualPercentage);

  const kpiEligiblePercentage = Number.isFinite(kpiEligiblePercentageRaw)
    ? Math.round(kpiEligiblePercentageRaw * 100) / 100
    : attendanceRate;
  const kpiActualPercentage = Number.isFinite(kpiActualPercentageRaw)
    ? Math.round(kpiActualPercentageRaw * 100) / 100
    : attendanceRate;

  // Weekly chart data
  const apiWeek = weeklyAttendance || [];
  const attendanceFromApi = apiWeek.map((item) => ({
    v: parseInt(item.Attendance) || 0,
    dayName: item.DayName || "",
  }));
  const eligibleFromApi = apiWeek.map((item) => ({
    v: parseInt(item.Eligible) || 0,
    dayName: item.DayName || "",
  }));
  const rateForChart = attendanceFromApi.map((a, i) => {
    const el = eligibleFromApi[i]?.v || 0;
    return {
      v: el ? Math.max(0, Math.min(100, Math.round((a.v / el) * 100))) : 0,
      dayName: a.dayName,
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 120px)",
        backgroundColor: "#f8faff",
        padding: {
          xs: isSmallMobile ? "12px 10px" : "16px 12px",
          sm: "24px 20px",
          md: "36px 28px",
        },
        backgroundImage:
          "radial-gradient(rgba(0,74,173,0.06) 1px, transparent 1px)",
        backgroundSize: {
          xs: "20px 20px",
          sm: "24px 24px",
          md: "28px 28px",
        },
      }}
    >
      {/* Hamburger Menu Button and Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: {
            xs: isSmallMobile ? 1.5 : 2,
            sm: 2.5,
            md: 3,
          },
          flexWrap: isSmallMobile ? 'wrap' : 'nowrap',
          gap: isSmallMobile ? 1 : 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: isSmallMobile ? 1 : 2 }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,74,173,0.12)',
              borderRadius: '12px',
              padding: isSmallMobile ? '6px' : '8px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: !isMobile ? 'scale(1.05)' : 'none',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <MenuIcon sx={{ 
              color: '#004AAD',
              fontSize: isSmallMobile ? 20 : 24 
            }} />
          </IconButton>
          
          <Typography
            variant={isSmallMobile ? "body1" : "h5"}
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: {
                xs: isSmallMobile ? '1rem' : '1.2rem',
                sm: '1.3rem',
                md: '1.5rem',
              },
            }}
          >
            {activeTab === 0 ? 'HR Dashboard' : 
             activeTab === 1 ? 'Financial Dashboard' : 
             'Dashboard'}
          </Typography>
        </Box>

        {/* Date display */}
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            backgroundColor: '#ffffff',
            padding: isSmallMobile ? '4px 8px' : '6px 12px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: { xs: isSmallMobile ? 'none' : 'block', sm: 'block' },
            fontSize: isSmallMobile ? '0.7rem' : '0.875rem',
          }}
        >
          {new Date().toLocaleDateString('en-US', { 
            weekday: isMobile ? 'short' : 'long', 
            year: 'numeric', 
            month: isMobile ? 'short' : 'long', 
            day: 'numeric' 
          })}
        </Typography>
      </Box>

      {/* Navigation Drawer */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* ── HR Dashboard ── */}
      {activeTab === 0 && (
        <Fade in={true} timeout={600}>
          <Box>
            {/* Section label */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: 1,
                  sm: 1.5,
                },
                mb: {
                  xs: 1.5,
                  sm: 2,
                },
                mt: 0.5,
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 3,
                    sm: 4,
                  },
                  height: {
                    xs: 16,
                    sm: 20,
                  },
                  borderRadius: "2px",
                  background: "linear-gradient(180deg, #004AAD 0%, #3b82f6 100%)",
                }}
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: isSmallMobile ? '9px' : '10px',
                    sm: '11px',
                  },
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7b8ab8",
                }}
              >
                Key Performance Indicators
              </Typography>
            </Box>

            {/* ── KPI Cards ── */}
            <KpiCardsGrid
              loadingStates={loadingStates}
              kpiAttendance={kpiAttendance}
              kpiActualStrength={kpiActualStrength}
              kpiEligiblePercentage={kpiEligiblePercentage}
              kpiActualPercentage={kpiActualPercentage}
            />

            {/* ── Employee Strength vs Attendance ── */}
            <Box sx={{ 
              marginBottom: {
                xs: '16px',
                sm: '20px',
                md: '24px'
              } 
            }}>
              {loadingStates.allAttendance1 ? (
                <ChartSkeleton height={isMobile ? 250 : 350} />
              ) : (
                <EmployeeStrengthAttendanceChart
                  allAttendance1={cachedAllAttendance1 || allAttendance1}
                />
              )}
            </Box>

            {/* ── Weekly Trend + Employee Type ── */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: {
                  xs: '12px',
                  sm: '14px',
                  md: '16px',
                },
                marginBottom: {
                  xs: '16px',
                  sm: '20px',
                  md: '24px'
                },
              }}
            >
              {loadingStates.weeklyAttendance ? (
                <ChartSkeleton height={isMobile ? 250 : 300} />
              ) : apiWeek.length > 0 ? (
                <WeeklyAttendanceTrend
                  eligibleData={eligibleFromApi}
                  attendanceData={attendanceFromApi}
                  rateData={rateForChart}
                />
              ) : (
                <WeeklyAttendanceTrend
                  eligibleData={[]}
                  attendanceData={[]}
                  rateData={[]}
                />
              )}

              {loadingStates.traineeTypes ? (
                <ChartSkeleton height={isMobile ? 250 : 300} />
              ) : (
                <EmployeeTypeChart employeeTypeData={employeeTypeData} />
              )}
            </Box>

            {/* ── CDPLC Breakdown ── */}
            <Box sx={{ 
              marginBottom: {
                xs: '16px',
                sm: '20px',
                md: '24px'
              } 
            }}>
              {loadingStates.divisionData ? (
                <ChartSkeleton height={isMobile ? 250 : 300} />
              ) : (
                <CDPLCBreakdown hadDate={today} />
              )}
            </Box>

            {/* ── Division Breakdown ── */}
            <Box sx={{ 
              marginBottom: {
                xs: '8px',
                sm: '8px',
                md: '8px'
              } 
            }}>
              {loadingStates.divisionData ? (
                <ChartSkeleton height={isMobile ? 300 : 400} />
              ) : (
                transformedDivisionData.length > 0 && (
                  <DivisionBreakdown divisionData={transformedDivisionData} />
                )
              )}
            </Box>
          </Box>
        </Fade>
      )}

      {/* ── Financial Dashboard ── */}
      {activeTab === 1 && (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              padding: {
                xs: isSmallMobile ? '20px 16px' : '24px 20px',
                sm: '30px 28px',
                md: '40px 36px',
              },
              borderRadius: {
                xs: '16px',
                sm: '18px',
                md: '20px',
              },
              marginBottom: {
                xs: '20px',
                sm: '24px',
                md: '32px',
              },
              boxShadow: "0 8px 40px rgba(16,185,129,0.25)",
            }}
          >
            <Typography
              variant={isSmallMobile ? "h6" : (isMobile ? "h5" : "h4")}
              sx={{ 
                fontWeight: 700, 
                marginBottom: {
                  xs: '4px',
                  sm: '6px',
                  md: '8px',
                }, 
                fontSize: {
                  xs: isSmallMobile ? '1.1rem' : '1.3rem',
                  sm: '1.5rem',
                  md: '1.75rem',
                }
              }}
            >
              Financial Dashboard
            </Typography>
            <Typography sx={{ 
              fontSize: {
                xs: '0.8rem',
                sm: '0.9rem',
                md: '1rem',
              }, 
              opacity: 0.85, 
              fontWeight: 400 
            }}>
              Financial metrics, budgets, and fiscal performance overview.
            </Typography>
            <Box sx={{ marginTop: {
              xs: '12px',
              sm: '16px',
              md: '24px',
            } }}>
              <Typography sx={{ 
                fontSize: {
                  xs: '0.75rem',
                  sm: '0.8rem',
                  md: '0.875rem',
                }, 
                opacity: 0.75, 
                fontStyle: "italic" 
              }}>
                Financial dashboard content coming soon...
              </Typography>
            </Box>
          </Box>
        </Fade>
      )}

      {/* ── Coming Soon for other tabs ── */}
      {activeTab > 1 && (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              padding: {
                xs: isSmallMobile ? '30px 20px' : '35px 28px',
                sm: '40px 32px',
                md: '40px 36px',
              },
              borderRadius: {
                xs: '16px',
                sm: '18px',
                md: '20px',
              },
              marginBottom: {
                xs: '20px',
                sm: '24px',
                md: '32px',
              },
              boxShadow: "0 8px 40px rgba(245,158,11,0.25)",
              textAlign: 'center'
            }}
          >
            <Typography
              variant={isSmallMobile ? "h6" : (isMobile ? "h5" : "h4")}
              sx={{ 
                fontWeight: 700, 
                marginBottom: {
                  xs: '8px',
                  sm: '12px',
                  md: '16px',
                }, 
                fontSize: {
                  xs: isSmallMobile ? '1.1rem' : '1.3rem',
                  sm: '1.5rem',
                  md: '1.75rem',
                }
              }}
            >
              Coming Soon
            </Typography>
            <Typography sx={{ 
              fontSize: {
                xs: '0.8rem',
                sm: '0.9rem',
                md: '1rem',
              }, 
              opacity: 0.85, 
              fontWeight: 400 
            }}>
              This dashboard is currently under development.
            </Typography>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default Dashboard;