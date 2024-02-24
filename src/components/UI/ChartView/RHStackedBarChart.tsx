import { Box, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IChartView } from 'models/app';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import MuiButton from '../MuiButton';
import { IMediaQuery } from 'types/mediaQuery';
import useResponsive from 'hooks/useResponsive';
import DialogModal from '../DialogModal';
import { Download, Fullscreen, Minimize } from '@mui/icons-material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
);




interface Props extends IChartView {
    categories: string[];
    series: any[];
}

export const RHStackedBarChart: React.FC<Props> = ({ data, label, series, categories, maxHeight, backgroundColorPie, borderColorPie, indexAxis, minHeight, minWidth, onExport, onCustomDownload, Id }) => {
    const params: IMediaQuery = { query: 'up', key: 'md' };
    const mdUp = useResponsive(params);
    const [openFullScreen, setOpenFullScreen] = useState<boolean>(false);

    let initialHeight = series[0].data.length * 30;
    let initialWidth = series[0].data.length * 30;
    const [anchorElMenu, setAnchorElMenu] = useState<null | (EventTarget & HTMLElement)>(null);
    const isMenuOpenMenu = Boolean(anchorElMenu);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElMenu(event.currentTarget);
    const handleMenuCloseMenu = () => setAnchorElMenu(null);
    const handleFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);


    const initialChartData = {
        labels: categories,
        datasets: series.map((item: any, index: number) => {
            return {
                label: item.name,
                data: item.data,
                backgroundColor: backgroundColorPie![index] || 'rgba(255, 99, 132, 0.2)',
                borderColor: borderColorPie![index] || 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: true,
            }
        }),
    };

    const handleExport = (type: string) => {
        if (type === 'xlsx') {
            // use XLSX to export to pdf
            onExport && onExport();
            return;
        }
        const canvas = document.querySelector('#' + Id) as HTMLCanvasElement;
        const url = canvas.toDataURL('image/' + type);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chart.' + type;
        a.click();
    }
    const getChildrenData = (children: any, label: string) => {

        return {
            labels: children.Data.Labels,
            datasets: children.Data.Values.map((item: any, index: number) => ({
                label: item.name,
                data: item.data,
                backgroundColor: children.Data.backgroundColorPie[index] || 'rgba(75,192,192,0.4)',
                borderColor: children.Data.borderColorPie[index] || 'rgba(75,192,192,1)',
                borderWidth: 1,

            }))
        }
    };
    const [chartData, setChartData] = useState<any>(initialChartData);
    const [previousChartData, setPreviousChartData] = useState<any>(null);

    const handleBarClick = (event: any, elements: any) => {
        // Save the previous chart data before updating
        if (!previousChartData) {
            let children = data.Children && data.Children.length > 0 ? data.Children[elements[0].index] : null;
            if (children) {
                setPreviousChartData(chartData);
                setChartData(getChildrenData(children, children.LabelFilter));
            }
        }
    };

    const handleBackButtonClick = () => {
        // Revert to the previous chart data
        if (previousChartData) {
            setChartData(previousChartData);
            setPreviousChartData(null);
        }
    };

    const options = {
        plugins: {
            title: {
                display: false,
            },
            legend: {
                onClick: (e: any, legendItem: any) => console.log("legend clicked", legendItem),
            },
            tooltip: {
                enabled: true,
                titleColor: "#FFFFFF",
            },
            datalabels: {
                display: true,
                color: "white",

            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                }
            } as any

        },
        barPercentage: series[0].data.length === 1 ? .3 : 1,

        maintainAspectRatio: false,
        elements: {
            bar: {
                borderWidth: 5,
                borderRadius: 10,
            },
        },
        onClick: (event: any, elements: any) => {
            handleBarClick(event, elements);
        },
        onHover: (event: any, elements: any) => {
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        indexAxis: indexAxis || 'y' as const,
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
                    <Tooltip title="Full Screen">
                        <IconButton onClick={handleFullScreen}>
                            <Fullscreen />
                        </IconButton>
                    </Tooltip>
                    {onCustomDownload && <Tooltip title="Download Annual Report">
                        <IconButton onClick={onCustomDownload}>
                            <Download />
                        </IconButton>
                    </Tooltip>}
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
                    {onExport && <MenuItem onClick={() => handleExport('xlsx')}>
                        Export as EXCEL
                    </MenuItem>}
                </Menu>

            </Grid>
            {previousChartData && <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}> <MuiButton variant='text' onClick={handleBackButtonClick}>
                Back
            </MuiButton>
            </Grid>}
            <div style={{
                maxHeight: maxHeight || 500,
                maxWidth: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                overflow: 'auto',
            }}>
                <Bar
                    options={options}
                    data={chartData}
                    width={mdUp ? 1600 : 2000}
                    height={mdUp ? 400 : 800}
                    id={Id}
                />
            </div>
            {openFullScreen && <DialogModal
                open={openFullScreen}
                onClose={handleCloseFullScreen}
                title={label}
                fullScreen
                children={
                    <Box sx={{
                        overflow: 'auto',
                    }}>
                        <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}>
                            <Grid item>
                                <Tooltip title="Full Screen">
                                    <IconButton onClick={handleCloseFullScreen}>
                                        <Minimize />
                                    </IconButton>
                                </Tooltip>
                                {onCustomDownload && <Tooltip title="Download Annual Report">
                                    <IconButton onClick={onCustomDownload}>
                                        <Download />
                                    </IconButton>
                                </Tooltip>}
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
                                {onExport && <MenuItem onClick={() => handleExport('xlsx')}>
                                    Export as EXCEL
                                </MenuItem>}
                            </Menu>

                        </Grid>
                        {previousChartData && <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}> <MuiButton variant='text' onClick={handleBackButtonClick}>
                            Back
                        </MuiButton>
                        </Grid>}
                        <div style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            overflow: 'auto',
                            minHeight: minHeight || 800,
                            minWidth: minWidth || 800,
                            maxHeight: '100%',
                            maxWidth: '100%',
                        }}>
                            <Bar
                                options={options}
                                data={chartData}
                                width={mdUp ? initialWidth : 800}
                                height={mdUp ? initialHeight : 800}
                                id={Id}
                            />
                        </div>
                    </Box>

                }
            />}
        </>
    );
}

export default RHStackedBarChart;
