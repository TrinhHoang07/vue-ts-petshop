<script setup lang="ts">
import { RouterView } from 'vue-router';
import AOS from 'aos';
import { onBeforeMount, onMounted } from 'vue';

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
    <RouterView />
</template>
