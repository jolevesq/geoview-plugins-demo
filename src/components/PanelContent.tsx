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

  const { Button } = ui.elements;

  return (
    <div>
      <div>Test content</div>
      <div>
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
