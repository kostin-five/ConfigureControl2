module.exports = function parseTestGraph(content) {
  const graph = {};
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((l) => l.length > 0);

    for (const line of lines) {
        const parts = line.split(/\s+/)

        const node = parts[0];
        const deps = parts.slice(1);
        graph[node] = deps;
    }


  return graph;
};
