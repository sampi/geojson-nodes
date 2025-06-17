# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based visual node editor built with TypeScript, Vite, and React Flow. The application allows users to create and manipulate nodes through drag-and-drop interactions, with persistent state management using Zustand.

## Development Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production (runs TypeScript compiler then Vite build)
- `pnpm lint` - Run ESLint on the codebase
- `pnpm preview` - Preview production build locally

## Architecture

**State Management**: Uses Zustand with persistence middleware to maintain nodes and edges in localStorage. The main store (`src/store.ts`) handles all React Flow state updates including node changes, edge changes, and connections.

**React Flow Integration**: Built on @xyflow/react for the visual node editor. The main `App.tsx` component orchestrates the flow canvas with drag-and-drop functionality for adding nodes from the sidebar.

**Drag & Drop System**: Custom context provider (`DragAndDropContext.tsx`) manages drag state between the sidebar drawer and the main canvas. Nodes are created with UUID identifiers when dropped.

**Component Structure**:
- `App.tsx` - Main application with ReactFlow canvas
- `components/NodesDrawer/` - Sidebar for draggable node templates
- `components/nodes/` - Individual node components
- `components/TopBar/` - Application header/toolbar

**Data Flow**: State flows through Zustand store → React Flow components → localStorage persistence. All node and edge updates go through the store's change handlers which apply React Flow's built-in change functions.

## Key Technologies

- **React Flow**: Visual node editor framework
- **Zustand**: Lightweight state management with persistence
- **Styled Components**: CSS-in-JS styling
- **Vite**: Build tool and dev server
- **pnpm**: Package manager (workspaces configured)
