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
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import MuiButton from '../MuiButton';
import { IMediaQuery } from 'types/mediaQuery';
import useResponsive from 'hooks/useResponsive';
import DialogModal from '../DialogModal';
import { Fullscreen, Minimize } from '@mui/icons-material';

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

export const RHStackedBarChart3: React.FC<Props> = ({ data, label, series, categories, backgroundColorPie, borderColorPie, indexAxis, minHeight, minWidth, onExport, Id }) => {
    const params: IMediaQuery = { query: 'up', key: 'md' };
    const mdUp = useResponsive(params);
    const [openFullScreen, setOpenFullScreen] = useState<boolean>(false);

    const [anchorElMenu, setAnchorElMenu] = useState<null | (EventTarget & HTMLElement)>(null);
    const isMenuOpenMenu = Boolean(anchorElMenu);
    const [chartData, setChartData] = useState<any>({
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
    });
    const [previousChartData, setPreviousChartData] = useState<any>(null);


    useEffect(() => {
        setChartData({
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
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [series, categories, backgroundColorPie, borderColorPie]);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElMenu(event.currentTarget);
    const handleMenuCloseMenu = () => setAnchorElMenu(null);
    const handleFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);



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
            datasets: [
                {
                    label,
                    data: children.Data.Values,
                    backgroundColor: backgroundColorPie || '#ff0000',
                    borderColor: borderColorPie || 'rgba(75,192,192,1)',
                    borderWidth: 1,
                },
            ],
        }
    };

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
                barThickness: 20, // Set the desired fixed bar height here
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
        <Box alignItems={'center'} justifyContent={'start'} >
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
            <Stack style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                overflow: 'auto',
                width: minHeight || 800 + '!important',
                minHeight: series[0].data.length * 30

            }}>
                <Bar
                    options={options}
                    data={chartData}
                    width={mdUp ? series[0].data.length * 30 : 800}
                    height={mdUp ? series[0].data.length * 30 : 800}
                    id={Id}
                />
            </Stack>
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
                                width={series[0].data.length * 30}
                                height={series[0].data.length * 30}
                                id={Id}
                            />
                        </div>
                    </Box>

                }
            />}
        </Box>
    );
}

export default RHStackedBarChart3;
