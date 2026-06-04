// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import {
//     Box, Typography, Paper, Table, TableBody, TableContainer, TableHead,
//     TableRow, TableCell, IconButton, Collapse, Button, Grid, FormControl,
//     InputLabel, Select, MenuItem, Fade, useTheme, useMediaQuery, Card,
//     CardContent, CardActions, Divider, InputAdornment, Alert, Snackbar
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import axios from 'axios';
// import Chart from 'chart.js/auto';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// const extractPercent = (descRaw) => {
//     if (!descRaw) return null;
//     const match = descRaw.toString().match(/\(?([\d.]+)%\)?/);
//     return match ? parseFloat(match[1]) : null;
// };

// const numberWithCommas = (x) => {
//     if (x === null || x === undefined || x === '' || parseFloat(x) === 0) return '';
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

// const buildRowData = (emp) => ({
//     Serial_No: emp.Serial_No,
//     Description: emp.Description,
//     Unit: emp.Unit,
//     BaseValue: numberWithCommas(emp.BaseValue) + (emp.BaseDesc ? ' ' + emp.BaseDesc : ''),
//     BaseDesc: emp.BaseDesc,
//     PRVStatusValue: numberWithCommas(emp.PRVStatusValue) + (emp.PRVStatusDesc ? ' ' + emp.PRVStatusDesc : ''),
//     PRVStatusDesc: emp.PRVStatusDesc,
//     ExpectedValue: numberWithCommas(emp.ExpectedValue) + (emp.ExpectedDesc ? ' ' + emp.ExpectedDesc : ''),
//     ExpectedDesc: emp.ExpectedDesc,
//     StatusValue: numberWithCommas(emp.StatusValue) + (emp.StatusDesc ? ' ' + emp.StatusDesc : ''),
//     StatusDesc: emp.StatusDesc,
//     AnnexureDesc: emp.AnnexureDesc,
//     Resposibility: emp.Resposibility,
//     Type: emp.Type,
//     Parentkey: emp.Parentkey,
// });

// const getStatusColor = (serialNo) => {
//     const green = ',1,2,3,4,5,8,9,10,12,13,17,18,20,21,22,23,24,26,27,28,29,30,31,32,33,';
//     const blue = ',6,7,11,14,15,16,19,';
//     if (green.includes(',' + serialNo + ',')) return '#15803d';
//     if (blue.includes(',' + serialNo + ',')) return '#1d4ed8';
//     return '#374151';
// };

// // ─── Styled ───────────────────────────────────────────────────────────────────

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
//     '&:last-child td, &:last-child th': { border: 0 },
// }));

// const SubItemRow = styled(TableRow)(({ theme }) => ({
//     '& td': { paddingLeft: theme.spacing(4), backgroundColor: '#f8f9ff' },
// }));

// // ─── Multi-Year Line Chart ──────────────────────────────────────────────────── 

// const MultiYearChart = ({ serialNo, type, selectedYear, expectedPct }) => {
//     const [yearData, setYearData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [tooltip, setTooltip] = useState(null);  
//     const chartRef = useRef(null);
//     const chartInstanceRef = useRef(null);
//     const containerRef = useRef(null);
 
//     const HARDCODED_2023_DATA = {
//         pct: 75,            
//         expVal: 1941870.0,  
//         statVal: 1456867.5  
//     };

//     const yearsToFetch = React.useMemo(() => {
//         const cur = parseInt(selectedYear);
//         const arr = []; 
//         for (let i = 3; i >= 0; i--) arr.push((cur - i).toString());
//         return arr;
//     }, [selectedYear]);

//     useEffect(() => {
//         let cancelled = false;
//         setLoading(true);
//         const fetchAll = async () => {
//             const results = [];
//             for (const yr of yearsToFetch) {
//                 try {
//                     const res = await axios.get(
//                         `https://esystems.cdl.lk/backend/kpi/KPI_Dashboard/DashboardDetails?year=${yr}`
//                     );
//                     if (res.data?.ResultSet) {
//                         const match = res.data.ResultSet.find(
//                             (i) => i.Serial_No === serialNo && i.Type === type
//                         );
//                         if (match) {
//                             const pct = extractPercent(match.StatusDesc) ?? extractPercent(match.StatusValue);
//                             const expVal = parseFloat((match.ExpectedValue ?? '').toString().replace(/,/g, '')) || null;
//                             const statVal = parseFloat((match.StatusValue ?? '').toString().replace(/,/g, '')) || null;
//                             results.push({ year: yr, pct, expVal, statVal });
//                         } else { 
//                             if (yr === '2023') {
//                                 results.push({ 
//                                     year: yr, 
//                                     pct: HARDCODED_2023_DATA.pct, 
//                                     expVal: HARDCODED_2023_DATA.expVal, 
//                                     statVal: HARDCODED_2023_DATA.statVal 
//                                 });
//                             } else {
//                                 results.push({ year: yr, pct: null, expVal: null, statVal: null });
//                             }
//                         }
//                     } else { 
//                         if (yr === '2023') {
//                             results.push({ 
//                                 year: yr, 
//                                 pct: HARDCODED_2023_DATA.pct, 
//                                 expVal: HARDCODED_2023_DATA.expVal, 
//                                 statVal: HARDCODED_2023_DATA.statVal 
//                             });
//                         } else {
//                             results.push({ year: yr, pct: null, expVal: null, statVal: null });
//                         }
//                     }
//                 } catch { 
//                     if (yr === '2023') {
//                         results.push({ 
//                             year: yr, 
//                             pct: HARDCODED_2023_DATA.pct, 
//                             expVal: HARDCODED_2023_DATA.expVal, 
//                             statVal: HARDCODED_2023_DATA.statVal 
//                         });
//                     } else {
//                         results.push({ year: yr, pct: null, expVal: null, statVal: null });
//                     }
//                 }
//             }
//             if (!cancelled) {
//                 setYearData(results);
//                 setLoading(false);
//             }
//         };
//         fetchAll();
//         return () => { cancelled = true; };
//     }, [serialNo, type, yearsToFetch]);

//     useEffect(() => {
//         if (loading || !chartRef.current) return;
//         const defined = yearData.filter(d => d.pct !== null || d.expVal !== null);
//         if (defined.length === 0) return;

//         if (chartInstanceRef.current) {
//             chartInstanceRef.current.destroy();
//             chartInstanceRef.current = null;
//         }

//         const labels = yearData.map(d => d.year);
//         const expVals = yearData.map(d => d.expVal);
//         const statVals = yearData.map(d => d.statVal);
//         const pcts = yearData.map(d => d.pct);

//         const allPcts = pcts.filter(p => p !== null);
//         const minPct = allPcts.length ? Math.max(0, Math.min(...allPcts) - 5) : 0;
//         const maxPct = allPcts.length ? Math.min(100, Math.max(...allPcts) + 5) : 100;

//         // ── Click handler: show tooltip with values ──────────────────────────
//         const handleCanvasClick = (evt) => {
//             const chart = chartInstanceRef.current;
//             if (!chart) return;
//             const elements = chart.getElementsAtEventForMode(evt, 'index', { intersect: false }, false);
//             if (elements.length === 0) {
//                 setTooltip(null);
//                 return;
//             }
//             const idx = elements[0].index;
//             const d = yearData[idx];
//             if (!d) return;
 
//             const rect = containerRef.current?.getBoundingClientRect();
//             const canvasRect = chartRef.current?.getBoundingClientRect();
//             if (!rect || !canvasRect) return;
 
//             const meta = chart.getDatasetMeta(0);  
//             const barEl = meta.data[idx];
//             const barX = barEl ? barEl.x : evt.clientX - canvasRect.left;
//             const relX = (canvasRect.left - rect.left) + barX;
//             const relY = canvasRect.top - rect.top + 10;

//             setTooltip({
//                 x: relX,
//                 y: relY,
//                 year: d.year,
//                 expVal: d.expVal,
//                 statVal: d.statVal,
//                 pct: d.pct,
//             });
//         };

//         chartRef.current.addEventListener('click', handleCanvasClick);

//         chartInstanceRef.current = new Chart(chartRef.current, {
//             plugins: [ChartDataLabels],
//             data: {
//                 labels,
//                 datasets: [
//                     {
//                         type: 'bar',
//                         label: 'Expected/Available', // Generic label for legend
//                         data: expVals,
//                         backgroundColor: '#e07b39',
//                         yAxisID: 'y',
//                         order: 2,
//                         barPercentage: 0.9,
//                         categoryPercentage: 0.5,
//                         // No value labels on bars — hidden
//                         datalabels: {
//                             display: false,
//                         },
//                     },
//                     {
//                         type: 'bar',
//                         label: 'Status',
//                         data: statVals,
//                         backgroundColor: '#4472c4',
//                         yAxisID: 'y',
//                         order: 2,
//                         barPercentage: 0.9,
//                         categoryPercentage: 0.5,
//                         // No value labels on bars — hidden
//                         datalabels: {
//                             display: false,
//                         },
//                     },
//                     {
//                         type: 'line',
//                         label: '%',
//                         data: pcts,
//                         borderColor: '#70ad47',
//                         backgroundColor: 'transparent',
//                         pointBackgroundColor: '#70ad47',
//                         pointRadius: 4,
//                         pointHoverRadius: 6,
//                         borderWidth: 2,
//                         yAxisID: 'y2',
//                         order: 1,
//                         tension: 0.3,
//                         spanGaps: true,
//                         // Only percentage labels shown — on the line
//                         datalabels: {
//                             anchor: 'top',
//                             align: 'top',
//                             color: '#000000',
//                             font: { size: 10, weight: 'bold' },
//                             formatter: (v) => v !== null ? `${v}%` : '',
//                         },
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 interaction: { mode: 'index', intersect: false },
//                 layout: {
//                     padding: { top: 24, bottom: 0, left: 0, right: 0 },
//                 },
//                 plugins: {
//                     legend: { display: false },
//                     tooltip: { enabled: false },
//                     datalabels: {},
//                 },
//                 scales: {
//                     x: {
//                         grid: { display: false },
//                         ticks: {
//                             font: { size: 10 },
//                             color: (ctx) =>
//                                 yearData[ctx.index]?.year === selectedYear ? '#173C95' : '#9ca3af',
//                         },
//                     },
//                     y: {
//                         position: 'left',
//                         grid: { color: 'rgba(0,0,0,0.06)' },
//                         ticks: {
//                             font: { size: 9 },
//                             color: '#9ca3af',
//                             callback: (v) => {
//                                 if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M';
//                                 if (v >= 1000) return (v / 1000).toFixed(0) + 'k';
//                                 return v;
//                             },
//                         },
//                     },
//                     y2: {
//                         position: 'right',
//                         grid: { drawOnChartArea: false },
//                         min: Math.round(minPct),
//                         max: Math.round(maxPct),
//                         ticks: {
//                             font: { size: 9 },
//                             color: '#70ad47',
//                             callback: (v) => v + '%',
//                         },
//                     },
//                 },
//             },
//         });

