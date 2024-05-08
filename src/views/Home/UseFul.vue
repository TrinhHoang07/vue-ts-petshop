<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '@/assets/images/useful_1.jpg';
import logo from '@/assets/images/sleigh-bell.svg';
import { RouterLink } from 'vue-router';
import TitleView from '@/components/TitleView.vue';
import ButtonView from '@/components/ButtonView.vue';
import routesConfig from '@/config/routes';
import { onMounted, ref } from 'vue';
import { ApiService } from '@/axios/ApiService';
import type { Blog, T_Blogs } from '@/model';

const apiService = new ApiService();
const data = ref<Blog[]>([]);

onMounted(() => {
    apiService.blogs
        .getBlogs()
        .then((res: T_Blogs) => {
            if (res.message === 'success') {
                data.value = res.data;
            }
        })
        .catch((err) => {
            console.error(err);
        });
});
</script>

<template>
    <div class="wrapper-useful">
        <TitleView :logo="logo" title="THÔNG TIN HỮU ÍCH" />
        <div class="useful-content">
            <swiper
                :modules="[Autoplay]"
                :slides-per-view="1"
                :space-between="0"
                :breakpoints="{
                    '639': {
                        slidesPerView: 1,
                    },
                    '740': {
                        slidesPerView: 3,
                    },
                    '1024': {
                        slidesPerView: 3,
                    },
                }"
                :speed="500"
                :pagination="false"
                :loop="true"
                :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                    waitForTransition: true,
                }"
                class="mySwiper"
            >
                <swiper-slide v-for="item in data" :key="item.id">
                    <RouterLink :to="`/news/detail/${item.id}`" class="wrapper-useful-item">
                        <div class="avatar">
                            <img :src="item.preview_url" alt="preview avatar" />
                        </div>
                        <div class="description">
                            <h3 class="heading-item">{{ item.title }}</h3>
                            <p class="content-description">{{ item.title }} [...]</p>
                            <p class="link-useful">XEM THÊM</p>
                        </div>
                    </RouterLink>
                </swiper-slide>
            </swiper>
        </div>
        <div class="btn-more">
            <ButtonView :to="routesConfig.news" medium="true"> XEM THÊM </ButtonView>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/UseFul.scss';
</style>
