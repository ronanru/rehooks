import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

type Hook = Readonly<{
  id: number;
  title: string;
  description: string;
  content: string;
}>;

const filePath = path.join(process.cwd(), "app", "hooks.json");

async function loadData(): Promise<Hook[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error loading data:", err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit");
    const search = url.searchParams.get("search");
    const data: Hook[] = await loadData();
    let result = data;
    if (search) {
      result = data.filter((hook) =>
        hook.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (limit) {
      const parsedLimit = Number(limit);
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        return NextResponse.json(
          { error: "Invalid limit. It must be a positive number." },
          { status: 400 },
        );
      }
      result = result.slice(0, parsedLimit);
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}
