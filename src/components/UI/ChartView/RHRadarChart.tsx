import { Grid } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement
} from 'chart.js';
import MuiButton from 'components/UI/MuiButton';
import { IChartView } from 'models/app';
import { useState } from 'react';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement
);


interface Props extends IChartView { }

export const RHRadarChart: React.FC<Props> = ({ data, label, backgroundColor, borderColor, borderWidth,
    stack, childrenBackgroundColor, childrenBorderColor, childrenBorderWidth, childrenStack, min, max
}) => {


    const initialChartData = {
        labels: data.Labels,
        datasets: [
            {
                label,
                data: data.Values,
                backgroundColor: backgroundColor || 'rgba(75,192,192,0.4)',
                borderColor: borderColor || 'rgba(75,192,192,1)',
                borderWidth: borderWidth || 1,
                stack: stack || 'Stack 0',

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
            x: {
                stacked: true,

            },
            y: {
                stacked: true,
                min: min || 0,
                max: max || 100,
            },

        },
    };





    return (
        < >
            {previousChartData && <Grid container justifyContent={"end"} alignItems="center" sx={{ mb: 4 }}> <MuiButton variant='text' onClick={handleBackButtonClick}>
                Back
            </MuiButton>
            </Grid>}
            <Radar data={chartData} />
        </>
    );
}

export default RHRadarChart;
