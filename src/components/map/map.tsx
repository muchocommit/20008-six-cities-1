import * as React from 'react';

import {MapParams} from '../../data';
import {
  getLocationsCoordinates,
  getPureLocations, getLocationMean,
  accumulateLocationsFromArray
} from '../../reducers/data/data';

import * as leaflet from 'leaflet';

interface Props {
  getActiveOffer: () => number,

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
  public _markerGroup: any;
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

  _highLightMarker(markerIndex) {
    const {ICON_FOCUS, OFFER_ZOOM, CITY_ZOOM} = MapParams;
    const {locations} = this.props;
    if (markerIndex) {

      const newIcon = leaflet.icon({
        iconUrl: ICON_FOCUS.URL,
        iconSize: ICON_FOCUS.SIZE,
        id: markerIndex
      });

      this.markerGroup.getLayers().find((it) =>
        it.options.id === markerIndex).setIcon(newIcon);

      const offerLocation = locations.find((it) =>
        it.id === markerIndex);


      this._map.setView([offerLocation.location.latitude,
        offerLocation.location.longitude], OFFER_ZOOM);
      return;
    }

    const cityLocation = Map._getCityLocation(locations);

    this._map.setView([cityLocation.latitude,
      cityLocation.longitude], CITY_ZOOM);

    return null;
  }

  _renderMarkers() {
    const {locations} = this.props;
    const {ICON} = MapParams;

    const icon = leaflet.icon({
      iconUrl: ICON.URL,
      iconSize: ICON.SIZE,
      id: null
    });

    [...locations].forEach((it) => {

      return leaflet.marker(getLocationsCoordinates(it), {icon, id: it.id})
        .addTo(this.markerGroup)
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
      CITY_ZOOM, CITY, TILE_LAYER
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

    this._map.setView([cityLocation.latitude,
      cityLocation.longitude], CITY_ZOOM);
  }

  componentDidUpdate () {
    const {getActiveOffer} = this.props;

    this.markerGroup.clearLayers();
    this._renderMarkers();

    this._highLightMarker(getActiveOffer());
  }
}

