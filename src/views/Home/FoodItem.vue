<script lang="ts" setup>
import { reactive } from 'vue';
import logo from '@/assets/images/cat_home_logo.png';
import img from '@/assets/images/dog_item_3.jpg';
import TitleView from '@/components/TitleView.vue';
import CardItemFlip from '@/components/CardItemFlip.vue';
import ButtonView from '@/components/ButtonView.vue';
import routesConfig from '@/config/routes';

const data = reactive<any[]>([1, 2, 3, 4, 5, 6, 7, 8]);
</script>

<template>
    <div class="wraper-dogitem">
        <TitleView :logo="logo" title="Đồ Ăn" />
        <div class="list-cards">
            <CardItemFlip
                v-for="item in data"
                :key="item"
                to=""
                title="ĐỒ ĂN"
                name="Do an cute hot me"
                :src="img"
                :price="1000000"
            />
        </div>
        <div class="btn-more">
            <ButtonView :to="routesConfig.food" medium="true"> XEM THÊM </ButtonView>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/DogItem.scss';
</style>
