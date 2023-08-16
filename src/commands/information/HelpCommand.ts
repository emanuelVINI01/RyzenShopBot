import { Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js";
import BaseCommand from "../BaseCommand";

export default class HelpCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let embed = new MessageEmbed()
        embed.setColor("PURPLE")
        embed.setTitle("❓ Menu de ajuda")
        embed.setDescription(`
> Prefixo: !
> Usuário: ${message.guild.memberCount}

🏡 Selecione as opções abaixo.
        `)
        /*embed.addField("Admin", `!clear <mensagens>\n!embed <mensagem>\n!slowmode <slowmode>\n!entregar <email> <canal>`, true)
        embed.addField("Moderação", `!ban <membro>\n!kick <membro>`, true)
        embed.addField("Geral", `!ping\n!serverinfo\n!userinfo [membro]\n!contato\n!site`, true)
        embed.addField("Economia", `!topmoney\n!pay <membro> <quantia>\n!daily\n!work\n!loja\n!ranks`, true)*/
        const row = new MessageActionRow()
        row.addComponents(new MessageSelectMenu({
            "options": [
                {
                    "description": "Menu inicial",
                    "emoji": "🏡",
                    "label": "Início",
                    "value": "home"
                },
                {
                    "description": "Comandos úteis",
                    "emoji": "❓",
                    "label": "Útil",
                    "value": "util"
                },
                {
                    "description": "Comandos de economia",
                    "emoji": "<:money:912031547773829230>",
                    "label": "Economia",
                    "value": "economy"
                },
                {
                    "description": "Comandos de moderação",
                    "emoji": "<:manutencao:913482197023989820>",
                    "label": "Moderação",
                    "value": "mod"
                },
                {
                    "description": "Comandos de administração",
                    "emoji": "<a:rgb_1:913142295057031188>",
                    "label": "Administração",
                    "value": "adm"
                }
            ],
            "customId": "help_" + message.member.id
        }))

        message.reply({
            "embeds": [embed],
            "components": [row]
        }).then((m) => {
            m.client.on("interactionCreate", (i => {
                try {
                    if (i.isSelectMenu() && i.customId.startsWith("help_")) {
                        if (i.customId.split("help_")[1] === i.member.user.id) {
                            if (i.values[0] === "util") {
                                embed.setDescription(`
                            > Prefixo: !
                            > Usuário: ${message.guild.memberCount}
                            
                            📜 **Você está na aba útil**


                            !help
                            !contato
                            !ping
                            !serverinfo
                            !userinfo


                            🏡 Selecione as opções abaixo.
                                    `)
                                m.edit({
                                    embeds: [embed]
                                })
                                i.deferUpdate()
                            } else if (i.values[0] === "home") {
                                embed.setDescription(`
                            > Prefixo: !
                            > Usuário: ${message.guild.memberCount}
                            
                            🏡 Selecione as opções abaixo.
                                    `)
                                m.edit({
                                    embeds: [embed]
                                })
                                i.deferUpdate()
                            }
                            else if (i.values[0] === "economy") {
                                embed.setDescription(`
                            > Prefixo: !
                            > Usuário: ${message.guild.memberCount}
                            
                            📜 **Você está na aba economia**

                            !money
                            !topmoney
                            !ranks
                            !work
                            !pay
                            !loja
                            !depositar
                            !daily

                            🏡 Selecione as opções abaixo.
                                    `)
                                m.edit({
                                    embeds: [embed]
                                })
                                i.deferUpdate()
                            }
                            else if (i.values[0] === "mod") {
                                embed.setDescription(`
                            > Prefixo: !
                            > Usuário: ${message.guild.memberCount}
                            
                            📜 **Você está na aba moderação**

                            !ban
                            !kick

                            🏡 Selecione as opções abaixo.
                                    `)
                                m.edit({
                                    embeds: [embed]
                                })
                                i.deferUpdate()
                            }
                            else if (i.values[0] === "adm") {
                                embed.setDescription(`
                            > Prefixo: !
                            > Usuário: ${message.guild.memberCount}
                            
                            📜 **Você está na aba admin**

                            !clear
                            !embed
                            !slowmode

                            🏡 Selecione as opções abaixo.
                                    `)
                                m.edit({
                                    embeds: [embed]
                                })
                                i.deferUpdate()
                            }
                            else {
                                i.reply({
                                    "ephemeral": true,
                                    "content": "<:nao:912041041211830292> | **Menu não encontrado.**"
                                })
                            }
                        } else {
                            i.reply({
                                "ephemeral": true,
                                "content": "Use !ajuda para navegar pelo menu."
                            })
                        }
                    }
                } catch (ex) {

                }
            }))
        })
    }
    getPermission(): bigint {
        return null
    }
    getName(): string {
        return "help"
    }
    getAliases(): string[] {
        return ["ajuda", "comandos"]
    }

}