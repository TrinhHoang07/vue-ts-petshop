<script setup lang="ts">
import routesConfig from '@/config/routes';
import { useSession } from '@/stores';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

    const route = useRouter();
    const data = useSession()

    onBeforeMount(() => {
        if(!data.infos.isAuth) {
            route.push(routesConfig.login)
        }
    })
    
</script>

<template>
    <slot></slot>
</template>