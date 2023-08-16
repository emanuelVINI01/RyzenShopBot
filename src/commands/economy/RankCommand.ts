import { Message, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand";

export default class RankCommand implements BaseCommand {
    private vip = "904062237835161680"
    private vipp = "904062337680572537"
    private apoiador = "903307858236555284"
    execute(message: Message, args: string[]): void {
        /*message.reply(`<:vip:904063522315595797> -> 
> 9 minutos de coldown no !work
> 1.10 de boost no work
> **Custo: R$20.000**
<:vip_mais:904064146906169344> -> 
> 5 minutos de coldown no !work
> 1.20 de boost no work
> **Custo: R$60.000**
<a:nitro:903342782771519498> Apoiador só pode ser obtido dando boost no servidor.`).then(async msg => {
            msg.react(msg.client.emojis.cache.get("904063522315595797"))
            msg.react(msg.client.emojis.cache.get("904064146906169344"))
            function filter(reaction, user) {
                return user.id === message.author.id
            }
            const collector = msg.createReactionCollector({
                "filter": filter
            })
            collector.on("collect", async (reaction) => {
                
            })
        }
    )*/
    message.reply("<:nao:912041041211830292> | **Em breve...**")
    }
    getPermission(): bigint {
        return null
    }
    getName(): string {
        return "ranks"
    }
    getAliases(): string[] {
        return ["vips"]
    }

}