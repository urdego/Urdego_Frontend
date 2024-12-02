import { io, Socket } from 'socket.io-client';

class SocketInstance {
  private static instances: Map<string, Socket> = new Map();

  private constructor() {}

  public static getInstance(namespace: string): Socket {
    if (!this.instances.has(namespace)) {
      const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/${namespace}`, {
        transports: ['websocket'],
      });
      this.instances.set(namespace, socket);
    }
    return this.instances.get(namespace)!;
  }

  public static disconnect(namespace: string): void {
    const socket = this.instances.get(namespace);
    if (socket) {
      socket.disconnect();
      this.instances.delete(namespace);
    }
  }
}

export default SocketInstance;
