import { Command, program } from 'commander';
import { loginCommand } from './login';
import { logoutCommand } from './logout';
import { providerListCommand } from './list';
import { setProviderCommand } from './setProvider';

export const providerCommand = new Command("providers")
    .description("Provider related information")
    .addCommand(loginCommand)
    .addCommand(logoutCommand)
    .addCommand(providerListCommand)
    .addCommand(setProviderCommand)