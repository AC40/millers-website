const wpEndpoint = "https://wordpress.mindenmillers.de/wp-json/wp/v2/"

const showCalendarData = await (await fetch(wpEndpoint + "variablen?key=showCalendar")).json()
export const shouldShowCalendar = showCalendarData[0].acm_fields.toggle || import.meta.env.DEV

const showWestfalenbandeAsSponsorData = await (await fetch(wpEndpoint + "variablen?key=showWestfalenbandeAsSponsor")).json()
export const showWestfalenbandeAsSponsor = showWestfalenbandeAsSponsorData[0].acm_fields.toggle

const showBaseballMinisterAsSponsorData = await (await fetch(wpEndpoint + "variablen?key=showWestfalenbandeAsSponsor")).json()
export const showBaseballMinisterAsSponsor = showBaseballMinisterAsSponsorData[0].acm_fields.toggle