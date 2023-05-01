interface VorstandsMitglied {
    name: string
    email: string
    role: string
    phone: string
}

export function getVorstandsMitglieder(json: [any]): VorstandsMitglied[] {
    var members: VorstandsMitglied[] = []

    for (var i = 0; i < json.length; i++) {
        members.push({ name: json[i].acm_fields.name, email: json[i].acm_fields.email, role: json[i].acm_fields.rolle, phone: json[i].acm_fields.telefonnummer} as VorstandsMitglied)
    }

    console.log("After loop: " + members)

    return members.reverse()
}