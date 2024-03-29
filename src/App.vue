<script setup lang="ts">
import { RouterView } from 'vue-router';
import AOS from 'aos';
import { onBeforeMount } from 'vue';
import ConfirmToast from '@/context/ConfirmToastContext.vue';

onBeforeMount(() => {
    AOS.init({
        throttleDelay: 120,
        duration: 800,
        offset: 0,
        once: true,
    });
});
</script>

<template>
    <ConfirmToast>
        <RouterView />
    </ConfirmToast>
</template>
