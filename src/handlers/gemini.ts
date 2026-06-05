import {GoogleGenAI} from '@google/genai';

export class Gemini {
    model:GoogleGenAI;
    constructor(_apiKey:string) {
        this.model= new GoogleGenAI({apiKey: _apiKey});
    }

    async getModels() {
        const models = await this.model.models.list();
        return models;
    }

    async generateContent(prompt:string) {
    console.log(2);
    
    const response = await this.model.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    console.log(3);
    console.log(response.text,"asd");
    console.log(4);
    }
}