import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

import {MapParams} from '../../data';
import leaflet from 'leaflet';

export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  render() {
    return (
      <div ref={this._mapRef}></div>
    );
  }

  componentDidMount() {
    console.log(this.props);

    const {locations, id} = this.props;
    const currentMap = this._mapRef.current;

    currentMap.id = id;

    const {
      ZOOM, CITY, ICON, TILE_LAYER
    } = MapParams;

    const icon = leaflet.icon({
      iconUrl: ICON.URL,
      iconSize: ICON.SIZE
    });


    const map = leaflet.map(currentMap, {
      center: CITY,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    }).setView(CITY, ZOOM);


    leaflet.tileLayer(TILE_LAYER.URL, {
      attribution: TILE_LAYER.OPTIONS.ATTRIBUTION
    })
      .addTo(map);

    [...locations].forEach((it) =>
      leaflet.marker(it, {icon}).addTo(map));
  }
}

Map.propTypes = {
  id: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)).isRequired
};
