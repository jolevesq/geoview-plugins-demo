import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { MapPosition } from './MapPosition';

/**
 * main container and map styling
 */
const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  map: {
    height: '500px',
  },
}));

// get reference to window object
const w = window as any;

// get reference to geoview apis
const cgpv = w['cgpv'];

/**
 * Create a container containing a leaflet map using the GeoView viewer
 *
 * @returns {JSX.Elemet} the element that creates the container and the map
 */
const App = (): JSX.Element => {
  const classes = useStyles();

  /**
   * initialize the map after it has been loaded
   */
  useEffect(() => {
    cgpv.init(() => {
      // create a new component on the leaflet map after it has been rendered

      /**
       * First parameter is the id of that new component
       * the id can be used to remove the added component using the .removeComponent(id) function
       *
       * Second parameter is the component to add, this can be a react component written in JSX
       * or HTML created using React.createElement
       */
      cgpv.api.map('mapWM').addComponent('text', <MapPosition />);
    });
  }, []);

  return (
    <div className={classes.container}>
      <div>Test loading map from an external package</div>
      <div
        id="mapWM"
        className={['llwp-map', classes.map].join(' ')}
        data-leaflet="{ 'name': 'Web Mercator', 'projection': 3857, 'zoom': 4, 'center': [60,-100], 'language': 'en-CA', 'basemapOptions': { 'id': 'transport', 'shaded': false, 'labeled': true }, 'layers': [] } "
      ></div>
    </div>
  );
};

export default App;