//         return () => {
//             if (chartRef.current) chartRef.current.removeEventListener('click', handleCanvasClick);
//             if (chartInstanceRef.current) {
//                 chartInstanceRef.current.destroy();
//                 chartInstanceRef.current = null;
//             }
//         };
//     }, [loading, yearData, selectedYear]);

//     if (loading) {
//         return (
//             <Box sx={{
//                 height: 180, borderRadius: '10px',
//                 background: 'linear-gradient(90deg, #f0f4ff 25%, #e8edfa 50%, #f0f4ff 75%)',
//                 backgroundSize: '200% 100%',
//                 animation: 'shimmer 1.5s infinite',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//                 <Typography sx={{ fontSize: '10px', color: '#9ca3af' }}>Loading chart…</Typography>
//             </Box>
//         );
//     }

//     const defined = yearData.filter(d => d.pct !== null || d.expVal !== null);
//     if (defined.length === 0) return null;

//     return (
//         <Box sx={{
//             borderRadius: '10px',
//             border: '1px solid #e0e7ff',
//             backgroundColor: '#fafbff',
//             px: 1, py: 1,
//         }}>
//             {/* Legend */}
//             <Box sx={{ display: 'flex', gap: 1.5, mb: 0.5, px: 0.5 }}>
//                 {[
//                     { color: '#e07b39', label: 'Expected/Available' }, // Keep generic in legend
//                     { color: '#4472c4', label: 'Status' },
//                     { color: '#70ad47', label: '%', line: true },
//                 ].map((item, i) => (
//                     <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                         {item.line
//                             ? <Box sx={{ width: 16, height: 2, backgroundColor: item.color, borderRadius: '2px' }} />
//                             : <Box sx={{ width: 10, height: 10, backgroundColor: item.color, borderRadius: '2px' }} />
//                         }
//                         <Typography sx={{ fontSize: '10px', color: '#9ca3af' }}>{item.label}</Typography>
//                     </Box>
//                 ))}
//             </Box>

//             {/* Chart wrapper — position:relative so tooltip is anchored here */}
//             <Box ref={containerRef} sx={{ position: 'relative', height: 160 }}
//                 onClick={(e) => {
//                     // close tooltip if clicking outside canvas
//                     if (e.target !== chartRef.current) setTooltip(null);
//                 }}>
//                 <canvas ref={chartRef} style={{ cursor: 'pointer' }} />

//                 {/* ── Click Tooltip ── */}
//                 {tooltip && (
//                     <Box sx={{
//                         position: 'absolute',
//                         left: Math.min(tooltip.x - 60, 160),
//                         top: tooltip.y,
//                         zIndex: 10,
//                         backgroundColor: 'white',
//                         border: '1px solid #c7d2fe',
//                         borderRadius: '10px',
//                         boxShadow: '0 4px 16px rgba(23,60,149,0.15)',
//                         px: 1.5, py: 1,
//                         minWidth: 140,
//                         pointerEvents: 'none',
//                     }}>
//                         {/* Year badge */}
//                         <Typography sx={{
//                             fontSize: '11px', fontWeight: 700,
//                             color: tooltip.year === selectedYear ? '#173C95' : '#6b7280',
//                             mb: 0.5, borderBottom: '1px solid #e8edfa', pb: 0.4,
//                         }}>
//                             {tooltip.year}
//                             {tooltip.year === selectedYear &&
//                                 <span style={{ marginLeft: 4, fontSize: '9px', background: '#173C95', color: 'white', borderRadius: '4px', padding: '1px 5px' }}>Current</span>
//                             }
                             
//                         </Typography>

//                         {/* Values - with dynamic label based on year */}
//                         {[
//                             { 
//                                 color: '#e07b39', 
//                                 label: tooltip.year === '2023' ? 'Available' : 'Expected', 
//                                 val: tooltip.expVal 
//                             },
//                             { color: '#4472c4', label: 'Status', val: tooltip.statVal },
//                             { color: '#70ad47', label: '%', val: tooltip.pct !== null ? `${tooltip.pct}%` : null },
//                         ].map((row, i) => row.val !== null && row.val !== undefined && (
//                             <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5, alignItems: 'center', mb: 0.3 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                                     <Box sx={{ width: 8, height: 8, borderRadius: '2px', backgroundColor: row.color, flexShrink: 0 }} />
//                                     <Typography sx={{ fontSize: '10px', color: '#6b7280' }}>{row.label}</Typography>
//                                 </Box>
//                                 <Typography sx={{ fontSize: '11px', fontWeight: 700, color: row.color }}>
//                                     {typeof row.val === 'number' ? Number(row.val).toLocaleString(undefined, {maximumFractionDigits: 1}) : row.val}
//                                 </Typography>
//                             </Box>
//                         ))}
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// // ─── 3-Column Metric Box ──────────────────────────────────────────────────────

// const MetricBox = ({ currentPct, expectedPct, prevPct, currentYear, previousYear, currentRaw, expectedRaw, prevRaw }) => {
//     const cols = [
//         { label: currentYear, pct: currentPct, raw: currentRaw, color: '#1e3a8a', bg: '#eef2ff', border: '#c7d2fe' },
//         { label: 'Expected', pct: expectedPct, raw: expectedRaw, color: '#92400e', bg: '#fffbeb', border: '#fde68a' },
//         { label: previousYear || 'Prev', pct: prevPct, raw: prevRaw, color: '#14532d', bg: '#f0fdf4', border: '#bbf7d0' },
//     ];
//     return (
//         <Box sx={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e7ff', mb: 1.5 }}>
//             {cols.map((col, i) => (
//                 <Box key={i} sx={{
//                     flex: 1, backgroundColor: col.bg,
//                     borderRight: i < 2 ? `1px solid ${col.border}` : 'none',
//                     p: '8px 4px', textAlign: 'center',
//                 }}>
//                     <Typography sx={{ fontSize: '10px', color: '#6b7280', fontWeight: 500, mb: 0.3, lineHeight: 1.2 }}>
//                         {col.label}
//                     </Typography>
//                     {col.pct !== null ? (
//                         <Typography sx={{ fontSize: '21px', fontWeight: 800, color: col.color, lineHeight: 1.1 }}>
//                             {col.pct}%
//                         </Typography>
//                     ) : (
//                         <Typography sx={{ fontSize: '12px', fontWeight: 600, color: col.color, lineHeight: 1.3 }}>
//                             {col.raw || '—'}
//                         </Typography>
//                     )}
//                 </Box>
//             ))}
//         </Box>
//     );
// };

// // ─── Mobile Card ──────────────────────────────────────────────────────────────

// const MobileCard = ({
//     item, index, hasSubItems, expanded, onToggle,
//     onDownload, pdfStatus, selectedYear, previousYear, isFirst,
// }) => {
//     const currentPct = extractPercent(item.StatusDesc) ?? extractPercent(item.StatusValue);
//     const expectedPct = extractPercent(item.ExpectedDesc) ?? extractPercent(item.ExpectedValue);
//     const prevPct = extractPercent(item.PRVStatusDesc) ?? extractPercent(item.PRVStatusValue);

//     const getNumericValue = (val) => {
//         if (!val) return null;
//         const num = parseFloat(val.toString().replace(/,/g, ''));
//         return isNaN(num) ? null : num;
//     };

//     const currentNum = getNumericValue(item.StatusValue);
//     const prevNum = getNumericValue(item.PRVStatusValue);

//     const trendVal = (() => {
//         if (currentNum !== null && prevNum !== null) {
//             if (currentNum > prevNum) return { icon: '▲', color: '#15803d' };
//             if (currentNum < prevNum) return { icon: '▼', color: '#dc2626' };
//             return { icon: '●', color: '#9ca3af' };
//         }
//         return null;
//     })();

//     return (
//         <Card sx={{
//             mb: 2, borderRadius: '14px',
//             border: isFirst ? '1.5px solid #3b5fc0' : '1px solid #e0e7ff',
//             boxShadow: isFirst ? '0 4px 16px rgba(23,60,149,0.13)' : '0 1px 6px rgba(23,60,149,0.06)',
//             overflow: 'hidden',
//         }}>
//             {/* Header */}
//             <Box sx={{
//                 display: 'flex', alignItems: 'flex-start',
//                 px: 1.5, pt: 1.5, pb: 1, gap: 0.8,
//                 backgroundColor: isFirst ? '#f0f4ff' : '#f8faff',
//                 borderBottom: '1px solid #e8edfa',
//                 position: 'relative',
//             }}>
//                 <Box sx={{
//                     minWidth: 24, height: 24, borderRadius: '50%',
//                     backgroundColor: '#173C95', color: 'white',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     fontSize: '11px', fontWeight: 700, flexShrink: 0, mt: '1px',
//                 }}>
//                     {index + 1}
//                 </Box>

//                 <Typography sx={{
//                     fontWeight: 600, color: '#1e3a8a', fontSize: '0.82rem',
//                     flex: 1, lineHeight: 1.4, wordBreak: 'break-word',
//                     pr: trendVal && isFirst ? '30px' : 0,
//                 }}>
//                     {item.Description}
//                 </Typography>

//                 {/* Trend icon positioned on the same line as description, aligned right */}
//                 {trendVal && isFirst && (
//                     <Box sx={{
//                         fontSize: '25px',
//                         fontWeight: 800,
//                         color: trendVal.color,
//                         position: 'absolute',
//                         right: hasSubItems ? 40 : 16,
//                         top: '14px',
//                         lineHeight: 1,
//                     }}>
//                         {trendVal.icon}
//                     </Box>
//                 )}

