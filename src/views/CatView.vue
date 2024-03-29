<script setup lang="ts">
import { getValueFilterInArray } from '@/Helper';
import CardItemFlip from '@/components/CardItemFlip.vue';
import Loading from '@/components/Loading.vue';
import type { _T_DataItemHome } from '@/hooks/useDataInHome';
import { useDataInHome } from '@/hooks/useDataInHome';
import LayoutProducts from '@/layout/LayoutProducts.vue';
import { FilterCondition, filterByProduct, filterItemByPrice, initPrice, useSession } from '@/stores';
import Paginator from 'primevue/paginator';
import { onMounted, ref, watch } from 'vue';

const { setIsFilterProduct } = filterByProduct();
onMounted(() => {
    document.title = 'Mèo cảnh | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });

    setIsFilterProduct('');
});

const value = ref<[number, number]>([0, 100]);
const currentPage = ref<number>(1);
const loading = ref<boolean>(false);
const { values } = useDataInHome('products/products/home?type=cat');

console.log('data: ' + values.data[0]);

const dataRender = ref<_T_DataItemHome[]>([]);
const first = ref<number>(1);
const { defaultPrice: valuess, setPrice } = filterItemByPrice();
const { setInit } = initPrice();
const { isFilter } = FilterCondition();

watch(isFilter as any, () => {
    dataRender.value = values.data.filter(
        (item: _T_DataItemHome) => item.price >= valuess.data[0] && item.price <= valuess.data[1],
    );
});

watch(values, () => {
    if (values.data.length > 0) {
        value.value = getValueFilterInArray(values.data);

        setPrice(getValueFilterInArray(values.data));
        setInit(getValueFilterInArray(values.data));

        dataRender.value = values.data;
        loading.value = false;
    }
});

const onPageChange = (page: any) => {
    first.value = page.first;
    currentPage.value = ++page.page;
};
</script>

<template>
    <div>
        <LayoutProducts title="MÈO CẢNH">
            <div style="display: flex; flex-wrap: wrap">
                <template v-if="!loading">
                    <div
                        v-for="item in dataRender.slice((currentPage - 1) * 6, currentPage * 6)"
                        :key="item.id"
                        class="dog-item"
                    >
                        <CardItemFlip
                            :name="item.name"
                            :to="`/product/cat/${item.id}`"
                            :price="item.price"
                            title="MÈO CẢNH"
                            :src="item.previewUrl"
                        />
                    </div>
                </template>
                <Loading v-else />
            </div>
            <div v-if="!loading" class="paginator-dog">
                <Paginator :first="first" :rows="6" :totalRecords="dataRender.length" v-on:page="onPageChange" />
            </div>
        </LayoutProducts>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Dog.scss';
</style>
