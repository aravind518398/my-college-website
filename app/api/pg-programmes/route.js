import { getPgProgrammes } from "@/lib/pgProgrammes";

export const runtime = "nodejs";

export async function GET() {
  const data = await getPgProgrammes();

  return Response.json({
    success: true,
    programmes: data.programmes,
    documentsRequired: data.documentsRequired,
    tableRows: data.tableRows,
  });
}
