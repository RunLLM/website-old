---
slug: visualizing-ml-pipelines-with-react-and-elk
title: Visualizing ML pipelines with React and elk
date: 2023-02-10 12:00:00
summary: This tutorial walks you through how Aqueduct uses React Flow and elk to build interactive visualizations of machine learning pipelines.
featured: false
author: andre
---

[Aqueduct](https://github.com/aqueducthq/aqueduct) is an ML orchestration system that allows you to define an ML pipeline as a composition of Python functions, deploy that pipeline onto your existing cloud infrastructure, and gain deep visibility into your pipeline’s execution.

To provide this visibility, Aqueduct visualizes each pipeline as a directed acyclic graph (DAG) that tracks the movement of data and code through your pipeline. This is harder than it sounds — this DAG view needs to minimize overlap, preserve visual flow, and scale to potentially 100s of nodes.  

This post will be a step by step walkthrough on how we build these DAG visualizations in Aqueduct using [React Flow](https://reactflow.dev/) as our rendering engine and [elkjs](https://www.eclipse.org/elk/) to handle positioning nodes in the graph. Together we will build a visualization of the workflow below:

<img src="/blog/visualizing-ml-pipelines-with-react-and-elk/intro_dag.png" />

### Visualizing a Worfklow in React

Aqueduct uses [React Flow](https://reactflow.dev/) to render workflow DAGs. This library is quite powerful and allows us to customize almost everything in the graph. We’ve set up a project in which we can draw the DAG above.

You can view the final results of what we’re trying to create in Stackblitz [here](https://stackblitz.com/github/agiron123/react-flow-blog-post?file=package.json), with all the library dependencies already installed.<sup>1</sup>

If you prefer to follow along on your computer, you can run the following command: 

```bash
# Please note that the double dash is needed here.
npm create vite@latest react-flow-playground -- --template react-ts
```

To render our graph, we will need to install React Flow using npm. Navigate to the root directory of your project and run the following command:

```bash
npm install reactflow
```

Once that’s done, React Flow is ready to be imported in your project. At the top of your `App.tsx` file, add these two lines:

```typescript
import 'reactflow/dist/style.css';
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
```

Now, create a simple React Flow with no nodes and edges to make sure that you can see the canvas, MiniMap and Controls:

```tsx
return (
    <div className="App">
      <div style={{ width: '1000px', height: '1000px' }}>
        <ReactFlow
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
```

Be sure to wrap the `ReactFlow` component in a div with a set width and height. Otherwise it will show a warning in your JavaScript console and not render the canvas.

<img src="/blog/visualizing-ml-pipelines-with-react-and-elk/empty_canvas.png" />

Now that the canvas is showing, we can add some nodes to our DAG. We’ll add three nodes named `query_database`, `query_artifact`, and `classifier_1`.

```tsx
const nodes = [
    {
      id: "1",
      data: {
        label: "query_database"
      },
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: "2",
      data: {
        label: "query_artifact"
      },
      position: {
        x: 200,
        y: 0
      }
    },
    {
      id: "3",
      data: {
        label: "classifier_1"
      },
      position: {
        x: 400,
        y: 0
      }
    },
];
```

With the nodes initialized, we now pass the nodes into your React Flow’s `nodes` prop,

```tsx
<ReactFlow
  nodes={nodes}
	...
/>
```

Now you should see three nodes on the canvas:

<img src="/blog/visualizing-ml-pipelines-with-react-and-elk/three_nodes.png" />

Next we can add some edges to our graph:

```tsx
const edges = [
    {
      id: "edge-1",
      source: "1",
      target: "2"
    },
    {
      id: "edge-2",
      source: "2",
      target: "3"
    },
    {
      id: "edge-3",
      source: "3",
      target: "4"
    },
    {
      id: "edge-4",
      source: "4",
      target: "5"
    }
  ];
```

Just like with nodes, pass edges into ReactFlow’s edges prop:

```tsx
<ReactFlow
	nodes={nodes}
    edges={edges}
	...
/>
```

Now you should see edges connecting each of these nodes:

<img src="/blog/visualizing-ml-pipelines-with-react-and-elk/nodes_with_edges.png" />

You’ll notice that the graph that goes left to right, but the handles for the edges are on the top and bottom of each node. We can customize the positioning of the handles to be on the right and left sides of nodes by creating a custom React Flow node.

To add handles on the left and right side of our nodes, first create a new file called `CustomNode.tsx` and add the following code:

```tsx
import { memo } from "react";
import { Position, Handle } from "reactflow";

const nodeStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75px',
  width: '150px',
  backgroundColor: 'aliceblue',
  border: '1px black solid',
  borderRadius: '8px'
};

const labelStyles = {
  maxWidth: '125px',
  overflow: 'clip',
  textOverflow: 'ellipsis',
  textAlign: 'center',
}

export default memo(({ data }) => {
  return (
    <div style={nodeStyles}>
      <div style={labelStyles}>{data.label}</div>
      <Handle
        id="target-handle-id"
        type="target"
        position={Position.Left}
        isConnectable={false}
      />
      <Handle
        id="source-handle-id"
        type="source"
        position={Position.Right}
        isConnectable={false}
      />
    </div>
  )
});
```

Now you should see that we can place our handles on the left and right side of a node.

Using the same process as above, we can add more nodes and edges to our nodes and edges arrays to create a DAG that looks like the example drawing<sup>1</sup>.

You can find the final code used for the DAG above, on Github [here](https://github.com/agiron123/react-flow-blog-post).

### Dynamically Positioning Nodes

Now that we have a basic graph, we have to figure out how to lay our graph out — a complex workload might have 10s or even 100s of nodes in a single pipeline. Currently each node on our DAG has a hard-coded position. Since the shape of the DAG varies across workflows, hard coding node positions won’t get us very far. In Aqueduct, we use a javascript library called elk that automatically computes the optimal positioning of nodes in a DAG.

To demonstrate the power of elk, we will position some of the nodes on our graph in a suboptimal way. Moving our nodes around, we can see a jumbled up version of our graph here:

<img src="/blog/visualizing-ml-pipelines-with-react-and-elk/messy_dag.png" />

Let’s learn about how elk can fix the node positioning for us! elk stands for Eclipse Layout Kernel. It’s a very useful library for handling layouts for diagrams. 

In our case, we are going to render a DAG from left to right using a [layered graph drawing](https://en.wikipedia.org/wiki/Layered_graph_drawing) algorithm called the [Sugiyama Method](https://blog.disy.net/sugiyama-method/). A layered graph drawing algorithm draws nodes and edges in relation to one another. At a high level, this algorithm will lay our DAG such that source nodes will be drawn to the very left, nodes one degree away from the source will be drawn on the second layer, and so on until the last layer, which will only have sink nodes.

The Sugiyama algorithm has four steps

1. Remove cycles from the graph. We have a DAG in our example, so our graph should not have any cycles.
2. Assign layers to nodes
3. Order nodes and edges so that edge crossing is kept to a minimum. This allows us to have a nice looking drawing with very little overlaps of edges.
4. Give nodes and edges their x and y coordinates.

[This blog post](https://blog.disy.net/sugiyama-method/) explains the Sugiyama method in detail. 

Now that we’ve gone through a quick primer on elk and layered graph drawing algorithms, we can add the library to our project and use it to draw a graph in React Flow.

First, we are going to need to install dependencies:

```bash
npm install elkjs
```

Next, we will need to take our existing nodes and adapt them to a format that elk accepts:

```tsx
const reactFlowToElkNodes = () => {
    return nodes.map((node) => {
      return {
        id: node.id,
		// width of the node in px.
        width: 150,
		// height of the node in px.
        height: 75,
      }
    })
  };
```

After everything is mapped and ready to go, we can initialize our elk object and then get a positioned graph from elk. Before passing off to React Flow, we will log the positioned graph to see the results.

```tsx
// imports, should go at the top of your file:
import ELK from 'elkjs/lib/elk.bundled.js';

const mappedElkNodes = reactFlowToElkNodes();

// elk initialization, should go before render.
const elk = new ELK();
const graph = {
	id: 'root',
	layoutOptions: {} // We will explain these shortly.
	children: mappedElkNodes, // mapped nodes
	edges: edges // Our edges do not need to be transformed as they are in a format that both elk and React Flow can use
};

try {
	const positionedNodes = await elk.layout(graph);
	// Show our results in console:
	console.log('positionedLayout: ', positionedNodes);
} catch(error) {
	console.log('Error positioning nodes on elk graph: ', error);
}
```

Here is what the result we get back from elk looks like:

```tsx
{
    "id": "root",
    "layoutOptions": {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.alignment": "CENTER",
        "elk.spacing.nodeNode": "80",
        "elk.layered.spacing.nodeNodeBetweenLayers": "80",
        "crossingMinimization.forceNodeModelOrder": true,
        "nodePlacement.strategy": "NETWORK_SIMPLEX"
    },
    "children": [
        {
            "id": "1",
            "width": 150,
            "height": 75,
            "$H": 277,
            "x": 12,
            "y": 167
        },
        ...
    ],
    "edges": [
        {
            "id": "edge-1",
            "source": "1",
            "target": "2",
            "sections": [
                {
                    "id": "edge-1_s0",
                    "startPoint": {
                        "x": 162,
                        "y": 205
                    },
                    "endPoint": {
                        "x": 242,
                        "y": 205
                    },
                    "incomingShape": "1",
                    "outgoingShape": "2"
                }
            ],
            "container": "root"
        },
        ...
    ],
    "$H": 13,
    "x": 0,
    "y": 0,
    "width": 1324,
    "height": 409
}
```

In order to render these nodes on our React Flow canvas, we will need to take the positions from the nodes and set them like so:

```tsx
const [reactFlowNodes, setReactFlowNodes] = useState<ReactFlowNode[]>();

async function getPositionedLayout() {
    try {
      const elk = new ELK();
      const positionedLayout = await elk.layout(graph);

      return positionedLayout;
    } catch (error) {
      alert('error getting positioned layout!')
    }
  }

async function elkToReactFlowNodes() {
    const layout = await getPositionedLayout();
    if (!layout || !layout.children) {
      return [];
    }

    const mappedReactFlowNodes = layout.children.map((positionedNode) => {
      // Find the node in the nodes array and update it's position.
      let foundNode = nodes[0];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === positionedNode.id) {
          foundNode = nodes[i];

          const { x, y } = positionedNode;
          foundNode.position = { x, y };

          return foundNode;
        }
      }
			// This is only hit when the node is not found in the list of nodes. In our case, this line will not be executed.
			// We just need a return statement at the end to keep our linter happy.
      return foundNode;
    });

    setReactFlowNodes(mappedReactFlowNodes);
  }
```

Finally, we can render the nodes in React Flow. We do not need to do anything with our edges in this case since React Flow connects edges for us automatically. The final result can be found below.

<img src="/blog/visualizing-ml-pipelines-with-react-and-elk/final_dag.png" />

<hr />

Aqueduct’s workflow DAG is critical to providing visibility into how pipelines are run and whether they’re working as expected. React Flow and elk provide simple and powerful libraries that allow us to quickly and reliably construct and manage these graphs. 

Behind these graph nodes, Aqueduct  provides visibility into code execution (stack traces + logs), data & model quality, and pipeline metadata — check out our [open-source project](https://github.com/aqueducthq/aqueduct) and join our [Slack community](https://slack.aqueducthq.com/) to learn more!

<hr />

<sup>1</sup>&nbsp;If you would like to follow along with a new project, you can find the code [here](https://stackblitz.com/github/agiron123/react-flow-sandbox).