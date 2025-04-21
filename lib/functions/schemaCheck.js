import * as fs from 'fs';
import yaml from 'js-yaml';
function main() {
    const openapi = yaml.load(fs.readFileSync('api/github-agent/openapi.yaml', 'utf8'));
    const apiPaths = Object.entries(openapi.paths).flatMap(([p, verbs]) => Object.keys(verbs).map(v => `${v.toUpperCase()} ${p}`));
    const md = fs.readFileSync('docs/api_schema.md', 'utf8');
    const mdPaths = Array.from(md.matchAll(/^\d+\.\s+([A-Z]+)\s+(\/[^\s]+)/gm))
        .map(m => `${m[1]} ${m[2]}`);
    const allPaths = [...apiPaths, ...mdPaths];
    const uniquePaths = {};
    const diff = [];
    for (const path of allPaths) {
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
