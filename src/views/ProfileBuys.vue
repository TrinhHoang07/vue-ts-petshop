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
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const { setIsMenu } = isMenuMobile();
const data = ref<Orders[]>([]);
const dataDetail = ref<Orders>();
const loading = ref<boolean>(true);
const isDetail = ref<boolean>(false);
const apiService = new ApiService();
const { infos } = useSession();
const toast = useToast();
const confirm = useConfirm();

onMounted(() => {
    apiService.orders
        .getOrderById(`${infos.data.user?.id}`, infos.data.user?.token as string)
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
        <Dialog v-model:visible="isDetail" modal header="Chi tiết hóa đơn" :style="{ width: '50%' }">
            <div class="order-product-detail">
                <div class="line-detail-product"></div>
                <div class="container-detail-product">
                    <p>Tên khách hàng: {{ dataDetail?.customer_name }}</p>
                    <p>Số điện thoại: {{ dataDetail?.customer_phone_number }}</p>
                    <p>Địa chỉ: {{ dataDetail?.customer_address }}</p>
                </div>
                <div class="line-detail-product"></div>
                <div class="container-detail-product">
                    <p>Tên sản phầm: {{ dataDetail?.product_name }}</p>
                    <div class="preview-product-detail">
                        <img :src="dataDetail?.product_preview_url" alt="preview product" />
                    </div>
                    <p>Màu sắc: {{ dataDetail?.product_color }}</p>
                    <p>Số lương: {{ dataDetail?.orders_quantity }}</p>
                    <p>Đơn giá: {{ formatVND.format(dataDetail?.orders_price ?? 0) }}</p>
                    <p>Trạng thái: {{ getNameFromStatus(dataDetail?.orders_status ?? '') }}</p>
                    <p>
                        Thành tiền:
                        {{ formatVND.format((dataDetail?.orders_price ?? 1) * (dataDetail?.orders_quantity ?? 1)) }}
                    </p>
                </div>
            </div>
            <template #footer>
                <button
                    v-if="
                        dataDetail?.orders_status !== 'cancel' &&
                        dataDetail?.orders_status !== 'refund' &&
                        dataDetail?.orders_status !== 'finished'
                    "
                    class="product-detail-btn-cancel"
                    @click="() => {
                        confirm.require({
                            header: 'Thông báo',
                            message: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
                            acceptLabel: 'Xóa',
                            rejectLabel: 'Hủy',
                            accept: () => {

                                apiService.orders.updateStatus((dataDetail?.orders_id as number).toString(), {
                                    status: 'cancel',
                                }, infos.data.user.token ?? '')
                                    .then((res: any) => {
                                        if(res.message === 'success') {
                                            toast.add({
                                                severity: 'success',
                                                detail: 'Delete order successfully',
                                                life: 3000,
                                            })
                                            isDetail = false;

                                            apiService.orders
                                                .getOrderById(`${infos.data.user?.id}`, infos.data.user?.token as string)
                                                .then((res: T_Orders) => {
                                                    if (res.message === 'success') {
                                                        data = res.data;
                                                    }
                                                })
                                                .catch((err) => {
                                                    console.error(err);
                                                });
                                        }
                                    })
                                    .catch(_ => {
                                        toast.add({
                                            severity: 'error',
                                            detail: 'Error deleting order',
                                            life: 3000,
                                        })
                                    })
                                },
                            })
                }"
                >
                    Hủy đơn hàng
                </button>
                <button class="product-detail-btn-ok" @click="isDetail = false">Ok</button>
            </template>
        </Dialog>
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
                                    <p
                                        class="price-item-order detail-item"
                                        @click="
                                            () => {
                                                isDetail = true;
                                                dataDetail = item;
                                            }
                                        "
                                    >
                                        Xem chi tiết
                                    </p>
                                    <p class="price-item-order">
                                        Trạng thái: {{ getNameFromStatus(item.orders_status) }}
                                    </p>
                                    <div class="status-order-item">
                                        <ButtonView :disabled="item.orders_status !== 'shipping'" small="true">
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
                            <p
                                class="price-item-order detail-item"
                                @click="
                                    () => {
                                        isDetail = true;
                                        dataDetail = item;
                                    }
                                "
                            >
                                Xem chi tiết
                            </p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView small="true"> Đã nhận được hàng </ButtonView>
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
                            <p
                                class="price-item-order detail-item"
                                @click="
                                    () => {
                                        isDetail = true;
                                        dataDetail = item;
                                    }
                                "
                            >
                                Xem chi tiết
                            </p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView small="true"> Đã nhận được hàng </ButtonView>
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
                            <p
                                class="price-item-order detail-item"
                                @click="
                                    () => {
                                        isDetail = true;
                                        dataDetail = item;
                                    }
                                "
                            >
                                Xem chi tiết
                            </p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView :disabled="true" small="true"> Đã hủy </ButtonView>
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
                            <p
                                class="price-item-order detail-item"
                                @click="
                                    () => {
                                        isDetail = true;
                                        dataDetail = item;
                                    }
                                "
                            >
                                Xem chi tiết
                            </p>
                            <p class="price-item-order">Trạng thái: {{ getNameFromStatus(item.orders_status) }}</p>
                            <div class="status-order-item">
                                <ButtonView small="true"> Hoàn tiền </ButtonView>
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

.order-product-detail {
    .line-detail-product {
        height: 1px;
        background-color: #d7d7d7;
        margin: 12px 0;
        width: 100%;
    }

    .container-detail-product {
        p {
            font-size: 1.4rem;
            color: #333;
            margin: 4px 0;
        }

        .preview-product-detail {
            display: flex;
            margin: 12px 0;
            width: 350px;
            height: 260px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
            }
        }
    }
}

.product-detail-btn-ok,
.product-detail-btn-cancel {
    border: none;
    padding: 10px 16px;
    font-size: 1.4rem;
    border-radius: 6px;
    cursor: pointer;
}

.product-detail-btn-cancel {
    background-color: #d7d7d7;
    color: #000;
}

.product-detail-btn-ok {
    background-color: #10b981;
    color: #fff;
}
</style>
