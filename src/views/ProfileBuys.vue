<script setup lang="ts">
import { formatVND, getNameFromStatus } from '@/Helper';
import { ApiService } from '@/axios/ApiService';
import ButtonView from '@/components/ButtonView.vue';
import Loading from '@/components/Loading.vue';
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import type { Orders, T_Orders } from '@/model';
import { isMenuMobile, useSession } from '@/stores';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import { onMounted, ref } from 'vue';

const { setIsMenu } = isMenuMobile();
const data = ref<Orders[]>([]);
const loading = ref<boolean>(true);
const apiService = new ApiService();
const { infos } = useSession();

onMounted(() => {
    apiService.orders
        .getOrderById(`${infos.user?.id}`, infos.user?.token as string)
        .then((res: T_Orders) => {
            if (res.message === 'success') {
                data.value = res.data;
                loading.value = false;
            }
        })
        .catch((err) => {
            console.error(err);
            loading.value = false;
        });
});
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <div class="profile-buys">
                <div>
                    <span @click="() => setIsMenu(true)" class="back-btn-profile">
                        <HiMenu />
                    </span>
                </div>
                <TabView>
                    <TabPanel header="Tất Cả">
                        <div class="buys-search">
                            <span>
                                <input style="padding-left: 12px" type="text" placeholder="Tìm kiếm đơn hàng..." />
                            </span>
                        </div>
                        <div class="all-orders">
                            <template v-if="!loading">
                                <div
                                    v-if="data.length > 0"
                                    v-for="item in data"
                                    :key="item.orders_id"
                                    class="order-item"
                                >
                                    <div class="wrapper-info">
                                        <div class="order-preview">
                                            <img :src="item.product_preview_url" alt="order-item" />
                                        </div>
                                        <div class="info-order">
                                            <h3>{{ item.product_name }}</h3>
                                            <p>{{ item.product_color }}</p>
                                            <p>x{{ item.orders_quantity }}</p>
                                        </div>
                                    </div>
                                    <p class="price-item-order">
                                        Thành tiền: {{ formatVND.format(item.orders_price * item.orders_quantity) }}
                                    </p>
                                    <p class="price-item-order', 'detail-item">Xem chi tiết {{ item.product_type }}</p>
                                    <p class="price-item-order">
                                        Trạng thái: {{ getNameFromStatus(item.orders_status) }}
                                    </p>
                                    <div class="status-order-item">
                                        <ButtonView :disabled="item.orders_status === 'processing'" small="true">
                                            Đã nhận được hàng
                                        </ButtonView>
                                    </div>
                                </div>
                                <p v-else class="no-orders-mes">Bạn chưa có đơn hàng nào!</p>
                            </template>
                            <Loading v-else />
                        </div>
                    </TabPanel>
                    <TabPanel header="Đang Giao">
                        <div
                            v-if="data.filter((item) => item.orders_status === 'shipping').length > 0"
                            v-for="item in data.filter((item) => item.orders_status === 'shipping')"
                            :key="item.orders_id"
                            class="order-item"
                        >
                            <div class="wrapper-info">
                                <div class="order-preview">
                                    <img :src="item.product_preview_url" alt="order-item" />
                                </div>
                                <div class="info-order">
                                    <h3>{{ item.product_name }}</h3>
                                    <p>{{ item.product_color }}</p>
                                    <p>x{{ item.orders_quantity }}</p>
                                </div>
                            </div>
                            <p class="price-item-order">
                                Thành tiền: {{ formatVND.format(item.orders_price * item.orders_quantity) }}
                            </p>
                            <p class="price-item-order', 'detail-item">Xem chi tiết {{ item.product_type }}</p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView :disabled="item.orders_status === 'processing'" small="true">
                                    Đã nhận được hàng
                                </ButtonView>
                            </div>
                        </div>
                        <p v-else class="no-orders-mes">Bạn chưa có đơn hàng nào đang giao!</p>
                    </TabPanel>
                    <TabPanel header="Hoàn Thành">
                        <div
                            v-if="data.filter((item) => item.orders_status === 'finished').length > 0"
                            v-for="item in data.filter((item) => item.orders_status === 'finished')"
                            :key="item.orders_id"
                            class="order-item"
                        >
                            <div class="wrapper-info">
                                <div class="order-preview">
                                    <img :src="item.product_preview_url" alt="order-item" />
                                </div>
                                <div class="info-order">
                                    <h3>{{ item.product_name }}</h3>
                                    <p>{{ item.product_color }}</p>
                                    <p>x{{ item.orders_quantity }}</p>
                                </div>
                            </div>
                            <p class="price-item-order">
                                Thành tiền: {{ formatVND.format(item.orders_price * item.orders_quantity) }}
                            </p>
                            <p class="price-item-order', 'detail-item">Xem chi tiết {{ item.product_type }}</p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView :disabled="item.orders_status === 'processing'" small="true">
                                    Đã nhận được hàng
                                </ButtonView>
                            </div>
                        </div>
                        <p v-else class="no-orders-mes">Bạn chưa có đơn hàng nào đã hoàn thành!</p>
                    </TabPanel>
                    <TabPanel header="Đã Hủy">
                        <div
                            v-if="data.filter((item) => item.orders_status === 'cancel').length > 0"
                            v-for="item in data.filter((item) => item.orders_status === 'cancel')"
                            :key="item.orders_id"
                            class="order-item"
                        >
                            <div class="wrapper-info">
                                <div class="order-preview">
                                    <img :src="item.product_preview_url" alt="order-item" />
                                </div>
                                <div class="info-order">
                                    <h3>{{ item.product_name }}</h3>
                                    <p>{{ item.product_color }}</p>
                                    <p>x{{ item.orders_quantity }}</p>
                                </div>
                            </div>
                            <p class="price-item-order">
                                Thành tiền: {{ formatVND.format(item.orders_price * item.orders_quantity) }}
                            </p>
                            <p class="price-item-order', 'detail-item">Xem chi tiết {{ item.product_type }}</p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView :disabled="item.orders_status === 'processing'" small="true">
                                    Đã nhận được hàng
                                </ButtonView>
                            </div>
                        </div>
                        <p v-else class="no-orders-mes">Bạn chưa có đơn hàng nào đã hủy!</p>
                    </TabPanel>
                    <TabPanel header="Hoàn Tiền">
                        <div
                            v-if="data.filter((item) => item.orders_status === 'refund').length > 0"
                            v-for="item in data.filter((item) => item.orders_status === 'refund')"
                            :key="item.orders_id"
                            class="order-item"
                        >
                            <div class="wrapper-info">
                                <div class="order-preview">
                                    <img :src="item.product_preview_url" alt="order-item" />
                                </div>
                                <div class="info-order">
                                    <h3>{{ item.product_name }}</h3>
                                    <p>{{ item.product_color }}</p>
                                    <p>x{{ item.orders_quantity }}</p>
                                </div>
                            </div>
                            <p class="price-item-order">
                                Thành tiền: {{ formatVND.format(item.orders_price * item.orders_quantity) }}
                            </p>
                            <p class="price-item-order', 'detail-item">Xem chi tiết {{ item.product_type }}</p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView :disabled="item.orders_status === 'processing'" small="true">
                                    Đã nhận được hàng
                                </ButtonView>
                            </div>
                        </div>
                        <p v-else class="no-orders-mes">Bạn chưa có đơn hàng nào hoàn tiền!</p>
                    </TabPanel>
                </TabView>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileBuys.scss';
</style>
