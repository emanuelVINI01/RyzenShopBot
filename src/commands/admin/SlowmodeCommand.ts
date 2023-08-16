import { Message, Permissions, TextChannel } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class SlowmodeCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length != 1) {
            message.reply("Use: !slowmode <slowmode>")
        } else {
            let n = parseInt(args[0]);
            if (n != NaN) {
                if (n === (message.channel as TextChannel ).rateLimitPerUser) {
                    message.reply("<:nao:912041041211830292> | **Esse já é o slowmode do canal.**")
                    return;
                }
                if (n === 0) {
                    message.reply("<:845101701417271298:912041002540343347> | **Slowmode removido com sucesso.**")
                } else {
                    message.reply("<:845101701417271298:912041002540343347> | **Slowmode mudado com sucesso.**")
                }
                (message.channel as TextChannel ).setRateLimitPerUser(n)
            } else {
                message.reply("<:nao:912041041211830292> | **Slowmode inválido.**")
            }
        }
    }
    getPermission(): bigint {
        return Permissions.FLAGS.MANAGE_CHANNELS;
    }
    getName(): string {
        return "slowmode"
    }
    getAliases(): string[] {
        return ["modelento", "cold"]
    }

}