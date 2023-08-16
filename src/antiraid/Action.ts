import { GuildMember } from "discord.js";
import ActionType from "./ActionType";

export default class Action {

    public actionType : ActionType;
    public member : GuildMember;
    public memberID : String;
}
