const matches = [
    { id: 1, homeTeam: "Club Deportivo", awayTeam: "Rival FC", score: "2 - 1", date: "2023-06-15" },
    { id: 2, homeTeam: "Atlético City", awayTeam: "Club Deportivo", score: "0 - 3", date: "2023-06-08" },
    { id: 3, homeTeam: "Club Deportivo", awayTeam: "United Sporting", score: "1 - 1", date: "2023-06-01" },
  ]
  
  export default function MatchResults() {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4">Resultados Recientes</h2>
        <div className="space-y-2">
          {matches.map((match) => (
            <div key={match.id} className="bg-gray-100 p-2 rounded">
              <div className="flex justify-between items-center">
                <span>{match.homeTeam}</span>
                <span className="font-bold">{match.score}</span>
                <span>{match.awayTeam}</span>
              </div>
              <div className="text-sm text-gray-600 text-center">{match.date}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  