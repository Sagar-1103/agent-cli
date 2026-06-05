
import { Command } from 'commander';
import { providersPath } from '../../utils/constants';
import { existsSync } from 'fs';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';
import type { Provider } from '../../utils/types';

export const setModelCommand = new Command("set")
    .description('Lets user set the default model')
    .option('-p, --model <modelName>', 'Name of the model ', '')
    .action((options) => {

        const { provider } = options;
        let providers: Provider[] = [];

        const path = providersPath;

        const fileExists = existsSync(path);

        if (fileExists) {
            const response = readFileSync(path, "utf8");
            providers = JSON.parse(response);
        }

        if (provider) {
            const foundProvider = providers.find((p) => p.name === provider);
            if (!foundProvider) {
                console.log("Provider doesnt exist");
                return;
            }
            const latestProviders = providers.map((p) => {
                if (p.name === provider) {
                    return { ...p };
                }
                return { ...p };
            });
            writeFileSync(path, JSON.stringify(latestProviders));
            console.log(options.provider + " set to default");
        } else {
            console.log("Provider needs to be mentioned.");
        }

    })
