<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '@/assets/images/img-1-desktop-slider.jpg';
import img2 from '@/assets/images/img-2-desktop-slider.jpg';
import img3 from '@/assets/images/img-3-desktop-slider.jpg';
import { RouterLink } from 'vue-router';
import ButtonView from '@/components/ButtonView.vue';
</script>

<template>
    <swiper
        :modules="[Autoplay, Pagination, EffectCreative]"
        :slides-per-view="1"
        :space-between="0"
        :pagination="{ clickable: true }"
        :loop="true"
        :effect="'creative'"
        :creativeEffect="{
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        }"
        :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
            waitForTransition: true,
        }"
        class="mySwiper"
    >
        <swiper-slide>
            <div class="slider">
                <div class="slider-img">
                    <img :src="img1" alt="{props.heading}" />
                    <div class="info">
                        <h3 class="title">EMPEROR STORY</h3>
                        <h1 class="heading">LOVE CATS</h1>
                        <p class="subheading">FROM 2002 TO 2015 AND NOW</p>
                        <div class="wrap-description">
                            <p class="description">
                                The world would be filled with love if everyone had the ability to love unconditionally
                                like dogs. Do you like cats?
                            </p>
                        </div>
                        <RouterLink to="{routesConfig.shop}" class="btn">
                            <ButtonView large="true">SHOP NOW</ButtonView>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slider">
                <div class="slider-img">
                    <img :src="img2" alt="{props.heading}" />
                    <div class="info">
                        <h3 class="title">FRIENDLY</h3>
                        <h1 class="heading">MY LOVE</h1>
                        <p class="subheading">ARE YOU WILLING TO LOVE ME</p>
                        <div class="wrap-description">
                            <p class="description">
                                The dog by your side is the only thing on earth that loves you more than its own life.
                                Do you like them?
                            </p>
                        </div>
                        <RouterLink to="{routesConfig.shop}" class="btn">
                            <ButtonView large="true">SHOP NOW</ButtonView>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slider">
                <div class="slider-img">
                    <img :src="img3" alt="{props.heading}" />
                    <div class="info">
                        <h3 class="title">MY LIFE</h3>
                        <h1 class="heading">LOVE DOGS</h1>
                        <p class="subheading">BOSS LEAVES A LOT OF FOOTPRINTS</p>
                        <div class="wrap-description">
                            <p class="description">
                                A man has 3 loyal friends in his life: a good wife, a dog raised since he was a baby and
                                some money of his own
                            </p>
                        </div>
                        <RouterLink to="{routesConfig.shop}" class="btn">
                            <ButtonView large="true">SHOP NOW</ButtonView>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Sliders.scss';
</style>
