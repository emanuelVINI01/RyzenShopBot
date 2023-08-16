import { Message, Permissions, TextChannel } from 'discord.js';
import BaseCommand from '../BaseCommand.js'

export default class ClearCommand implements BaseCommand {
    async execute(message: Message, args: string[]) {
        try {
            if (args.length != 1) {
                message.reply("Use: !clear <mensagens>.")
            } else {
                let messagecount: number = parseInt(args[0]);
                if (messagecount === NaN) {
                    message.reply("<:nao:912041041211830292> | **Não entendi esse número.**")
                }
                if (messagecount > 100) {
                    message.reply("<:nao:912041041211830292> | **Só posso limpar até 100 mensagens.**")
                }
                (message.channel as TextChannel).bulkDelete(Math.min(messagecount, 1000));
                const msg = await message.reply(`<:845101701417271298:912041002540343347> | **O chat teve ${messagecount} mensagens removidas por <@${message.author.id}>**`)
                setTimeout(() => {
                    msg.delete()
                }, 2500)
            }
        } catch (ex) {

        }
    }

    getPermission(): bigint {
        return Permissions.FLAGS.ADMINISTRATOR;
    }
    getName(): string {
        return "clear";
    }
    getAliases(): string[] {
        return ["limpar", "apagar"];
    }

}