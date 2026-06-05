import { sendMessage } from "../handlers";
import { memoryPath } from "./constants";
import { tools } from "./tools/definition";
import type { Message } from "./types";
import fs from "fs";

export default async function agentLoop(prompt: string, dir?: string) {

    let responseMessage = "";

    let memory: Message[] = [];

    const memoryPathExists = fs.existsSync(memoryPath);

    if (memoryPathExists) {
        const response = fs.readFileSync(memoryPath, "utf-8");
        memory = JSON.parse(response);
    }

    memory.push({
        role: "USER",
        content: prompt,
    });

    let currentPrompt = prompt;
    let completed = false;

    while (!completed) {
        const response = await sendMessage(currentPrompt, memory, dir);

        const parts = response.candidates?.[0]?.content?.parts;

        if (!parts?.length) {
            completed = true;
            break;
        }

        const functionCallPart = parts.find(p => p.functionCall);
        if (functionCallPart?.functionCall) {
            const { name, args } = functionCallPart.functionCall as { name: string, args: Record<string, string> };
            let toolResponse = "";
            const tool = tools.find(t => t.name === name);
            if (!tool?.name) {
                toolResponse = `Tool ${name} not found`;
            } else {
                toolResponse = tool.execute(args);
            }

            memory.push({
                role: "AI",
                content: `I decided to call tool ${name} with arguments ${JSON.stringify(args)}`,
            });

            memory.push({
                role: "TOOL",
                content: toolResponse,
            });

            currentPrompt = "Tool returned result. Proceed based on the result";
        } else {
            const textPart = parts.find(p => p.text);
            if (textPart?.text) {
                memory.push({
                    role: "AI",
                    content: textPart.text,
                });
                responseMessage = textPart.text;
                completed = true;
            }
        }
    }

    fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));

    return responseMessage;
}