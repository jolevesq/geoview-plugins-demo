import React, { useEffect } from 'react';

import makeStyles from '@mui/styles/makeStyles';

import {
  TypeWindow,
  TypeJsonObject,
  TypeButtonPanel,
  TypePanelProps,
  TypeIconButtonProps,
} from 'geoview-core-types';

import { MapPosition } from './MapPosition';
import { PanelContent } from './PanelContent';

/**
 * main container and map styling
 */
const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
}));

// get reference to window object
const w = window as TypeWindow;

// get reference to geoview apis
const cgpv = w['cgpv'];

const { ui } = cgpv;

/**
 * Create a container containing a map using the GeoView viewer
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
      /**
       * translations object to inject to the viewer translations
       */
      const translations = {
        'en-CA': {
          panel: 'Test',
          nothing_found: 'Nothing found',
          action_back: 'Back',
          custom: {
            mapPosition: 'Map Position',
          },
        },
        'fr-CA': {
          panel: 'Test',
          nothing_found: 'Aucun résultat',
          action_back: 'Retour',
          custom: {
            mapPosition: 'Localisation sur la carte',
          },
        },
      };

      // create a new component on the map after it has been rendered
      /**
       * First parameter is the id of that new component
       * the id can be used to remove the added component using the .removeComponent(id) function
       *
       * Second parameter is the component to add, this can be a react component written in JSX
       * or HTML created using React.createElement
       */
      cgpv.api.map('mapWM').addComponent('text', <MapPosition />);

      // get map instance
      const mapInstance = cgpv.api.map('mapWM');

      // add custom languages
      mapInstance.i18nInstance.addResourceBundle(
        'en-CA',
        'translation',
        translations['en-CA'],
        true,
        false,
      );
      mapInstance.i18nInstance.addResourceBundle(
        'fr-CA',
        'translation',
        translations['fr-CA'],
        true,
        false,
      );

      // get language
      const { language }: { language: 'en-CA' | 'fr-CA' } = mapInstance;

      // get home icon from ui
      const { HomeIcon } = ui.elements;

      // button props
      const button: TypeIconButtonProps = {
        // set ID to testPanelButton so that it can be accessed from the core viewer
        id: 'testPanelButton',
        tooltip: translations[language].panel,
        tooltipPlacement: 'right',
        children: <HomeIcon />,
        visible: true,
      };

      // panel props
      const panel: TypePanelProps = {
        title: translations[language].panel,
        icon: <HomeIcon />,
        width: 300,
      };

      // create a new button panel on the appbar
      const buttonPanel = cgpv.api
        .map('mapWM')
        .appBarButtons.createAppbarPanel(button, panel, null);

      // set panel content
      buttonPanel?.panel?.changeContent(
        <PanelContent buttonPanel={buttonPanel} mapId={'mapWM'} />,
      );
    });
  }, []);

  return (
    <div className={classes.container}>
      <div>Test loading map from an external package</div>
      <div
        id="mapWM"
        className={`llwp-map ${classes.container}`}
        style={{
          height: '100vh',
          zIndex: 0,
        }}
        data-lang="en-CA"
        data-config="{
        'map': {
          'interaction': 'dynamic',
          'view': {
            'zoom': 4,
            'center': [-100, 60],
            'projection': 3857
          },
          'basemapOptions': {
            'id': 'transport',
            'shaded': false,
            'labeled': true
          },
          'layers': []
        },
        'theme': 'dark',
        'languages': ['en-CA']
        }"
      ></div>
    </div>
  );
};

export default App;
