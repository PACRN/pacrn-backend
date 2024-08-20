export const urlConcatinator = (data: string[], seperator: string) => {
    let result: string = "";
    data.forEach((value: string, index: number) => {
        result += value;
        if (index != data.length - 1) result += seperator
    });
    return result;
}

export const generateRandomToken = async () => {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return token;
}
