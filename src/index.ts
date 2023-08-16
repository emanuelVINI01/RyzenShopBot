
import { Client, Intents, Message, SelectMenuInteraction, TextChannel } from "discord.js";
import BaseCommand from "./commands/BaseCommand.js";
import CheckerCommand from "./commands/util/CheckerCommand.js";
import AvaliarCommand from "./commands/util/AvaliarCommand.js";
import KickCommand from "./commands/moderation/KickCommand.js";
import BanCommand from "./commands/moderation/BanCommand.js";
import ClearCommand from "./commands/admin/ClearCommand.js";
import SlowmodeCommand from "./commands/admin/SlowmodeCommand.js";
import EmbedCommand from "./commands/admin/EmbedCommand.js";
import PingCommand from "./commands/information/PingCommand.js";
import ServerInfoCommand from "./commands/information/ServerInfoCommand.js";
import UserInfoCommand from "./commands/information/UserInfoCommand.js";
import HelpCommand from "./commands/information/HelpCommand.js";
import ContatoCommand from "./commands/information/ContantoCommand.js";
import PayCommand from "./commands/economy/PayCommand.js";
import WorkCommand from "./commands/economy/WorkCommand.js";
import DailyCommand from "./commands/economy/DailyCommad.js";
import TopCoinsCommand from "./commands/economy/TopCoinsCommand.js";
import MoneyCommand from "./commands/economy/MoneyCommand.js";
import LojaCommand from "./commands/economy/LojaCommand.js";
import RankCommand from "./commands/economy/RankCommand.js";
import DepositarCommand from './commands/economy/DeposityCommand.js';
import TicketType from "./ticket/TicketType.js";
import Ticket from "./ticket/Ticket.js";
import quickdb from 'quick.db'
import TicketCommand from "./commands/admin/TicketCommand.js";
const token: string = "";
global.tickets = []
let commands: Array<BaseCommand> = [new RankCommand(), new TicketCommand(), new PayCommand(), new DepositarCommand(), new LojaCommand(), new WorkCommand(), new DailyCommand(), new MoneyCommand(), new TopCoinsCommand(), new CheckerCommand(), new ContatoCommand(), new HelpCommand(), new UserInfoCommand(), new ServerInfoCommand(), new PingCommand(), new AvaliarCommand(), new KickCommand(), new BanCommand(), new ClearCommand(), new SlowmodeCommand(), new EmbedCommand()]
let client = new Client({
    intents: [new Intents(32767)], ws: {
        "properties": {
            "$browser": "Discord Android",
            "$os": "Android",
            "$device": "Moto G6 Plus"
        }
    }
});

