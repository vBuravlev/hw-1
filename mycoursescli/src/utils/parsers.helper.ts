
export type Resource = { title: string, link: string };
export type Comments = { title: string, text: string, date: Date | number };

export const parserResources = (resources: string): Resource[] => {
    const result: Resource[] = [];
    let temp: string[] = resources.split(';');
    let title: string = "" as const;
    let link: string = "" as const;
    let counter: number = 0;
    for (const [index, item] of temp.entries()) {
        if (index % 2 === 0) {
            title = item ? item : "";
        } else {
            link = item ? item : "";
        }
        if (counter === 1) {
            const resource: Resource = { title, link };
            result.push(resource);
            counter = 0;
        } else {
            counter++;
        }
    }
    return result;
}

export const parserComments = (comments: string): Comments[] => {
    const result: Comments[] = [];
    let temp: string[] = comments.split('%%');
    let title = "";
    let text = "";
    let date;
    let counter: number = 0;
    for (const [index, item] of temp.entries()) {
        if (counter === 0) {
            title = item ? item : "";
        }
        if (counter === 1) {
            text = item ? item : "";
        }
        if (counter === 3) {
            date = new Date(item) ? new Date(item) : Date.now();
            const comments: Comments = { title, text, date };
            result.push(comments);
            counter = 0;
        }
        counter++;

    }
    return result;
}