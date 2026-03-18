export function decodeToken(token: string) {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(Buffer.from(payload, "base64").toString());
    } catch (error) {
        return null;
    }
}