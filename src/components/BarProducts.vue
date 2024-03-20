<script setup lang="ts">
import routesConfig from '@/config/routes';
import { RouterLink } from 'vue-router';
import Filter from './Filter.vue';
import SuggestProducts from './SuggestProducts.vue';

// type TProps = {
//     value: [number, number];
// };

// const props = defineProps<TProps>();
</script>
<template>
    <div class="bar-products">
        <div class="categories">
            <h6 class="heading-menu">DANH MỤC SẢN PHẨM</h6>
            <div class="menu">
                <RouterLink class="menu-item" :to="routesConfig.dog"> Chó cảnh </RouterLink>
                <div class="line-bar"></div>
                <RouterLink class="menu-item" :to="routesConfig.cat"> Mèo cảnh </RouterLink>
            </div>
        </div>
        <Filter />
        <SuggestProducts />
    </div>
</template>

<style lang="scss">
@import '@/assets/sass/BarProducts.scss';
</style>
