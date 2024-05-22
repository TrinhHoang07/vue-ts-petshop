<script setup lang="ts">
import routesConfig from '@/config/routes';
import { useSession } from '@/stores';
import { onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps<{
    redirect: string;
}>();

const router = useRouter();
const route = useRoute();
const { infos, setSessions } = useSession();

onMounted(() => {
    if (!infos.data.isAuth) {
        router.push({
            path: `${routesConfig.login}`,
            state: props.redirect ? props.redirect : (route.fullPath as any),
        });
    }
});
</script>

<template>
    <slot></slot>
</template>
