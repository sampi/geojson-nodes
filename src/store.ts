import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

import { type AppState } from "./types";

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      setNodes: (nodes) => {
        set({ nodes });
      },
      setEdges: (edges) => {
        set({ edges });
      },

      geoJsonData: {},
      fetchGeoJSON: async (url: string) => {
        // Do not try to fetch more than once at the same time
        if (get().geoJsonData?.[url]?.loading) {
          return;
        }

        set({
          geoJsonData: {
            ...get().geoJsonData,
            [url]: { loading: true, data: null, error: null },
          },
        });

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
          }
          const data = await response.json();

          set({
            geoJsonData: {
              ...get().geoJsonData,
              [url]: { loading: false, data, error: null },
            },
          });
        } catch (error) {
          set({
            geoJsonData: {
              ...get().geoJsonData,
              [url]: {
                loading: false,
                data: null,
                error: error instanceof Error ? error.message : "Unknown error",
              },
            },
          });
        }
      },
    }),
    {
      name: "geojson-nodes-store",
      partialize: (state) => ({
        nodes: state.nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            // Do not store GeoJSON data in localStorage
            geoJsonData: undefined,
          },
        })),
        edges: state.edges,
      }),
      onRehydrateStorage: () => {
        return (hydratedState) => {
          if (hydratedState?.nodes) {
            // Fetch all GeoJSON on hydration
            hydratedState.nodes.forEach((node) => {
              if (node.data?.url && typeof node.data.url === "string") {
                hydratedState.fetchGeoJSON?.(node.data.url);
              }
            });
          }
        };
      },
    },
  ),
);

export const flowSelector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const geoJsonSelector = (state: AppState) => ({
  geoJsonData: state.geoJsonData,
  fetchGeoJSON: state.fetchGeoJSON,
});