//                 {hasSubItems && (
//                     <IconButton size="small" onClick={onToggle}
//                         sx={{ color: '#173C95', p: '2px', flexShrink: 0, ml: 'auto', zIndex: 1 }}>
//                         {expanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
//                     </IconButton>
//                 )}
//             </Box>

//             <CardContent sx={{ px: 1.5, pt: 1.5, pb: 1 }}>

//                 {/* FIRST CARD: metric box + multi-year chart - WITHOUT the data values below */}
//                 {isFirst && (
//                     <>
//                         <MetricBox
//                             currentPct={currentPct} expectedPct={expectedPct} prevPct={prevPct}
//                             currentYear={selectedYear} previousYear={previousYear}
//                             currentRaw={item.StatusValue} expectedRaw={item.ExpectedValue} prevRaw={item.PRVStatusValue}
//                         />
//                         <MultiYearChart
//                             serialNo={item.Serial_No}
//                             type={item.Type}
//                             selectedYear={selectedYear}
//                             expectedPct={expectedPct}
//                         />
//                         <Box sx={{ height: 8 }} />
//                     </>
//                 )}

//                 {/* ALL CARDS except first: details grid - REMOVED for first card */}
//                 {!isFirst && (
//                     <>
//                         <Grid container spacing={0.5} sx={{ mb: 0.5 }}>
//                             <Grid item xs={4}>
//                                 <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Unit</Typography>
//                                 <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.Unit || '—'}</Typography>
//                             </Grid>
//                             <Grid item xs={4}>
//                                 <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Baseline</Typography>
//                                 <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.BaseValue || '—'}</Typography>
//                             </Grid>
//                             <Grid item xs={4}>
//                                 <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Responsibility</Typography>
//                                 <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.Resposibility || '—'}</Typography>
//                             </Grid>

//                             <Grid item xs={6} sx={{ mt: 0.5 }}>
//                                 <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
//                                     Prev Year ({previousYear})
//                                 </Typography>
//                                 <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.PRVStatusValue || '—'}</Typography>
//                             </Grid>
//                             <Grid item xs={6} sx={{ mt: 0.5 }}>
//                                 <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
//                                     Expected ({selectedYear})
//                                 </Typography>
//                                 <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.ExpectedValue || '—'}</Typography>
//                             </Grid>
//                         </Grid>

//                         {/* Status - only for non-first cards */}
//                         <Box sx={{ mt: 0.8, mb: 0.5, p: '6px 8px', borderRadius: '8px', backgroundColor: '#f8f9ff', border: '1px solid #e8edfa' }}>
//                             <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 0.2 }}>
//                                 Status at{' '}
//                                 <span style={{ background: '#1d4ed8', color: 'white', borderRadius: '5px', padding: '1px 5px', fontSize: '9px' }}>Manual</span>
//                                 {' '}&{' '}
//                                 <span style={{ background: '#15803d', color: 'white', borderRadius: '5px', padding: '1px 5px', fontSize: '9px' }}>System</span>
//                                 {' '}Update
//                             </Typography>
//                             <Typography sx={{ fontSize: '13px', fontWeight: 700, color: getStatusColor(item.Serial_No) }}>
//                                 {item.StatusValue || '—'}
//                             </Typography>
//                         </Box>

//                         {item.AnnexureDesc && (
//                             <Box sx={{ mt: 0.5 }}>
//                                 <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Remarks</Typography>
//                                 <Typography sx={{ fontSize: '11px', wordBreak: 'break-word', lineHeight: 1.4 }}
//                                     dangerouslySetInnerHTML={{ __html: item.AnnexureDesc.replace(/\r\n/g, '<br />') }} />
//                             </Box>
//                         )}
//                     </>
//                 )}
//             </CardContent>

//             <CardActions sx={{ px: 1.5, pb: 1.5, pt: 0, justifyContent: 'flex-end' }}>
//                 <Button variant="contained" size="small" startIcon={<PictureAsPdfIcon />}
//                     sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: '11px', borderRadius: '8px' }}
//                     onClick={() => onDownload(item.Serial_No, selectedYear)}
//                     disabled={!pdfStatus[item.Serial_No]}>
//                     PDF
//                 </Button>
//             </CardActions>

//             {/* Sub-items */}
//             {hasSubItems && expanded && item.subItems && (
//                 <Collapse in={expanded}>
//                     <Divider />
//                     <Box sx={{ backgroundColor: '#f0f4ff', p: 1.5 }}>
//                         <Typography sx={{ mb: 1, color: '#173C95', fontSize: '0.75rem', fontWeight: 700 }}>Sub Items</Typography>
//                         {item.subItems.map((sub, idx) => (
//                             <MobileSubCard key={`sub-${sub.Serial_No}-${idx}`}
//                                 item={sub} onDownload={onDownload} pdfStatus={pdfStatus}
//                                 previousYear={previousYear} selectedYear={selectedYear} />
//                         ))}
//                     </Box>
//                 </Collapse>
//             )}
//         </Card>
//     );
// };

// // ─── Mobile Sub-Card ──────────────────────────────────────────────────────────

// const MobileSubCard = ({ item, onDownload, pdfStatus, previousYear, selectedYear }) => (
//     <Card variant="outlined" sx={{ mb: 1, borderRadius: '10px', backgroundColor: 'white' }}>
//         <CardContent sx={{ p: 1.5 }}>
//             <Typography sx={{ fontWeight: 600, fontSize: '11px', mb: 1, color: '#1e3a8a' }}>
//                 • {item.Description}
//             </Typography>
//             <Grid container spacing={0.5}>
//                 <Grid item xs={4}>
//                     <Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Unit</Typography>
//                     <Typography sx={{ fontSize: '11px' }}>{item.Unit || '—'}</Typography>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Baseline</Typography>
//                     <Typography sx={{ fontSize: '11px' }}>{item.BaseValue || '—'}</Typography>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Expected</Typography>
//                     <Typography sx={{ fontSize: '11px' }}>{item.ExpectedValue || '—'}</Typography>
//                 </Grid>
//                 <Grid item xs={6} sx={{ mt: 0.5 }}>
//                     <Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Prev ({previousYear})</Typography>
//                     <Typography sx={{ fontSize: '11px' }}>{item.PRVStatusValue || '—'}</Typography>
//                 </Grid>
//                 <Grid item xs={6} sx={{ mt: 0.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
//                     <Button variant="contained" size="small"
//                         sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: '10px', py: 0.4, px: 1 }}
//                         onClick={() => onDownload(item.Serial_No, selectedYear)}
//                         disabled={!pdfStatus[item.Serial_No]}>
//                         PDF
//                     </Button>
//                 </Grid>
//             </Grid>
//             <Box sx={{ mt: 0.8, p: '5px 8px', borderRadius: '7px', backgroundColor: '#f8f9ff', border: '1px solid #e8edfa' }}>
//                 <Typography sx={{ fontSize: '10px', fontWeight: 700, color: getStatusColor(item.Serial_No) }}>
//                     {item.StatusValue || '—'}
//                 </Typography>
//             </Box>
//         </CardContent>
//     </Card>
// );

// // ─── Skeleton ─────────────────────────────────────────────────────────────────

// const DashboardSkeleton = () => {
//     const shimmer = {
//         background: 'linear-gradient(90deg,#f0f4ff 25%,#e8edfa 50%,#f0f4ff 75%)',
//         backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '8px',
//     };
//     return (
//         <Box>
//             {[1, 2, 3].map(i => (
//                 <Card key={i} sx={{ mb: 2, borderRadius: '14px', border: '1px solid #e0e7ff' }}>
//                     <CardContent sx={{ p: 2 }}>
//                         <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
//                             <Box sx={{ width: 24, height: 24, borderRadius: '50%', ...shimmer }} />
//                             <Box sx={{ flex: 1, height: 16, ...shimmer }} />
//                         </Box>
//                         {i === 1 && (
//                             <>
//                                 <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
//                                     {[1, 2, 3].map(j => <Box key={j} sx={{ flex: 1, height: 55, ...shimmer, borderRadius: '10px' }} />)}
//                                 </Box>
//                                 <Box sx={{ height: 100, ...shimmer, borderRadius: '10px', mb: 1.5 }} />
//                             </>
//                         )}
//                         <Box sx={{ height: 40, ...shimmer, borderRadius: '8px' }} />
//                     </CardContent>
//                 </Card>
//             ))}
//         </Box>
//     );
// };

// // ─── Year Selector ────────────────────────────────────────────────────────────

// const YearSelector = ({ value, onChange, availableYears, size = 'small' }) => (
//     <FormControl size={size} sx={{ minWidth: size === 'small' ? 100 : 120, backgroundColor: '#fff', borderRadius: '8px' }}>
//         <Select value={value} onChange={onChange} displayEmpty
//             startAdornment={<InputAdornment position="start"><CalendarTodayIcon sx={{ color: '#173C95', fontSize: size === 'small' ? 15 : 18 }} /></InputAdornment>}
//             sx={{ '& .MuiSelect-select': { py: 0.5, fontSize: size === 'small' ? '0.88rem' : '0.95rem' } }}>
//             {availableYears.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
//         </Select>
//     </FormControl>
// );

// // ─── Main Component ───────────────────────────────────────────────────────────

// const CompanyDashboard = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const currentYear = new Date().getFullYear().toString();

//     const [selectedYearStrategic, setSelectedYearStrategic] = useState(currentYear);
//     const [selectedYearRevenue, setSelectedYearRevenue] = useState(currentYear);
//     const [selectedYearOther, setSelectedYearOther] = useState(currentYear); // NEW: for type 'S'
//     const [availableYears, setAvailableYears] = useState([]);
//     const [loadingS, setLoadingS] = useState(true);
//     const [loadingR, setLoadingR] = useState(true);
//     const [loadingO, setLoadingO] = useState(true); // NEW: loading for other type 'S'
//     const [errorS, setErrorS] = useState(null);
//     const [errorR, setErrorR] = useState(null);
//     const [errorO, setErrorO] = useState(null); // NEW: error for other type 'S'
//     const [rows1, setRows1] = useState([]); // Strategic (C)
//     const [rows2, setRows2] = useState([]); // Revenue (R)
//     const [rows3, setRows3] = useState([]); // NEW: Other (S)
//     const [expandedRow, setExpandedRow] = useState(null);
//     const [parentKeyMap, setParentKeyMap] = useState({});
//     const [pdfStatusS, setPdfStatusS] = useState({});
//     const [pdfStatusR, setPdfStatusR] = useState({});
//     const [pdfStatusO, setPdfStatusO] = useState({}); // NEW: PDF status for other type
//     const [subItems, setSubItems] = useState({});
//     const [dropdownOptions, setDropdownOptions] = useState({});
//     const [selectedOptions, setSelectedOptions] = useState({});
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

