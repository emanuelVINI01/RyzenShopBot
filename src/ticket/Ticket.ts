import { Guild, GuildChannel, GuildMember, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from 'discord.js'
import TicketType from './TicketType.js';
function removeItemOnce(arr: any[], value: string) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
export default class Ticket {
    private channel_id: string
    private member_id: string
    private channel: TextChannel
    private closed: boolean = false
    public static createNew(guild: Guild, type: TicketType, member: GuildMember, callback: Function): Ticket {
        return new Ticket(type, guild, member, callback)
    }
    public isClosed(): boolean {
        return this.closed
    }
    public close(): void {
        this.closed = true
        setTimeout(() => {
            this.channel.delete()
            if (global.tickets === undefined) {
                global.tickets = []
            }
            global.tickets = removeItemOnce(global.tickets, this.member_id)
        }, 5000)
    }
    public getChannelID(): string {
        return this.channel_id
    }
    public getMemberID(): string {
        return this.member_id
    }
    public static haveTicket(id: String) {
        if (global.tickets === undefined) {
            global.tickets = []
        }
        return global.tickets.includes(id)
    }
    public static getTicketByMember(member: GuildMember) {
        if (global.tickets_obj === undefined) {
            global.tickets_obj = []
        }
        let ticket = null

        for (let tick of global.tickets_obj) {
            if (tick.getMemberID() === member.id) {
                ticket = tick
            }
        }
        return ticket
    }
    private constructor(type: TicketType, guild: Guild, member: GuildMember, conclude: Function, data = null) {
        const task = async () => {
            const supports = ["909434207787446278"]
            if (global.tickets === undefined) {
                global.tickets = []
            }
            if (global.tickets_obj === undefined) {
                global.tickets_obj = []
            }
            global.tickets.push(member.id)
            const channel = await guild.channels.create(type.toString() + "-" + member.displayName, {
                "type": "GUILD_TEXT"
            })
            this.channel_id = channel.id
            this.member_id = member.id
            this.channel = channel
            channel.setParent("909434208219435062")
            channel.permissionOverwrites.create(member.id, {
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
                ATTACH_FILES: true,
                VIEW_CHANNEL: true,
                EMBED_LINKS: true
            })
            channel.permissionOverwrites.create(member.guild.roles.everyone, {
                "VIEW_CHANNEL": false
            })
            supports.forEach((each) => {
                channel.permissionOverwrites.create(each, {
                    SEND_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true,
                    ATTACH_FILES: true,
                    VIEW_CHANNEL: true,
                    EMBED_LINKS: true
                })
            })

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('close_' + member.id)
                        .setLabel('Fechar')
                        .setEmoji("<:nao:912041041211830292>")
                        .setStyle('DANGER'),
                );
            const embed = new MessageEmbed()
            embed.setDescription(`> Seja bem vindo <@${member.id}>, a equipe irá lhe atender aqui.
> Peço que aguarde para ser atendido, não nós marquem nem flood, isso só irá fazer seu atendimento demorar.`)
            embed.setColor("PURPLE")
            embed.title = "Atendimento da RyzenShop"

            await channel.send({ embeds: [embed], components: [row] })
            if (type === TicketType.ATIVAR_NITRO) {
                embed.setDescription(`Para agilizar seu atendimento, peço que envie, no seguinte formato:
                > Email: emaildaconta
                > Senha: senhadaconta
                > Link: link do nitro para ser ativado
                
                **NÃO MENCIONE MEMBROS DA EQUIPE, IREMOS VER SEU TICKET EM BREVE.**`)
                embed.title = "<a:S_nitro:911968368179965983> Ativar Nitro"
                await channel.send({ embeds: [embed] })
            }
            return channel
        }
        if (!data) {
            task().then((channel) => {
                conclude(channel)
            }).catch(ex => {
                conclude(ex)
            })
            global.tickets_obj.push(this)
        } else {
            console.log("d")
            this.channel = data.guild.channels.cache.get(data.channel_id)
            this.member_id = data.member_id
            this.closed = data.close
            this.channel_id = data.channel_id
        }
    }

    public static fromData(data) {
        return new Ticket(null, null, null, null, data)
    }
}