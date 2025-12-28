import dagre from 'dagre'

/**
 * DRY utility: Auto-layout nodes using Dagre algorithm
 * @param {Array} nodes - Vue Flow nodes
 * @param {Array} edges - Vue Flow edges
 * @param {Object} options - Layout options
 * @returns {Array} Nodes with updated positions
 */
export function getLayoutedElements(nodes, edges, options = {}) {
  const {
    direction = 'TB', // TB = top to bottom, LR = left to right
    nodeWidth = 172,
    nodeHeight = 36,
    rankSep = 100, // Vertical spacing between ranks
    nodeSep = 50, // Horizontal spacing between nodes
  } = options

  // Create a new directed graph
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  // Configure the graph
  dagreGraph.setGraph({
    rankdir: direction,
    ranksep: rankSep,
    nodesep: nodeSep,
  })

  // Add nodes to the graph
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    })
  })

  // Add edges to the graph
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // Run the layout algorithm
  dagre.layout(dagreGraph)

  // Get the new positions from the graph
  const layoutedNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id)

    return {
      ...node,
      position: {
        // Center the node
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
  })

  return layoutedNodes
}

/**
 * Apply auto-layout to Vue Flow elements
 * Separates nodes and edges, applies layout, and returns combined result
 */
export function applyAutoLayout(elements, options = {}) {
  const nodes = elements.filter(el => !el.source && !el.target)
  const edges = elements.filter(el => el.source && el.target)

  const layoutedNodes = getLayoutedElements(nodes, edges, options)

  return [...layoutedNodes, ...edges]
}

/**
 * Layout presets
 */
export const LAYOUT_PRESETS = {
  VERTICAL: {
    direction: 'TB',
    rankSep: 100,
    nodeSep: 50,
  },
  HORIZONTAL: {
    direction: 'LR',
    rankSep: 150,
    nodeSep: 50,
  },
  COMPACT: {
    direction: 'TB',
    rankSep: 60,
    nodeSep: 30,
  },
  SPACIOUS: {
    direction: 'TB',
    rankSep: 150,
    nodeSep: 80,
  },
}
