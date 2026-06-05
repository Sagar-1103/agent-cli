import { Command } from 'commander';
import { modelListCommand } from './list';
import { setModelCommand } from './set-model';

export const modelsCommand = new Command("models")
    .description("Model related information")
    .addCommand(modelListCommand)
    .addCommand(setModelCommand)