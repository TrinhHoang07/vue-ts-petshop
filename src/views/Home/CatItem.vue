<script lang="ts" setup>
import { reactive } from 'vue';
import logo from '@/assets/images/cat_home_logo.png';
import img from '@/assets/images/dog_item_3.jpg';
import TitleView from '@/components/TitleView.vue';
import CardItemZoomInLeft from '@/components/CardItemZoomInLeft.vue';
import routesConfig from '@/config/routes';
import ButtonView from '@/components/ButtonView.vue';
import { useDataInHome } from '@/hooks/useDataInHome';

const { values } = useDataInHome('products/products/home?type=cat');
</script>

<template>
    <div class="wraper-dogitem">
        <TitleView :logo="logo" title="Mèo Cảnh" />
        <div class="list-cards">
            <CardItemZoomInLeft
                v-for="item in values.data.slice(0, 8)"
                :key="item.id"
                :to="`product/cat/${item.id}`"
                title="MÈO CẢNH"
                :name="item.name"
                :src="item.previewUrl"
                :price="item.price"
            />
        </div>
        <div class="btn-more">
            <ButtonView :to="routesConfig.cat" medium="true"> XEM THÊM </ButtonView>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/DogItem.scss';
</style>
