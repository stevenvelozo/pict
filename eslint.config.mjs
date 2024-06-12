import globals from "globals";
import pluginJs from "@eslint/js";


export default [
	{ files: ["source/**"], languageOptions: { sourceType: "commonjs" } },
	{ languageOptions: { globals: { ...globals.browser, ...globals.mocha, } } },
	pluginJs.configs.recommended,
	{ rules: { "no-prototype-builtins": "off", "no-unused-vars": "warn" } },
];
