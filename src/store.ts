import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

import { type AppState } from "./types";

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      geojsonData: {},
      fetchGeoJSON: async (url: string) => {
        if (get().geojsonData?.[url]?.loading) {
          return;
        }

        set({
          geojsonData: {
            ...get().geojsonData,
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
            geojsonData: {
              ...get().geojsonData,
              [url]: { loading: false, data, error: null },
            },
          });
        } catch (error) {
          set({
            geojsonData: {
              ...get().geojsonData,
              [url]: {
                loading: false,
                data: null,
                error: error instanceof Error ? error.message : "Unknown error",
              },
            },
          });
        }
      },
      getGeoJSON: (url: string) => {
        const current = get().geojsonData[url];

        if (!current) {
          get().fetchGeoJSON(url);
          return { loading: true, data: null, error: null };
        }

        return current;
      },
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
    }),
    {
      name: "geojson-nodes-store",
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
      }),
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

export const geojsonSelector = (state: AppState) => ({
  geojsonData: state.geojsonData,
  getGeoJSON: state.getGeoJSON,
});
