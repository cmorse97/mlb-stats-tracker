import fs from "fs";
import axios from "axios";
import path from "path";

const file = process.argv[2];

if (!file) {
  console.error(
    "❌ Please pass a file path, e.g. `npm run qa ./output/players.json`"
  );
  process.exit(1);
}

const filePath = path.resolve(file);
const contents = fs.readFileSync(filePath, "utf-8");

const prompt = `
You are a QA bot reviewing JSON data used in a React application.

Check for:
- fields that might be missing or undefined
- values that could break the UI (e.g., empty strings, "NaN", invalid numbers)
- edge cases like empty arrays or unexpected types
- anything a developer should double-check before using this data in a UI component

Return a clean, bulleted list of findings and suggestions.
`;

async function queryOllama(userPrompt) {
  const res = await axios.post("http://localhost:11434/api/chat", {
    model: "mistral",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: userPrompt },
    ],
    stream: false,
  });

  return res.data.message.content;
}

(async () => {
  console.log(`🧠 QA Bot is reviewing: ${filePath}`);
  const output = await queryOllama(contents);
  console.log("\n📋 Results:\n");
  console.log(output);
})();
