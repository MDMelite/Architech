"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var js_yaml_1 = require("js-yaml");
function main() {
    var openapi = js_yaml_1.default.load(fs.readFileSync('api/github-agent/openapi.yaml', 'utf8'));
    var apiPaths = Object.entries(openapi.paths).flatMap(function (_a) {
        var p = _a[0], verbs = _a[1];
        return Object.keys(verbs).map(function (v) { return "".concat(v.toUpperCase(), " ").concat(p); });
    });
    var md = fs.readFileSync('docs/api_schema.md', 'utf8');
    var mdPaths = Array.from(md.matchAll(/^\d+\.\s+([A-Z]+)\s+(\/[^\s]+)/gm))
        .map(function (m) { return "".concat(m[1], " ").concat(m[2]); });
    var allPaths = __spreadArray(__spreadArray([], apiPaths, true), mdPaths, true);
    var uniquePaths = {};
    var diff = [];
    for (var _i = 0, allPaths_1 = allPaths; _i < allPaths_1.length; _i++) {
        var path = allPaths_1[_i];
        if (!(apiPaths.includes(path) && mdPaths.includes(path))) {
            diff.push(path);
        }
    }
    if (diff.length) {
        console.error('Mismatch:', diff);
        process.exit(1);
    }
    console.log('Schemas in sync ✅');
}
main();
