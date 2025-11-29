module.exports = function dfs(graph, startNode) {
  const visited = new Set();
  const stack = [startNode];
  const result = []; // Для хранения порядка обхода

  while (stack.length > 0) {
    const node = stack.pop();

    // Проверяем, был ли узел уже посещён
    if (visited.has(node)) {
      continue; // Пропускаем, если уже посетили
    }

    // Помечаем узел как посещённый
    visited.add(node);
    result.push(node); // Добавляем в результат

    // Добавляем соседей в стек
    const neighbors = graph[node] || [];

    // Добавляем в обратном порядке, чтобы обход шёл слева направо
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const dep = neighbors[i];
      if (!visited.has(dep)) {
        stack.push(dep);
      }
    }
  }

  return result;
};
