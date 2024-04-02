<script lang="ts" setup>
import CirList from '@/assets/icons/CirList.vue';
import Discount from '@/assets/icons/Discount.vue';
import FaUser from '@/assets/icons/FaUser.vue';
import IoClose from '@/assets/icons/IoClose.vue';
import MessageCir from '@/assets/icons/MessageCir.vue';
import Notifications from '@/assets/icons/Notifications.vue';
import UserFriends from '@/assets/icons/UserFriends.vue';
import routesConfig from '@/config/routes';
import { isMenuMobile } from '@/stores';
import { RouterLink } from 'vue-router';

const { isMenu, setIsMenu } = isMenuMobile();
</script>

<template>
    <div
        :style="{
            position: 'fixed',
            top: '72px',
            left: 0,
            bottom: 0,
            backgroundColor: '#f2f3f5',
            zIndex: 99999,
            transition: 'all 0.25s ease',
            transform: isMenu.data ? 'translateX(0)' : 'translateX(-238px)',
        }"
    >
        <div class="navbar-phone-profile">
            <div>
                <span
                    @click="setIsMenu(false)"
                    :style="{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        position: 'relative',
                        top: 8,
                        cursor: 'pointer',
                    }"
                >
                    <IoClose />
                </span>
            </div>
            <div class="options">
                <div class="private-info">
                    <RouterLink @click="setIsMenu(false)" :to="routesConfig.profile" class="title-info-private">
                        <FaUser />
                        <span>Tài khoản của tôi</span>
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile"
                    >
                        Hồ Sơ
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile_bank"
                    >
                        Ngân Hàng
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile_address"
                    >
                        Địa Chỉ
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile_change_password"
                    >
                        Đổi Mật Khẩu
                    </RouterLink>
                </div>
                <div class="more-actions">
                    <RouterLink
                        @click="setIsMenu(false)"
                        :to="routesConfig.profile_friends"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <UserFriends />
                        <span>Bạn bè</span>
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        :to="routesConfig.profile_chat"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <MessageCir />
                        <span>Tin nhắn</span>
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        :to="routesConfig.profile_buy"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <CirList />
                        <span>Đơn Mua</span>
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        :to="routesConfig.profile_noti"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <Notifications />
                        <span>Thông Báo</span>
                    </RouterLink>
                    <RouterLink
                        @click="setIsMenu(false)"
                        :to="routesConfig.profile_voucher"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <Discount />
                        <span>Petshop Vouchers</span>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.navbar-phone-profile {
    padding: 0 32px;
    .options {
        padding-top: 8px;
        a {
            text-decoration: none;
            display: flex;
            margin: 10px 0;
            align-items: center;
            color: #333;

            span {
                margin-left: 6px;
                transition: all linear 0.25s;
                &:hover {
                    color: orange;
                }
            }
        }

        .child-not-icon {
            margin-left: 26px;
            transition: all linear 0.25s;
            &:hover {
                color: orange;
            }
        }
    }

    .title-info-private.active {
        color: orange;
    }

    .child-not-icon.active {
        color: orange;
    }
}
</style>
