import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand";

export default class ContatoCommand implements BaseCommand {
    async execute(message: Message, args: string[]){
        message.reply(`> **Discord**: ${message.guild.vanityURLCode || (await message.guild.invites.create(message.guild.channels.cache.first().id)).code}
> **Site**: https://ryzenshop.com.br
> **Email**: suporte@ryzenshop.com.br
> **Ticket**: <#909434208626307122>`)

    }
    getPermission(): bigint {
        return null
    }
    getName(): string {
        return "contato"
    }
    getAliases(): string[] {
        return ["suporte", "contatos", "site"]
    }
    
}