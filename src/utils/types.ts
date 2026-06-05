export interface Model {
    name:string;
}

export interface Provider {
    name:string;
    apiKey:string;
    models: Model[];
}

export interface Message {
    role: "AI" | "USER" | "TOOL";
    content: string;
}

export interface Tool {
    name:string;
    description:string;
    parameters:Record<string,any>;
    execute:(args:Record<string,string>) => string;
}