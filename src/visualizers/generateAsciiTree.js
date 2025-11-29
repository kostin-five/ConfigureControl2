module.exports = function generateAsciiTree(graph, rootPackage) {
  const lines = [];
  const visited = new Set();

  function renderNode(node, prefix = "", isLast = true, depth = 0) {
    // Проверяем, был ли узел уже обработан на этой глубине
    const nodeKey = `${depth}:${node}`;

    if (visited.has(nodeKey)) {
      return; // Не отображаем повторения на одной глубине
    }
    visited.add(nodeKey);

    // Генерируем префикс для текущего узла
    if (depth === 0) {
      // Корневой узел
      lines.push(node);
    } else {
      // Дочерние узлы с ветками
      const connector = isLast ? "└── " : "├── ";
      lines.push(prefix + connector + node);
    }

    // Получаем зависимости этого узла
    const dependencies = graph[node] || [];

    // Если зависимостей нет, выходим
    if (dependencies.length === 0) {
      return;
    }

    // Рекурсивно обрабатываем каждую зависимость
    dependencies.forEach((dep, index) => {
      const isLastDep = index === dependencies.length - 1;

      // Генерируем новый префикс для следующего уровня
      let newPrefix;
      if (depth === 0) {
        newPrefix = "";
      } else {
        newPrefix = prefix + (isLast ? "    " : "│   ");
      }

      renderNode(dep, newPrefix, isLastDep, depth + 1);
    });
  }

  renderNode(rootPackage);

  return lines.join("\n");
};
