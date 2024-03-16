import React, { useState } from 'react';
import { IChartView } from 'models/app';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Container, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import ChartDataLabels from "chartjs-plugin-datalabels";
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { exportXLSX } from 'helpers/utils';
import { Fullscreen, Minimize } from '@mui/icons-material';
import DialogModal from '../DialogModal';
ChartJS.register(ArcElement, Legend, ChartDataLabels);

interface Props extends IChartView {
    onSelectId?: (id: number) => void;
}


export const RHPieChart: React.FC<Props> = ({ data, label, isPercentage, isLocalLabel, Id, onSelectId, maxHeight, backgroundColorPie, borderColorPie }) => {
    const [anchorElMenu, setAnchorElMenu] = useState<null | (EventTarget & HTMLElement)>(null);
    const isMenuOpenMenu = Boolean(anchorElMenu);
    const [openFullScreen, setOpenFullScreen] = useState<boolean>(false);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElMenu(event.currentTarget);
    const handleMenuCloseMenu = () => setAnchorElMenu(null);
    const handleFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);

    const handleExport = (type: string) => {
        if (type === 'xlsx') {
            // use XLSX to export to pdf
            exportXLSX({ data: data.Values, headCells: data.Labels, filename: 'chart' });
            return;
        }
        const canvas = document.querySelector('#' + Id) as HTMLCanvasElement;
        const url = canvas.toDataURL('image/' + type);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chart.' + type;
        a.click();
    };


    const handleBarClick = (event: any, elements: any) => {
        if (onSelectId) {
            onSelectId(data.Ids![elements[0].index]);
        }

    };

    const chartData = {
        labels: data.Labels,
        datasets: [
            {
                label: label,
                data: data.Values,
                backgroundColor: backgroundColorPie || [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: borderColorPie || [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,

            },
        ],
    };

    const options: any = {
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: true,
            },
            datalabels: {
                display: true,
                color: "white",
                font: {
                    size: 12,
                    weight: "bold",
                },
                formatter: function (value: any, context: any) {
                    return isPercentage ? value + " %" : value;
                },

            }
        },
        onClick: (event: any, elements: any) => {
            handleBarClick(event, elements);
        },
        onHover: (event: any, elements: any) => {
        },
        responsive: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },

    };

    return (
        <>
            <Grid container direction={'row'} justifyContent={!isLocalLabel ? 'space-between' : 'end'} alignItems="center" mb={2}>
                {!isLocalLabel && <Typography variant="h3" sx={{
                    textAlign: 'center',
                    alignItems: 'center',
                }}>
                    {label}
                </Typography>}
                <Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
                    <Tooltip title="Full Screen">
                        <IconButton onClick={handleFullScreen}>
                            <Fullscreen />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Export">
                        <IconButton onClick={handleOpenMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>

                </Stack>
                <Menu
                    id={'account-menu1'}
                    anchorEl={anchorElMenu}
                    open={isMenuOpenMenu}
                    onClose={handleMenuCloseMenu}
                    transitionDuration={250}
                    elevation={0}
                    sx={{
                        mt: 1,
                        '& .MuiPaper-root': {
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
                            '.Mui-selected': {
                                backgroundColor: '#00B5A2 !important',
                                color: 'white !important',
                                borderRadius: '8px'
                            }
                        },
                    }}
                    keepMounted>
                    <MenuItem onClick={() => handleExport('png')}>
                        Export as PNG
                    </MenuItem>
                    <MenuItem onClick={() => handleExport('svg')}>
                        Export as SVG
                    </MenuItem>
                    <MenuItem onClick={() => handleExport('jpg')}>
                        Export as JPG
                    </MenuItem>
                    <MenuItem onClick={() => handleExport('xlsx')}>
                        Export as EXCEL
                    </MenuItem>
                </Menu>

            </Grid>
            <Container maxWidth="sm" sx={{
                width: '100% !important',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Pie options={options} data={chartData} style={{
                    maxHeight: maxHeight || 400,
                    width: '100% !important',
                    overflow: 'auto'
                }} id={Id} />

            </Container>
            {openFullScreen && <DialogModal
                open={openFullScreen}
                onClose={handleCloseFullScreen}
                title={label}
                fullScreen
                children={
                    <>
                        <Grid container justifyContent={"end"} alignItems="center" sx={{
                            mb: 4,

                        }}>
                            <Grid item>
                                <Tooltip title="Full Screen">
                                    <IconButton onClick={handleCloseFullScreen}>
                                        <Minimize />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Export">
                                    <IconButton onClick={handleOpenMenu}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>

                            </Grid>
                            <Menu
                                id={'account-menu1'}
                                anchorEl={anchorElMenu}
                                open={isMenuOpenMenu}
                                onClose={handleMenuCloseMenu}
                                transitionDuration={250}
                                elevation={0}
                                sx={{
                                    mt: 1,
                                    '& .MuiPaper-root': {
                                        backgroundColor: 'white',
                                        borderRadius: '16px',
                                        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
                                        '.Mui-selected': {
                                            backgroundColor: '#00B5A2 !important',
                                            color: 'white !important',
                                            borderRadius: '8px'
                                        }
                                    },
                                }}
                                keepMounted>
                                <MenuItem onClick={() => handleExport('png')}>
                                    Export as PNG
                                </MenuItem>
                                <MenuItem onClick={() => handleExport('svg')}>
                                    Export as SVG
                                </MenuItem>
                                <MenuItem onClick={() => handleExport('jpg')}>
                                    Export as JPG
                                </MenuItem>
                                <MenuItem onClick={() => handleExport('xlsx')}>
                                    Export as EXCEL
                                </MenuItem>
                            </Menu>

                        </Grid>
                        <Grid container alignContent={'center'} justifyContent={'center'} sx={{
                            maxHeight: 'calc(100vh - 80px - 80px) !important',
                        }}>
                            <Pie options={options} data={chartData} style={{
                                width: '100% !important',
                                // height = full screen - title - menu
                                maxHeight: 'calc(100vh - 80px - 80px) !important',
                                overflow: 'auto'
                            }} id={Id} />
                        </Grid>
                    </>
                }
            />}
        </>
    );
};

export default RHPieChart;
