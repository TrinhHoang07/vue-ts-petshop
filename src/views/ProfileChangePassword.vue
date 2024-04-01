<script setup lang="ts">
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import { isMenuMobile } from '@/stores';
import FormChangePass from '@/components/FormChangePass.vue';
import HiMenu from '@/assets/icons/HiMenu.vue';
const { setIsMenu } = isMenuMobile();
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <div class="profile-changepass">
                <div class="my-pass">
                    <div class="header-pr-pass">
                        <p class="heading">
                            <span @click="() => setIsMenu(true)" class="back-btn-profile">
                                <HiMenu />
                            </span>
                            <span>Thay Đổi Mật Khẩu</span>
                        </p>
                    </div>
                    <div class="contents">
                        <FormChangePass />
                    </div>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileChangePass.scss';
</style>
