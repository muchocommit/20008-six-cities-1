import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';

import L from 'leaflet';

export default class Map extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    return (<div id="map"></div>);
  }

  componentDidMount() {
    const map = L.map(`${`map`}`).setView([51.505, -0.09], 13);

    L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    })
      .addTo(map);
  }
}
//
// Map.propTypes = {
//   id: PropTypes.string.isRequired
// };
