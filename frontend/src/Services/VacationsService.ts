import { io, Socket } from "socket.io-client"; 

class VacationsService {
    public socket: Socket;

    public createConnection(): void {
        if(this.socket === undefined || !this.socket.connected) {
            this.socket = io('http://localhost:3001');
            this.socket.connect();
        }
        
        this.socket.on("add-vacation-from-admin",vacation => {
            this.socket.emit("add-vacation-from-admin", vacation)
        });
    }

    public disconnectFromServer(): void { 
        if(!this.socket || this.socket.disconnected) return;
        this.socket.disconnect();
    }
}

export default VacationsService;