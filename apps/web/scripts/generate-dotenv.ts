import { $ } from "bun";
import { z } from "zod";

const test =
  await $`terraform output -state=infra/terraform.tfstate -json`.text();

const jsObject = JSON.parse(test);

const array = Object.entries(jsObject).map(function ([key, value]) {
  return [z.string().parse(key.toUpperCase()), z.string().parse(value?.value)];
});

const envFile = await Bun.file(".env").text();

const fileEntries = envFile.split("\n");

const index = fileEntries.findIndex(function (value) {
  return value === "# ---";
});

fileEntries.splice(index + 1, fileEntries.length - index);

for (const [key, value] of array) {
  fileEntries.push(`${key}=${value}`);
}

await Bun.write(".env", fileEntries.join("\n"));
