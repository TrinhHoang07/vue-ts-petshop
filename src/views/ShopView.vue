<script setup lang="ts">
import { getNameFromType, getValueFilterInArray } from '@/Helper';
import { ApiService } from '@/axios/ApiService';
import CardItemFlip from '@/components/CardItemFlip.vue';
import Loading from '@/components/Loading.vue';
import LayoutProducts from '@/layout/LayoutProducts.vue';
import type { T_Product, T_Shop } from '@/model';
import { FilterCondition, filterByProduct, filterItemByPrice, initPrice } from '@/stores';
import Paginator from 'primevue/paginator';
import { onMounted, reactive, ref, watch } from 'vue';

const { setIsFilterProduct } = filterByProduct();

onMounted(() => {
    document.title = 'Petshop | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });

    setIsFilterProduct('');
});

const apiService = new ApiService();

const subTitle = ref<string>('');
const pageNumber = ref<number>(1);
const first = ref<number>(1);
const loading = ref<boolean>(false);

const { defaultPrice: valuess, setPrice } = filterItemByPrice();
const { setInit } = initPrice();
const { isFilter } = FilterCondition();

const dataRender = reactive<{
    data: T_Product[];
}>({
    data: [],
});
const data = reactive<{
    data: T_Product[];
}>({
    data: [],
});

const onPageChange = (page: any) => {
    console.log(page);
    first.value = page.first;
    pageNumber.value = page.page + 1;
};

onMounted(() => {
    loading.value = true;
    apiService.products
        .getProducts()
        .then((res: T_Shop) => {
            if (res.message === 'success') {
                data.data = res.data;
                loading.value = false;
            }
        })
        .catch((err) => console.error(err));
});

watch(isFilter as any, () => {
    dataRender.data = data.data.filter(
        (item: T_Product) => item.price >= valuess.data[0] && item.price <= valuess.data[1],
    );
});

watch(data, () => {
    console.log('data changed');
    if (data.data.length > 0) {
        dataRender.data = data.data;
        setPrice(getValueFilterInArray(data.data));
        setInit(getValueFilterInArray(data.data));
    }
});

watch(pageNumber, () => {
    if (pageNumber.value > 1) {
        subTitle.value = 'TRANG' + pageNumber.value;
    } else {
        subTitle.value = '';
    }
});
</script>
<template>
    <div>
        <LayoutProducts :subTitle="subTitle" title="CỬA HÀNG">
            <div class="my-shop">
                <template v-if="!loading">
                    <CardItemFlip
                        v-for="item in dataRender.data.slice((pageNumber - 1) * 8, pageNumber * 8)"
                        :key="item.id"
                        :name="item.name"
                        :to="`/product/${item.type}/${item.id}`"
                        :price="item.price"
                        :title="getNameFromType(item.type)"
                        :src="item.preview_url"
                    />
                </template>
                <Loading v-else />
            </div>
            <div :style="{ width: '100%' }">
                <Paginator :first="first" :rows="10" :totalRecords="dataRender.data.length" v-on:page="onPageChange" />
            </div>
        </LayoutProducts>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Shop.scss';
</style>
