import { Chart as ChartJS, ChartConfiguration, DefaultDataPoint, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export type TypeChartPieProps = ChartConfiguration<'pie', DefaultDataPoint<'pie'>>;

/**
 * Create a customized Chart Pie UI
 *
 * @param {TypeChartPieProps} props the properties passed to the Chart element
 * @returns {JSX.Element} the created Chart element
 */
export function ChartPie(props: TypeChartPieProps): JSX.Element {
  const { data, options } = props;

  ChartJS.register(ArcElement, Tooltip, Legend);

  // useEffect(() => {
  //   console.log("ChartPie useEffect Hey")
  //   return () => {
  //     console.log("ChartPie useEffect Kill")
  //   };
  // }, []);

  return <Pie data={data} options={options} />;
}