import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { GraphHttpClient, HttpClientResponse } from '@microsoft/sp-http';

/* Note: When swtiching versions
 * v1.1.0 uses GraphClientResponse
 * v1.4.0 uses GraphHttpClientResponse
 * The class was renamed, breaking change
 * To avoid code conflicts - we will use the base class HttpClientResponse instead
 */

export default class Utilities {
    public static GetUserName(context: IWebPartContext): string {
        return context && context.pageContext && context.pageContext.user && context.pageContext.user.displayName || 'Anonymous user';
    }

    public static GetAllGroups(context: IWebPartContext): Promise<string[]> {
        return context.graphHttpClient.get("v1.0/groups?$select=displayName", GraphHttpClient.configurations.v1)
            .then((response: HttpClientResponse): Promise<any> => {
                return response.json();
            })
            .then((data: { value: { displayName: string }[] }) => {
                let result: string[] = [];
                if (data && data.value && data.value.length)
                    data.value.forEach(group => result.push(group.displayName));
                return result;
            }).catch((error) => {
                console.log(`${context.webPartTag}: There was an error while using the graph API: ${error.message}`);
                return Promise.resolve(['Offline']);
            });
    }
}