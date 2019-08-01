import * as React from 'react';

import {MapParams} from '../../data';
import {
  getLocationsCoordinates,
  getPureLocations, getLocationMean,
  accumulateLocationsFromArray} from '../../reducers/data/data';

import * as leaflet from 'leaflet';

interface Props {
  mapId: string,
  locations: {
    id: number,
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    }
  }[]
}

export default class Map extends React.PureComponent<Props, null> {
  private _mapRef: React.RefObject<HTMLDivElement>;
  private _markerGroup: any;
  private _map: any;

  constructor(props) {
    super(props);

    this._map = {};
    this._markerGroup = null;
    this._mapRef = React.createRef();
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

    console.log(leaflet)

    const {ICON, ICON_FOCUS, ZOOM, mapId, LATITUDE_CONSTANT} = MapParams;

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


            if (mapId === `offerMap`) {
              this._map.setView([it.location.latitude,
                it.location.longitude], ZOOM);
            } else {
              this._map.setView([it.location.latitude - LATITUDE_CONSTANT,
                it.location.longitude], ZOOM);
            }

            target.setIcon(newIcon);
          }
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
      CITY_ZOOM, CITY, TILE_LAYER, LATITUDE_CONSTANT
    } = MapParams;

    this._map = leaflet.map(currentMap, {
      center: CITY,
      zoomControl: false,
      marker: true
    });

    this.markerGroup = leaflet.layerGroup().addTo(this._map);

    leaflet.tileLayer(TILE_LAYER.URL, {
      attribution: TILE_LAYER.OPTIONS.ATTRIBUTION
    })
      .addTo(this._map);

    this._renderMarkers();
    const cityLocation = Map._getCityLocation(locations);

    if (mapId === `offerMap`) {

      this._map.setView([cityLocation.latitude,
        cityLocation.longitude], CITY_ZOOM);
    } else {

      this._map.setView([cityLocation.latitude - LATITUDE_CONSTANT,
        cityLocation.longitude], CITY_ZOOM);
    }
  }

  componentDidUpdate () {
    const {CITY_ZOOM, LATITUDE_CONSTANT, mapId} = MapParams;
    const {locations} = this.props;

    this.markerGroup.clearLayers();
    this._renderMarkers();

    const cityLocation = Map._getCityLocation(locations);
    if (mapId === `offerMap`) {
      this._map.setView([cityLocation.latitude,
        cityLocation.longitude], CITY_ZOOM);
    } else {

      this._map.setView([cityLocation.latitude - LATITUDE_CONSTANT,
        cityLocation.longitude], CITY_ZOOM);
    }
  }
}

