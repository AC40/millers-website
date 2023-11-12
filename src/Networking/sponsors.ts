import { wpEndpoint } from "./wordpress";

const baseballMinisterTextData = await (await fetch(wpEndpoint + "websitetexte?slug=baseballminister-sponsor-beschreibung")).json()
export const baseballMinisterText = baseballMinisterTextData[0].acm_fields.text

const westfalenbandeTextData = await (await fetch(wpEndpoint + "websitetexte?slug=westfalenbande-sponsor-beschreibung")).json()
export const westfalenbandeText = westfalenbandeTextData[0].acm_fields.text

const fischbäckerTextData = await (await fetch(wpEndpoint + "websitetexte?slug=fischbecker-sponsor-text")).json()
console.log(fischbäckerTextData);

export const fischbäckerText = fischbäckerTextData[0].acm_fields.text