import { Message, MessageEmbed, Permissions } from "discord.js"
import quickdb from 'quick.db';
export default class DepositarCommand {
    execute(message  : Message, args : string[]) {
        if (args.length !== 1) {
            message.reply("Uso: !depositar <quantia|all>");
        }
        else {
            const money_to_deposit : number = (args[0] === "all" ? quickdb.get(`money_${message.member.id}`) : parseInt(args[0]));
            
            if (money_to_deposit === 0 && args[0] === "all") {
                message.reply("<:nao:912041041211830292> | **Você não tem dinheiro para depositar**.");
                return
            }
            if ((isNaN(money_to_deposit) || money_to_deposit < 1 || money_to_deposit > quickdb.get(`money_${message.member.id}`))) {
                message.reply("<:nao:912041041211830292> | **Quantia inválida**.");
            }
            else {
                quickdb.add("deposits_number", 1);
                const saldo_antigo = quickdb.get(`bank_${message.member.id}`) || 0;
                const deposit_number = quickdb.get(`deposits_number`) || 0;
                quickdb.add(`bank_${message.member.id}`, money_to_deposit);
                quickdb.subtract(`money_${message.member.id}`, money_to_deposit);
                const mb = message.member;
                let embed = new MessageEmbed();
                embed.setTitle("Deposito #" + deposit_number);
                embed.setColor("PURPLE");
                embed.setDescription(`> Estou listando o deposito de ${mb.displayName}`);
                embed.addField("💸 Valor depositado", money_to_deposit.toString(), true);
                embed.addField("🏦 Saldo atual", quickdb.get(`bank_${message.member.id}`).toString(), true);
                embed.addField("⏰ Saldo antigo", (saldo_antigo).toString(), true);
                message.reply({ embeds: [embed] });
            }
        }
    }
    getPermission() {
        return null
    }
    getName() {
        return "depositar";
    }
    getAliases() {
        return ["dep"];
    }
}