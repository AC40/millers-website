import { log } from "astro/dist/core/logger/core"
import { wpEndpoint } from "./wordpress"

// Get Season matches
const matchesJSON = await (await fetch("https://bsm.baseball-softball.de/clubs/354/matches.json?api_key=Sm1o1iRAB2jB_U8xVUfpvw")).json()
const matches = matchesJSON.filter(match => (match.home_league_entry.team.short_name == "MIN" || match.away_league_entry.team.short_name == "MIN"))
const sorted = matches.sort((a, b) => {
    return matchDate(a) > matchDate(b)
})

// Get custom events from wp
const miscEventsJSON = await (await fetch(wpEndpoint + "events")).json()
const miscEvents = miscEventsJSON.map((event, i) => {
    const date = new Date(event.acm_fields.datum)
    return { 
        title: event.acm_fields.titel,
        start: date.toISOString(),
        allDay: true,
        description: createEventDescription(event),
        classNames: [`tippy-content-id-${i + '-misc'}`],
        color: '#B1E5CD',
        textColor: '#000',
        extendedProps: {
            description: createEventDescription(event),
            id: i.toString() + '-misc'
        }
    } 
})

const games = sorted.map((match, i) => {
    const date = matchDate(match)
    return { 
        title: createMatchTitle(match),
        start: date.toISOString(),
        allDay: true,
        description: createMatchDescription(match),
        classNames: [`tippy-content-id-${i}-match`],
        color: '#F5DE8D',
        textColor: '#000',
        extendedProps: {
            description: createMatchDescription(match),
            id: i.toString() + '-match',
            home: match.home_team_name,
            away: match.away_team_name,
            fieldName: match.field.name
        }
    }
})

// Exports
export const events = games.concat(miscEvents)

export interface Event {
    home: string
    away: string
    date: Date
    fieldName: string
}

export function nextEvents(n: number): Event[] {

    let now = new Date().toISOString()
    
    const filtered = events.filter((event) => {
        return event.start > now
    })
    
    const sorted = filtered.sort((a, b) => {
        return a.start < b.start
    })

    const firstN: Event[] = sorted.slice(0, n).map((event) => {
        return {
            home: event.extendedProps.home,
            away: event.extendedProps.away,
            date: new Date(event.start),
            fieldName: event.extendedProps.fieldName,
        } as Event
    })

    if (firstN.length > 0) {
        return firstN
    } else {
        return []
    }
}

//MARK: Utility functions
function matchDate(match: any): Date {
    return new Date(match.time.replace(/-/g, "/"))
}

function createMatchTitle(match) {
    // return match.away_team_name + " @ " + match.home_team_name
    return ` ${match.home_league_entry.team.short_name} vs. ${match.away_league_entry.team.short_name}`
}

function createMatchDescription(match) {
    const date = matchDate(match)
    
    const mindenIsHome = (match.home_league_entry.team.short_name == "MIN")
    return  `
    <div class=\"custom-event\">
        <h4>${match.away_team_name + " @ " + match.home_team_name}</h4>
        ${(date.getTime() < Date.now()) ? `Ergebnis: <b>${match.home_runs}:${match.away_runs}</b><br>` : `Spielbeginn: ${new Intl.DateTimeFormat('de-DE', { dateStyle: undefined, timeStyle: 'short', timeZone: 'Europe/Berlin' }).format(date)} Uhr<br>`}
        Wo: <a href=${(mindenIsHome) ? "/millers-park" : `https://www.google.com/maps/search/?api=1&query=${match.field.latitude},${match.field.longitude}`} ${(mindenIsHome) ? "" : `target="_blank" rel="noreferrer noopener"`}><b>${match.field?.name}</b></a>
    </div>`
}

function createEventDescription(event) {
    const date = new Date(event.acm_fields.datum)
    return  `
    <div class=\"custom-event\">
        <h4>${event.acm_fields.titel}</h4>
        ${(event.acm_fields.ort != "") ? `Wo: <b>${event.acm_fields.ort}</b>` : ''}
        ${(event.acm_fields.beschreibung != "") ? `<br>${event.acm_fields.beschreibung}` : ''}
    </div>`
}