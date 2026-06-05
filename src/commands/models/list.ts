import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import { providersPath } from '../../utils/constants';
import type { Provider } from '../../utils/types';

export const modelListCommand = new Command("list")
    .description('Lets user lists the models')
    .action(() => {
        const path = providersPath;
        const fileExists = existsSync(path);

        if (fileExists) {
            const response = readFileSync(path, "utf8");
            const providers: Provider[] = JSON.parse(response);
            if (providers.length > 0) {
                console.log("Available Models:");
                providers.forEach((p) => {
                    console.log(`- ${p.name}`);
                });
            } else {
                console.log("No models found.");
            }
        } else {
            console.log("No models found. Please set a model first.");
        }
    })
