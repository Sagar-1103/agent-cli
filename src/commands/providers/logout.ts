
import { Command } from 'commander';
import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';
import { existsSync } from 'fs';
import { providersPath } from '../../utils/constants';
import type { Provider } from '../../utils/types';

export const logoutCommand = new Command("logout")
    .description('Lets user logout from the provider')
    .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)', '')
    .action(async(options) => {
        const { provider } = options;
        let providers:Provider[] = [];
        const path = providersPath;

        const fileExists = existsSync(path);
        
        if (fileExists) {
            const response = readFileSync(path,"utf8");
            providers = JSON.parse(response);
        }
        
        const doesProviderExists = providers.find(p=>p.name===provider);
        if (!doesProviderExists) {
            console.log("Provider doesnt exist");
        } else {
            const filteredProviders = providers.filter(p=>p.name!==provider);
            writeFileSync(path,JSON.stringify(filteredProviders));
            console.log(`${provider} provider logged out`);
        }
    })

