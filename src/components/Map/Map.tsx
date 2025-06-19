import { useCallback, useMemo } from "react";
import { createGlobalStyle } from "styled-components";
import { useShallow } from "zustand/react/shallow";
import { Map as MapLibre, NavigationControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { PickingInfo } from "@deck.gl/core";
import { getConnectedEdges } from "@xyflow/react";

import { useStore, flowSelector } from "../../store";
import type { GeoJSONData } from "../../types";
import { DeckGLOverlay } from "./DeckGLOverlay";
import { MapCloseButton } from "./MapCloseButton";

// @TODO center the view based on the currently loaded GeoJsonLayers
const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

// @TODO bundle styles with the app
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const MapStyles = createGlobalStyle`
  .maplibregl-canvas {
    border-radius: var(--space-unit);
  }
`;

type MapProps = {
  onMapClose: () => void;
};

export const Map = ({ onMapClose }: MapProps) => {
  const { nodes, edges } = useStore(useShallow(flowSelector));

  // Find all Layer Nodes that have anything connected to them
  const connectedLayers = useMemo(() => {
    const layerNodes = nodes.filter((node) => node.type === "layerNode");

    const edgesConnectedToLayerNodes = getConnectedEdges(layerNodes, edges);

    return edgesConnectedToLayerNodes
      .map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const layerNode = nodes.find((node) => node.id === edge.target);
        const geoJsonData = sourceNode?.data?.geoJsonData as
          | {
              data: GeoJSONData["data"] | null;
              loading: boolean;
              error: string | null;
            }
          | undefined;

        return {
          layerNode,
          sourceNode,
          geoJsonData,
          layerId: `layer-${layerNode?.id}`,
        };
      })
      .filter((item) => item.layerNode && item.sourceNode);
  }, [edges, nodes]);

  const layers = connectedLayers
    .filter(
      ({ geoJsonData }) =>
        geoJsonData &&
        geoJsonData.data &&
        !geoJsonData.loading &&
        !geoJsonData.error,
    )
    .sort(
      (a, b) =>
        (a.layerNode?.position?.y || 0) - (b.layerNode?.position?.y || 0),
    )
    .map(({ layerId, geoJsonData }, index) => {
      if (!geoJsonData || !geoJsonData.data) {
        return null;
      }
      const colors = [
        [191, 97, 106, 180], // Red
        [163, 190, 140, 180], // Green
        [94, 129, 172, 180], // Blue
        [208, 135, 112, 180], // Orange
        [180, 142, 173, 180], // Purple
      ];
      const color = colors[index % colors.length];

      return new GeoJsonLayer({
        id: layerId,
        data: geoJsonData.data,
        // Styles
        filled: true,
        stroked: true,
        pointRadiusMinPixels: 3,
        pointRadiusScale: 1000,
        getPointRadius: 5,
        getFillColor: color as [number, number, number, number],
        getLineColor: [76, 86, 106, 255] as [number, number, number, number],
        getLineWidth: 1,
        // Interactive props
        pickable: true,
        autoHighlight: true,
      });
    })
    .filter((layer) => layer !== null);

  const getTooltip = useCallback((info: PickingInfo) => {
    if (!info.object) {
      return null;
    }

    const fields = ["name", "type", "admin", "featureclass", "description"];

    return {
      html: `<table>
        ${fields.map((field) => (info.object?.properties?.[field] ? `<tr><td>${field}</td><td>${info.object.properties[field]}</td></tr>` : "")).join("")}
      </table>`,
    };
  }, []);

  return (
    <>
      <MapStyles />

      <MapLibre initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
        <DeckGLOverlay layers={layers} getTooltip={getTooltip} />
        <NavigationControl position="bottom-left" />
        <MapCloseButton onClick={onMapClose}>Back</MapCloseButton>
      </MapLibre>
    </>
  );
};
