import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
      return new NextResponse("File param is required", { status: 400 });
    }

    if (file.startsWith("http://") || file.startsWith("https://")) {
      const response = await fetch(file);

      if (!response.ok) {
        return new NextResponse("File not found", { status: 404 });
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = file.split("/").pop() || "file";

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    const safePath = path.normalize(file).replace(/^(\.\.(\/|\\|$))+/, "");
    const filePath = path.join(process.cwd(), "public", safePath);

    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const filename = path.basename(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
