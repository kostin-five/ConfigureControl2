const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const util = require("util");

const execPromise = util.promisify(exec);

module.exports = async function renderGraph(dotCode, outputPath = "graph.png") {
  const dotFilePath = path.join(process.cwd(), "temp.dot");
  const imagePath = path.join(process.cwd(), outputPath);

  try {
    // Сохраняем DOT-код во временный файл
    fs.writeFileSync(dotFilePath, dotCode);

    // Вызываем Graphviz для генерации изображения
    const command = `dot -Tpng "${dotFilePath}" -o "${imagePath}"`;
    await execPromise(command);

    console.log(`\nГраф сохранён: ${imagePath}`);

    // Удаляем временный файл
    fs.unlinkSync(dotFilePath);

    return imagePath;
  } catch (error) {
    console.error("Ошибка при рендеринге графа:", error.message);

    // Проверяем, установлен ли Graphviz
    try {
      await execPromise("dot -V");
    } catch {
      console.error("\nGraphviz не установлен. Установите его:");
    }

    throw error;
  }
};
