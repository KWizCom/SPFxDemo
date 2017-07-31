define(["require", "exports"], function (require, exports) {
    "use strict";
    var License = (function () {
        function License() {
        }
        License.GetUserLicenseMessage = function (context) {
            var userName = context && context.pageContext && context.pageContext.user && context.pageContext.user.displayName || null;
            if (userName)
                return Promise.resolve(userName + " has a valid license!");
            else
                return Promise.resolve("Anonymous users are not licensed!");
        };
        return License;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = License;
});
//# sourceMappingURL=License.js.map