//     const CW = {
//         expand: '50px', no: '50px', desc: '280px', unit: '70px',
//         base: '120px', prv: '130px', exp: '130px', status: '155px',
//         resp: '120px', remarks: '200px', view: '80px',
//     };

//     useEffect(() => {
//         const cur = parseInt(currentYear);
//         const years = Array.from({ length: 3 }, (_, i) => (cur - i).toString()).sort((a, b) => b - a);
//         setAvailableYears(years);
//         const sS = localStorage.getItem('cdStrategicYear');
//         const sR = localStorage.getItem('cdRevenueYear');
//         const sO = localStorage.getItem('cdOtherYear'); // NEW: for type 'S'
//         if (sS && years.includes(sS)) setSelectedYearStrategic(sS);
//         if (sR && years.includes(sR)) setSelectedYearRevenue(sR);
//         if (sO && years.includes(sO)) setSelectedYearOther(sO); // NEW
//     }, []);

//     useEffect(() => { localStorage.setItem('cdStrategicYear', selectedYearStrategic); }, [selectedYearStrategic]);
//     useEffect(() => { localStorage.setItem('cdRevenueYear', selectedYearRevenue); }, [selectedYearRevenue]);
//     useEffect(() => { localStorage.setItem('cdOtherYear', selectedYearOther); }, [selectedYearOther]); // NEW

//     useEffect(() => { fetchData('strategic'); }, [selectedYearStrategic]);
//     useEffect(() => { fetchData('revenue'); }, [selectedYearRevenue]);
//     useEffect(() => { fetchData('other'); }, [selectedYearOther]); // NEW

//     const fetchData = async (kind) => {
//         let year, setLoading, setError, setRows, typeCode;
        
//         if (kind === 'strategic') {
//             year = selectedYearStrategic;
//             setLoading = setLoadingS;
//             setError = setErrorS;
//             setRows = setRows1;
//             typeCode = 'C';
//         } else if (kind === 'revenue') {
//             year = selectedYearRevenue;
//             setLoading = setLoadingR;
//             setError = setErrorR;
//             setRows = setRows2;
//             typeCode = 'R';
//         } else { // NEW: other type 'S'
//             year = selectedYearOther;
//             setLoading = setLoadingO;
//             setError = setErrorO;
//             setRows = setRows3;
//             typeCode = 'S';
//         }

//         setLoading(true); 
//         setError(null);
        
//         try {
//             const res = await axios.get(`https://esystems.cdl.lk/backend/kpi/KPI_Dashboard/DashboardDetails?year=${year}`);
//             if (res.data?.ResultSet) {
//                 const items = res.data.ResultSet.filter(i => i.Type === typeCode);
//                 const rows = items.map(buildRowData);
//                 setRows(rows);
                
//                 // Process sub-items for all types when fetching strategic data
//                 // to avoid duplicate processing
//                 if (kind === 'strategic') {
//                     processSubItems(res.data.ResultSet);
//                 }
                
//                 fetchPdfStatuses(items, year, 
//                     kind === 'strategic' ? setPdfStatusS : 
//                     kind === 'revenue' ? setPdfStatusR : setPdfStatusO
//                 );
//             } else {
//                 setRows([]);
//             }
//         } catch {
//             setError(`Failed to load ${kind} data.`);
//             setSnackbar({ open: true, message: `Error loading ${kind} data.`, severity: 'error' });
//         } finally { 
//             setLoading(false); 
//         }
//     };

//     const processSubItems = (items) => {
//         const subMap = {}, dropMap = {}, selMap = {}, pkMap = {};
//         items.forEach(item => {
//             if (item.Parentkey) {
//                 if (!subMap[item.Parentkey]) subMap[item.Parentkey] = [];
//                 subMap[item.Parentkey].push(item);
//                 pkMap[item.Parentkey] = true;
//             }
//         });
        
//         Object.keys(subMap).forEach(pk => {
//             // Create unique descriptions for dropdown
//             const uniqueDescs = [...new Set(subMap[pk].map(i => i.Description))];
//             const opts = [
//                 { value: 'All', label: 'All' },
//                 ...uniqueDescs.map(d => ({ value: d, label: d }))
//             ];
//             dropMap[pk] = opts; 
//             selMap[pk] = 'All';
//         });
        
//         setSubItems(subMap); 
//         setParentKeyMap(pkMap);
//         setDropdownOptions(dropMap); 
//         setSelectedOptions(selMap);
//     };

//     const fetchPdfStatuses = async (items, year, setter) => {
//         const statuses = {};
//         for (const row of items) {
//             try {
//                 await axios.get(`https://esystems.cdl.lk/backend/kpi/KPI_Dashboard/ViewPDF?PDFName=${year}_${row.Serial_No}`, { responseType: 'blob' });
//                 statuses[row.Serial_No] = true;
//             } catch { 
//                 statuses[row.Serial_No] = false; 
//             }
//         }
//         setter(statuses);
//     };

//     const handleDownload = (id, year) => {
//         window.open(`https://esystems.cdl.lk/backend/kpi/KPI_Dashboard/ViewPDF?PDFName=${year}_${id}`, '_blank');
//     };

//     const hasSub = (sn) => parentKeyMap[sn] || false;

//     const getSubItems = (sn) => {
//         if (!subItems[sn]) return [];
//         let filtered = subItems[sn];
//         if (selectedOptions[sn] && selectedOptions[sn] !== 'All')
//             filtered = filtered.filter(i => i.Description === selectedOptions[sn]);
//         return filtered.map(buildRowData);
//     };

//     const previousYearS = !isNaN(selectedYearStrategic) ? (Number(selectedYearStrategic) - 1).toString() : '';
//     const previousYearR = !isNaN(selectedYearRevenue) ? (Number(selectedYearRevenue) - 1).toString() : '';
//     const previousYearO = !isNaN(selectedYearOther) ? (Number(selectedYearOther) - 1).toString() : ''; // NEW

//     // ── Mobile ──────────────────────────────────────────────────────────────────

//     const renderMobileSection = (title, rows, loading, error, pdfStatus, selectedYear, previousYear, type) => {
//         const items = rows.map(row => ({ 
//             ...row, 
//             Type: type, 
//             subItems: getSubItems(row.Serial_No) 
//         }));
        
//         return (
//             <>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: title === 'Revenue Targets' || title === 'Other Targets' ? 3 : 1 }}>
//                     <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700, fontSize: '1.05rem' }}>{title}</Typography>
//                     <YearSelector value={selectedYear}
//                         onChange={e => {
//                             if (type === 'C') { 
//                                 setSelectedYearStrategic(e.target.value); 
//                                 setExpandedRow(null); 
//                             } else if (type === 'R') {
//                                 setSelectedYearRevenue(e.target.value);
//                             } else { // type === 'S'
//                                 setSelectedYearOther(e.target.value);
//                                 setExpandedRow(null);
//                             }
//                         }}
//                         availableYears={availableYears} />
//                 </Box>
//                 {loading ? <DashboardSkeleton />
//                     : error ? <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>
//                         : items.length > 0
//                             ? items.map((item, idx) => (
//                                 <MobileCard key={`${type}-${item.Serial_No}-${idx}`}
//                                     item={item} index={idx}
//                                     hasSubItems={hasSub(item.Serial_No)}
//                                     expanded={expandedRow === item.Serial_No}
//                                     onToggle={() => setExpandedRow(expandedRow === item.Serial_No ? null : item.Serial_No)}
//                                     onDownload={handleDownload} pdfStatus={pdfStatus}
//                                     selectedYear={selectedYear} previousYear={previousYear}
//                                     isFirst={idx === 0 && type === 'C'} // Only first strategic card gets special treatment
//                                 />
//                             ))
//                             : <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '12px', mb: 2 }}>
//                                 <Typography color="textSecondary">No data for {selectedYear}</Typography>
//                             </Paper>
//                 }
//             </>
//         );
//     };

//     // ── Desktop ─────────────────────────────────────────────────────────────────

