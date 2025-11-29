module.exports = function reverseGraph(graph) {
    const reversed = {};

    for (const node in graph) {
        if (!reversed[node]) {
            reversed[node] = [];
        }

        for (const dep of graph[node]) {
            if (!reversed[dep]) {
                reversed[dep] = [];
            }
            reversed[dep].push(node);
        }
    }

    return reversed;
}