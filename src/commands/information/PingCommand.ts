import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class PingCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        message.channel.send("Calculando ...").then(msg => {
            const botPing = msg.createdTimestamp - message.createdTimestamp
            const embed = new MessageEmbed()
            embed.setColor("PURPLE")
            embed.addField(":stopwatch: API", message.client.ws.ping.toString() + "ms para receber o sinal da API.", false)
            embed.addField(":zap: Bot", botPing.toString() + "ms para processar o comando.", false)
            embed.title = ":ping_pong: Pong!"
            msg.delete()
            message.reply({embeds: [embed]})
        })
    }
    getPermission(): bigint {
        return null;
    }
    getName(): string {
        return "ping"
    }
    getAliases(): string[] {
        return ["pingdobot"]
    }

}