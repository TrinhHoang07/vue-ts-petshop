
<script setup lang="ts">
    import FooterView from '@/components/FooterView.vue';
    import HeaderView from '@/components/HeaderView.vue';
</script>

<template>
    <main class="main">
        <HeaderView />
        <div class="contents">
            <router-view></router-view>
        </div>
        <FooterView />
    </main>
</template>