<script setup lang="ts">
import { formatVND } from '@/Helper';
import { RouterLink } from 'vue-router';

type TProps = {
    to?: string;
    src: any;
    title: string;
    name: string;
    price: number;
    flash?: string;
};
const props = defineProps<TProps>();
</script>

<template>
    <RouterLink class="link-detail" :to="props.to ?? '/'">
        <div class="detail-dog">
            <div data-aos="zoom-in-left">
                <div class="wrap">
                    <div class="preview">
                        <img :src="props.src" alt="preview dog" />
                    </div>
                    <div class="info">
                        <p class="title">{{ props.title }}</p>
                        <h3 class="name-dog">{{ props.name }}</h3>
                        <p class="price">{{ formatVND.format(props.price) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/CardItem.scss';
</style>
