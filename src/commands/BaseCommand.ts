import { Message } from "discord.js";

export default interface BaseCommand {


    execute(message : Message, args : Array<string>) : void;

    getPermission() : bigint;

    getName() : string;

    getAliases() : Array<string>;
    
    
}