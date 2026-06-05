import { GoogleGenAI, type GenerateContentConfig } from '@google/genai';

export class Gemini {
    model: GoogleGenAI;
    constructor(_apiKey: string) {
        this.model = new GoogleGenAI({ apiKey: _apiKey });
    }

    async getModels() {
        const models = await this.model.models.list();
        return models;
    }

    async generateContent(data: string, config: GenerateContentConfig) {
        const response = await this.model.models.generateContent({
            model: "gemini-2.5-flash",
            contents: data,
            config
        });
        return response;
    }
}