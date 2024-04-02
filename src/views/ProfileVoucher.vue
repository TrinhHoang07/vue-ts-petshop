<script setup lang="ts">
import CloseCircle from '@/assets/icons/CloseCircle.vue';
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import { isMenuMobile } from '@/stores';
import { ref } from 'vue';

const searchText = ref<string>('');
const { setIsMenu } = isMenuMobile();
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <div class="profile-voucher">
                <div class="all-vouchers">
                    <div class="header-pr-vou">
                        <p class="heading">
                            <span @click="() => setIsMenu(true)" class="back-btn-profile">
                                <HiMenu />
                            </span>
                            <span>Kho Vouchers</span>
                        </p>
                    </div>
                    <div class="contents">
                        <div class="searching">
                            <span>Mã Voucher</span>
                            <div class="input-wrapper">
                                <input v-model="searchText" type="text" placeholder="Nhập mã voucher tại đây" />
                                <CloseCircle
                                    @click="searchText = ''"
                                    :style="{
                                        margin: '0 8px',
                                        color: '#333',
                                        cursor: 'pointer',
                                        visibility: !!searchText ? 'visible' : 'hidden',
                                    }"
                                />
                            </div>
                            <button
                                :style="{
                                    opacity: !!searchText ? 1 : 0.3,
                                }"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileVouchers.scss';
</style>
