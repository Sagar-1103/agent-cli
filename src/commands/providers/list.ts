import { Command } from 'commander';
import { existsSync } from 'fs';
import { readFileSync } from 'fs';
import { providersPath } from '../../utils/constants';
import type { Provider } from '../../utils/types';


export const providerListCommand = new Command("list")
    .description('Lets user lists the providers')
    .action((options) => {
        let providers:Provider[] = [];
        const path = providersPath;

        const fileExists = existsSync(path);
        
        if (fileExists) {
            const response = readFileSync(path,"utf8");
            providers = JSON.parse(response);
        }

        const providerNames = providers.map((provider)=>{
            return provider.name;
        })

        if (!providerNames.length) {
            console.log("No providers");
        } else {
            console.log(providerNames);
        }

    })
