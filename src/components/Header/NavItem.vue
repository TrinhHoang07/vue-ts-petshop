<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

    const props = defineProps<{
        name: string;
        to: string;
    }>()

    const router = useRoute()
</script>

<template>
    <RouterLink :to="props.to" class="item-link" :class="{active: router.fullPath == props.to}">
        {{ props.name }}
    </RouterLink>
</template>