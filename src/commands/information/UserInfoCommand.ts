import { GuildMember, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import moment from 'moment'
export default class UserInfoCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let mb: GuildMember = null;
        if (args.length == 0) {
            mb = message.member;
        } else {
            let m: GuildMember = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
            if (m !== undefined && m !== null) {
                mb = m;
            }
        }
        if (mb == null) {
            message.reply("<:nao:912041041211830292> | **Não encontrei esse membro.**")
        } else {
            let embed: MessageEmbed = new MessageEmbed({

            });
            if (mb.displayAvatarURL({ dynamic: true })) {
                embed.setThumbnail(mb.displayAvatarURL({ dynamic: true }))

            }
            embed.setColor("PURPLE")
            embed.title = `Informações do usuário ${mb.displayName}`;
            embed.addField("💼 Nome", mb.user.username, true);
            embed.addField("<a:rgb_1:913142295057031188> ID", mb.id, true);
            embed.addField("<:tag:912031273680273408> Tag", mb.user.tag.split("#")[1], true);
            embed.addField("<a:Discord:913142446693707787> Entrou no servidor", moment.utc(mb.joinedAt).format('YYYY/MM/DD'), true);
            embed.addField("⏰ Conta criada", moment.utc(mb.user.createdAt).format('YYYY/MM/DD'), true);
            if (mb.premiumSinceTimestamp) {
                embed.addField("<a:NitrosBoost:911968402564845609> Impusionando desde", moment.utc(mb.premiumSinceTimestamp).format('YYYY/MM/DD'), true);
            }
            mb.user.fetch().then((u) => {
                if(u.bannerURL()) {

                    embed.setImage(u.bannerURL({
                        "dynamic": true
                    }) + "?size=2048")
                } 
                message.reply({ embeds: [embed] });
            })
        }
    }
    getPermission(): bigint {
        return null;
    }
    getName(): string {
        return "userinfo";
    }
    getAliases(): string[] {
        return ["infouser"];
    }

}