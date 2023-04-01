//Обрезка строки

export const substringCustom = (text: string | string[], end: number, start: number = 0): string => {
    const textLength: number = text.toString().length;
    let result: string;
    if (textLength > (end - start)) {
        result = `${text.toString().substring(start, end)} ...`;
    } else {
        const excess = (end - start) - textLength;
        result = `${text.toString().substring(start, end)}`.concat(' '.repeat(excess)).concat("    ");
    }
    return result;
}