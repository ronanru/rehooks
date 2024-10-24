import { handleError } from "~/utils/error";
import { HookOptions } from "~/types";
import { Command } from "commander";
import ora from "ora";

const fetchHooks = async (options: HookOptions): Promise<any> => {
  const { search, limit } = options;
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (limit) queryParams.append("limit", limit.toString());

  const BASE_URL = `https://rehooks.pyr33x.ir/api/hooks?${queryParams.toString()}`;

  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hooks");
  }

  return response.json();
};

export const hooks = new Command()
  .name("hooks")
  .description("Get hooks from Rehooks API")
  .argument("[search]", "Search hooks by name")
  .argument("[limit]", "Limit the number of hooks to return (default: all)")
  .action(
    async (firstArg: string | undefined, secondArg: string | undefined) => {
      const spinner = ora("Fetching hooks...").start();

      try {
        const search = isNaN(Number(firstArg)) ? firstArg : undefined;
        const limit = !isNaN(Number(firstArg))
          ? Number(firstArg)
          : secondArg
            ? Number(secondArg)
            : undefined;

        const hooksData = await fetchHooks({ search, limit });
        spinner.stop();
        console.log(hooksData);
      } catch (error) {
        spinner.fail("Error fetching hooks: " + handleError(error));
      }
    },
  );
