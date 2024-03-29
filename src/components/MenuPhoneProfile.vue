<script lang="ts" setup>
import routesConfig from '@/config/routes';
import { isMenuMobile } from '@/stores';
import { RouterLink } from 'vue-router';

const { isMenu, setIsMenu } = isMenuMobile();
</script>

<template>
    <div
        :style="{
            position: 'fixed',
            top: 72,
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
                    @click="
                        () => {
                            // onClick={() => setState(false)}
                        }
                    "
                    :style="{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        position: 'relative',
                        top: 8,
                        cursor: 'pointer',
                    }"
                >
                    <!-- <IoClose size={'2rem'} /> -->
                </span>
            </div>
            <div class="options">
                <div class="private-info">
                    <RouterLink
                        @click="
                            () => {
                                // onClick={() => setState(false)}
                            }
                        "
                        :to="routesConfig.profile"
                        class="title-info-private"
                    >
                        <!-- <AiOutlineUser size={'2rem'} style={{ color: '#3067be' }} /> -->
                        <span>Tài khoản của tôi</span>
                    </RouterLink>
                    <NavLink
                        @click="
                            () => {
                                // onClick={() => setState(false)}
                            }
                        "
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile"
                    >
                        Hồ Sơ
                    </NavLink>
                    <NavLink
                        @click="
                            () => {
                                // onClick={() => setState(false)}
                            }
                        "
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile_bank"
                    >
                        Ngân Hàng
                    </NavLink>
                    <NavLink
                        @click="
                            () => {
                                // onClick={() => setState(false)}
                            }
                        "
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile_address"
                    >
                        Địa Chỉ
                    </NavLink>
                    <NavLink
                        @click="
                            () => {
                                // onClick={() => setState(false)}
                            }
                        "
                        class="child-not-icon"
                        :class="{ active: '' }"
                        :to="routesConfig.profile_change_password"
                    >
                        Đổi Mật Khẩu
                    </NavLink>
                </div>
                <div class="more-actions">
                    <NavLink
                        @click="
                            () => {
                                // onClick={() => setState(false)}
                            }
                        "
                        :to="routesConfig.profile_friends"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <!-- <FaUserFriends size={'2rem'} style={{ color: 'dodgerblue' }} /> -->
                        <span>Bạn bè</span>
                    </NavLink>
                    <NavLink
                        @click="
                            () => {
                                /* onClick={() => setState(false)} */
                            }
                        "
                        :to="routesConfig.profile_chats"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <!-- <TbMessageCircle2 size={'2rem'} style={{ color: 'dodgerblue' }} /> -->
                        <span>Tin nhắn</span>
                    </NavLink>
                    <NavLink
                        @click="
                            () => {
                                /* onClick={() => setState(false)} */
                            }
                        "
                        :to="routesConfig.profile_buy"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <!-- <CiViewList size={'2rem'} style={{ color: '#3067be' }} /> -->
                        <span>Đơn Mua</span>
                    </NavLink>
                    <NavLink
                        @click="
                            () => {
                                /* onClick={() => setState(false)} */
                            }
                        "
                        :to="routesConfig.profile_noti"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <!-- <IoMdNotificationsOutline style={{ color: '#f46b4e' }} size={'2rem'} /> -->
                        <span>Thông Báo</span>
                    </NavLink>
                    <NavLink
                        @click="
                            () => {
                                // onClick={() => setState(false)}
                            }
                        "
                        :to="routesConfig.profile_voucher"
                        class="title-info-private"
                        :class="{ active: '' }"
                    >
                        <!-- <MdOutlineDiscount size={'2rem'} style={{ color: 'orange' }} /> -->
                        <span>Petshop Vouchers</span>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
</template>
