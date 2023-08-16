import { Message, MessageEmbed, TextChannel } from "discord.js";
import BaseCommand from "../BaseCommand";

export default class AvaliarCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (!message.member.roles.cache.has("899851014465802290") && !message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("Somente clientes podem usar isso.")
            return
        }
        if (args.length < 2) {
            message.reply("Uso: !avaliar (nota de um a 5) (mensagem)")
            return
        }
        let nota = parseInt(args[0])
        if (nota && nota > 0 && nota < 6) {
            let embed = new MessageEmbed({
                "title": "<:livro:899857542048542781> Avaliação de "+message.member.user.username,
                "color": (nota < 5 ? (nota > 2 ? "BLUE" : "RED") : "GREEN")
            })
            let stars = ""
            for (let i in [...Array(nota).keys()]) {
                stars += "⭐"
            }
            embed.addField("Nota", stars , false);
            embed.addField("Mensagem", args.join(" ").replace(nota.toString(), ""), false);
            (message.guild.channels.cache.get("899850998913310740") as TextChannel).send({embeds: [embed]})
            message.reply("Avaliação enviada com sucesso.")
        } else {
            message.reply("Nota inválida!")
        }
    }
    getPermission(): bigint {
        return null
    }
    getName(): string {
        return "avaliar"
    }
    getAliases(): string[] {
        return ["avaliação"]
    }
    
}