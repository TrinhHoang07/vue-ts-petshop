<script setup lang="ts">
import { RouterLink } from 'vue-router';
import image from '@/assets/images/meoww.jpg';
</script>

<template>
    <div class="bar-content">
        <h2 class="bar-heading">BÀI VIẾT MỚI</h2>
        <div class="bar-wrapper">
            <div class="bar-item">
                <div class="thumbnail-bar">
                    <img :src="image" alt="bar item" />
                </div>
                <RouterLink to="" class="bar-description">
                    Duis luctus elit nisi, et cursus magna pellentesque non.
                </RouterLink>
            </div>
            <div class="spacer"></div>
            <div class="bar-item">
                <div class="thumbnail-bar">
                    <img :src="image" alt="bar item" />
                </div>
                <RouterLink to="" class="bar-description">
                    Duis luctus elit nisi, et cursus magna pellentesque non.
                </RouterLink>
            </div>
            <div class="spacer"></div>
            <div class="bar-item">
                <div class="thumbnail-bar">
                    <img :src="image" alt="bar item" />
                </div>
                <RouterLink to="" class="bar-description">
                    Duis luctus elit nisi, et cursus magna pellentesque non.
                </RouterLink>
            </div>
            <div class="spacer"></div>
            <div class="bar-item">
                <div class="thumbnail-bar">
                    <img :src="image" alt="bar item" />
                </div>
                <RouterLink to="" class="bar-description">
                    Duis luctus elit nisi, et cursus magna pellentesque non.
                </RouterLink>
            </div>
            <div class="spacer"></div>
            <div class="bar-item">
                <div class="thumbnail-bar">
                    <img :src="image" alt="bar item" />
                </div>
                <RouterLink to="" class="bar-description">
                    Duis luctus elit nisi, et cursus magna pellentesque non.
                </RouterLink>
            </div>
            <div class="spacer"></div>
            <div class="bar-item">
                <div class="thumbnail-bar">
                    <img :src="image" alt="bar item" />
                </div>
                <RouterLink to="" class="bar-description">
                    Duis luctus elit nisi, et cursus magna pellentesque non.
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bar-wrapper {
    padding: 16px;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
}

.bar-heading {
    font-weight: 600;
    font-size: 18px;
    margin-top: 22px;
    margin-bottom: 8px;
}

.bar-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
}

.bar-description {
    margin-left: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    text-decoration: none;
    color: #333;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: orange;
    }
}

.spacer {
    height: 1px;
    background-color: #d7d7d7;
    padding: 0 32px;
    margin: 8px 0;
}

.thumbnail-bar {
    flex-shrink: 0;
    display: flex;
    width: 36px;
    height: 36px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
    }
}
</style>
