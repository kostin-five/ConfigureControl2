const loadFromFile = require("./loaders/loadFromFile");
const loadFromUrl = require("./loaders/loadFromUrl");
const parseRequirements = require("./parsers/parseRequirements");
const buildGraph = require("./graph/buildGraph");
const parseTestGraph = require("./graph/parseTestGraph");
const dfs = require("./graph/dfs");
const reverseGraph = require("./graph/reverseGraph");
const generateDot = require("./visualizers/generateDot");
const renderGraph = require("./visualizers/renderGraph");
const generateAsciiTree = require("./visualizers/generateAsciiTree");

module.exports = async function main(options) {
  let graph; // ← Объявляем graph здесь, чтобы использовать в визуализации

  if (options.testMode) {
    const content = loadFromFile(options.file);
    graph = parseTestGraph(content);

    console.log("Граф тестового репозитория:");
    console.log(graph);

    // Режим обратных зависимостей
    if (options.reverse) {
      const reversed = reverseGraph(graph);

      console.log("\nОбратный граф зависимостей:");
      console.log(reversed);

      const reverseDeps = dfs(reversed, options.package);

      console.log(`\nПакеты, которые зависят от '${options.package}':`);
      console.log(reverseDeps.filter((pkg) => pkg !== options.package));

      return; // ← Выходим, если режим обратных зависимостей
    }

    // Обычный режим DFS
    const order = dfs(graph, options.package);
    console.log("\nПорядок обхода DFS:");
    console.log(order);

    // НЕ ДЕЛАЕМ return здесь, чтобы перейти к визуализации!
  } else {
    // Режим работы с URL
    const content = await loadFromUrl(options.url);
    console.log("Содержимое requirements-файла получено.\n");

    const deps = parseRequirements(content);
    console.log("Прямые зависимости:");
    console.log(deps);

    graph = buildGraph(options.package, deps);
    console.log("\nГраф зависимостей:");
    console.log(graph);

    if (options.reverse) {
      const reversed = reverseGraph(graph);
      console.log("\nОбратный граф:");
      console.log(reversed);

      const reverseDeps = dfs(reversed, options.package);
      console.log(`\nПакеты, которые зависят от '${options.package}':`);
      console.log(reverseDeps.filter((pkg) => pkg !== options.package));

      return; // ← Выходим, если режим обратных зависимостей
    }

    const order = dfs(graph, options.package);
    console.log("\nРезультат DFS:");
    console.log(order);
  }

  // ASCII-дерево
  if (options.ascii) {
    console.log("\n" + "=".repeat(50));
    console.log("ASCII-представление зависимостей:");
    console.log("=".repeat(50) + "\n");

    const asciiTree = generateAsciiTree(graph, options.package);
    console.log(asciiTree);
  }

  // Graphviz визуализация
  console.log("\n" + "=".repeat(50));
  console.log("Генерация DOT-кода для Graphviz:");
  console.log("=".repeat(50) + "\n");

  const dotCode = generateDot(graph, options.package);
  console.log(dotCode);

  // Рендеринг графа в изображение
  try {
    const outputFileName = `${options.package}-dependencies.png`;
    await renderGraph(dotCode, outputFileName);

    console.log("\nВизуализация завершена!");
  } catch (error) {
    console.log(
      "\n⚠️  Не удалось создать изображение (возможно, Graphviz не установлен)"
    );
    console.log(
      "Но вы можете использовать DOT-код выше на https://dreampuf.github.io/GraphvizOnline/"
    );
  }
};
