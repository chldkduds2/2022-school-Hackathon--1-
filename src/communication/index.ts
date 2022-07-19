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
            this.others.set(data, new Dummy(scene, data))
            console.log(data)
        });
    }

    update() {
        this.socket.emit("move", {
            name: this.name,
            pos: this.player.pos
        });
    }
}