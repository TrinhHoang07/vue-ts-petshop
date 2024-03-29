<script lang="ts" setup>
import { reactive } from 'vue';
import logo from '@/assets/images/dog_home_logo.png';
import img from '@/assets/images/dog_item_3.jpg';
import TitleView from '@/components/TitleView.vue';
import CardItem from '@/components/CardItem.vue';
import ButtonView from '@/components/ButtonView.vue';
import routesConfig from '@/config/routes';
import { useDataInHome } from '@/hooks/useDataInHome';

const { values } = useDataInHome('products/products/home?type=dog');
</script>

<template>
    <div class="wraper-dogitem">
        <TitleView :logo="logo" title="Chó Cảnh" />
        <div class="list-cards">
            <CardItem
                v-for="item in values.data"
                :key="item.id"
                :to="`product/dog/${item.id}`"
                title="CHÓ CẢNH"
                :name="item.name"
                :src="item.previewUrl"
                :price="item.price"
            />
        </div>
        <div class="btn-more">
            <ButtonView :to="routesConfig.dog" medium="true"> XEM THÊM </ButtonView>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/DogItem.scss';
</style>
