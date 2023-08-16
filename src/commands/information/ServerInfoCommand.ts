import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import moment from 'moment'
export default class ServerInfoCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let embed : MessageEmbed = new MessageEmbed();

        embed.color = 128282;
        message.guild.members.fetch(message.guild.ownerId).then(owner => {
            let ownert = owner.user.tag
            embed.title = `Informações do servidor`
            embed.setColor("PURPLE")
            embed.addField("<a:rgb_1:913142295057031188> ID",message.guild.id, true)
            embed.addField("💼 Dono",ownert, true)
            embed.addField("<:livro:913144375595401277> Membros",message.guild.memberCount.toString(), true)
            embed.addField("📨 Canais",message.guild.channels.cache.size.toString(), true)
            embed.addField("⏰ Criado em",moment.utc(message.guild.createdAt).format('YYYY/MM/DD'), true);
            embed.addField("<a:NitrosBoost:911968402564845609> Boosts", `${message.guild.premiumSubscriptionCount}`, true);
            try {
            embed.setImage(message.guild.bannerURL() + "?size=2048")
            }catch(ex) {

            }
            try{
                embed.setThumbnail(owner.guild.iconURL())
                }catch(ex) {
                    
                }
            message.reply({embeds: [embed]});
        });
    }
    getPermission(): bigint {
        return null;
    }
    getName(): string {
        return "serverinfo";
    }
    getAliases(): string[] {
        return ["infoserver"];
    }

}