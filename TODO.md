SourceNode input stuff
node.data.label ?!


SourceNode - input
hook.js:608 A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components


colors:
```tsx
<MiniMap
  nodeStrokeColor={(n) => {
    if (n.type === 'input') return '#0041d0';
    if (n.type === 'selectorNode') return bgColor;
    if (n.type === 'output') return '#ff0072';
  }}
  nodeColor={(n) => {
    if (n.type === 'selectorNode') return bgColor;
    return '#fff';
  }}
/>
```


DragAndDropContext, moving to src/contexts/:
Violates the "don't create folders until you have 2+ files" principle


SourceNode should fetch the JSON and not LayerNode - because Intersection would have to reimplement fetching!!


store:
 { loading: true, data: null, error: null } <- should be shared maybe?
