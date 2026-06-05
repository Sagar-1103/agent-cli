import { GoogleGenAI } from "@google/genai";
import { providersPath } from "../utils/constants";
import type { Message, Provider } from "../utils/types";
import { Gemini } from "./gemini";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { toolSchemas } from "../utils/tools/tool-util";
import fs from "fs";
import { getSystemPrompt } from "../utils/system-prompt";

export async function addModelsByProvider(provider: Provider) {
    if (provider.name === "gemini") {
        const gemini = new Gemini(provider.apiKey);
        const modelsPage = await gemini.getModels();
        const modelNames = modelsPage.page.map(model => model.name).filter((name) => name !== undefined);
        const models = modelNames.map((name) => {
            return { name };
        })

        let providers: Provider[] = [];

        const providersFileExists = existsSync(providersPath);

        if (providersFileExists) {
            const response = readFileSync(providersPath, "utf8");
            providers = JSON.parse(response);
            const provider = providers.find(p => p.name === "gemini");
            if (!provider) return;
            provider.models = models;
            const newProviders = [...providers.filter(p => p.name === provider.name), provider];
            writeFileSync(providersPath, JSON.stringify(newProviders));
        }

    }
}

export async function sendMessage(prompt: string, memory: Message[], dir?: string) {

    // assuming default provider as gemini-2.5-flash
    const ai = new GoogleGenAI({ apiKey: "AIzaSyAGkb2kp38nyB71XIYF2JfukkkLj1rIICg" });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${memory.length && `Memory:${JSON.stringify(memory)}, `}System Prompt:${getSystemPrompt(dir)} User Prompt:${prompt}`,
        config: { tools: toolSchemas },
    });

    return response;
}