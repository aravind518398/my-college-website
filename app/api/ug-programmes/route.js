import { getUgProgrammes } from "@/lib/ugProgrammes";

export const runtime = "nodejs";

export async function GET() {
  const data = await getUgProgrammes();

  return Response.json({
    success: true,
    programmes: data.programmes,
    documentsRequired: data.documentsRequired,
    tableRows: data.tableRows,
  });
}
