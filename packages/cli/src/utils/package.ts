import type { PackageJson } from "type-fest";
import packageJson from "package-json";

export async function getPackageInfo() {
  const packageInfo = await packageJson("rehooks-cli");
  return packageInfo as PackageJson;
}
