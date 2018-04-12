define(["require", "exports", "@microsoft/sp-http"], function (require, exports, sp_http_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* Note: When swtiching versions
     * v1.1.0 uses GraphClientResponse
     * v1.4.0 uses GraphHttpClientResponse
     * The class was renamed, breaking change
     * To avoid code conflicts - we will use the base class HttpClientResponse instead
     */
    var Utilities = (function () {
        function Utilities() {
        }
        Utilities.GetUserName = function (context) {
            return context && context.pageContext && context.pageContext.user && context.pageContext.user.displayName || 'Anonymous user';
        };
        Utilities.GetAllGroups = function (context) {
            return context.graphHttpClient.get("v1.0/groups?$select=displayName", sp_http_1.GraphHttpClient.configurations.v1)
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                var result = [];
                if (data && data.value && data.value.length)
                    data.value.forEach(function (group) { return result.push(group.displayName); });
                return result;
            }).catch(function (error) {
                console.log(context.webPartTag + ": There was an error while using the graph API: " + error.message);
                return Promise.resolve(['Offline']);
            });
        };
        return Utilities;
    }());
    exports.default = Utilities;
});
//# sourceMappingURL=Utilities.js.map