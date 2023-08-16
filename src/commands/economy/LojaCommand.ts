import { ButtonInteraction, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, TextChannel } from "discord.js";
import BaseCommand from "../BaseCommand";
import quickdb from 'quick.db'
export default class LojaCommand implements BaseCommand {
    execute(message: Message, args: string[]) {
        /*message.reply(`> <a:Minecraft:903343297697808475> SFA -> R$15.000
> <a:nitro:903342782771519498> Nitro Classic 1 mês -> R$95.000
> <a:nitro2:899857502148116530> Nitro Gaming 3 meses em gift -> R$350.000`).then(async msg => {
            msg.react(msg.client.emojis.cache.get("903343297697808475"))
            msg.react(msg.client.emojis.cache.get("903342782771519498"))
            msg.react(msg.client.emojis.cache.get("899857502148116530"))
            function filter(reaction, user) {
                return user.id === message.author.id
            }
            const collector = msg.createReactionCollector({
                "filter": filter
            })
            collector.on("collect", async (reaction) => {
                if (reaction.emoji.id == "899857502148116530") {
                    const channel = (msg.guild.channels.cache.get("902332034788257853") as TextChannel)
                    const messages = await channel.messages.fetch()
                    const gaming = messages.random()
                    if (!(quickdb.fetch(`money_${message.author.id}`) >= 350000)) {
                        msg.reply("Você não tem dinheiro suficiente para realizar essa operação.")
                        return
                    }


                    if (!gaming) {
                        msg.reply("Estamos sem estoque do produto Nitro Gaming 3 meses por enquanto, tente novamente em breve.")
                        return
                    } else {

                        quickdb.subtract(`money_${message.author.id}`, 350000)
                        try {
                            message.author.send(gaming.content)
                        } catch (ex) {

                        }
                        gaming.delete()
                        msg.reply("Produto adquirido com sucesso.")
                    }
                }
                if (reaction.emoji.id == "903342782771519498") {
                    const channel = (msg.guild.channels.cache.get("902332034788257853") as TextChannel)
                    const messages = await channel.messages.fetch()
                    const gaming = messages.random()
                    if (!(quickdb.fetch(`money_${message.author.id}`) >= 95000)) {
                        msg.reply("Você não tem dinheiro suficiente para realizar essa operação.")
                        return
                    }

                    if (!gaming) {
                        msg.reply("Estamos sem estoque do produto Nitro Classic 1 mês por enquanto, tente novamente em breve.")
                        return
                    } else {
                        quickdb.subtract(`money_${message.author.id}`, 95000)
                        try {
                            message.author.send(gaming.content)
                        } catch (ex) {

                        }
                        gaming.delete()
                        msg.reply("Produto adquirido com sucesso.")

                    }
                }
                if (reaction.emoji.id == "903343297697808475") {
                    const channel = (msg.guild.channels.cache.get("902332034788257853") as TextChannel)
                    const messages = await channel.messages.fetch()
                    const gaming = messages.random()
                    if (!(quickdb.fetch(`money_${message.author.id}`) >= 15000)) {
                        msg.reply("Você não tem dinheiro suficiente para realizar essa operação.")
                        return
                    }
                    if (!gaming) {
                        msg.reply("Estamos sem estoque do produto SFA por enquanto, tente novamente em breve.")
                        return
                    } else {
                        try {
                            const dm = await message.author.createDM()
                            dm.send(gaming.content)
                        } catch (ex) {
                            console.log(ex)
                        }
                        gaming.delete()
                        quickdb.subtract(`money_${message.author.id}`, 15000)
                        msg.reply("Produto adquirido com sucesso.")
                    }
                }
            })

        })*/
        let embed = new MessageEmbed()
        embed.setColor("PURPLE")
        embed.setTitle("<:money:912031547773829230> Loja")
        embed.setDescription(`
Quer comprar produtos com dinheiro do bot?

> <a:Discord:913142446693707787> Ativar nitro: **25.000**
> <a:S_nitro:911968368179965983> Nitro classic: **250.000**
> <a:mineUP:911968128244805653> SFA: **12.000**

**Basta clicar e o bot lhe entregarar automáticamente caso haja estoque.**
        `)
        const row = new MessageActionRow()
        row.addComponents(new MessageButton({
            "customId": "buy_nitro",
            "type": "BUTTON",
            "style": "PRIMARY",
            "label": "Nitro classic",
            "emoji": "<a:S_nitro:911968368179965983>"
        }), new MessageButton({
            "customId": "buy_active",
            "type": "BUTTON",
            "style": "PRIMARY",
            "label": "Ativar nitro",
            "emoji": "<a:nitro:911968343295139930>"
        }),
        new MessageButton({
            "customId": "buy_sfa",
            "type": "BUTTON",
            "style": "PRIMARY",
            "label": "SFA",
            "emoji": "<a:mineUP:911968128244805653>"
        }) )
        
        message.reply({
            "embeds": [embed],
            "components": [row]
        }).then((m) => {
            m.client.on("interactionCreate", (i => {
                if (i.isButton()) {
                    const button = (i as ButtonInteraction)
                    if (button.customId.startsWith("buy_")) {
                        i.reply({
                            "ephemeral": true,
                            "content": "<:nao:912041041211830292> | **A loja estará aberta em breve..**"
                        })
                    }
                }
            }))
        })
    }
    getPermission(): bigint {
        return null
    }
    getName(): string {
        return "loja"
    }
    getAliases(): string[] {
        return ["lojinha"]
    }

}