module.exports = function parseRequirements(content) {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0 && !line.startsWith('#'))

    const deps = new Set();

    for (const line of lines) {
        const clean = line.split(/[<>=!]/)[0].trim();
        deps.add(clean);

    }

    return Array.from(deps)
}