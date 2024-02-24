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

import { IChartView } from 'models/app';
import { Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import Tooltip2 from '@mui/material/Tooltip';
import { Fullscreen, Minimize } from '@mui/icons-material';
import DialogModal from '../DialogModal';
import ReactApexChart from 'react-apexcharts';

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

export const RHLineChart: React.FC<Props> = ({ data, label, Id, maxHeight, backgroundColorPie, borderColorPie
}) => {

    const [openFullScreen, setOpenFullScreen] = useState<boolean>(false);

    const handleFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);

    const options: any = {
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: 'transparent',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: backgroundColorPie,
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },

                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '17px'
                    },
                    value: {
                        formatter: function (val: any) {
                            return parseInt(val);
                        },
                        color: '#111',
                        fontSize: '36px',
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: backgroundColorPie,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: data?.Labels,
    };

    let series = data.Values.map(a => typeof a === 'string' ? parseInt(a) : a);




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

                </Stack>


            </Grid>
            <Container maxWidth="sm" sx={{
                width: '100% !important',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ReactApexChart options={options} series={series} type="radialBar" height={350} />
            </Container>
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
                            </Grid>
                        </Grid>
                        <ReactApexChart options={options} series={series} type="radialBar" height={350} />

                    </>
                }
            />}
        </>
    );
}

export default RHLineChart;
