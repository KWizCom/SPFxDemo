//Cannot use this type on 2 different versions of SPFx
//import { IWebPartContext } from "@microsoft/sp-webpart-base";
//must use type any

export default class License {
    public static GetUserLicenseMessage(context: any): Promise<string> {
        let userName = context && context.pageContext && context.pageContext.user && context.pageContext.user.displayName || null;
        if (userName) return Promise.resolve(`${userName} has a valid license!`);
        else return Promise.resolve(`Anonymous users are not licensed!`);
    }
}