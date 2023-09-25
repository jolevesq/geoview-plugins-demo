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
        'en': {
          panel: 'Test',
          nothing_found: 'Nothing found',
          action_back: 'Back',
          custom: {
            mapPosition: 'Map Position',
          },
        },
        'fr': {
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
      cgpv.api.maps['mapWM'].addComponent('text', <MapPosition />);

      // get map instance
      const mapInstance = cgpv.api.maps['mapWM'];

      // add custom languages
      mapInstance.i18nInstance.addResourceBundle(
        'en',
        'translation',
        translations['en'],
        true,
        false,
      );
      mapInstance.i18nInstance.addResourceBundle(
        'fr',
        'translation',
        translations['fr'],
        true,
        false,
      );

      // get language
      const language: 'en' | 'fr' = mapInstance.displayLanguage;

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
        .maps['mapWM']
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
        data-lang="en"
        data-config="{
        'map': {
          'interaction': 'dynamic',
          'viewSettings': {
            'zoom': 4,
            'center': [-100, 60],
            'projection': 3978
          },
          'basemapOptions': {
            'id': 'transport',
            'shaded': true,
            'labeled': true
          },
          'layers': []
        },
        'components': ['overview-map],
        'corePackages': [],
        'theme': 'dark',
        'language': 'en',
        'supportedLanguages': ['en']
        }"
      ></div>
    </div>
  );
};

export default App;
