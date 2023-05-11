//MARK: Constants
const wpEndpoint = "https://wordpress.mindenmillers.de/wp-json/wp/v2/"

export interface WPimage {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export enum WPResolution {
    mdlg = "medium_large",
    small = "thumbnail",
    md = "medium",
    full = "full",
}


export function getCompressedImage(img: any, resolution: WPResolution, altText: string): WPimage | undefined {
    if (img.media_details == undefined) {
        return undefined
    }
    const sizes = img.media_details.sizes
    var details;

    switch (resolution) {
        case WPResolution.small:
            details = sizes.thumbnail
        case WPResolution.md:
            details = sizes.medium
        case WPResolution.mdlg:
            details = sizes.medium_large;
        case WPResolution.full:
            details = sizes.full;
    }

    if (details == undefined) {
        details = sizes.medium
        console.log("Switched to md");
        
    }

    if (details == undefined) {
        details = sizes.medium_large
        console.log("Switched to mdlg");
    }

    if (details == undefined) {
        details = sizes.full
        console.log("Switched to full");
    }

    const url = details.source_url
    const width = details.width
    const height = details.height
    const alt = altText

    return { url: url, alt: alt, width: width, height: height } as WPimage
}

// Create img data
// Remote posts
const postRes = await fetch(wpEndpoint + "news")
const posts = await postRes.json()

// Sort news by date
posts.sort(function (a, b) {
  return Date.parse(b.date) - Date.parse(a.date)
});

const newest = posts.slice(0, 2)

export function formatDate(date): string {
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
}

// Hero img
const heroRes = await fetch(wpEndpoint + "websitebilder?slug=startseite-action-hero")
const heroData = await heroRes.json()
const heroImg = getCompressedImage(heroData[0].acm_fields.bild, WPResolution.mdlg, heroData[0].acm_fields.beschreibung)

// Hero text
const heroTextData = await (await fetch(wpEndpoint + "websitetexte?slug=heroText")).json()
const heroText = heroTextData[0].acm_fields.text

// Training times
const training1Data = await (await fetch(wpEndpoint + "websitetexte?slug=training1")).json()
const training1 = training1Data[0].acm_fields.text

const training2Data = await (await fetch(wpEndpoint + "websitetexte?slug=training2")).json()
const training2 = training2Data[0].acm_fields.text

interface IndexData {
    heroImg: WPimage;
    heroText: string;
    training1: string;
    training2: string;
    newest: any;
}

export const indexData = { heroImg: heroImg, heroText: heroText, training1: training1, training2: training2, newest: newest } as IndexData