//     const renderDesktopTable = ({ rows, loading, error, pdfStatus, selectedYear, previousYear, type, totalCols }) => (
//         <Paper variant="outlined" sx={{
//             borderRadius: '20px', overflow: 'hidden',
//             boxShadow: '0 4px 24px rgba(23,60,149,0.08)',
//             border: '1px solid rgba(23,60,149,0.1)', mb: 4,
//         }}>
//             <TableContainer sx={{ maxHeight: '70vh', overflow: 'auto' }}>
//                 <Table size="small" stickyHeader sx={{ tableLayout: 'fixed', '& .MuiTableCell-root': { borderBottom: '1px solid rgba(23,60,149,0.1)' } }}>
//                     <TableHead>
//                         <TableRow>
//                             {[
//                                 { w: CW.expand, label: '' },
//                                 { w: CW.no, label: 'No', align: 'center' },
//                                 { w: CW.desc, label: 'Description' },
//                                 { w: CW.unit, label: 'Unit', align: 'center' },
//                                 { w: CW.base, label: 'Baseline', align: 'center' },
//                                 { w: CW.prv, label: `Prev Year Status\n(${previousYear})`, align: 'center' },
//                                 { w: CW.exp, label: `Expected Outcome\n${selectedYear}`, align: 'center' },
//                                 { w: CW.status, label: 'Status (Manual & System)', align: 'center' },
//                                 { w: CW.resp, label: 'Responsibility', align: 'center' },
//                                 { w: CW.remarks, label: 'Remarks' },
//                                 { w: CW.view, label: 'View', align: 'center' },
//                             ].map((col, i) => (
//                                 <TableCell key={i} width={col.w} align={col.align}
//                                     sx={{ backgroundColor: '#173C95', color: 'white', fontWeight: 600, fontSize: 12, whiteSpace: 'pre-line', py: '10px' }}>
//                                     {col.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={totalCols} align="center" sx={{ py: 3 }}><Typography>Loading…</Typography></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={totalCols} align="center" sx={{ py: 3 }}><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : rows.length > 0 ? rows.map((row, index) => (
//                             <React.Fragment key={`${row.Serial_No}-${index}`}>
//                                 <StyledTableRow hover>
//                                     <TableCell align="center">
//                                         {hasSub(row.Serial_No) && (
//                                             <IconButton size="small" onClick={() => setExpandedRow(expandedRow === row.Serial_No ? null : row.Serial_No)} sx={{ color: '#173C95' }}>
//                                                 {expandedRow === row.Serial_No ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                                             </IconButton>
//                                         )}
//                                     </TableCell>
//                                     <TableCell align="center"><Typography fontSize={13}>{index + 1}</Typography></TableCell>
//                                     <TableCell><Typography fontSize={13} sx={{ fontWeight: hasSub(row.Serial_No) ? 600 : 400, whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.Description}</Typography></TableCell>
//                                     <TableCell align="center"><Typography fontSize={13}>{row.Unit}</Typography></TableCell>
//                                     <TableCell align="center"><Typography fontSize={13}>{row.BaseValue}</Typography></TableCell>
//                                     <TableCell align="center"><Typography fontSize={13}>{row.PRVStatusValue}</Typography></TableCell>
//                                     <TableCell align="center"><Typography fontSize={13}>{row.ExpectedValue}</Typography></TableCell>
//                                     <TableCell align="center"><Typography fontSize={13} sx={{ color: getStatusColor(row.Serial_No), fontWeight: 600 }}>{row.StatusValue}</Typography></TableCell>
//                                     <TableCell align="center"><Typography fontSize={13}>{row.Resposibility}</Typography></TableCell>
//                                     <TableCell><Typography fontSize={13} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: row.AnnexureDesc?.replace(/\r\n/g, '<br />') || '' }} /></TableCell>
//                                     <TableCell align="center">
//                                         <Button variant="contained" size="small"
//                                             sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: 11, minWidth: 55 }}
//                                             onClick={() => handleDownload(row.Serial_No, selectedYear)}
//                                             disabled={!pdfStatus[row.Serial_No]}>PDF</Button>
//                                     </TableCell>
//                                 </StyledTableRow>

//                                 {/* Sub-items section - works for type 'S' as well */}
//                                 {hasSub(row.Serial_No) && expandedRow === row.Serial_No && (
//                                     <TableRow>
//                                         <TableCell colSpan={totalCols} sx={{ p: 0 }}>
//                                             <Collapse in>
//                                                 <Box sx={{ backgroundColor: '#f8f9ff', p: 2 }}>
//                                                     {/* Dropdown filter for sub-items */}
//                                                     {/* {dropdownOptions[row.Serial_No]?.length > 2 && (
//                                                         <FormControl size="small" sx={{ mb: 2, minWidth: 200 }}>
//                                                             <InputLabel>Filter by Description</InputLabel>
//                                                             <Select value={selectedOptions[row.Serial_No] || 'All'}
//                                                                 onChange={e => setSelectedOptions(p => ({ ...p, [row.Serial_No]: e.target.value }))}
//                                                                 label="Filter by Description">
//                                                                 {dropdownOptions[row.Serial_No].map(opt => (
//                                                                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                                                                 ))}
//                                                             </Select>
//                                                         </FormControl>
//                                                     )} */}
//                                                     <Table size="small">
//                                                         <TableBody>
//                                                             {getSubItems(row.Serial_No).map((sub, idx) => (
//                                                                 <SubItemRow key={`sub-${sub.Serial_No}-${idx}`}>
//                                                                     <TableCell /><TableCell />
//                                                                     <TableCell><Typography fontSize={12} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>• {sub.Description}</Typography></TableCell>
//                                                                     <TableCell align="center"><Typography fontSize={12}>{sub.Unit}</Typography></TableCell>
//                                                                     <TableCell align="center"><Typography fontSize={12}>{sub.BaseValue}</Typography></TableCell>
//                                                                     <TableCell align="center"><Typography fontSize={12}>{sub.PRVStatusValue}</Typography></TableCell>
//                                                                     <TableCell align="center"><Typography fontSize={12}>{sub.ExpectedValue}</Typography></TableCell>
//                                                                     <TableCell align="center"><Typography fontSize={12} sx={{ color: getStatusColor(sub.Serial_No), fontWeight: 600 }}>{sub.StatusValue}</Typography></TableCell>
//                                                                     <TableCell align="center"><Typography fontSize={12}>{sub.Resposibility}</Typography></TableCell>
//                                                                     <TableCell><Typography fontSize={12} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{sub.AnnexureDesc}</Typography></TableCell>
//                                                                     <TableCell align="center">
//                                                                         <Button variant="contained" size="small"
//                                                                             sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: 10, minWidth: 50 }}
//                                                                             onClick={() => handleDownload(sub.Serial_No, selectedYear)}
//                                                                             disabled={!pdfStatus[sub.Serial_No]}>PDF</Button>
//                                                                     </TableCell>
//                                                                 </SubItemRow>
//                                                             ))}
//                                                         </TableBody>
//                                                     </Table>
//                                                 </Box>
//                                             </Collapse>
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </React.Fragment>
//                         )) : (
//                             <TableRow><TableCell colSpan={totalCols} align="center" sx={{ py: 3 }}>
//                                 <Typography color="textSecondary">No data for {selectedYear}</Typography>
//                             </TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Paper>
//     );

//     return (
//         <Fade in timeout={600}>
//             <Box>
//                 {isMobile ? (
//                     <Box>
//                         {renderMobileSection('Strategic Objectives', rows1, loadingS, errorS, pdfStatusS, selectedYearStrategic, previousYearS, 'C')}
//                         {renderMobileSection('Revenue Targets', rows2, loadingR, errorR, pdfStatusR, selectedYearRevenue, previousYearR, 'R')}
//                         {renderMobileSection('Other Targets', rows3, loadingO, errorO, pdfStatusO, selectedYearOther, previousYearO, 'S')} {/* NEW */}
//                     </Box>
//                 ) : (
//                     <Box>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                             <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700 }}>Strategic Objectives</Typography>
//                             <YearSelector value={selectedYearStrategic}
//                                 onChange={e => { setSelectedYearStrategic(e.target.value); setExpandedRow(null); }}
//                                 availableYears={availableYears} size="medium" />
//                         </Box>
//                         {renderDesktopTable({ rows: rows1, loading: loadingS, error: errorS, pdfStatus: pdfStatusS, selectedYear: selectedYearStrategic, previousYear: previousYearS, type: 'C', totalCols: 11 })}

//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                             <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700 }}>Revenue Targets</Typography>
//                             <YearSelector value={selectedYearRevenue} onChange={e => setSelectedYearRevenue(e.target.value)}
//                                 availableYears={availableYears} size="medium" />
//                         </Box>
//                         {renderDesktopTable({ rows: rows2, loading: loadingR, error: errorR, pdfStatus: pdfStatusR, selectedYear: selectedYearRevenue, previousYear: previousYearR, type: 'R', totalCols: 11 })}

//                         {/* NEW: Other Targets section */}
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                             <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700 }}>Other Targets</Typography>
//                             <YearSelector value={selectedYearOther} onChange={e => { setSelectedYearOther(e.target.value); setExpandedRow(null); }}
//                                 availableYears={availableYears} size="medium" />
//                         </Box>
//                         {renderDesktopTable({ rows: rows3, loading: loadingO, error: errorO, pdfStatus: pdfStatusO, selectedYear: selectedYearOther, previousYear: previousYearO, type: 'S', totalCols: 11 })}
//                     </Box>
//                 )}

//                 <Snackbar open={snackbar.open} autoHideDuration={3000}
//                     onClose={() => setSnackbar(s => ({ ...s, open: false }))}
//                     anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                     <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
//                         {snackbar.message}
//                     </Alert>
//                 </Snackbar>

//                 <style>{`
//           @keyframes shimmer {
//             0%   { background-position: -200% 0; }
//             100% { background-position:  200% 0; }
//           }
//         `}</style>
//             </Box>
//         </Fade>
//     );
// };

// export default CompanyDashboard;
























import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box, Typography, Paper, Table, TableBody, TableContainer, TableHead,
    TableRow, TableCell, IconButton, Collapse, Button, Grid, FormControl,
    Select, MenuItem, Fade, useTheme, useMediaQuery, Card,
    CardContent, CardActions, Divider, InputAdornment, Alert, Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    initYears,
    setSelectedYearStrategic,
    setSelectedYearRevenue,
    setSelectedYearOther,
    setExpandedRow,
    closeSnackbar,
    fetchChartData,
} from '../../../action/CompanyOverviewAction';
import { getPdfUrl } from '../../../service/CompanyOverviewService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const extractPercent = (raw) => {
    if (!raw) return null;
    const match = raw.toString().match(/\(?([\d.]+)%\)?/);
    return match ? parseFloat(match[1]) : null;
};

const getStatusColor = (serialNo) => {
    const green = ',1,2,3,4,5,8,9,10,12,13,17,18,20,21,22,23,24,26,27,28,29,30,31,32,33,';
    const blue  = ',6,7,11,14,15,16,19,';
    if (green.includes(',' + serialNo + ',')) return '#15803d';
    if (blue.includes(',' + serialNo + ','))  return '#1d4ed8';
    return '#374151';
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
    '&:last-child td, &:last-child th': { border: 0 },
}));

const SubItemRow = styled(TableRow)(({ theme }) => ({
    '& td': { paddingLeft: theme.spacing(4), backgroundColor: '#f8f9ff' },
}));

// ─── Multi-Year Chart  ────────────────────────────────────────────────────────
// All API calls go through Redux. This component only reads from the store.

