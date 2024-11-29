import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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

export async function GET(
  request: Request,
  { params }: { params: { title: string } },
) {
  const { title } = params;

  try {
    const data: Hook[] = await loadData();
    const hook = data.find((hook) => hook.title === title);

    if (!hook) {
      return NextResponse.json(
        { error: "Couldn't find the requested hook." },
        { status: 404 },
      );
    }

    return NextResponse.json(hook);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
