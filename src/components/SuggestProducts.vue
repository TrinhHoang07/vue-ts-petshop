<script setup lang="ts">
import { formatVND } from '@/Helper';
import { ApiService } from '@/axios/ApiService';
import type { T_Product, T_Suggest } from '@/model';
import { onBeforeMount, ref } from 'vue';
import { RouterLink } from 'vue-router';

const apiService = new ApiService();
const data = ref<T_Product[]>([]);

onBeforeMount(() => {
    apiService.products.randomProducts().then((res: T_Suggest) => {
        if (res.message === 'success') {
            data.value = res.data;
        }
    });
});
</script>

<template>
    <div class="suggest-pro">
        <h6 class="heading-menu">SẢN PHẨM</h6>
        <div class="wrapper-suggest">
            <div v-for="item in data" :key="item.id">
                <div class="suggest-item">
                    <RouterLink :to="`/product/${item.type}/${item.id}`" class="preview-suggest">
                        <img :src="item.preview_url" alt="preview product" />
                    </RouterLink>
                    <div class="suggest-info">
                        <RouterLink :to="`/product/${item.type}/${item.id}`" class="heading-suggest">
                            {{ item.name }}
                        </RouterLink>
                        <p class="price-suggest-item">{{ formatVND.format(item.price) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.heading-menu {
    font-size: 1.8rem;
    font-weight: 600;
    padding-bottom: 8px;
    display: inline-block;
    border-bottom: 2px solid #d7d7d7;
}
.suggest-pro {
    padding-top: 32px;
}

.wrapper-suggest {
    padding: 16px 12px;
    border: 1px solid #d7d7d7;
    border-radius: 6px;
    margin-top: 16px;
}

.suggest-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #d7d7d7;

    &:last-child {
        border-bottom: none;
    }
}

.preview-suggest {
    text-decoration: none;
    color: #333;
    display: flex;
    width: 60px;
    height: 60px;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
    }
}

.suggest-info {
    padding-left: 12px;
}

.heading-suggest {
    text-decoration: none;
    color: #333;
    font-size: 1.4rem;
    font-weight: 300;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &:hover {
        text-decoration: underline;
    }
}

.price-suggest-item {
    font-weight: 600;
    font-size: 1.4rem;
    margin-top: 4px;
}

.line-suggest {
    height: 1px;
    background-color: #d7d7d7;
    margin: 12px 0;
}
</style>
