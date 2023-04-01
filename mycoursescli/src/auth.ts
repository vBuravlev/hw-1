import fs from 'fs';
import * as path from 'path';

const APPLICATION = "tokens";
const FILE_NAME = "token.json";

const DIRECTORY: string = path.join(__dirname, APPLICATION);
const TOKEN_FILE: string = path.join(DIRECTORY, FILE_NAME);

export class Auth {
    private static async exists(tokenPath: string): Promise<boolean> {
        try {
            const filePath: string = tokenPath ? tokenPath : TOKEN_FILE;
            await fs.promises.access(filePath);
            return true;
        } catch (err) {
            return false;
        }
    }
    private static async save(token: string) {
        try {
            if (!await Auth.exists(DIRECTORY)) await fs.promises.mkdir(DIRECTORY, { recursive: true });
            await fs.promises.writeFile(TOKEN_FILE, token, { flag: "w+" });
        } catch (err) {
            throw new Error("Token file read error");
        }
    }
    private static async load(): Promise<string | Buffer> {
        try {
            const data: Buffer = await fs.promises.readFile(TOKEN_FILE);
            return data;
        } catch (err) {
            return "";
        }
    }
    static async login(token: string) {
        try {
            await Auth.save(token);
        } catch (err) {
            throw new Error(`Login failed: ${err}`);
        }
    }
    static async logout(): Promise<void> {
        try {
            await Auth.save("");
        } catch (err) {
            throw new Error(`Logout failed: ${err}`)
        }
    }
    static async isLogged(): Promise<boolean> {
        try {
            const tokenIsExist: boolean = await Auth.exists(TOKEN_FILE);
            if (tokenIsExist) {
                const token = await Auth.load();
                return !!token;
            }
            return false;
        } catch (err) {
            return false;
        }
    }
    static async token(): Promise<string> {
        try {
            const tokenIsExist: boolean = await Auth.exists(TOKEN_FILE);
            if (tokenIsExist) {
                const token: string = (await Auth.load()).toString();
                return token;
            }
            return "";
        } catch (err) {
            return "";
        }
    }
}
