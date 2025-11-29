const { Command } = require("commander");
const path = require("path");
const fs = require("fs");

const program = new Command();

program
  .option("--package <name>", "имя пакета")
  .option("--url <url>", "URL-адрес репозитория")
  .option("--file <path>", "путь к тестовому файлу")
  .option("--test-mode", "режим тестирования")
  .option("--pkg-version <version>", "версия пакета")
  .option("--ascii", "вывести ASCII дерево")
  .option("--reverse", "показать обратные зависимости")
  .parse(process.argv);

const options = program.opts();

if(!options.package) {
    console.error(
      "Ошибка: не указан пакет"
    );
    process.exit(1);
}

try {
  if (!options.testMode && options.url) {
    const u = new URL(options.url);

  if (u.protocol !== "https:" && u.protocol !== "http:") {
    throw new Error();
  }
  }
  
} catch (e) {
  console.error(
    "Ошибка: параметр --url должен быть корректным HTTP/HTTPS URL."
  );
  process.exit(1);
}

if (options.testMode) {
  if (!options.file) {
    console.error("Ошибка: в режиме test-mode нужно указать --file");
    process.exit(1);
  }

  const abs = path.resolve(options.file);
  if (!fs.existsSync(abs)) {
    console.error("Ошибка: test файл не найден");
    process.exit(1);
  }
}

if (!options.testMode && !options.url) {
  console.error(
    "Ошибка: укажите URL репозитория или включите test-mode с file."
  );
  process.exit(1);
}

console.log("Параметры запуска:");
for (const key in options) {
  console.log(`${key}: ${options[key]}`);
}

const main = require("../src/index");
main(options)