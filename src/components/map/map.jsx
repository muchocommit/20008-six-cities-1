import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

import {MapParams} from '../../data';
import {
  getLocationsCoordinates,
  getPureLocations, getLocationMean,
  accumulateLocationsFromArray} from '../../reducers/data/data';

import leaflet from 'leaflet';

export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = {};
    this._markerGroup = null;
    this._mapRef = createRef();
  }

  set markerGroup(object) {
    this._markerGroup = object;
  }

  get markerGroup() {
    if (this._markerGroup &&
      typeof this._markerGroup === `object`) {
      return this._markerGroup;
    }
    return {};
  }


  static _getCityLocation(locations) {
    const pureLocations = getPureLocations(locations);
    const accumulatedLocation = accumulateLocationsFromArray(pureLocations);

    return getLocationMean(accumulatedLocation, locations.length);
  }

  _renderMarkers() {
    const {locations} = this.props;

    const {ICON, CITY_ZOOM, ICON_FOCUS} = MapParams;

    const icon = leaflet.icon({
      iconUrl: ICON.URL,
      iconSize: ICON.SIZE,
      id: null
    });

    const newIcon = leaflet.icon({
      iconUrl: ICON_FOCUS.URL,
      iconSize: ICON_FOCUS.SIZE,
      id: null
    });


    [...locations].forEach((it) => {

      return leaflet.marker(getLocationsCoordinates(it), {icon, id: it.id})
        .addTo(this.markerGroup).on(`click`, (e) => {

          const {target} = e;

          if (target.getIcon().options.iconUrl === ICON_FOCUS.URL) {
            target.setIcon(icon);
          } else {
            target.setIcon(newIcon);
          }

          this._map.setView([it.location.latitude, it.location.longitude], CITY_ZOOM);
        });
    });

  }

  render() {
    return (
      <div ref={this._mapRef}></div>
    );
  }

  componentDidMount() {
    const {mapId, locations} = this.props;
    const currentMap = this._mapRef.current;

    currentMap.id = mapId;
    const {
      ZOOM, CITY, TILE_LAYER
    } = MapParams;

    const map = leaflet.map(currentMap, {
      center: CITY,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this.markerGroup = leaflet.layerGroup().addTo(map);

    leaflet.tileLayer(TILE_LAYER.URL, {
      attribution: TILE_LAYER.OPTIONS.ATTRIBUTION
    })
      .addTo(map);

    this._renderMarkers();
    const cityLocation = Map._getCityLocation(locations);

    map.setView([cityLocation.latitude, cityLocation.longitude], ZOOM);

    this._map = map;
  }

  componentDidUpdate() {
    const {ZOOM} = MapParams;
    const {locations} = this.props;

    this.markerGroup.clearLayers();
    this._renderMarkers();

    const cityLocation = Map._getCityLocation(locations);
    this._map.setView([cityLocation.latitude, cityLocation.longitude], ZOOM);
  }
}

Map.propTypes = {
  mapId: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired
};
