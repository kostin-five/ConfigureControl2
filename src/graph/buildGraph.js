module.exports = function buildGraph(rootPackage, deps) {
    const graph = {};
    graph[rootPackage] = deps;

    return graph;
}