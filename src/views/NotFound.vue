<script setup lang="ts">
import notFound from '@/assets/images/notFound.jpg';
import routesConfig from '@/config/routes';
import { RouterLink } from 'vue-router';

const location = window.location.href;
</script>

<template>
    <div class="not-found">
        <div class="wrapper">
            <div class="image-notfound">
                <img :src="notFound" alt="not found images" />
            </div>
            <div class="info">
                <p class="not-url">Không tìm thấy đường dẫn {{ location }}</p>
                <RouterLink :to="routesConfig.home" class="btn-home"> Trang chủ </RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.not-found {
    display: flex;
    width: 100%;
    height: 100vh;
}

.wrapper {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image-notfound {
    display: flex;
}

.info {
    text-align: center;
}

.btn-home {
    display: inline-block;
    margin-top: 8px;
    border: none;
    padding: 10px 24px;
    background-color: #6366f1;
    cursor: pointer;
    color: #fff;
    font-weight: 600;
    border-radius: 6px;
    text-decoration: none;

    &:hover {
        background-color: #4f46e5;
    }
}
</style>
