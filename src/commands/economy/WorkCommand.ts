import { Message, MessageEmbed, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import quickdb from 'quick.db'
import BotUtils from "../../BotUtils.js";
export default class WorkCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        const membro = message.member;
        let timeout = 10 * 1000 * 6 * 3;
        let diaria = quickdb.fetch(`work_${membro.id}`);
        let totalMiliSeconds = Math.floor(timeout - (Date.now() - diaria));
        let seconds = Math.floor(totalMiliSeconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let st = `${minutes != 0 ? minutes + " minuto(s) e " : ""}${seconds != 1 ? Math.floor(seconds / 10) + " segundo(s)" : ""}`;
        if (diaria !== null && timeout - (Date.now() - diaria) > 0) {
            message.reply(`<:nao:912041041211830292> | Espere um pouco para trabalhar novamente, tente de novo em **${st}**.`);
        }
        else {
            let amount = BotUtils().getRandomInt(35, 125);
            let boost = 0;
            if (message.member.roles.cache.has("911962084437262347")) {
                boost = Math.floor(amount * 1.10 - amount);
                amount = Math.floor(amount * 1.10);
            }
            quickdb.add("trabalho_number", 1);
            const saldo_antigo = quickdb.get(`money_${message.member.id}`) | 0;
            quickdb.add(`money_${membro.id}`, amount);
            quickdb.set(`work_${membro.id}`, Date.now());
            const trabalho_number = quickdb.get("trabalho_number");
            let embed = new MessageEmbed();
            embed.setTitle("Trabalho #" + trabalho_number);
            embed.setColor("PURPLE");
            embed.setDescription(`> Estou listando a trabalho de ${message.member.displayName}`);
            embed.addField("💸 Valor ganho", (amount - boost).toString(), true);
            embed.addField("<:tag:912031273680273408> Adicional", (boost).toString(), true);
            embed.addField("<:money:912031547773829230> Saldo atual", quickdb.get(`money_${message.member.id}`).toString(), true);
            embed.addField("⏰ Saldo antigo", (saldo_antigo).toString(), true);
            message.reply({
                "embeds": [embed]
            });
            
        }
    }
    getPermission(): bigint {
        return null
    }
    getName(): string {
        return "work"
    }
    getAliases(): string[] {
        return ["trabalhou", "trabalhar"]
    }

}