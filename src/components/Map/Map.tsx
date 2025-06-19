import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";
import { Map as MapLibre, NavigationControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { PickingInfo } from "@deck.gl/core";
import { getConnectedEdges } from "@xyflow/react";

import { useStore, flowSelector } from "../../store";

import { DeckGLOverlay } from "./DeckGLOverlay";

import type { GeoJSONData } from "../../types";

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
  const { nodes, edges } = useStore(useShallow(flowSelector));

  const connectedLayers = useMemo(() => {
    const layerNodes = nodes.filter((node) => node.type === "layerNode");

    const edgesConnectedToLayerNodes = getConnectedEdges(layerNodes, edges);

    return edgesConnectedToLayerNodes
      .map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const layerNode = nodes.find((node) => node.id === edge.target);
        const geoJSONData = sourceNode?.data?.geoJSONData as
          | {
              data: GeoJSONData["data"] | null;
              loading: boolean;
              error: string | null;
            }
          | undefined;

        return {
          layerNode,
          sourceNode,
          geoJSONData,
          layerId: `layer-${layerNode?.id}`,
        };
      })
      .filter((item) => item.layerNode && item.sourceNode);
  }, [edges, nodes]);

  const layers = connectedLayers
    .filter(
      ({ geoJSONData }) =>
        geoJSONData &&
        geoJSONData.data &&
        !geoJSONData.loading &&
        !geoJSONData.error,
    )
    .sort(
      (a, b) =>
        (a.layerNode?.position?.y || 0) - (b.layerNode?.position?.y || 0),
    )
    .map(({ layerId, geoJSONData }, index) => {
      if (!geoJSONData || !geoJSONData.data) {
        return null;
      }
      const colors = [
        [200, 0, 80, 180], // Red
        [0, 200, 80, 180], // Green
        [80, 0, 200, 180], // Blue
        [200, 120, 0, 180], // Orange
        [120, 0, 200, 180], // Purple
      ];
      const color = colors[index % colors.length];

      return new GeoJsonLayer({
        id: layerId,
        data: geoJSONData.data,
        // Styles
        filled: true,
        stroked: true,
        pointRadiusMinPixels: 3,
        pointRadiusScale: 1000,
        getPointRadius: 5,
        getFillColor: color as [number, number, number, number],
        getLineColor: [60, 60, 60, 255] as [number, number, number, number],
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
      html: `<dl>
        ${fields.map((field) => (info.object?.properties?.[field] ? `<dt>${field}</dt><dd>${info.object.properties[field]}</dd>` : "")).join("")}
      </dl>`,
    };
  }, []);

  return (
    <MapLibre initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
      <DeckGLOverlay layers={layers} getTooltip={getTooltip} />
      <NavigationControl position="bottom-left" />
      <MapCloseButton onClick={onMapClose}>Back</MapCloseButton>
    </MapLibre>
  );
};
