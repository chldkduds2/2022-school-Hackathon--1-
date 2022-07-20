import { io } from "socket.io-client";
import { Scene } from "../core";
import Player from '../player'
import Dummy from "../player/Dummy";
export default class Communication {
    private socket
    private name:string
    private player:Player
    private others:Map<string, Dummy> = new Map()
    constructor(myname:string, player:Player, scene:Scene) {
        this.name = myname
        this.player = player
        this.socket = io('http://localhost:3000', {
            path: '/socket.io',
            transports: ['websocket']
        });
        this.socket.emit("login", {
            name: this.name
        });

        this.socket.on("login", (data) => {
            this.others.set(data.name, new Dummy(scene, data.name))
        });
        this.socket.on("all", (data) => {
            console.log(data.names)
            data.names.forEach((element:any) => [
                this.others.set(element, new Dummy(scene, element))
            ])
            // this.others.set(data.name, new Dummy(scene, data.name))
        });
        this.socket.on("move", (data) => {
            this.others.get(data.name)?.update(data.pos)
        });

        this.socket.on("logout", (data) => {
            this.others.get(data.name)
            this.others.delete(data.name)
        });
    }

    update() {
        this.socket.emit("move", {
            name: this.name,
            pos: this.player.pos
        });
    }
}