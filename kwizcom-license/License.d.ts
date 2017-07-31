/// <reference types="es6-promise" />
import { IWebPartContext } from "@microsoft/sp-webpart-base";
export default class License {
    static GetUserLicenseMessage(context: IWebPartContext): Promise<string>;
}