import React, { useRef,useEffect, useState ,useMemo} from "react";
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
import { EmployeeTypeKpiGrid } from "../../components/Charts/EmployeeTypeKpiGrid";
import CloseIcon from '@mui/icons-material/Close';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyDashboard from './companyDashboad/index';
import { KpiCard } from "../../components/Charts/KpiCard";
import { DivisionBreakdown } from "../../components/Charts/DivisionBreakdown";
import { TraineesDivisionBreakdown } from "../../components/Charts/TraineesDivisionBreakdown";
import { TraineesOverview } from "../../components/Charts/TraineesOverview";
import WeeklyAttendanceTrend from "../../components/Charts/WeeklyAttendanceTrend";
import { EmployeeTypeChart } from "../../components/Charts/EmployeeTypeChart";
import { CDLLocBaseAttendance } from "../../components/Charts/DGESLocAtt";
import QuickAccessSection from "../../components/Cards/QuickAccessSection"; 

import {
  GetAllStrength,
  GetAllAttendance,
  GetLoadBaAttendance  // This action fetches CDPLC attendance data
} from "../../action/Attendance";
import { EmployeeStrengthAttendanceChart } from "../../components/Charts/EmployeeStrengthAttendanceChart";
import { Person } from "@material-ui/icons";

// ─── KPI Card Skeleton ────────────────────────────────────────────────────────
const KpiCardSkeleton = () => (
  <Box
    sx={{
      position: "relative",
      background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)",
      borderRadius: "20px",
      padding: "24px",
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
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
      <Box
        sx={{
          width: "45%",
          height: 13,
          backgroundColor: "rgba(0,74,173,0.12)",
          borderRadius: "6px",
        }}
      />
      <Box
        sx={{
          width: 38,
          height: 38,
          backgroundColor: "rgba(0,74,173,0.1)",
          borderRadius: "10px",
        }}
      />
    </Box>
    <Box
      sx={{
        width: "55%",
        height: 34,
        backgroundColor: "rgba(0,74,173,0.14)",
        borderRadius: "8px",
        mb: 1.5,
      }}
    />
    <Box
      sx={{
        width: "35%",
        height: 11,
        backgroundColor: "rgba(0,74,173,0.08)",
        borderRadius: "6px",
      }}
    />
  </Box>
);

// ─── Chart Skeleton ───────────────────────────────────────────────────────────
const ChartSkeleton = ({ height = 300 }) => (
  <Box
    sx={{
      position: "relative",
      background: "linear-gradient(135deg, #f7f9ff 0%, #eef2ff 100%)",
      borderRadius: "20px",
      padding: "24px",
      height: height,
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
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Box
        sx={{
          width: "28%",
          height: 20,
          backgroundColor: "rgba(0,74,173,0.1)",
          borderRadius: "6px",
        }}
      />
      <Box
        sx={{
          width: "16%",
          height: 20,
          backgroundColor: "rgba(0,74,173,0.07)",
          borderRadius: "6px",
        }}
      />
    </Box>
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: "70%" }}>
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
 
// ─── Navigation Drawer Component ───────────────────────────────────────────────
const NavigationDrawer = ({ open, onClose, activeTab, onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 
  const overviewItems = [
    {
      id: 4,
      label: 'Company',
      icon: <DashboardIcon />,
      color: '#ef4444',
      disabled: true ,
      isBold: true,
    },
    {
      id: 5,
      label: 'Own',
      icon: <Person />,
      color: '#f59e0b',
      isBold: true,
      disabled: true
    },
  ];

  const mainItems = [
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
      description: 'Budget tracking and fiscal overview',
      disabled: true
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
  ];

  const otherKpisItems = [
    {
      id: 7,
      label: 'Operational KPIs',
      icon: <Clock />,
      color: '#06b6d4',
      description: 'Operational efficiency metrics',
      disabled: true
    },
    {
      id: 8,
      label: 'Quality Metrics',
      icon: <UserCheck />,
      color: '#8b5cf6',
      description: 'Quality assurance indicators',
      disabled: true
    },
    {
      id: 9,
      label: 'Project Status',
      icon: <TrendingUp />,
      color: '#f43f5e',
      description: 'Project completion rates',
      disabled: true
    },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    onClose();
  };

  const renderMenuItems = (items, showDivider = false) => (
    <>
      <List sx={{ p: 0 }}>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleTabClick(item.id)}
              disabled={item.disabled}
              selected={activeTab === item.id}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                px: 2,
                transition: 'all 0.2s ease',
                ...(item.isBold && {
                  borderLeft: '4px solid',
                  borderLeftColor: item.color,
                  backgroundColor: 'rgba(239,68,68,0.04)',
                }),
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
                  minWidth: 40,
                  color: activeTab === item.id ? item.color : '#64748b',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: item.isBold ? 700 : (activeTab === item.id ? 600 : 500),
                  ...(item.isBold && {
                    color: item.color,
                  }),
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  sx: { color: 'text.secondary', mt: 0.5 }
                }}
              />
              {item.disabled && (
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
      {showDivider && (
        <Divider sx={{ my: 2, borderColor: 'rgba(0,74,173,0.08)' }} />
      )}
    </>
  );

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
      <Box sx={{ p: 3 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DashboardIcon sx={{ color: 'white', fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                fontSize: '1.2rem',
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
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2, borderColor: 'rgba(0,74,173,0.08)' }} />

        <Typography
          variant="subtitle2"
          sx={{
            px: 2,
            mb: 1,
            color: '#ef4444',
            fontWeight: 700,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          OVERVIEW
        </Typography>
        {renderMenuItems(overviewItems, true)}

        <Typography
          variant="subtitle2"
          sx={{
            px: 2,
            mb: 1,
            color: '#004AAD',
            fontWeight: 600,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          KPI'S 
        </Typography>
        {renderMenuItems(mainItems, false)}

        <Divider sx={{ my: 2, borderColor: 'rgba(0,74,173,0.12)', borderBottomWidth: 2 }} />

        <Typography
          variant="subtitle2"
          sx={{
            px: 2,
            mb: 1,
            color: '#f43f5e',
            fontWeight: 600,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          OTHER KPIs
        </Typography>
        {renderMenuItems(otherKpisItems, false)}
      </Box>
    </Drawer>
  );
};

// ─── Main Dashboard ─────────────────────────────────────────────────────────── 
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedYear, setSelectedYear] = useState(() => { 
    return new Date().getFullYear().toString();
  });

  const {
    divisionData,
    traineeTypes,
    traineeDivision,
    allAttendance,    
    allAttendance1,   
    loading,
    weeklyAttendance,
    loadBaAttendance,
  } = useSelector((state) => state.attendanceCard);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cachedAllAttendance, setCachedAllAttendance] = useState(null);
  const [cachedAllAttendance1, setCachedAllAttendance1] = useState(null);  
  const [cachedTraineeTypes, setCachedTraineeTypes] = useState(null);
  const [cachedLoadBaAttendance, setCachedLoadBaAttendance] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const cdplcChartRef = useRef(null);
  const traineeTypeChartRef = useRef(null);

  const handleAttendanceCardClick = (type) => {
    if (type === "DGES") {
      setActiveTab(0);
      requestAnimationFrame(() => {
        cdplcChartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    if (type === "Trainee") {
      setActiveTab(0);
      requestAnimationFrame(() => {
        traineeTypeChartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const [loadingStates, setLoadingStates] = useState({
    divisionData: true,
    traineeTypes: true,
    traineeDivision: true,
    allAttendance: true,
    allAttendance1: true,
    weeklyAttendance: true,
    loadBaAttendance: true,
  });

  const today = new Date().toISOString().split("T")[0];
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const cachedTrainee = localStorage.getItem("dashboard_traineeTypes");
    const cachedLoadBa = localStorage.getItem("dashboard_loadBaAttendance");
    const cachedAttendance = localStorage.getItem("dashboard_allAttendance");
    const cachedAttendance1 = localStorage.getItem("dashboard_allAttendance1");  
    
    if (cachedTrainee) {
      setCachedTraineeTypes(JSON.parse(cachedTrainee));
      setLoadingStates((prev) => ({ ...prev, traineeTypes: false }));
    }
    
    if (cachedLoadBa) {
      setCachedLoadBaAttendance(JSON.parse(cachedLoadBa));
      setLoadingStates((prev) => ({ ...prev, loadBaAttendance: false }));
    }
    
    if (cachedAttendance) {
      setCachedAllAttendance(JSON.parse(cachedAttendance));
      setLoadingStates((prev) => ({ ...prev, allAttendance: false }));
    }
    
    if (cachedAttendance1) {  // ← Add this
      setCachedAllAttendance1(JSON.parse(cachedAttendance1));
      setLoadingStates((prev) => ({ ...prev, allAttendance1: false }));
    }
    
    setDataLoaded(true);
  }, []);

  // Update loading states when data arrives
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

  // For GetAllStrength data (saved to allAttendance)
  useEffect(() => {
    if (allAttendance && allAttendance.length > 0) {
      setLoadingStates((prev) => ({ ...prev, allAttendance: false }));
      localStorage.setItem("dashboard_allAttendance", JSON.stringify(allAttendance));
    }
  }, [allAttendance]);

  // For GetAllAttendance data (saved to allAttendance1)
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
    if (loadBaAttendance && loadBaAttendance.length > 0) {
      setLoadingStates((prev) => ({ ...prev, loadBaAttendance: false }));
      localStorage.setItem("dashboard_loadBaAttendance", JSON.stringify(loadBaAttendance));
    } else if (loadBaAttendance && loadBaAttendance.length === 0) {
      setLoadingStates((prev) => ({ ...prev, loadBaAttendance: false }));
    }
  }, [loadBaAttendance]);

  // Fetch data
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) metaThemeColor.setAttribute("content", "#004AAD");

    const fetchData = async () => {
      try {
        // Fetch both APIs
        if (!cachedAllAttendance) dispatch(GetAllStrength(today, today));
        if (!cachedAllAttendance1) dispatch(GetAllAttendance(today, today)); 
        dispatch(GetLoadBaAttendance());  
      } catch (error) {
        console.error("Error dispatching actions:", error);
      }
    };

    fetchData();
  }, [dispatch, cachedAllAttendance, cachedAllAttendance1, today]);  

  // Prepare data for components
  const employeeStrengthData = cachedAllAttendance || allAttendance || [];
  const employeeTypeData = cachedAllAttendance1 || allAttendance1 || [];

  // Rest of your transforms remain the same...
  const transformedDivisionData =
    divisionData?.map((item) => ({
      division: item.HLD_DIV_CODE || item.HLD_DIV_CODE || "Unknown",
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

  const transformedCDPLCData = useMemo(() => {
    const data = loadBaAttendance || [];
    return data;
  }, [loadBaAttendance]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)", 
        backgroundColor: "#f8faff",
        padding: { xs: "20px 14px", sm: "28px 20px", md: "36px 28px" },
        backgroundImage: "radial-gradient(rgba(0,74,173,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        overflow: "hidden", 
      }}
    >
      {/* Header remains the same */}
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,74,173,0.12)',
              borderRadius: '12px',
              padding: '10px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <MenuIcon sx={{ color: '#004AAD' }} />
          </IconButton>
          <Typography variant="h5" sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
          }}>
            {activeTab === 0 ? 'HR Dashboard' :
             activeTab === 1 ? 'Financial Dashboard' :
             activeTab === 4 ? 'Company Overview' :
             activeTab === 5 ? 'Own Overview' : 'Dashboard'}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{
          color: '#64748b',
          backgroundColor: '#ffffff',
          padding: '6px 12px',
          borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          display: { xs: 'none', sm: 'block' }
        }}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      </Box> */}

      {/* Navigation Drawer */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Scrollable Content Area */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        pr: { xs: 0, sm: 1 },
        '&::-webkit-scrollbar': { width: '0px' },
      }}>
        {/* ── HR Dashboard ── */}
        {activeTab === 0 && (
          <Fade in={true} timeout={600}>
            <Box>
              {/* ✅ FIXED: EmployeeTypeKpiGrid - now receives correct data */}
              {/* <Box sx={{ marginBottom: "24px" }}>
                <EmployeeTypeKpiGrid
                  allAttendance1={employeeTypeData}  // ← allAttendance1 data from GetAllAttendance
                  loading={loadingStates.allAttendance1}
                  onCardClick={handleAttendanceCardClick}
                />
              </Box> */}
              
              {/* ✅ FIXED: EmployeeStrengthAttendanceChart - now receives correct data */}
              <Box sx={{ marginBottom: "24px" }}>
                {loadingStates.allAttendance ? (
                  <ChartSkeleton height={350} />
                ) : (
                  <EmployeeStrengthAttendanceChart
                    allAttendance={employeeStrengthData}  // ← allAttendance data from GetAllStrength
                  />
                )}
              </Box>

              {/* CDPLC Breakdown */}
              <Box sx={{ marginBottom: "24px" }}>
                {loadingStates.loadBaAttendance ? (
                  <ChartSkeleton height={300} />
                ) : (
                  <CDLLocBaseAttendance
                    data={transformedCDPLCData}
                    loading={loadingStates.loadBaAttendance}
                  />
                )}
              </Box>

              <Box sx={{ height: '20px' }} />
            </Box>
          </Fade>
        )}

        {/* Financial Dashboard */}
        {activeTab === 1 && (
          <Fade in={true} timeout={500}>
            <Box sx={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              padding: "40px 36px",
              borderRadius: "20px",
              marginBottom: "32px",
              boxShadow: "0 8px 40px rgba(16,185,129,0.25)",
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: "8px", fontSize: "28px" }}>
                Financial Dashboard
              </Typography>
              <Typography sx={{ fontSize: "16px", opacity: 0.85, fontWeight: 400 }}>
                Financial metrics, budgets, and fiscal performance overview.
              </Typography>
              <Box sx={{ marginTop: "24px" }}>
                <Typography sx={{ fontSize: "14px", opacity: 0.75, fontStyle: "italic" }}>
                  Financial dashboard content coming soon...
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
        
        {activeTab === 4 && (
          <Fade in={true} timeout={600}>
            <Box>
              <CompanyDashboard selectedYear="2026" />
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;