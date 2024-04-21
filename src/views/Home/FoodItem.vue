<script lang="ts" setup>
import { reactive } from 'vue';
import logo from '@/assets/images/cat_home_logo.png';
import img from '@/assets/images/dog_item_3.jpg';
import TitleView from '@/components/TitleView.vue';
import CardItemFlip from '@/components/CardItemFlip.vue';
import ButtonView from '@/components/ButtonView.vue';
import routesConfig from '@/config/routes';
import { useDataInHome } from '@/hooks/useDataInHome';

const { values } = useDataInHome('products/products/home?type=food');
</script>

<template>
    <div class="wraper-dogitem">
        <TitleView :logo="logo" title="Đồ Ăn" />
        <div class="list-cards">
            <CardItemFlip
                v-for="item in values.data.slice(0, 8)"
                :key="item.id"
                :to="`product/food/${item.id}`"
                title="ĐỒ ĂN"
                :name="item.name"
                :src="item.previewUrl"
                :price="item.price"
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
