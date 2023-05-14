import { getCompressedImage, WPResolution, WPImage } from "./wordpress";
import { wpEndpoint } from "./wordpress";

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

const textData = await (await fetch(wpEndpoint + "websitetexte?slug=millers-info")).json()
const text = textData[0].acm_fields.text

interface IndexData {
    heroImg: WPImage;
    heroText: string;
    training1: string;
    training2: string;
    text: string;
    newest: any;
}

export const indexData = { heroImg: heroImg, heroText: heroText, training1: training1, training2: training2, text: text, newest: newest } as IndexData