import { Message, MessageEmbed } from "discord.js";
import quickdb from 'quick.db';
export default class PayCommand {
    execute(message : Message, args : string[]) {
        if (args.length != 2) {
            message.reply("Use: !pay <usuário> quantia");
        }
        else {
            let mention = message.mentions.members.first();
            if (!mention) {
                message.reply("<:nao:912041041211830292> | **Não encontrei esse membro.**");
            }
            else {
                if (mention.id === message.member.id) {
                    message.reply("<:nao:912041041211830292> | **Você não pode pagar para si mesmo!**");
                    return;
                }
                let n = parseInt(args[1]);
                if (!n || n == NaN || n > Number.MAX_SAFE_INTEGER || n < 1) {
                    message.reply("<:nao:912041041211830292> | **Quantia inválida.**");
                }
                else {
                    let money = quickdb.fetch(`money_${message.member.id}`);
                    if (money >= n) {
                        const saldo_antigo = quickdb.get(`money_${message.member.id}`);
                        quickdb.subtract(`money_${message.member.id}`, n);
                        quickdb.add(`money_${mention.id}`, n);
                        quickdb.add("transfer_number", 1);
                        const transfer_number = quickdb.get("transfer_number");
                        let embed = new MessageEmbed();
                        embed.setTitle("Transfêrencia #" + transfer_number);
                        embed.setColor("PURPLE");
                        embed.setDescription(`> Estou listando a transfêrencia de ${message.member.displayName} para ${mention.displayName}.`);
                        embed.addField("💸 Valor pago", n.toString(), true);
                        embed.addField("<:money:904713590060236840> Saldo atual", quickdb.get(`money_${message.member.id}`).toString(), true);
                        embed.addField("⏰ Saldo antigo", (saldo_antigo).toString(), true);
                        message.reply({
                            "embeds": [embed]
                        });
                    }
                    else {
                        message.reply("<:nao:912041041211830292> | **Você não tem saldo suficiente para realizar essa operação.**");
                    }
                }
            }
        }
    }
    getPermission() {
        return null
    }
    getName() {
        return "pay";
    }
    getAliases() {
        return ["pagar", "pagamento"];
    }
}