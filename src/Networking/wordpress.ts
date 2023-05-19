//MARK: Constants
export const wpEndpoint = "https://wordpress.mindenmillers.de/wp-json/wp/v2/"

export interface WPImage {
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


export function getCompressedImage(img: any, resolution: WPResolution, altText: string): WPImage | undefined {
    if (img == undefined || img.media_details == undefined) {
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
    }

    if (details == undefined) {
        details = sizes.medium_large
    }

    if (details == undefined) {
        details = sizes.full
    }

    const url = details.source_url
    const width = details.width
    const height = details.height
    const alt = altText

    return { url: url, alt: alt, width: width, height: height } as WPImage
}

