/// <reference types="es6-promise" />
import { IWebPartContext } from "@microsoft/sp-webpart-base";
export default class Utilities {
    static GetUserName(context: IWebPartContext): string;
    static GetAllGroups(context: IWebPartContext): Promise<string[]>;
}
