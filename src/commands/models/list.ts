import { Command } from 'commander';

export const modelListCommand = new Command("list")
    .description('Lets user lists the providers')
    .action((options) => {
        console.log(options);
    })
