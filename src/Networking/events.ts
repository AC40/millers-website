const json = await (await fetch("https://bsm.baseball-softball.de/clubs/354/matches.json?api_key=Sm1o1iRAB2jB_U8xVUfpvw")).json()


//MARK: Utility functions
function matchDate(match: any): Date {
    return new Date(match.time.replace(/-/g, "/"))
}

function createMatchTitle(match) {
    // return match.away_team_name + " @ " + match.home_team_name
    return match.home_league_entry.team.short_name == "MIN" ? "Heimspiel" : "Auswärts"
}

function createMatchDescription(match) {
    return  `<div class=\"custom-event-description\">${match.away_team_name + " @ " + match.home_team_name}<br>Wo: ${match.field?.name}</div>`
}

const matches = json.filter(match => (match.home_league_entry.team.short_name == "MIN" || match.away_league_entry.team.short_name == "MIN"))
    
const sorted = matches.sort((a, b) => {
    return matchDate(a) > matchDate(b)
})

// Exports
export const events = sorted.map((match) => {
    return { 
        title: createMatchTitle(match),
        start: new Date(match.time.replace(/-/g, "/")).toISOString(),
        description: createMatchDescription(match),
        extendedProps: {
            description: createMatchDescription(match)
        }
    }
})

export interface Event {
    home: string
    away: string
    date: Date
    fieldName: string
}

export function nextEvents(n: number): Event[] {
    const matches = json.filter(match => (match.home_league_entry.team.short_name == "MIN" || match.away_league_entry.team.short_name == "MIN"))
    
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
