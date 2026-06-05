import { Command } from "commander";
import { sendMessage } from "../handlers";
import agentLoop from "../utils/agent-loop";

export const agentCommand = new Command("agent")
  .description('Runs the agent')
  .option('-p, --prompt <prompt>', 'prompt', '')
  .option('-d, --path <path>', 'path', '')
  .action(async (options) => {
    const { prompt, path } = options;
    const response = await agentLoop(prompt, path);
    console.log(response);
  });