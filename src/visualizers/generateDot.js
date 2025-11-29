module.exports = function generateDot(graph, rootPackage) {
  let dot = "digraph dependencies {\n";

  // Настройки внешнего вида графа
  dot += "    rankdir=TB;\n"; // Top to Bottom направление
  dot += "    node [shape=box, style=filled, fillcolor=lightblue];\n";
  dot += "    edge [color=gray];\n\n";

  // Выделяем корневой пакет
  dot += `    "${rootPackage}" [fillcolor=lightgreen, style=filled];\n\n`;

  // Добавляем рёбра
  const visited = new Set();

  function addEdges(node) {
    if (visited.has(node)) return;
    visited.add(node);

    const deps = graph[node] || [];

    for (const dep of deps) {
      dot += `    "${node}" -> "${dep}";\n`;
      addEdges(dep);
    }
  }

  addEdges(rootPackage);

  dot += "}\n";

  return dot;
};
