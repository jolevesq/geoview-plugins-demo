import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartType, ChartData, ChartOptions, DefaultDataPoint, Plugin } from 'chart.js';
import { ChartPie } from './charts/chart-pie';

/**
 * Panel Content Properties
 */
interface PanelContentProps {
  mapId: string;
  buttonPanel: any;
}

const w = window as any;

const cgpv = w['cgpv'];

export const NewPanelContent = (props: PanelContentProps): JSX.Element => {
  return <div>New Content</div>;
};

/**
 * Create a new panel content
 *
 * @param {PanelContentProps} props panel content properties
 * @returns {JSX.Element} the new create panel content
 */
export const PanelContent = (props: PanelContentProps): JSX.Element => {
  const { buttonPanel } = props;
  const { ui } = cgpv;

  const { Button, Slider } = ui.elements;

  // ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
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

  return (
    <div>
      <div>Test content</div>
      <div>
        <ChartPie type="pie" data={data as ChartData<'pie', DefaultDataPoint<'pie'>, string>} />
        <Slider
              sliderId="sliderHorizontal"
              min={0}
              max={100}
              value={0}
              track={false}
              marks={[
                { value: 0, label: 'Min Level 0' },
                { value: 4, label: 'Level 4' },
                { value: 8, label: 'Level 8' },
                { value: 18, label: 'Max Level 18' },
              ]}
            />
        <Button
          variant="contained"
          tooltip="Change Content"
          tooltipPlacement="right"
          type="text"
          onClick={() => {
            buttonPanel?.panel?.addActionButton(
              'testButton',
              'Test',
              '<i class="material-icons">arrow_back</i>',
              () => {
                buttonPanel?.panel?.removeActionButton('testButton');

                buttonPanel?.panel?.changeContent(<PanelContent {...props} />);
              },
            );

            buttonPanel?.panel?.changeContent(<NewPanelContent {...props} />);
          }}
        >
          Change Content
        </Button>
      </div>
    </div>
  );
};
