import { Box, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from 'chart.js';
import MuiButton from 'components/UI/MuiButton';
import { IChartView } from 'models/app';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import { exportXLSX } from 'helpers/utils';
import { IMediaQuery } from 'types/mediaQuery';
import useResponsive from 'hooks/useResponsive';
import DialogModal from '../DialogModal';
import { Fullscreen, Minimize } from '@mui/icons-material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend
);



interface Props extends IChartView { }

export const RHBarChart2: React.FC<Props> = ({ data, Id, label, isLocalLabel, backgroundColor, borderColor, borderWidth,
    stack, childrenBackgroundColor, childrenBorderColor, childrenBorderWidth, childrenStack, min, max, indexAxis,
    maxHeight, minHeight, maxWidth, minWidth,
}) => {
    const [openFullScreen, setOpenFullScreen] = useState<boolean>(false);
    const params: IMediaQuery = { query: 'up', key: 'md' };
    const mdUp = useResponsive(params);


    let initialHeight = data.Values.length * 30;
    let initialWidth = data.Values.length * 30;
    const [anchorElMenu, setAnchorElMenu] = useState<null | (EventTarget & HTMLElement)>(null);
    const isMenuOpenMenu = Boolean(anchorElMenu);

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
    const initialChartData = {
        labels: data.Labels,
        datasets: [
            {
                label,
                data: data.Values,
                backgroundColor: backgroundColor || '#6366F1',
                borderColor: borderColor || '#64748B',
                borderWidth: borderWidth || 1,
                stack: stack || 'Stack 10',

            },
        ],
    };

    const getChildrenData = (children: any, label: string) => {

        return {
            labels: children.Data.Labels,
            datasets: [
                {
                    label,
                    data: children.Data.Values,
                    backgroundColor: childrenBackgroundColor || '#ff0000',
                    borderColor: childrenBorderColor || 'rgba(75,192,192,1)',
                    borderWidth: childrenBorderWidth || 1,
                    stack: childrenStack || 'Stack 0',
                },
            ],
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
            datalabels: {
                display: true,
                color: "white",
            }
        },
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
        // show value on top of bar
        scales: {
            x: {
                stacked: true,
                // show value on top of bar
            },
            y: {
                stacked: true,

            },
        },
        indexAxis: indexAxis || 'y' as const,
    };

    return (
        <>
            <Grid container justifyContent={!isLocalLabel ? 'space-between' : 'end'} alignItems="center" mb={2}>
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
            {indexAxis !== 'x' && <Stack sx={{
                width: '100% !important',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
                minHeight: minHeight || 'auto',
                minWidth: minWidth || 'auto',
                padding: 2,
            }}>
                {previousChartData && <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}> <MuiButton variant='text' onClick={handleBackButtonClick}>
                    Back
                </MuiButton>
                </Grid>}
                <Bar options={options} data={chartData} style={{
                    width: minWidth || 'auto',
                    height: minHeight || 'auto',
                }} width={initialWidth} height={initialHeight > 300 ? initialHeight : 300} id={Id} />
            </Stack>}
            {indexAxis === 'x' && <>
                {previousChartData && <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}> <MuiButton variant='text' onClick={handleBackButtonClick}>
                    Back
                </MuiButton>
                </Grid>}
                <div style={{
                    maxHeight: maxHeight || 500,
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
            </>}

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
                                <MenuItem onClick={() => handleExport('xlsx')}>
                                    Export as EXCEL
                                </MenuItem>
                            </Menu>

                        </Grid>
                        {previousChartData && <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}> <MuiButton variant='text' onClick={handleBackButtonClick}>
                            Back
                        </MuiButton>
                        </Grid>}
                        <Stack sx={{
                            width: '100% !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'auto',
                            minWidth: mdUp ? 1600 : 2000,
                            maxHeight: mdUp ? 600 : 400,
                            padding: 2,
                        }}>
                            <Bar options={options} data={chartData}
                                width={initialWidth}
                                height={initialHeight} id={Id} />
                        </Stack>
                    </Box>
                }

            />}
        </>
    );
}

export default RHBarChart2;
