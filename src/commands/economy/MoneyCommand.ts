import { Message, MessageEmbed } from "discord.js";
import quickdb from 'quick.db';
export default class MoneyCommand {
    execute(message : Message, args : string[]) {
        let mb = null;
        if (args.length == 0) {
            mb = message.member;
        }
        else {
            let m = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
            if (m !== undefined && m !== null) {
                mb = m;
            }
        }
        if (mb == null) {
            message.reply("<:nao:912041041211830292> | **Não encontrei esse membro.**");
        }
        else {
            try {
                let money = quickdb.fetch(`money_${mb.id}`) || 0;
                let deposit = quickdb.fetch(`bank_${mb.id}`) || 0;
                let embed = new MessageEmbed();
                embed.setTitle("<:money:912031547773829230> Saldo de " + mb.displayName);
                embed.setColor("PURPLE");
                embed.setDescription(`> Estou listando o saldo de ${mb.displayName}.`);
                embed.addField("💸 Mão", money.toString(), true);
                embed.addField("🏦 Banco", deposit.toString(), true);
                embed.addField("<:money:912031547773829230> Total", (deposit + money).toString(), true);
                message.reply({ embeds: [embed] });
            }
            catch (ex) {
            }
        }
    }
    getPermission() {
        return null
    }
    getName() {
        return "money";
    }
    getAliases() {
        return ["coins", "saldo"];
    }
}