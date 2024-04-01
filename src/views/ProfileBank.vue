<script setup lang="ts">
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import FormAdCredit from '@/components/FormAdCredit.vue';
import { isMenuMobile } from '@/stores';
import { ref } from 'vue';
import AddIcon from '@/assets/icons/AddIcon.vue';
import FormAdBank from '@/components/FormAdBank.vue';

const { setIsMenu } = isMenuMobile();
const visibleCredit = ref<boolean>(false);
const visibleBank = ref<boolean>(false);

const setIsVisibleCredit = (data: boolean) => {
    visibleCredit.value = data;
};

const setIsVisibleBank = (data: boolean) => {
    visibleBank.value = data;
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <div class="profile-bank">
                <div class="credit_bebit-card">
                    <FormAdCredit :visible="visibleCredit" :setIsVisible="setIsVisibleCredit" />
                    <FormAdBank :visible="visibleBank" :setIsVisible="setIsVisibleBank" />
                    <div class="header-pr-bank">
                        <p class="heading">
                            <span @click="() => setIsMenu(true)" class="back-btn-profile">
                                <HiMenu />
                            </span>
                            <span>Thẻ Tín Dụng/Ghi Nợ</span>
                        </p>
                        <p @click="visibleCredit = true" class="btn-credit">
                            <AddIcon />
                            Thêm Thẻ Mới
                        </p>
                        <p @click="visibleCredit = true" class="btn-credit-mobile">
                            <AddIcon />
                            Thêm
                        </p>
                    </div>
                    <div class="contents">
                        <p class="detail-no-credit">Bạn chưa liên kết thẻ.</p>
                    </div>
                </div>
                <div class="my-bank">
                    <div class="header-pr-bank">
                        <p class="heading">Tài Khoản Ngân Hàng Của Tôi</p>
                        <p @click="visibleBank = true" class="btn-credit">
                            <AddIcon />
                            Thêm Tài Khoản Ngân Hàng
                        </p>
                        <p @click="visibleBank = true" class="btn-credit-mobile">
                            <AddIcon />
                            Thêm
                        </p>
                    </div>
                    <div class="contents">
                        <p class="detail-no-credit">Bạn chưa có tài khoản ngân hàng.</p>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileBank.scss';
</style>
