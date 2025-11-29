module.exports = async function loadFromUrl(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Node.js",
      Accept: "text/plain",
    },
  });

  if (!res.ok) {
    throw new Error(`Не удалось загрузить файл по URL (код ${res.status})`);
  }

  return await res.text();
};
