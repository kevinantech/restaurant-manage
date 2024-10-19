import { LeagueNavigationBar, LeagueTable, Title } from "@/components/admin";
import { leaguesMock } from "@/data/leagues.mock";

// Allows dynamic rendering.
const dynamic = "force-dynamic";

// TODO: Realize fetching data from API.
const getLeagues = async () => await fetch("").then(async (res) => await res.json());

export default async function Leagues() {
  return (
    <main className="bg-transparent">
      <Title>Ligas</Title>
      <LeagueNavigationBar />
      <LeagueTable data={leaguesMock} />
    </main>
  );
}
