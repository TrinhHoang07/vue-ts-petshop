<script setup lang="ts">
import banner from '@/assets/images/banner_dog.jpg';
import cat1 from '@/assets/images/banner_cat_1.jpg';
import cat2 from '@/assets/images/banner_cat_2.jpg';
import SlidersView from './SlidersView.vue';
import FlashView from './FlashView.vue';
import DogItem from './DogItem.vue';
import CatItem from './CatItem.vue';
import FoodItem from './FoodItem.vue';
import UseFul from './UseFul.vue';
import { onMounted } from 'vue';

onMounted(() => {
    document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});
</script>

<template>
    <div class="home">
        <div class="sliders">
            <SlidersView />
        </div>
        <FlashView />
        <DogItem />
        <div class="banner">
            <img :src="banner" alt="banner dog" />
        </div>
        <CatItem />
        <div class="banner-cat">
            <div class="banner-cat-1">
                <img :src="cat2" alt="cats-banner" />
            </div>
            <div class="banner-cat-1">
                <img :src="cat1" alt="cats-banner" />
            </div>
        </div>
        <FoodItem />
        <UseFul />
    </div>
</template>

<style lang="scss" scoped>
@import './Home.scss';
</style>
