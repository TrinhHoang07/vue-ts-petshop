<script setup lang="ts">
type TProps = {
    title: string;
    logo: any;
};
const props = defineProps<TProps>();
</script>

<template>
    <div class="title-cpn">
        <h3 class="heading">{{ props.title }}</h3>
        <div class="logo">
            <img :src="props.logo" alt="logo" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Title.scss';
</style>
