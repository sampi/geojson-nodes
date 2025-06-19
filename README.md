# GeoJSON Nodes

This is a technical demo using [React Flow](https://reactflow.dev/) and [Deck.gl](https://deck.gl/), with [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) and [Turf.js](https://turfjs.org/).

Other technologies used:
* [zustand](https://zustand.docs.pmnd.rs/) for state management,
* [styled-components](https://styled-components.com/) for CSS-in-JS,
* [pnpm](https://pnpm.io/) as the package manager,
* [vite](https://vite.dev/) as the build tool,
* [ESLint](https://eslint.org/) for linting.

## Description

It implements the following scenarios:
* Adding nodes via drag & drop from a side panel/drawer,
* Connecting nodes using edges,
* Deleting nodes and edges using keyboard shortcuts,
* Saving and loading the diagram state automatically to/from `localStorage`,
* Switching to a Map view, and back to the nodes.

## How to run

1. Have [Node.js LTS installed](https://nodejs.org/en/download)
2. Have [pnpm set up](https://pnpm.io/installation)
3. Then run:

```sh
pnpm install
```

4. Then start the app using:

```sh
pnpm dev
```

## React Components

### `ActionButton`
`src/components/ActionButton/`

This button is used to switch to the Map view, and back.

### `Dialog`
`src/components/Dialog/`

Using the HTML `<dialog>` element and the `showModal()` method, nice modal dialog can be created that automatically supports exiting with the ESC key and captures focus.

### `Flow`
`src/components/Flow/`

Everything related to React Flow is in this component.

Even the Drawer is rendered inside the Flow so we get a nice background extensions effect.

Some styles are tweaked because I wanted to play around with Apple Glass-style effects.

### `NodesDrawer`
`src/components/NodesDrawer`

Static versions of the nodes that can be dragged onto the React Flow canvas.

### `Map`
`src/components/Map/`

Deck.gl is loaded here, with MapLibre.

> I wanted to take all the data that is shown and use that to zoom out and center the view, right now it always starts on Europe.

We find all the Layer Nodes, get all connections to them and load the GeoJSON data from those connected nodes to show data on the map.

On hovering, some info is shown in a Tooltip.

## Custom React Flow Nodes

It comes with three kinds of custom nodes:

### Source Node
`src/components/SourceNode.tsx`

This node has an input field, which takes a URL that should point to a GeoJSON file, and it has a single "source" handle that should be connected to a Layer Node or an Intersection Node.

The node itself will take care of initiating fetching the GeoJSON data and caching it in the store. This is so that the same GeoJSON files don't have to be fetched multiple times, in case we want to visualize different intersections of the same data.

> Feel free to use example GeoJSON URLs from https://geojson.xyz/

### Layer Node
`src/components/LayerNode.tsx`

This node has a single "target" handle, which should be connected to by a Source Node or an Intersection Node.

This node does not do much in terms of implementation, its type is used for querying data to show on the Map.

Layers on the map depend on the vertical position of nodes on the React Flow canvas, the topmost node is rendered first.

### Intersection Node (incomplete)
`src/component/IntersectionNode.tsx`

This node has two "target" handles and a single "source" handle.

When two Source Nodes are connected to it, it should use Turf.js to intersect the GeoJSON data and only pass the intersection on to the Layer Node that it would connect to. In theory, it could also connect to other Intersection Nodes because the data passed around is pure GeoJSON.

> I could not finish this component in time, I ran into some issues with `geomEach` finding `geometry` to be `undefined` and there wasn't enough time to debug the problem. I feel like I am close but it's not working at the moment.

## zustand Store

All nodes and edges are stored here because it makes it really easy to persist/hydrate them.

We store the GeoJSON data fetched by the Source Nodes, for better caching, and simple access from the Map component.
> I have thought if we need the store or not, but decided that it won't cause slowdowns to have it because I was experimenting with having the same GeoJSON URL in multiple Source Nodes. However, later I changed the app to keep that data inside the nodes as well. So now we are using twice as much memory. It really depends on the use-case, for the application if this is worth it or if it's better to just fetch the data directly in the node and store it only there, and just leverage browser caching.

## Missing Things

These are things I did not have time to add but I would have liked to, sorted by level of importance.

### Big Things

* Working Intersection Node,
* Unit and integration testing,
* CSS hover effects.

### Medium Things

* Deployment scripts,
* Custom colors for node types on the MiniMap,
* Mobile browser/touch device testing/support,
* URL validation in Source Node,
* Favicon.

### Small Things

* More styling of React Flow Controls,
* Data validation in Source Node,
* Centering the map to the currently loaded data,
* Bundling map style.json with the app.

## AI Disclaimer

Claude Code was used to help with debugging and refactoring code and filling in TS types, it was not used for writing any of the documentation.
