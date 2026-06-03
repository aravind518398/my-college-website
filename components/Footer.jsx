import FooterClient from "@/components/FooterClient";
import { getDepartments } from "@/lib/departments";
import { getPgProgrammes } from "@/lib/pgProgrammes";
import { getSiteSettings } from "@/lib/siteSettings";
import { getUgProgrammes } from "@/lib/ugProgrammes";

function toClientData(value) {
  return JSON.parse(JSON.stringify(value));
}

export default async function Footer() {
  const [settings, ugProgrammeData, pgProgrammeData, departments] =
    await Promise.all([
      getSiteSettings(),
      getUgProgrammes(),
      getPgProgrammes(),
      getDepartments(),
    ]);

  return (
    <FooterClient
      initialSettings={toClientData(settings)}
      initialUgProgrammes={toClientData(ugProgrammeData.programmes)}
      initialPgProgrammes={toClientData(pgProgrammeData.programmes)}
      initialDepartments={toClientData(departments)}
    />
  );
}
