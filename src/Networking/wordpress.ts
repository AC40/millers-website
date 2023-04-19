export interface WPimage {
    url: string
    alt: string
    width: number
    height: number
}

export function getImage(res: any): WPimage {
    const url = res[0].acm_fields.bild.source_url
    const width = res[0].acm_fields.bild.media_details.width
    const height = res[0].acm_fields.bild.media_details.height
    const alt = res[0].acm_fields.bild.alt_text

    return { url: url, alt: alt, width: width, height: height } as WPimage
}