<script setup lang="ts">
import NavItem from './NavItem.vue';
import data from './data';

</script>

<template>
    <div class="header-nav">
        <NavItem v-for="item in data" :name="item.name" :to="item.path" :key="item.id" />
    </div>
</template>