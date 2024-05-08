<script setup lang="ts">
import SearchNew from './SearchNew.vue';
import NavBarNew from './NavBarNew.vue';
import { onMounted, ref } from 'vue';
import { ApiService } from '@/axios/ApiService';
import type { Blog, T_Blogs } from '@/model';
import Loading from '@/components/Loading.vue';
import { useRouter } from 'vue-router';

const apiService = new ApiService();
const isLoading = ref<boolean>(true);
const data = ref<Blog[]>([]);
const router = useRouter();

onMounted(() => {
    document.title = 'Tin tức | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});

onMounted(() => {
    apiService.blogs
        .getBlogs()
        .then((res: T_Blogs) => {
            if (res.message === 'success') {
                data.value = res.data;
                isLoading.value = false;
            }
        })
        .catch((err) => {
            isLoading.value = false;
            console.error(err);
        });
});
</script>

<template>
    <div class="news">
        <h3 class="heading-new">CATEGORY ARCHIVES: TIN TỨC</h3>
        <div class="contents-new">
            <div class="wrapper-new">
                <div class="bar">
                    <SearchNew />
                    <NavBarNew />
                </div>
                <div class="list-news">
                    <template v-if="!isLoading">
                        <div
                            @click="() => router.push(`/news/detail/${item.id}`)"
                            v-for="item in data"
                            class="new-item"
                            :key="item.id"
                        >
                            <div class="wrapper-item">
                                <div class="item-thumb">
                                    <img :src="item.preview_url" alt="thumbnail" />
                                </div>
                                <div class="item-info">
                                    <h3 class="heading-title">{{ item.title }}.</h3>
                                    <p class="item-description">{{ item.title }} [...]</p>
                                </div>
                            </div>
                        </div>
                    </template>
                    <Loading v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/sass/News.scss';
</style>
