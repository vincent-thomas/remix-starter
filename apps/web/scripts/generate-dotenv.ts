import { $ } from "bun";
import { z } from "zod";

const test =
  await $`terraform output -state=infra/terraform.tfstate -json`.text();

const jsObject = JSON.parse(test);

const array = Object.entries(jsObject).map(([key, value]) => [
  z.string().parse(key.toUpperCase()),
  z.string().parse(value?.value),
]);

const envFile = await Bun.file(".env").text();

const fileEntries = envFile.split("\n");

const index = fileEntries.findIndex((value) => value === "# ---");

fileEntries.splice(index + 1, fileEntries.length - index);

function getRandomHex256() {
  const bytes = new Uint8Array(32); // 32 bytes = 256 bits
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

const thingsToAdd = [
  ["SESSION_SECRET", getRandomHex256()],
  ["NODE_ENV", "development"],
];

for (const [key, value] of array.concat(thingsToAdd)) {
  fileEntries.push(`${key}=${value}`);
}

await Bun.write(".env", fileEntries.join("\n"));
