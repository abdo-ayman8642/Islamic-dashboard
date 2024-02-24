import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { IChartView } from 'models/app';
import { Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Tooltip2 from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { exportXLSX } from 'helpers/utils';
import { Fullscreen, Minimize } from '@mui/icons-material';
import DialogModal from '../DialogModal';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props extends IChartView { }

export const RHLineChart: React.FC<Props> = ({ data, label, isMultiple, multipleData, Id, maxHeight, backgroundColorPie, borderColorPie
}) => {


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
    }
    const chartData: any = {
        labels: multipleData && multipleData.length > 0 ? multipleData![0].Labels : data.Labels,
        datasets: multipleData!.map((item, index) => ({
            label: item.label!,
            data: item.Values!,
            fill: false,
            backgroundColor: backgroundColorPie![index],
            borderColor: borderColorPie![index],
            borderWidth: 1,
        })) || []
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };




    return (
        <>
            <Grid container justifyContent={'space-between'} alignItems="center" mb={2}>
                <Typography variant="h3" sx={{
                    textAlign: 'center',
                    alignItems: 'center',
                }}>
                    {label}
                </Typography>
                <Stack direction="row" >
                    <Tooltip2 title="Full Screen">
                        <IconButton onClick={handleFullScreen}>
                            <Fullscreen />
                        </IconButton>
                    </Tooltip2>
                    <Tooltip2 title="Export">
                        <IconButton onClick={handleOpenMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip2>

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
            <Line options={options} data={chartData} style={{
                height: maxHeight || 'auto',
                width: '100% !important',
                overflow: 'auto'
            }} id={Id} />
            {openFullScreen && <DialogModal
                open={openFullScreen}
                onClose={handleCloseFullScreen}
                title={label}
                fullScreen
                children={
                    <>
                        <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}>
                            <Grid item>
                                <Tooltip2 title="Full Screen">
                                    <IconButton onClick={handleCloseFullScreen}>
                                        <Minimize />
                                    </IconButton>
                                </Tooltip2>
                                <Tooltip2 title="Export">
                                    <IconButton onClick={handleOpenMenu}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip2>

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
                            <Line options={options} data={chartData} style={{
                                width: '100% !important',
                                maxHeight: 'calc(100vh - 80px - 80px) !important',

                                overflow: 'auto'
                            }} id={Id} />
                        </Grid>
                    </>
                }
            />}
        </>
    );
}

export default RHLineChart;
