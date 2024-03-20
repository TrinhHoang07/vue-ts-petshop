<script lang="ts" setup>
import BarProducts from '@/components/BarProducts.vue';
import NavProducts from '@/components/NavProducts.vue';
type TProps = {
    // value: [number, number];
    title: string;
    subTitle?: string;
};
const props = defineProps<TProps>();

// console.log('layout', props.value);
</script>

<template>
    <div class="layout-products">
        <div class="wrapper">
            <NavProducts :subTitle="props.subTitle" :title="props.title" />
            <div class="contents">
                <BarProducts />
                <div class="main-products">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/LayoutProducts.scss';
</style>
