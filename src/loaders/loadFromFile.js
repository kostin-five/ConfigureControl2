const fs = require("fs");
const path = require("path");

module.exports = function loadFromFile(filePath) {
    const abs = path.resolve(filePath);
    return fs.readFileSync(abs, 'utf-8')
}