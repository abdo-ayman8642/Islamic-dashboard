import { CHARTS } from 'constants/enums';
import RHBarChart from './RHBarChart';
import { IChartView } from 'models/app';
import RHRadarChart from './RHRadarChart';
import RHPieChart from './RHPieChart';
import RHLineChart from './RHLineChart';
import RHPolarArea from './PolarArea';
import RhDoughnut from './RhDoughnut';
import RHStackedBarChart from './RHStackedBarChart';
import RHStackedBarChart2 from './RHStackedBarChart2';
import RHGuageChart from './RHGuageChart';
import RHAreaChart from './RHAreaChart';
import RHStackedBarChart3 from './RHStackedBarChart3';
import RHBarChart2 from './RHBarChart2';

interface Props extends IChartView {
  series?: any[];
  categories?: string[];
  onSelectId?: (id: number) => void;
}
const ChartView: React.FC<Props> = (props) => {
  const { type, hidden, series, categories, onSelectId } = props;

  const renderField = (): React.ReactNode => {
    if (hidden) return null;
    if (type === CHARTS.BAR) {
      return <RHBarChart {...props} onSelectId={onSelectId!} />;
    }
    if (type === CHARTS.BAR2) {
      return <RHBarChart2 {...props} />;
    }
    if (type === CHARTS.RADAR) {
      return <RHRadarChart {...props} />;
    }
    if (type === CHARTS.PIE) {
      return <RHPieChart {...props} onSelectId={onSelectId!} />;
    }
    if (type === CHARTS.LINE) {
      return <RHLineChart {...props} />;
    }
    if (type === CHARTS.AREA) {
      return <RHAreaChart {...props} />;
    }
    if (type === CHARTS.POLAR_AREA) {
      return <RHPolarArea {...props} />;
    }
    if (type === CHARTS.DOUGHNUT) {
      return <RhDoughnut {...props} />;
    }
    if (type === CHARTS.GUAGE) {
      return <RHGuageChart {...props} />;
    }
    if (type === CHARTS.MULTI_BAR_CHART) {
      return <RHStackedBarChart {...props} series={series!} categories={categories!} />;
    }
    if (type === CHARTS.MULTI_BAR_CHART2) {
      return <RHStackedBarChart2 {...props} series={series!} categories={categories!} />;
    }
    if (type === CHARTS.MULTI_BAR_CHART3) {
      return <RHStackedBarChart3 {...props} series={series!} categories={categories!} />;
    }

    return null
  };

  return <>{renderField()}</>;
};

export default ChartView;
