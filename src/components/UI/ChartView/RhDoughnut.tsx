import React, { useState } from 'react';
import { IChartView } from 'models/app';
import { Grid } from '@mui/material';
import MuiButton from '../MuiButton';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


interface Props extends IChartView { }

export const RhDoughnut: React.FC<Props> = ({ data, label, backgroundColor, borderColor, borderWidth,
    stack, childrenBackgroundColor, childrenBorderColor, childrenBorderWidth, childrenStack, min, max
}) => {


    const initialChartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const getChildrenData = (children: any, label: string) => {

        return {
            labels: children.Data.Labels,
            datasets: [
                {
                    label,
                    data: children.Data.Values.map((item: any) => parseFloat(item)),
                    backgroundColor: childrenBackgroundColor || [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: childrenBorderColor || [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
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
        let children = data.Children && data.Children.length > 0 ? data.Children[elements[0].index] : null;
        if (children) {
            setPreviousChartData(chartData);
            setChartData(getChildrenData(children, children.LabelFilter));
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
        },
        onClick: (event: any, elements: any) => {
            handleBarClick(event, elements);
        },
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            axis: {
                stacked: true,
            },

        },
    };





    return (
        < >
            {previousChartData && <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}> <MuiButton variant='text' onClick={handleBackButtonClick}>
                Back
            </MuiButton>
            </Grid>}
            <Doughnut data={chartData} options={options} />
        </>
    );
}

export default RhDoughnut;
