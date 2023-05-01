
const wpEndpoint = "https://wordpress.mindenmillers.de/wp-json/wp/v2/"

const showCalendarData = await (await fetch(wpEndpoint + "variablen?key=showCalendar")).json()
export const shouldShowCalendar = ((showCalendarData[0].acm_fields.value == "0") ? false : true) || import.meta.env.DEV