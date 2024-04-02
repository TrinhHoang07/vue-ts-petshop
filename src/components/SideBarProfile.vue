<script lang="ts" setup>
import { useSession } from '@/stores';
import routesConfig from '@/config/routes';
import { RouterLink, useRoute } from 'vue-router';
import FaUser from '@/assets/icons/FaUser.vue';
import UserFriends from '@/assets/icons/UserFriends.vue';
import MessageCir from '@/assets/icons/MessageCir.vue';
import CirList from '@/assets/icons/CirList.vue';
import Notifications from '@/assets/icons/Notifications.vue';
import Discount from '@/assets/icons/Discount.vue';
const props = defineProps<{
    temporaryImage: string;
}>();

const { infos } = useSession();
const route = useRoute();
</script>

<template>
    <div class="side-bar-profile">
        <div class="header-side-bar-profile">
            <div class="avatar">
                <img
                    :src="
                        props.temporaryImage
                            ? props.temporaryImage
                            : infos.user?.avatar && infos.user.avatar.length > 0
                            ? infos.user.avatar
                            : 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
                    "
                    alt="avatar-user"
                />
            </div>
            <div class="info-user">
                <h3 class="user-name">{{ infos.user?.name }}</h3>
                <RouterLink :to="routesConfig.profile">
                    <AiOutlineEdit />
                    <span>Sửa hồ sơ</span>
                </RouterLink>
            </div>
        </div>
        <div class="options">
            <div class="private-info">
                <RouterLink :to="routesConfig.profile" class="title-info-private">
                    <FaUser />
                    <span>Tài khoản của tôi</span>
                </RouterLink>
                <RouterLink
                    class="child-not-icon"
                    :class="{ active: routesConfig.profile === route.fullPath }"
                    :to="routesConfig.profile"
                >
                    Hồ Sơ
                </RouterLink>
                <RouterLink
                    class="child-not-icon"
                    :class="{ active: route.fullPath === routesConfig.profile_bank }"
                    :to="routesConfig.profile_bank"
                >
                    Ngân Hàng
                </RouterLink>
                <RouterLink
                    class="child-not-icon"
                    :class="{ active: route.fullPath === routesConfig.profile_address }"
                    :to="routesConfig.profile_address"
                >
                    Địa Chỉ
                </RouterLink>
                <RouterLink
                    class="child-not-icon"
                    :class="{ active: route.fullPath === routesConfig.profile_change_password }"
                    :to="routesConfig.profile_change_password"
                >
                    Đổi Mật Khẩu
                </RouterLink>
            </div>
            <div class="more-actions">
                <RouterLink
                    :to="routesConfig.profile_friends"
                    class="title-info-private"
                    :class="{ active: routesConfig.profile_friends === route.fullPath }"
                >
                    <UserFriends />
                    <span>Bạn bè</span>
                </RouterLink>
                <RouterLink
                    :to="routesConfig.profile_chat"
                    class="title-info-private"
                    :class="{ active: routesConfig.profile_chat === route.fullPath }"
                >
                    <MessageCir />
                    <span>Tin nhắn</span>
                </RouterLink>
                <RouterLink
                    :to="routesConfig.profile_buy"
                    class="title-info-private"
                    :class="{ active: routesConfig.profile_buy === route.fullPath }"
                >
                    <CirList />
                    <span>Đơn Mua</span>
                </RouterLink>
                <RouterLink
                    :to="routesConfig.profile_noti"
                    class="title-info-private"
                    :class="{ active: routesConfig.profile_noti === route.fullPath }"
                >
                    <Notifications />
                    <span>Thông Báo</span>
                </RouterLink>
                <RouterLink
                    :to="routesConfig.profile_voucher"
                    class="title-info-private"
                    :class="{ active: routesConfig.profile_voucher === route.fullPath }"
                >
                    <Discount />
                    <span>Petshop Vouchers</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.side-bar-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header-side-bar-profile {
    display: flex;
    align-items: center;

    .avatar {
        width: 64px;
        height: 64px;
        display: flex;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 999px;
        }
    }

    .info-user {
        padding-left: 12px;

        .user-name {
            font-size: 1.6rem;
        }

        a {
            text-decoration: none;
            display: flex;
            align-items: center;
            color: #888;

            span {
                margin-left: 4px;
            }
        }
    }
}

.options {
    padding-top: 36px;
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
</style>
