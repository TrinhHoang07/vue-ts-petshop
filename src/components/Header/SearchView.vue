<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import logo from '@/assets/images/cat_item_2.jpg';
import CloseCircle from '@/assets/icons/CloseCircle.vue';
import OutlineLoading from '@/assets/icons/OutlineLoading.vue';
import useDebouncedRef from '@/hooks/useDebounce';
import { App } from '@/const/App';
import { ApiService } from '@/axios/ApiService';
import type { T_Search } from '@/model';
import { formatVND } from '@/Helper';

const props = defineProps<{
    open: boolean;
    setOpen: (open: boolean) => void;
}>();

const router = useRouter();

const inputValue = useDebouncedRef('', App.DELAY_SEARCH, false);
const message = ref<string>('Không có tìm kiếm gần đây');
const loading = ref<boolean>(false);
const apiService = new ApiService();
const fakeData = reactive<{
    data: any[];
}>({
    data: [],
});

const handleCloseSearch = () => {
    props.setOpen(false);
};

watch(inputValue, () => {
    if (inputValue.value.trim().length > 0) {
        loading.value = true;

        apiService.products
            .searchProducts({
                search: inputValue.value.trim(),
            })
            .then((res: T_Search) => {
                if (res.message === 'success') {
                    loading.value = false;

                    if (res.data.length > 0) {
                        fakeData.data = res.data;
                    } else {
                        fakeData.data = [];
                        message.value = 'Không có kết quả tìm kiếm!';
                    }
                }
            })
            .catch((err) => console.error(err));
    }
});

const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
        router.push({
            path: '/search',
            query: {
                q: inputValue.value,
            },
        });

        props.setOpen(false);
    }
};
</script>

<template>
    <div
        :style="{ visibility: props.open ? 'visible' : 'hidden' }"
        id="mask"
        @click="handleCloseSearch"
        class="search"
    ></div>
    <div :style="{ transform: props.open ? 'translateX(0)' : 'translateX(450px)' }" id="search-wrap" class="wrapper">
        <div class="contents">
            <h4 class="heading">Tìm kiếm trong Shop</h4>
            <div class="input-search">
                <input v-model="inputValue" type="text" placeholder="Nhập để tìm kiếm..." @keydown="handleSearch" />
                <span>
                    <CloseCircle
                        v-if="inputValue.trim().length > 0 && !loading"
                        @click="
                            () => {
                                inputValue = '';
                            }
                        "
                    />
                    <OutlineLoading v-if="loading" class="loading-input" />
                </span>
            </div>
            <div class="line-search"></div>
            <div class="result-search">
                <template v-if="fakeData.data.length > 0">
                    <RouterLink
                        v-for="item in fakeData.data"
                        to=""
                        @click="() => props.setOpen(false)"
                        :key="item.id"
                        class="result-item"
                    >
                        <div class="item-info-sss">
                            <div class="preview">
                                <img :src="item.preview_url" alt="images preview" />
                            </div>
                            <p class="name-item">{{ item.name }}</p>
                        </div>
                        <p class="price-item">{{ formatVND.format(item.price) }}</p>
                    </RouterLink>
                </template>
                <p v-else class="message-noti">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10;
    visibility: hidden;
}

.wrapper {
    width: 450px;
    transform: translateX(450px);
    padding: 16px;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    transition: all ease 0.3s;
    z-index: 11;
}

.heading {
    font-weight: 500;
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 8px;
    padding: 12px 0;
}

.input-search {
    display: flex;
    align-items: center;
    border: 1px solid #d7d7d7;
    border-radius: 999px;
    padding-left: 16px;
    input {
        width: 100%;
        outline: none;
        border: none;
        padding: 12px 12px 12px 0;
    }
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 14px;
        color: #555;
    }
}

.loading-input {
    animation: loading linear 0.5s infinite;
}

.line-search {
    height: 1px;
    background-color: #d7d7d7;
    width: 100%;
    margin: 16px 0;
}

.result-search {
    overflow-y: auto;
    height: calc(100vh - 152px);
}

.result-item {
    display: flex;
    text-decoration: none;
    color: #333;
    align-items: center;
    padding: 14px;
    border-radius: 4px;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        background-color: #d7d7d7;
    }
}

.name-item {
    padding-left: 8px;
    padding-right: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 1.4rem;
    font-weight: 300;
}

.price-item {
    font-size: 1.4rem;
}

.item-info-sss {
    display: flex;
    align-items: center;
}

.preview {
    width: 36px;
    height: 36px;
    display: flex;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
    }
}

.message-noti {
    font-size: 1.4rem;
    font-weight: 300;
}

@keyframes loading {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