let quad = 0;
let allowChannels = ["879451967267692614", "859125990651592715", "880067811534315552", "863145814565978133"]
let status = ["Use !ajuda", "Atualmente com %members membros na RyzenShop!", "Online faz %time!", "Ajudando %members membros!", "ryzenhosting.com.br"]
client.on("messageCreate", msg => {
    try {
        if (msg.member) {
            if (msg.channel.id === "909434208437551130" || msg.channel.id === "913206752701452298" || msg.member.permissions.has("ADMINISTRATOR")) {
                if (msg.content.startsWith("!")) {
                    let toExec: BaseCommand = null;
                    let args: Array<string> = msg.content.split(" ")
                    let com = args[0].replace("!", "")
                    args.splice(0, 1);
                    commands.forEach(command => {
                        if (com.toUpperCase() == command.getName().toUpperCase()) {
                            toExec = command;
                        } else {
                            command.getAliases().forEach(each => {
                                if (each.toUpperCase() == com.toUpperCase()) {
                                    toExec = command;
                                }
                            })
                        }
                    });
                    if (toExec == null) {


                        const stringSimilarity = (a, b) =>
                            _stringSimilarity(prep(a), prep(b))

                        const _stringSimilarity = (a, b) => {
                            const bg1 = bigrams(a)
                            const bg2 = bigrams(b)
                            const c1 = count(bg1)
                            const c2 = count(bg2)
                            const combined: any = uniq([...bg1, ...bg2])
                                .reduce((t: string, k: number) => t + (Math.min(c1[k] || 0, c2[k] || 0)), 0)
                            return 2 * combined / (bg1.length + bg2.length)
                        }

                        const prep = (str) => // TODO: unicode support?
                            str.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ')

                        const bigrams = (str) =>
                            [...str].slice(0, -1).map((c, i) => c + str[i + 1])

                        const count = (xs) =>
                            xs.reduce((a, x) => ((a[x] = (a[x] || 0) + 1), a), {})

                        const uniq = (xs) =>
                            [... new Set(xs)]

                        let myMap = new Map()
                        commands.forEach((cmd) => {
                            myMap.set(cmd.getName(), stringSimilarity(com, cmd.getName()))
                            cmd.getAliases().forEach((aliase) => {
                                myMap.set(aliase, stringSimilarity(com, aliase))
                            })
                        })
                        const mapSort1 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
                        const simility = Array.from(mapSort1.keys())[0] || null
                        msg.reply(`<:nao:912041041211830292> | **Comando não encontrado.${(simility != null ? ` Você quis dizer !${simility}?` : "")}**`)
                    } else {

                        if (toExec.getPermission() == null) {
                            toExec.execute(msg, args);
                        } else {
                            if (msg.member.permissions.has(toExec.getPermission()) || msg.member.permissions.has("ADMINISTRATOR") || msg.member.id === "846801518874198056") {
                                toExec.execute(msg, args);
                            } else {
                                msg.reply("Você não tem permissão para isso!")
                            }
                        }

                    }
                }
            }
        };
    } catch (ex) {
        msg.reply(`Erro ao executar comando, o erro já foi enviado ao emanuelVINI é deve ser corrigido.`)
        msg.guild.members.cache.get("352475444366409742").send("Houve um erro ao executar um comando. Erro:\n " + ex)
    }
});
client.on("interactionCreate", (is) => {
    try {
        if (is.isSelectMenu()) {
            const i = (is as SelectMenuInteraction)
            if (i.customId === "open_ticket") {
                let type = null
                if (i.values[0] == "outros") {
                    type = TicketType.OUTROS
                }
                if (i.values[0] == "financeiro") {
                    type = TicketType.FINANCEIRO
                }
                if (i.values[0] == "ativar_nitro") {
                    type = TicketType.ATIVAR_NITRO
                }
                if (Ticket.haveTicket(i.member.user.id)) {
                    i.reply({
                        content: "Você já tem um ticket aberto!",
                        ephemeral: true
                    })
                } else {
                    Ticket.createNew(i.guild, type, i.guild.members.cache.get(i.member.user.id), (ch) => {
                        i.reply({
                            content: "Ticket aberto com sucesso, <#"+ch.id+">.",
                            ephemeral: true
                        })
                    })
                }
            }
        }

        if (is.isButton()) {
            if (is.customId.startsWith("close_")) {
                let ticked: Ticket = Ticket.getTicketByMember(is.guild.members.cache.get(is.customId.replace("close_", "")))
                if (ticked === null) {
                    is.reply({
                        content: "**Esse ticket será excluido em 5 segundos...**"
                    })
                    setTimeout(() => {
                        try {
                        const channel = is.channel
                        channel.delete(
                        
                        )
                        }catch(ex) {

                        }
                    }, 5000)
                    
                }
                if (!ticked.isClosed()) {
                    ticked.close()
                    is.reply({
                        content: "**Esse ticket será excluido em 5 segundos...**"
                    })
                } else {
                    is.reply({
                        content: "Esse ticket já está sendo fechado.",
                        ephemeral: true
                    })
                }
            }
        }
    } catch (ex) {

    }
})
client.on("messageCreate", async (msg: Message) => {
    if (msg.member)
        if (msg.member.id != client.user.id) {
            if ((msg.content.includes("discord.gg") || msg.content.includes("invite.gg")) && !msg.member.permissions.has("ADMINISTRATOR")) {
                msg.delete()
            }
            if (msg.mentions.users.has(client.user.id)) {
                const message = await msg.reply("Use !ajuda para ver meus comandos!")
                setTimeout(() => {
                    message.delete()
                    msg.delete()
                }, 5000)
            }
        }
})

client.on("ready", () => {

    console.log("Bot ligado com sucesso!");
    setInterval(() => {


        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let st = `${days != 0 ? days + " dias é " : ""}${hours != 0 ? hours + " horas é " : ""}${minutes != 0 ? minutes + " minutos é " : ""}${seconds != 1 ? seconds + " segundos" : ""}`
        client.user.setActivity(status[quad].replace("%members", `${client.guilds.cache.get("909434207766462564").memberCount}`).replace("%time", st));
        quad++;
        if (quad >= status.length) {
            quad = 0;
        }
    }, 5000);

})



client.login(token).catch(() => {
    console.log("Ops! O bot crashou, ligando novamente!")
    client.login(token)
})


