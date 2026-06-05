import { tools } from "./definition";

export const getToolsSchema = () => {
  return tools.map((t) => {
    return {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    };
  });
};

export const toolSchemas = [
  {
    functionDeclarations: tools.map(({ name, description, parameters }) => ({
      name,
      description,
      parameters,
    })),
  },
];

export const executeTool = (name: string, args: Record<string, string>) => {
  const tool = tools.find((t) => t.name === name);
  if (!tool) return;
  return tool.execute(args);
};
