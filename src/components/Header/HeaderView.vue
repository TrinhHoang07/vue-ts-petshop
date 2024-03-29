<script setup lang="ts">
import routesConfig from '@/config/routes';
import { RouterLink } from 'vue-router';
import NavView from './NavView.vue';
import { useSession } from '@/stores';
import logo from '@/assets/images/logo-petshop.jpg';
import BiSearch from '@/assets/icons/BiSearch.vue';
import CartView from './CartView.vue';
import { ref } from 'vue';
import SearchView from './SearchView.vue';
import FaUser from '@/assets/icons/FaUser.vue';

const { infos } = useSession();
const openSearch = ref<boolean>(false);

const setOpenSearch = (value: boolean) => {
    openSearch.value = value;
};
const handleOpenSearch = () => {
    openSearch.value = true;
};
</script>

<template>
    <header class="header">
        <SearchView :open="openSearch" :setOpen="setOpenSearch" />
        <div class="logo-header">
            <RouterLink class="logo-to-home" :to="routesConfig.home">
                <img :src="logo" alt="logo-shop" />
            </RouterLink>
        </div>
        <NavView />
        <div class="header-action">
            <span @click="handleOpenSearch" class="action-item search-icon">
                <BiSearch />
            </span>
            <RouterLink class="action-item user-icon" :to="routesConfig.profile">
                <div v-if="infos.user && infos.user.avatar" class="user-avatar">
                    <img :src="infos.user.avatar" alt="avatar user" />
                </div>
                <FaUser v-else />
            </RouterLink>
            <CartView />
        </div>
    </header>
</template>

<style lang="scss">
@import './Header.scss';
</style>
