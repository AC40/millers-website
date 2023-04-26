export function formatDate(date): string {
    return date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
}

export function previewHTML(str: string): string {
    return str.replace(/<[^\r\n>]+>/gm, "")
}