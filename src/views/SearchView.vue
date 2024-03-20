<script setup lang="ts">
import BiSearch from '@/assets/icons/BiSearch.vue';
import OutlineLoading from '@/assets/icons/OutlineLoading.vue';
import CardItemFlip from '@/components/CardItemFlip.vue';
import img from '@/assets/images/cat_item_4.jpg';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useDebouncedRef from '@/hooks/useDebounce';
import { App } from '@/const/App';
import { ApiService } from '@/axios/ApiService';
import type { T_Search } from '@/model';
import { getNameFromType } from '@/Helper';

const route = useRoute();

const searchText = useDebouncedRef('', App.DELAY_SEARCH, false);
const apiService = new ApiService();
const message = ref<string>('Không có tìm kiếm gần đây!');
const loading = ref<boolean>(false);
const data = reactive<{
    data: any[];
}>({
    data: [],
});

if ((route.query.q as string).trim().length > 0) {
    searchText.value = route.query.q;
}

watch(searchText, () => {
    console.log(searchText);

    if (searchText.value.trim().length > 0) {
        loading.value = true;
        apiService.products
            .searchProducts({
                search: searchText.value.trim(),
            })
            .then((res: T_Search) => {
                if (res.message === 'success') {
                    loading.value = false;

                    if (res.data.length > 0) {
                        data.data = res.data;
                    } else {
                        data.data = [];
                        message.value = 'Không có kết quả tìm kiếm!';
                    }
                }
            })
            .catch((err) => console.log(err));
    }
});
</script>

<template>
    <div class="wrapper">
        <div class="wrapper-contents">
            <div class="header-search">
                <h5>Tìm kiếm trong Shop</h5>
                <div class="input-search">
                    <input type="text" placeholder="Nhập từ khóa để tìm kiếm..." v-model="searchText" />
                    <span><OutlineLoading v-if="loading" class="loading-input" /><BiSearch v-else /> </span>
                </div>
            </div>
            <div class="contents">
                <h2 v-if="data.data.length > 0">Kết quả tìm kiếm</h2>
                <div class="containers">
                    <template v-if="data.data.length > 0">
                        <CardItemFlip
                            v-for="item in data.data"
                            :to="`/product/${item.type}/${item.id}`"
                            :title="getNameFromType(item.type)"
                            :price="item.price"
                            :src="item.preview_url"
                            :key="item.id"
                            :name="item.name"
                        />
                    </template>

                    <p v-else style="text-align: center">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Search.scss';
</style>
