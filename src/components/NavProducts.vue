<script setup lang="ts">
import { filterByProduct } from '@/stores';
import Dropdown from 'primevue/dropdown';

type TProps = {
    title: string;
    subTitle?: string;
};

type Select = {
    name: string;
};

const props = defineProps<TProps>();

const { isFilterProduct, setIsFilterProduct } = filterByProduct();

const values: Select[] = [
    { name: 'Phổ biến' },
    { name: 'Điểm đánh giá' },
    { name: 'Mới về' },
    { name: 'Giá thấp đến cao' },
    { name: 'Giá cao đến thấp' },
];

console.log(props.title);
</script>

<template>
    <div class="nav-products">
        <h3 class="heading-nav">
            <span>TRANG CHỦ /</span>
            {{ props.title }} {{ props.subTitle ? '/ ' + props.subTitle : '' }}
        </h3>
        <div class="filters">
            <span class="filter-title">Sắp xếp: </span>
            <Dropdown
                :modelValue="isFilterProduct.data"
                @change="(e) => setIsFilterProduct(e.value)"
                class="drop-down-filter"
                placeholder="Mặc định"
                :options="values"
                optionLabel="name"
                style="color: red !important"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/NavProducts.scss';
</style>
