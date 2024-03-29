<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import CardItem from '@/components/CardItem.vue';
import img_1 from '@/assets/images/dog_item_1.jpg';
</script>

<template>
    <swiper
        :slides-per-view="2"
        :space-between="20"
        :speed="500"
        :breakpoints="{
            '640': {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            '768': {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            '1024': {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }"
        class="mySwiper"
    >
        <swiper-slide>
            <CardItem to="/product/dog/36" title="CHÓ CẢNH" name="Chó American Eskimo" :src="img_1" :price="14000000" />
        </swiper-slide>
        <swiper-slide>
            <CardItem to="/product/dog/36" title="CHÓ CẢNH" name="Chó American Eskimo" :src="img_1" :price="14000000" />
        </swiper-slide>
        <swiper-slide>
            <CardItem to="/product/dog/36" title="CHÓ CẢNH" name="Chó American Eskimo" :src="img_1" :price="14000000" />
        </swiper-slide>
        <swiper-slide>
            <CardItem to="/product/dog/36" title="CHÓ CẢNH" name="Chó American Eskimo" :src="img_1" :price="14000000" />
        </swiper-slide>
        <swiper-slide>
            <CardItem to="/product/dog/36" title="CHÓ CẢNH" name="Chó American Eskimo" :src="img_1" :price="14000000" />
        </swiper-slide>
    </swiper>
</template>
