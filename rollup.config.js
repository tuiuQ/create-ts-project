import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { eslint } from "rollup-plugin-eslint";
import ts from "rollup-plugin-typescript2";
import pkg from "./package.json";

const getPath = (_path) => path.resolve(__dirname, _path);

const extensions = [".js", ".ts"];

const tsPlugin = ts({
  tsconfig: getPath("./tsconfig.json"),
  extensions,
});

const esPlugin = eslint({
  throwOnError: true,
  include: ["src/**/*.ts"],
  exclude: ["node_modules/**", "lib/**"],
});

const commonConf = {
  input: getPath("./src/index.ts"),
  plugins: [resolve(extensions), commonjs(), esPlugin, tsPlugin],
};

const outputMap = [
  {
    file: pkg.main,
    format: "umd",
  },
  {
    file: pkg.module,
    format: "es",
  },
];

const buildConf = (options) => Object.assign({}, commonConf, options);

export default outputMap.map((output) =>
  buildConf({ output: { name: pkg.name, ...output } })
);
