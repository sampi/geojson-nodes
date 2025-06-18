import styled from "styled-components";

import { Map as MapLibre, NavigationControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "@deck.gl/layers";
import { DeckGLOverlay } from "./DeckGLOverlay";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

// @TODO bundle this with the app
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const MapCloseButton = styled.button`
  position: fixed;
  top: calc(var(--space-unit) * 2);
  right: calc(var(--space-unit) * 2);
  z-index: 10;
`;

type MapProps = {
  onMapClose: () => void;
};

export const Map = ({ onMapClose }: MapProps) => {
  const layers = [
    new GeoJsonLayer({
      id: "airports",
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: (f) => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
    }),
  ];

  return (
    <MapLibre initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
      <DeckGLOverlay layers={layers} /* interleaved*/ />
      <NavigationControl position="bottom-left" />
      <MapCloseButton onClick={onMapClose}>Back</MapCloseButton>
    </MapLibre>
  );
};
