import fs, { type PathLike } from "fs";
import type { Tool } from "../types";

export const tools: Tool[] = [
    {
        name: "read_file",
        description: "Read contents of a file",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description: "Path of the file that needs to be read"
                },
            },
            required: ["path"],
        },
        execute(args) {
            const path = args.path as PathLike;
            if (!fs.existsSync(path)) {
                return `File not found: ${path}`;
            } else {
                return fs.readFileSync(path, "utf-8");
            }
        },
    },
    {
        name: "write_file",
        description: "Write content in a file",
        parameters: {
            type: "object",
            properties: {
                path: { type: "string" },
                content: { type: "string" },
            },
            required: ["path", "content"],
        },
        execute(args) {
            const path = args.path as PathLike;
            const content = args.content as string;
            const directoryExists = fs.existsSync(path);
            if (!directoryExists) {
                fs.mkdirSync(path, { recursive: true });
            }
            fs.writeFileSync(path, content, "utf-8");
            return `Completed writing ${content} in ${path}`;
        },
    },
    {
        name: "list_files",
        description: "List all the files in the given directory",
        parameters: {
            type: "object",
            properties: {
                path: { type: "string" },
            },
            required: ["path"]
        },
        execute(args) {
            const path = args.path as PathLike;

            const directoryExists = fs.existsSync(path);

            if (!directoryExists) {
                return `Path: ${path} doesnt exist`;
            } else {
                return fs.readdirSync(path).join("\n");
            }
        },
    }
];