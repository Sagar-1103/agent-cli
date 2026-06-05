import { Command } from 'commander';
import { readFile, writeFile } from 'fs';
import { existsSync } from 'fs';
import { providersPath } from '../../utils/constants';
import { addModelsByProvider } from '../../handlers';
import type { Provider } from '../../utils/types';


export const loginCommand = new Command("login")
    .description('Lets user login into the provider (use it as default)')
    .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)', '')
    .option('-a, --api_key <apiKey>', 'Your api key', '')
    .action(async(options) => {
        const { provider, api_key } = options;
        let providers:Provider[] = [];

        const providerFileExists = existsSync(providersPath);
        
        if (!providerFileExists) {
            const data = {name:provider,apiKey:api_key,models:[]};
            providers.push(data);
            writeFile(providersPath,JSON.stringify(providers),async()=>{
                await addModelsByProvider(data);
                console.log(`${provider} provider logged in`);
            });

        } else {
            readFile(providersPath,"utf8",async(err,response)=>{
                providers = JSON.parse(response);
                const doesProviderExists = providers.find(p=>p.name===provider);
                if (!doesProviderExists) {
                    const data = {name:provider,apiKey:api_key,models:[]};
                    providers.push(data);
                    writeFile(providersPath,JSON.stringify(providers),async()=>{
                        await addModelsByProvider(data);
                        console.log(`${provider} provider logged in`);
                    });
                }
            });
        }
    })
