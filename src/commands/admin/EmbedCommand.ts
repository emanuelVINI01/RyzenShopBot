import { Message, MessageEmbed, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class EmbedCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length < 1) {
            message.reply("Use: !embed <mensagem>");
        }
        else if (args.join(" ").length > 1024) {
                message.reply("O máximo da embed é 1024 caracteres.")
        } else {
            let messaged = "";

            args.forEach(each => {
                    messaged += each + " ";
            })
            messaged = messaged.replace("@n", "\n")
            let embed = new MessageEmbed({
                "footer": {
                    "iconURL": message.member.avatarURL(),
                    "text": `Por ${message.member.displayName}`
                }
            });

            embed.description = messaged;
            embed.color = 0x32a885
            embed.setTimestamp(new Date())
            embed.setAuthor(message.guild.name)
            message.channel.send({embeds: [embed]});
            message.delete()
        }
    }
    getPermission(): bigint {
        return Permissions.FLAGS.ADMINISTRATOR;
    }
    getName(): string {
        return "embed";
    }
    getAliases(): string[] {
        return ["falar", "say"];
    }

}