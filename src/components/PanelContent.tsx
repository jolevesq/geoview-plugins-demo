/**
 * Panel Content Properties
 */
interface PanelContentProps {
  mapId: string;
  buttonPanel: any;
}

const w = window as any;

const cgpv = w['cgpv'];

/**
 * Create a new panel content
 *
 * @param {PanelContentProps} props panel content properties
 * @returns {JSX.Element} the new create panel content
 */
export const PanelContent = (props: PanelContentProps): JSX.Element => {
  const { buttonPanel } = props;
  const { ui } = cgpv;

  const { Button } = ui.elements;

  return (
    <div>
      <div>Test content</div>
      <p>
        <Button
          tooltip="Add Action Button"
          tooltipPlacement="right"
          type="text"
          onClick={() => {
            buttonPanel?.panel?.addActionButton(
              'testButton',
              'Test',
              '<i class="material-icons">details</i>',
              () => {
                alert('Test');
              },
            );
          }}
        >
          Add New Button
        </Button>
      </p>
      <p>
        <Button
          tooltip="Change Content"
          tooltipPlacement="right"
          type="text"
          onClick={() => {
            buttonPanel?.panel?.changeContent('New Content');
          }}
        >
          Change Content
        </Button>
      </p>
    </div>
  );
};
