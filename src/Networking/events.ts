const json = await (await fetch("https://bsm.baseball-softball.de/clubs/354/matches.json?api_key=Sm1o1iRAB2jB_U8xVUfpvw")).json()


function matchDate(match: any): Date {
    return new Date(match.time.replace(/-/g, "/"))
}

export const eventsJSON = JSON.stringify(json)

export interface Event {
    home: string
    away: string
    date: Date
    fieldName: string
}

export function nextEvents(n: number): Event[] {
    const matches = JSON.parse(eventsJSON).filter(match => (match.home_league_entry.team.short_name == "MIN" || match.away_league_entry.team.short_name == "MIN"))
    
    const filtered = matches.filter((match) => {
        return matchDate(match).getTime() > Date.now()
    })
    
    const sorted = filtered.sort((a, b) => {
        return matchDate(a) > matchDate(b)
    })

    var n = n;
    while (sorted.length >= n) {
        return sorted.slice(0, n).map((match) => {
            return { 
                home: match.home_team_name,
                away: match.away_team_name,
                date: matchDate(match),
                fieldName: match.field.name
            } as Event
        })

        n -= 1
    }

    return []
}