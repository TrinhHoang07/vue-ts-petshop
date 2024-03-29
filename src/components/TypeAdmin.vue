<script setup lang="ts">
import logo from '@/assets/images/logo-petshop.jpg';
</script>

<template>
    <div class="typing-container">
        <div class="wrap-img">
            <img :src="logo" alt="logo shop" />
        </div>
        <div class="container">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/sass/TypeAdmin.scss';
</style>
