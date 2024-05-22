<script setup lang="ts">
import { RouterView } from 'vue-router';
import AOS from 'aos';
import { onBeforeMount, onMounted } from 'vue';
import ConfirmToast from '@/context/ConfirmToastContext.vue';
import { useSession } from './stores';
import { socketContext } from './context/SocketContext';
import { stateEvents } from './context/SocketContext';

const { setSessions } = useSession();

onBeforeMount(() => {
    AOS.init({
        throttleDelay: 120,
        duration: 800,
        offset: 0,
        once: true,
    });

    socketContext.on('connect', () => {
        stateEvents.connected = true;
    });

    socketContext.on('disconnect', () => {
        stateEvents.connected = false;
    });
});

onMounted(() => {
    const item = localStorage.getItem('userDataHT');

    if (item) {
        const data = JSON.parse(item);

        console.log(data);

        if (data.isAuth) {
            setSessions(data.isAuth, data.user);
        }
    }
});
</script>

<template>
    <ConfirmToast>
        <RouterView />
    </ConfirmToast>
</template>
