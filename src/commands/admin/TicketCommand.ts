
import { Message, MessageActionRow, MessageEmbed, MessageSelectMenu, Permissions } from "discord.js";
import Ticket from "../../ticket/Ticket.js";
import TicketType from "../../ticket/TicketType.js";
import BaseCommand from "../BaseCommand";

export default class TicketCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        //Vejamos, F tropa do JDA
        const embed = new MessageEmbed()
        embed.title = "Atendimento"
        embed.description = `
        Olá, seja bem-vindo ao atendimento da RyzenShop.\n
        Para iniciar seu atendimento selecione abaixo.\n
        `
        embed.title = "📫 Suporte"
        embed.setColor("PURPLE")
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('open_ticket')
					.setPlaceholder('Escolha o tipo de atendimento.')
					.addOptions([
                        {
                            label: "Ativar Nitro",
                            emoji: "<a:S_nitro:911968368179965983>",
                            description: "Ativar seu nitro da gamepass",
                            value: "ativar_nitro"
                        },
						{
							label: 'Financeiro',
                            emoji: "💸",
							description: 'Ajuda sobre assuntos financeiros',
							value: 'financeiro',
						},
						{
							label: 'Outros',
                            emoji: "❓",
							description: 'Outros tipos de duvida',
							value: 'outros',
						},
					]),
			);
        message.channel.send({embeds: [embed], components: [row]})
    }
    getPermission(): bigint {
        return Permissions.FLAGS.ADMINISTRATOR
    }
    getName(): string {
        return "ticket"
    }
    getAliases(): string[] {
        return ["criarticketmsg"]
    }

}