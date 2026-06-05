import { program } from 'commander';
import { modelsCommand } from './src/commands/models';
import { agentCommand } from './src/commands/agent';
import { providerCommand } from './src/commands/providers';


program
  .name('Agent CLI')
  .description('Coding agent cli')
  .version('0.1.0')
  .addCommand(modelsCommand)
  .addCommand(agentCommand)
  .addCommand(providerCommand);

program.parse();