const MultiYearChart = ({ serialNo, type, selectedYear }) => {
    const dispatch = useDispatch();
    const cacheKey = `${serialNo}_${type}_${selectedYear}`;
    const entry    = useSelector((s) => s.kpi.chartData[cacheKey]);

    const loading  = !entry || entry.loading;
    const yearData = entry?.data ?? [];

    const [tooltip, setTooltip] = useState(null);
    const chartRef         = useRef(null);
    const chartInstanceRef = useRef(null);
    const containerRef     = useRef(null);

    // Trigger Redux fetch when serialNo / type / selectedYear changes
    useEffect(() => {
        dispatch(fetchChartData(serialNo, type, selectedYear));
    }, [dispatch, serialNo, type, selectedYear]);

    // Build / rebuild Chart.js instance whenever data is ready
    useEffect(() => {
        if (loading || !chartRef.current) return;
        if (!yearData.some((d) => d.pct !== null || d.expVal !== null)) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
            chartInstanceRef.current = null;
        }

        const labels   = yearData.map((d) => d.year);
        const expVals  = yearData.map((d) => d.expVal);
        const statVals = yearData.map((d) => d.statVal);
        const pcts     = yearData.map((d) => d.pct);
        const allPcts  = pcts.filter((p) => p !== null);
        const minPct   = allPcts.length ? Math.max(0, Math.min(...allPcts) - 5) : 0;
        const maxPct   = allPcts.length ? Math.min(100, Math.max(...allPcts) + 5) : 100;

        const handleCanvasClick = (evt) => {
            const chart = chartInstanceRef.current;
            if (!chart) return;
            const elements = chart.getElementsAtEventForMode(evt, 'index', { intersect: false }, false);
            if (!elements.length) { setTooltip(null); return; }
            const idx  = elements[0].index;
            const d    = yearData[idx];
            if (!d) return;
            const rect       = containerRef.current?.getBoundingClientRect();
            const canvasRect = chartRef.current?.getBoundingClientRect();
            if (!rect || !canvasRect) return;
            const meta  = chart.getDatasetMeta(0);
            const barEl = meta.data[idx];
            const barX  = barEl ? barEl.x : evt.clientX - canvasRect.left;
            setTooltip({
                x: (canvasRect.left - rect.left) + barX,
                y: canvasRect.top - rect.top + 10,
                year: d.year, expVal: d.expVal, statVal: d.statVal, pct: d.pct,
            });
        };

        chartRef.current.addEventListener('click', handleCanvasClick);

        chartInstanceRef.current = new Chart(chartRef.current, {
            plugins: [ChartDataLabels],
            data: {
                labels,
                datasets: [
                    {
                        type: 'bar', label: 'Expected/Available', data: expVals,
                        backgroundColor: '#e07b39', yAxisID: 'y', order: 2,
                        barPercentage: 0.9, categoryPercentage: 0.5,
                        datalabels: { display: false },
                    },
                    {
                        type: 'bar', label: 'Status', data: statVals,
                        backgroundColor: '#4472c4', yAxisID: 'y', order: 2,
                        barPercentage: 0.9, categoryPercentage: 0.5,
                        datalabels: { display: false },
                    },
                    {
                        type: 'line', label: '%', data: pcts,
                        borderColor: '#70ad47', backgroundColor: 'transparent',
                        pointBackgroundColor: '#70ad47', pointRadius: 4, pointHoverRadius: 6,
                        borderWidth: 2, yAxisID: 'y2', order: 1, tension: 0.3, spanGaps: true,
                        datalabels: {
                            anchor: 'top', align: 'top', color: '#000',
                            font: { size: 10, weight: 'bold' },
                            formatter: (v) => v !== null ? `${v}%` : '',
                        },
                    },
                ],
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                layout: { padding: { top: 24 } },
                plugins: { legend: { display: false }, tooltip: { enabled: false }, datalabels: {} },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 10 },
                            color: (ctx) => yearData[ctx.index]?.year === selectedYear ? '#173C95' : '#9ca3af',
                        },
                    },
                    y: {
                        position: 'left',
                        grid: { color: 'rgba(0,0,0,0.06)' },
                        ticks: {
                            font: { size: 9 }, color: '#9ca3af',
                            callback: (v) => v >= 1e6 ? (v / 1e6).toFixed(1) + 'M' : v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v,
                        },
                    },
                    y2: {
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        min: Math.round(minPct), max: Math.round(maxPct),
                        ticks: { font: { size: 9 }, color: '#70ad47', callback: (v) => v + '%' },
                    },
                },
            },
        });

        return () => {
            if (chartRef.current) chartRef.current.removeEventListener('click', handleCanvasClick);
            if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null; }
        };
    }, [loading, yearData, selectedYear]);

    if (loading) return (
        <Box sx={{ height: 180, borderRadius: '10px', background: 'linear-gradient(90deg,#f0f4ff 25%,#e8edfa 50%,#f0f4ff 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '10px', color: '#9ca3af' }}>Loading chart…</Typography>
        </Box>
    );

    if (!yearData.some((d) => d.pct !== null || d.expVal !== null)) return null;

    return (
        <Box sx={{ borderRadius: '10px', border: '1px solid #e0e7ff', backgroundColor: '#fafbff', px: 1, py: 1 }}>
            {/* Legend */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 0.5, px: 0.5 }}>
                {[
                    { color: '#e07b39', label: 'Expected/Available' },
                    { color: '#4472c4', label: 'Status' },
                    { color: '#70ad47', label: '%', line: true },
                ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {item.line
                            ? <Box sx={{ width: 16, height: 2, backgroundColor: item.color, borderRadius: '2px' }} />
                            : <Box sx={{ width: 10, height: 10, backgroundColor: item.color, borderRadius: '2px' }} />
                        }
                        <Typography sx={{ fontSize: '10px', color: '#9ca3af' }}>{item.label}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Canvas */}
            <Box ref={containerRef} sx={{ position: 'relative', height: 160 }}
                onClick={(e) => { if (e.target !== chartRef.current) setTooltip(null); }}>
                <canvas ref={chartRef} style={{ cursor: 'pointer' }} />

                {/* Click tooltip */}
                {tooltip && (
                    <Box sx={{ position: 'absolute', left: Math.min(tooltip.x - 60, 160), top: tooltip.y, zIndex: 10, backgroundColor: 'white', border: '1px solid #c7d2fe', borderRadius: '10px', boxShadow: '0 4px 16px rgba(23,60,149,0.15)', px: 1.5, py: 1, minWidth: 140, pointerEvents: 'none' }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: tooltip.year === selectedYear ? '#173C95' : '#6b7280', mb: 0.5, borderBottom: '1px solid #e8edfa', pb: 0.4 }}>
                            {tooltip.year}
                            {tooltip.year === selectedYear && <span style={{ marginLeft: 4, fontSize: '9px', background: '#173C95', color: 'white', borderRadius: '4px', padding: '1px 5px' }}>Current</span>}
                        </Typography>
                        {[
                            { color: '#e07b39', label: tooltip.year === '2023' ? 'Available' : 'Expected', val: tooltip.expVal },
                            { color: '#4472c4', label: 'Status', val: tooltip.statVal },
                            { color: '#70ad47', label: '%', val: tooltip.pct !== null ? `${tooltip.pct}%` : null },
                        ].map((row, i) => row.val !== null && row.val !== undefined && (
                            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5, alignItems: 'center', mb: 0.3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '2px', backgroundColor: row.color, flexShrink: 0 }} />
                                    <Typography sx={{ fontSize: '10px', color: '#6b7280' }}>{row.label}</Typography>
                                </Box>
                                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: row.color }}>
                                    {typeof row.val === 'number' ? Number(row.val).toLocaleString(undefined, { maximumFractionDigits: 1 }) : row.val}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

// ─── MetricBox ────────────────────────────────────────────────────────────────

const MetricBox = ({ currentPct, expectedPct, prevPct, currentYear, previousYear, currentRaw, expectedRaw, prevRaw }) => {
    const cols = [
        { label: currentYear,            pct: currentPct,  raw: currentRaw,  color: '#1e3a8a', bg: '#eef2ff', border: '#c7d2fe' },
        { label: 'Expected',             pct: expectedPct, raw: expectedRaw, color: '#92400e', bg: '#fffbeb', border: '#fde68a' },
        { label: previousYear || 'Prev', pct: prevPct,     raw: prevRaw,     color: '#14532d', bg: '#f0fdf4', border: '#bbf7d0' },
    ];
    return (
        <Box sx={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e7ff', mb: 1.5 }}>
            {cols.map((col, i) => (
                <Box key={i} sx={{ flex: 1, backgroundColor: col.bg, borderRight: i < 2 ? `1px solid ${col.border}` : 'none', p: '8px 4px', textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '10px', color: '#6b7280', fontWeight: 500, mb: 0.3, lineHeight: 1.2 }}>{col.label}</Typography>
                    {col.pct !== null
                        ? <Typography sx={{ fontSize: '21px', fontWeight: 800, color: col.color, lineHeight: 1.1 }}>{col.pct}%</Typography>
                        : <Typography sx={{ fontSize: '12px', fontWeight: 600, color: col.color, lineHeight: 1.3 }}>{col.raw || '—'}</Typography>
                    }
                </Box>
            ))}
        </Box>
    );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const DashboardSkeleton = () => {
    const shimmer = { background: 'linear-gradient(90deg,#f0f4ff 25%,#e8edfa 50%,#f0f4ff 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '8px' };
    return (
        <Box>
            {[1, 2, 3].map((i) => (
                <Card key={i} sx={{ mb: 2, borderRadius: '14px', border: '1px solid #e0e7ff' }}>
                    <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                            <Box sx={{ width: 24, height: 24, borderRadius: '50%', ...shimmer }} />
                            <Box sx={{ flex: 1, height: 16, ...shimmer }} />
                        </Box>
                        {i === 1 && (
                            <>
                                <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
                                    {[1, 2, 3].map((j) => <Box key={j} sx={{ flex: 1, height: 55, ...shimmer, borderRadius: '10px' }} />)}
                                </Box>
                                <Box sx={{ height: 100, ...shimmer, borderRadius: '10px', mb: 1.5 }} />
                            </>
                        )}
                        <Box sx={{ height: 40, ...shimmer, borderRadius: '8px' }} />
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

// ─── YearSelector ─────────────────────────────────────────────────────────────

const YearSelector = ({ value, onChange, availableYears, size = 'small' }) => (
    <FormControl size={size} sx={{ minWidth: size === 'small' ? 100 : 120, backgroundColor: '#fff', borderRadius: '8px' }}>
        <Select value={value} onChange={onChange} displayEmpty
            startAdornment={<InputAdornment position="start"><CalendarTodayIcon sx={{ color: '#173C95', fontSize: size === 'small' ? 15 : 18 }} /></InputAdornment>}
            sx={{ '& .MuiSelect-select': { py: 0.5, fontSize: size === 'small' ? '0.88rem' : '0.95rem' } }}>
            {availableYears.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
        </Select>
    </FormControl>
);

// ─── MobileSubCard ────────────────────────────────────────────────────────────

const MobileSubCard = ({ item, onDownload, pdfStatus, previousYear, selectedYear }) => (
    <Card variant="outlined" sx={{ mb: 1, borderRadius: '10px', backgroundColor: 'white' }}>
        <CardContent sx={{ p: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '11px', mb: 1, color: '#1e3a8a' }}>• {item.Description}</Typography>
            <Grid container spacing={0.5}>
                <Grid item xs={4}><Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Unit</Typography><Typography sx={{ fontSize: '11px' }}>{item.Unit || '—'}</Typography></Grid>
                <Grid item xs={4}><Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Baseline</Typography><Typography sx={{ fontSize: '11px' }}>{item.BaseValue || '—'}</Typography></Grid>
                <Grid item xs={4}><Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Expected</Typography><Typography sx={{ fontSize: '11px' }}>{item.ExpectedValue || '—'}</Typography></Grid>
                <Grid item xs={6} sx={{ mt: 0.5 }}><Typography sx={{ fontSize: '9px', color: '#6b7280' }}>Prev ({previousYear})</Typography><Typography sx={{ fontSize: '11px' }}>{item.PRVStatusValue || '—'}</Typography></Grid>
                <Grid item xs={6} sx={{ mt: 0.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Button variant="contained" size="small"
                        sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: '10px', py: 0.4, px: 1 }}
                        onClick={() => onDownload(item.Serial_No, selectedYear)} disabled={!pdfStatus[item.Serial_No]}>PDF</Button>
                </Grid>
            </Grid>
            <Box sx={{ mt: 0.8, p: '5px 8px', borderRadius: '7px', backgroundColor: '#f8f9ff', border: '1px solid #e8edfa' }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: getStatusColor(item.Serial_No) }}>{item.StatusValue || '—'}</Typography>
            </Box>
        </CardContent>
    </Card>
);

// ─── MobileCard ───────────────────────────────────────────────────────────────

const MobileCard = ({ item, index, hasSubItems, expanded, onToggle, onDownload, pdfStatus, selectedYear, previousYear, isFirst }) => {
    const currentPct  = extractPercent(item.StatusDesc)    ?? extractPercent(item.StatusValue);
    const expectedPct = extractPercent(item.ExpectedDesc)  ?? extractPercent(item.ExpectedValue);
    const prevPct     = extractPercent(item.PRVStatusDesc) ?? extractPercent(item.PRVStatusValue);

    const toNum = (val) => { if (!val) return null; const n = parseFloat(val.toString().replace(/,/g, '')); return isNaN(n) ? null : n; };
    const curNum  = toNum(item.StatusValue);
    const prevNum = toNum(item.PRVStatusValue);
    const trendVal = curNum !== null && prevNum !== null
        ? curNum > prevNum ? { icon: '▲', color: '#15803d' }
        : curNum < prevNum ? { icon: '▼', color: '#dc2626' }
        : { icon: '●', color: '#9ca3af' }
        : null;

    return (
        <Card sx={{ mb: 2, borderRadius: '14px', border: isFirst ? '1.5px solid #3b5fc0' : '1px solid #e0e7ff', boxShadow: isFirst ? '0 4px 16px rgba(23,60,149,0.13)' : '0 1px 6px rgba(23,60,149,0.06)', overflow: 'hidden' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', px: 1.5, pt: 1.5, pb: 1, gap: 0.8, backgroundColor: isFirst ? '#f0f4ff' : '#f8faff', borderBottom: '1px solid #e8edfa', position: 'relative' }}>
                <Box sx={{ minWidth: 24, height: 24, borderRadius: '50%', backgroundColor: '#173C95', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0, mt: '1px' }}>{index + 1}</Box>
                <Typography sx={{ fontWeight: 600, color: '#1e3a8a', fontSize: '0.82rem', flex: 1, lineHeight: 1.4, wordBreak: 'break-word', pr: trendVal && isFirst ? '30px' : 0 }}>{item.Description}</Typography>
                {trendVal && isFirst && <Box sx={{ fontSize: '25px', fontWeight: 800, color: trendVal.color, position: 'absolute', right: hasSubItems ? 40 : 16, top: '14px', lineHeight: 1 }}>{trendVal.icon}</Box>}
                {hasSubItems && <IconButton size="small" onClick={onToggle} sx={{ color: '#173C95', p: '2px', flexShrink: 0, ml: 'auto', zIndex: 1 }}>{expanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}</IconButton>}
            </Box>

            <CardContent sx={{ px: 1.5, pt: 1.5, pb: 1 }}>
                {isFirst ? (
                    <>
                        <MetricBox currentPct={currentPct} expectedPct={expectedPct} prevPct={prevPct}
                            currentYear={selectedYear} previousYear={previousYear}
                            currentRaw={item.StatusValue} expectedRaw={item.ExpectedValue} prevRaw={item.PRVStatusValue} />
                        {/* ✅ No axios here — MultiYearChart reads from Redux */}
                        <MultiYearChart serialNo={item.Serial_No} type={item.Type} selectedYear={selectedYear} />
                        <Box sx={{ height: 8 }} />
                    </>
                ) : (
                    <>
                        <Grid container spacing={0.5} sx={{ mb: 0.5 }}>
                            <Grid item xs={4}><Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Unit</Typography><Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.Unit || '—'}</Typography></Grid>
                            <Grid item xs={4}><Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Baseline</Typography><Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.BaseValue || '—'}</Typography></Grid>
                            <Grid item xs={4}><Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Responsibility</Typography><Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.Resposibility || '—'}</Typography></Grid>
                            <Grid item xs={6} sx={{ mt: 0.5 }}><Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Prev Year ({previousYear})</Typography><Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.PRVStatusValue || '—'}</Typography></Grid>
                            <Grid item xs={6} sx={{ mt: 0.5 }}><Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Expected ({selectedYear})</Typography><Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{item.ExpectedValue || '—'}</Typography></Grid>
                        </Grid>
                        <Box sx={{ mt: 0.8, mb: 0.5, p: '6px 8px', borderRadius: '8px', backgroundColor: '#f8f9ff', border: '1px solid #e8edfa' }}>
                            <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 0.2 }}>
                                Status at{' '}
                                <span style={{ background: '#1d4ed8', color: 'white', borderRadius: '5px', padding: '1px 5px', fontSize: '9px' }}>Manual</span>
                                {' '}&{' '}
                                <span style={{ background: '#15803d', color: 'white', borderRadius: '5px', padding: '1px 5px', fontSize: '9px' }}>System</span>
                                {' '}Update
                            </Typography>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: getStatusColor(item.Serial_No) }}>{item.StatusValue || '—'}</Typography>
                        </Box>
                        {item.AnnexureDesc && (
                            <Box sx={{ mt: 0.5 }}>
                                <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Remarks</Typography>
                                <Typography sx={{ fontSize: '11px', wordBreak: 'break-word', lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: item.AnnexureDesc.replace(/\r\n/g, '<br />') }} />
                            </Box>
                        )}
                    </>
                )}
            </CardContent>

            <CardActions sx={{ px: 1.5, pb: 1.5, pt: 0, justifyContent: 'flex-end' }}>
                <Button variant="contained" size="small" startIcon={<PictureAsPdfIcon />}
                    sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: '11px', borderRadius: '8px' }}
                    onClick={() => onDownload(item.Serial_No, selectedYear)} disabled={!pdfStatus[item.Serial_No]}>PDF</Button>
            </CardActions>

            {hasSubItems && expanded && item.subItems && (
                <Collapse in={expanded}>
                    <Divider />
                    <Box sx={{ backgroundColor: '#f0f4ff', p: 1.5 }}>
                        <Typography sx={{ mb: 1, color: '#173C95', fontSize: '0.75rem', fontWeight: 700 }}>Sub Items</Typography>
                        {item.subItems.map((sub, idx) => (
                            <MobileSubCard key={`sub-${sub.Serial_No}-${idx}`} item={sub} onDownload={onDownload} pdfStatus={pdfStatus} previousYear={previousYear} selectedYear={selectedYear} />
                        ))}
                    </Box>
                </Collapse>
            )}
        </Card>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const CompanyDashboard = () => {
    const theme    = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const {
        availableYears,
        selectedYearStrategic, selectedYearRevenue, selectedYearOther,
        rows1, loadingS, errorS, pdfStatusS,
        rows2, loadingR, errorR, pdfStatusR,
        rows3, loadingO, errorO, pdfStatusO,
        subItems, parentKeyMap, selectedOptions,
        expandedRow,
        snackbar,
    } = useSelector((state) => state.kpi);

    // Kick off initial data load
    useEffect(() => { dispatch(initYears()); }, [dispatch]);

    const previousYearS = !isNaN(selectedYearStrategic) ? (Number(selectedYearStrategic) - 1).toString() : '';
    const previousYearR = !isNaN(selectedYearRevenue)   ? (Number(selectedYearRevenue)   - 1).toString() : '';
    const previousYearO = !isNaN(selectedYearOther)     ? (Number(selectedYearOther)     - 1).toString() : '';

    const CW = { expand: '50px', no: '50px', desc: '280px', unit: '70px', base: '120px', prv: '130px', exp: '130px', status: '155px', resp: '120px', remarks: '200px', view: '80px' };

    const hasSub = useCallback((sn) => !!parentKeyMap[sn], [parentKeyMap]);

    const getSubItemsForRow = useCallback((sn) => {
        if (!subItems[sn]) return [];
        let filtered = subItems[sn];
        if (selectedOptions[sn] && selectedOptions[sn] !== 'All')
            filtered = filtered.filter((i) => i.Description === selectedOptions[sn]);
        return filtered;
    }, [subItems, selectedOptions]);

    const handleDownload = useCallback((id, year) => {
        window.open(getPdfUrl(year, id), '_blank');
    }, []);

    // ── Mobile renderer ────────────────────────────────────────────────────────
    const renderMobileSection = (title, rows, loading, error, pdfStatus, selectedYear, previousYear, type) => {
        const items = rows.map((row) => ({ ...row, Type: type, subItems: getSubItemsForRow(row.Serial_No) }));
        const onYearChange = (e) => {
            if      (type === 'C') dispatch(setSelectedYearStrategic(e.target.value));
            else if (type === 'R') dispatch(setSelectedYearRevenue(e.target.value));
            else                   dispatch(setSelectedYearOther(e.target.value));
        };
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: title !== 'Strategic Objectives' ? 3 : 1 }}>
                    <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700, fontSize: '1.05rem' }}>{title}</Typography>
                    <YearSelector value={selectedYear} onChange={onYearChange} availableYears={availableYears} />
                </Box>
                {loading
                    ? <DashboardSkeleton />
                    : error
                        ? <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>
                        : items.length > 0
                            ? items.map((item, idx) => (
                                <MobileCard key={`${type}-${item.Serial_No}-${idx}`}
                                    item={item} index={idx}
                                    hasSubItems={hasSub(item.Serial_No)}
                                    expanded={expandedRow === item.Serial_No}
                                    onToggle={() => dispatch(setExpandedRow(expandedRow === item.Serial_No ? null : item.Serial_No))}
                                    onDownload={handleDownload} pdfStatus={pdfStatus}
                                    selectedYear={selectedYear} previousYear={previousYear}
                                    isFirst={idx === 0 && type === 'C'}
                                />
                            ))
                            : <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '12px', mb: 2 }}>
                                <Typography color="textSecondary">No data for {selectedYear}</Typography>
                            </Paper>
                }
            </>
        );
    };

    // ── Desktop renderer ───────────────────────────────────────────────────────
    const renderDesktopTable = ({ rows, loading, error, pdfStatus, selectedYear, previousYear, totalCols }) => (
        <Paper variant="outlined" sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(23,60,149,0.08)', border: '1px solid rgba(23,60,149,0.1)', mb: 4 }}>
            <TableContainer sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                <Table size="small" stickyHeader sx={{ tableLayout: 'fixed', '& .MuiTableCell-root': { borderBottom: '1px solid rgba(23,60,149,0.1)' } }}>
                    <TableHead>
                        <TableRow>
                            {[
                                { w: CW.expand, label: '' },
                                { w: CW.no,      label: 'No',                           align: 'center' },
                                { w: CW.desc,    label: 'Description'                                   },
                                { w: CW.unit,    label: 'Unit',                          align: 'center' },
                                { w: CW.base,    label: 'Baseline',                      align: 'center' },
                                { w: CW.prv,     label: `Prev Year Status\n(${previousYear})`, align: 'center' },
                                { w: CW.exp,     label: `Expected Outcome\n${selectedYear}`,   align: 'center' },
                                { w: CW.status,  label: 'Status (Manual & System)',       align: 'center' },
                                { w: CW.resp,    label: 'Responsibility',                 align: 'center' },
                                { w: CW.remarks, label: 'Remarks'                                        },
                                { w: CW.view,    label: 'View',                           align: 'center' },
                            ].map((col, i) => (
                                <TableCell key={i} width={col.w} align={col.align}
                                    sx={{ backgroundColor: '#173C95', color: 'white', fontWeight: 600, fontSize: 12, whiteSpace: 'pre-line', py: '10px' }}>
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={totalCols} align="center" sx={{ py: 3 }}><Typography>Loading…</Typography></TableCell></TableRow>
                        ) : error ? (
                            <TableRow><TableCell colSpan={totalCols} align="center" sx={{ py: 3 }}><Alert severity="error">{error}</Alert></TableCell></TableRow>
                        ) : rows.length > 0 ? rows.map((row, index) => (
                            <React.Fragment key={`${row.Serial_No}-${index}`}>
                                <StyledTableRow hover>
                                    <TableCell align="center">
                                        {hasSub(row.Serial_No) && (
                                            <IconButton size="small"
                                                onClick={() => dispatch(setExpandedRow(expandedRow === row.Serial_No ? null : row.Serial_No))}
                                                sx={{ color: '#173C95' }}>
                                                {expandedRow === row.Serial_No ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    <TableCell align="center"><Typography fontSize={13}>{index + 1}</Typography></TableCell>
                                    <TableCell><Typography fontSize={13} sx={{ fontWeight: hasSub(row.Serial_No) ? 600 : 400, whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.Description}</Typography></TableCell>
                                    <TableCell align="center"><Typography fontSize={13}>{row.Unit}</Typography></TableCell>
                                    <TableCell align="center"><Typography fontSize={13}>{row.BaseValue}</Typography></TableCell>
                                    <TableCell align="center"><Typography fontSize={13}>{row.PRVStatusValue}</Typography></TableCell>
                                    <TableCell align="center"><Typography fontSize={13}>{row.ExpectedValue}</Typography></TableCell>
                                    <TableCell align="center"><Typography fontSize={13} sx={{ color: getStatusColor(row.Serial_No), fontWeight: 600 }}>{row.StatusValue}</Typography></TableCell>
                                    <TableCell align="center"><Typography fontSize={13}>{row.Resposibility}</Typography></TableCell>
                                    <TableCell><Typography fontSize={13} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: row.AnnexureDesc?.replace(/\r\n/g, '<br />') || '' }} /></TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" size="small"
                                            sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: 11, minWidth: 55 }}
                                            onClick={() => handleDownload(row.Serial_No, selectedYear)}
                                            disabled={!pdfStatus[row.Serial_No]}>PDF</Button>
                                    </TableCell>
                                </StyledTableRow>

                                {hasSub(row.Serial_No) && expandedRow === row.Serial_No && (
                                    <TableRow>
                                        <TableCell colSpan={totalCols} sx={{ p: 0 }}>
                                            <Collapse in>
                                                <Box sx={{ backgroundColor: '#f8f9ff', p: 2 }}>
                                                    <Table size="small">
                                                        <TableBody>
                                                            {getSubItemsForRow(row.Serial_No).map((sub, idx) => (
                                                                <SubItemRow key={`sub-${sub.Serial_No}-${idx}`}>
                                                                    <TableCell /><TableCell />
                                                                    <TableCell><Typography fontSize={12} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>• {sub.Description}</Typography></TableCell>
                                                                    <TableCell align="center"><Typography fontSize={12}>{sub.Unit}</Typography></TableCell>
                                                                    <TableCell align="center"><Typography fontSize={12}>{sub.BaseValue}</Typography></TableCell>
                                                                    <TableCell align="center"><Typography fontSize={12}>{sub.PRVStatusValue}</Typography></TableCell>
                                                                    <TableCell align="center"><Typography fontSize={12}>{sub.ExpectedValue}</Typography></TableCell>
                                                                    <TableCell align="center"><Typography fontSize={12} sx={{ color: getStatusColor(sub.Serial_No), fontWeight: 600 }}>{sub.StatusValue}</Typography></TableCell>
                                                                    <TableCell align="center"><Typography fontSize={12}>{sub.Resposibility}</Typography></TableCell>
                                                                    <TableCell><Typography fontSize={12} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{sub.AnnexureDesc}</Typography></TableCell>
                                                                    <TableCell align="center">
                                                                        <Button variant="contained" size="small"
                                                                            sx={{ backgroundColor: '#286090', '&:hover': { backgroundColor: '#1e4a76' }, fontSize: 10, minWidth: 50 }}
                                                                            onClick={() => handleDownload(sub.Serial_No, selectedYear)}
                                                                            disabled={!pdfStatus[sub.Serial_No]}>PDF</Button>
                                                                    </TableCell>
                                                                </SubItemRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={totalCols} align="center" sx={{ py: 3 }}>
                                    <Typography color="textSecondary">No data for {selectedYear}</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <Fade in timeout={600}>
            <Box>
                {isMobile ? (
                    <Box>
                        {renderMobileSection('Strategic Objectives', rows1, loadingS, errorS, pdfStatusS, selectedYearStrategic, previousYearS, 'C')}
                        {renderMobileSection('Revenue Targets',      rows2, loadingR, errorR, pdfStatusR, selectedYearRevenue,   previousYearR, 'R')}
                        {renderMobileSection('Other Targets',        rows3, loadingO, errorO, pdfStatusO, selectedYearOther,     previousYearO, 'S')}
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700 }}>Strategic Objectives</Typography>
                            <YearSelector value={selectedYearStrategic} onChange={(e) => dispatch(setSelectedYearStrategic(e.target.value))} availableYears={availableYears} size="medium" />
                        </Box>
                        {renderDesktopTable({ rows: rows1, loading: loadingS, error: errorS, pdfStatus: pdfStatusS, selectedYear: selectedYearStrategic, previousYear: previousYearS, totalCols: 11 })}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700 }}>Revenue Targets</Typography>
                            <YearSelector value={selectedYearRevenue} onChange={(e) => dispatch(setSelectedYearRevenue(e.target.value))} availableYears={availableYears} size="medium" />
                        </Box>
                        {renderDesktopTable({ rows: rows2, loading: loadingR, error: errorR, pdfStatus: pdfStatusR, selectedYear: selectedYearRevenue, previousYear: previousYearR, totalCols: 11 })}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: '#173C95', fontWeight: 700 }}>Other Targets</Typography>
                            <YearSelector value={selectedYearOther} onChange={(e) => dispatch(setSelectedYearOther(e.target.value))} availableYears={availableYears} size="medium" />
                        </Box>
                        {renderDesktopTable({ rows: rows3, loading: loadingO, error: errorO, pdfStatus: pdfStatusO, selectedYear: selectedYearOther, previousYear: previousYearO, totalCols: 11 })}
                    </Box>
                )}

                <Snackbar open={snackbar.open} autoHideDuration={3000}
                    onClose={() => dispatch(closeSnackbar())}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={() => dispatch(closeSnackbar())} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                <style>{`
                    @keyframes shimmer {
                        0%   { background-position: -200% 0; }
                        100% { background-position:  200% 0; }
                    }
                `}</style>
            </Box>
        </Fade>
    );
};

export default CompanyDashboard;