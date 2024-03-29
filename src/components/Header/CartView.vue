<script setup lang="ts">
import FaCart from '@/assets/icons/FaCart.vue';
import logo from '@/assets/images/dog_item_1.jpg';
import routesConfig from '@/config/routes';
import { useSession } from '@/stores';
import { onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import ButtonView from '../ButtonView.vue';
import { ApiService } from '@/axios/ApiService';
import type { T_Cart, T_Categorys } from '@/model';
import { formatVND } from '@/Helper';

const apiService = new ApiService();

const handleOpenCarts = () => {
    const cart: HTMLElement | null = document.getElementById('carts-list-small');
    if (cart) {
        cart.style.transform = 'scale(1)';
    }
};

const handleCloseCarts = () => {
    const cart: HTMLElement | null = document.getElementById('carts-list-small');
    if (cart) {
        cart.style.transform = 'scale(0)';
    }
};

const { infos } = useSession();
const data = reactive<{
    data: T_Cart[];
}>({
    data: [],
});

onMounted(() => {
    if (infos.isAuth) {
        apiService.carts
            .getCartsByUserId(`${infos.user.id}`, infos.user.token ?? '')
            .then((res: T_Categorys) => {
                if (res.message === 'success') {
                    data.data = res.data;
                }
            })
            .catch((err) => console.error(err));
    }
});
</script>

<template>
    <div @mouseenter="handleOpenCarts" @mouseleave="handleCloseCarts" class="wrapper-cart">
        <RouterLink class="action-item categories" :to="routesConfig.categories">
            <FaCart />
            <div v-if="data.data.length > 0" class="count-item">
                <span>{{ data.data.length >= 100 ? '99+' : data.data.length }}</span>
            </div>
        </RouterLink>
        <div id="carts-list-small" class="carts">
            <template v-if="infos.isAuth">
                <h3 class="heading">Sản phẩm mới thêm</h3>
                <div class="contents">
                    <template v-if="data.data.length > 0">
                        <div v-for="item in data.data.slice(0, 3)" :key="item.carts_id" class="cart-item">
                            <div class="preview">
                                <img :src="item.product_preview_url" alt="preview images" />
                            </div>
                            <h6 class="name-item">{{ item.product_name }}</h6>
                            <p class="price-item">{{ formatVND.format(item.product_price) }}</p>
                        </div>
                    </template>
                    <h3 v-else class="heading">Giỏ hàng trống!</h3>
                </div>
                <div class="footer-cart">
                    <p>{{ data.data.length }} thêm hàng vào giỏ</p>
                    <ButtonView :to="routesConfig.categories" small="true"> Xem giỏ hàng </ButtonView>
                </div>
            </template>
            <div v-else class="preview-carts-nologin">
                <h3 class="heading">Bạn chưa đăng nhập, hãy đăng nhập để mua sản phẩm!</h3>
                <ButtonView :to="routesConfig.login" small="true"> Đăng nhập </ButtonView>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.carts {
    position: absolute;
    top: 42px;
    right: 0;
    width: 375px;
    background-color: #f2f2f2;
    box-shadow: 0 1px 3px #d7d7d7;
    transform-origin: top right;
    transition: all ease 0.25s;
    transform: scale(0);

    &::after {
        content: '';
        top: -8px;
        right: 20px;
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #f2f2f2;
    }

    .heading {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 0;
        padding: 0;
        padding: 12px 8px;
        border-bottom: 1px solid #d7d7d7;
    }

    .contents {
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            cursor: default;

            &:hover {
                background-color: #dfd9d9;
            }

            .preview {
                width: 48px;
                height: 48px;
                display: flex;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .name-item {
                font-size: 1.4rem;
                font-weight: 500;
                padding: 0 12px;
                flex: 1;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }

            .price-item {
                font-size: 1.2rem;
                color: red;
            }
        }
    }

    .footer-cart {
        padding: 12px 8px;
        border-top: 1px solid #d7d7d7;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
            font-size: 1.2rem;
        }

        a {
            text-decoration: none;
        }
    }
}

.preview-carts-nologin {
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        margin: 16px 0;
        text-decoration: none;
    }
}

.wrapper-cart {
    position: relative;
}

.categories {
    &:hover {
        opacity: 1 !important;
    }
}

.action-item {
    display: flex;
    color: var(--primary-color);
    padding: 4px 18px;
    position: relative;

    &:hover {
        opacity: 0.88;
        cursor: pointer;
    }

    .count-item {
        position: absolute;
        top: -8px;
        right: 5px;

        span {
            display: inline-block;
            width: 24px;
            height: 24px;
            background-color: red;
            color: var(--white-color);
            text-align: center;
            line-height: 24px;
            border-radius: 999px;
            font-size: 12px;
        }
    }
}
</style>
