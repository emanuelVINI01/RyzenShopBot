import { Message, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand";
import quickdb from 'quick.db'
import BotUtils from "../../BotUtils.js";
export default class DailyCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        const membro = message.member;
        let timeout = 86400000; //24 hrs
        let quantia = 500;
        let diaria = quickdb.fetch(`diaria_${membro.id}`);
        let timeInMiliseconds = Math.floor(timeout - (Date.now() - diaria));
        let hours = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
        let minutes = Math.floor((timeInMiliseconds / 1000 / 60 / 60 - hours) * 60);
        let seconds = Math.floor(((timeInMiliseconds / 1000 / 60 / 60 - hours) * 60 - minutes) * 60);
        let st = `${hours != 0 ? `${hours} hora(s)` : ""} ${minutes != 0 ? `${minutes} minuto(s)` : ""} ${seconds != 0 ? `${seconds} segundo(s)` : ""}`;
        if (diaria !== null && timeout - (Date.now() - diaria) > 0) {
            message.reply(`<:nao:912041041211830292> | Você já pegou sua recompensa diária hoje. Espere **${st}** antes de pegar novamente.`);
        }
        else {
            message.reply(`<:845101701417271298:912041002540343347> | **Você pegou sua recompensa de R$${quantia} diária com sucesso.**`);
            quickdb.add(`money_${membro.id}`, quantia);
            quickdb.set(`diaria_${membro.id}`, Date.now());
        }
    }
    getPermission(): bigint {
        return null
    }
    getName(): string {
        return "daily"
    }
    getAliases(): string[] {
        return ["diario"]
    }
    
}


