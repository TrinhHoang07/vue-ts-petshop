<script setup lang="ts">
import Dot from '@/assets/icons/Dot.vue';
import { RouterLink, useRoute } from 'vue-router';

type TNav = {
    id: number;
    name: string;
    path: string;
};

const data: TNav[] = [
    {
        id: 1,
        name: 'Trang chủ',
        path: '/',
    },
    {
        id: 2,
        name: 'Về chúng tôi',
        path: '/description',
    },
    {
        id: 3,
        name: 'Sản phẩm',
        path: '/shop',
    },
    {
        id: 4,
        name: 'Tin tức',
        path: '/news',
    },
    {
        id: 5,
        name: 'Liên hệ',
        path: '/contact',
    },
];

const router = useRoute();
</script>

<template>
    <div>
        <h2 class="heading-nav">điều hướng</h2>
        <nav class="nav-footer">
            <RouterLink
                v-for="item in data"
                class="link-footer"
                :class="{ active: router.fullPath == item.path }"
                :key="item.id"
                :to="item.path"
            >
                <span style="color: orange">
                    <Dot />
                </span>
                {{ item.name }}
            </RouterLink>
        </nav>
    </div>
</template>
