/**
 * IMPORTANT NOTE:
 * Because this is a component that will render on top of the GeoView viewer,
 * you will only be able to use hooks exported from the viewer. All react hooks
 * are exported by default. The reason for this is because this component will
 * render inside the viewer which already has a context, this component will be
 * injected to use that context. Using hooks created outside of the viewer will
 * create a new context and will not work.
 * See below for example of how hooks are imported from the viewer.
 */

/**
 * When using a component that will render inside the GeoView map
 * React needs to be imported
 */
import React from 'react';

/**
 * Create a container that renders the map position after the mouse
 * drag on the map has ended
 *
 * @returns {JSX.Element} the map position container
 */
export const MapPosition = (): JSX.Element => {
  // get a reference to the windows object
  const w = window as any;

  // get a reference to the geoview api
  const cgpv = w['cgpv'];

  // import exported modules from the viewer
  const { api, react, ui, useTranslation } = cgpv;

  /** use react hooks, these hooks uses the viewer's context, importing them from the
   *  importing them from the react module at the top will not work
   */
  const { useState, useEffect } = react;

  // import another hook used by material ui, again if you import it directly it won't work
  const { makeStyles } = ui;

  // state used to store latitude and longtitude after map drag end
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const { t } = useTranslation();

  /**
   * style the position container
   */
  const useStyles = makeStyles((theme: any) => ({
    positionContainer: {
      backgroundColor: theme.palette.primary.light,
      padding: 10,
      height: 180,
      overflow: 'auto',
      pointerEvents: 'initial',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    // listen to map drag move end event
    api.on(
      api.eventNames.MAP.EVENT_MAP_MOVE_END,
      function (res: any) {
        // if the event came from the loaded map
        if (res.handlerName === 'mapWM') {
          // get the returned position
          const position = res.lnglat as any;

          // update the state
          if (position) {
            setLng(position[0]);
            setLat(position[1]);
          }
        }
      },
      'mapWM',
    );
  }, []);

  return (
    <div className={classes.positionContainer}>
      <div>
        {t('custom.mapPosition')} from External Package:
      </div>
      <div>Longitude: {lng}</div>
      <div>Latitude: {lat}</div>
    </div>
  );
};
