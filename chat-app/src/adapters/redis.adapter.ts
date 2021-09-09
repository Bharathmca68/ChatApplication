import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';
import { createAdapter } from 'socket.io-redis';


const pubClient = new RedisClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number): any {
        const server = super.createIOServer(port);
        server.adapter(redisAdapter);
        return server;
    }
}