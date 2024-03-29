import { App } from '@/const/App';
import { io } from 'socket.io-client';
import { reactive } from 'vue';

export const stateEvents = reactive<{
    connected: boolean;
}>({
    connected: false,
});

export const socketContext = io(App.URL_EVENT, {
    timeout: 5000,
    autoConnect: true,
});

socketContext.on('connect', () => {
    stateEvents.connected = true;
});

socketContext.on('disconnect', () => {
    stateEvents.connected = false;
});
