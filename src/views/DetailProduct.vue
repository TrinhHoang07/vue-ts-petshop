<script lang="ts" setup>
import { ref, onMounted, watch, reactive } from 'vue';
import Galleria from 'primevue/galleria';
import { formatVND, getNameFromType } from '@/Helper';
import Rating from 'primevue/rating';
import SuggestProducts from '@/components/SuggestProducts.vue';
import NavBarNewsPage from '@/components/NavBarNewsPage.vue';
import Loading from '@/components/Loading.vue';
import Similar from '@/components/Similar.vue';
import { useSession } from '@/stores';
import { socketContext, stateEvents } from '@/context/SocketContext';
import { ApiService } from '@/axios/ApiService';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import type { T_AddCart, T_Detail, T_Product } from '@/model';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
const data = ref<
    {
        id: number;
        url: string;
        thumb: string;
        alt: string;
    }[]
>([]);

const values = reactive<{
    data: T_Product | any;
}>({
    data: {},
});

const route = useRoute();

onMounted(() => {
    document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });

    apiService.products
        .getProduct(`${route.params.id}`)
        .then((res: T_Detail) => {
            if (res.message === 'success') {
                values.data = res.data;
            }
        })
        .catch((err) => console.error(err));
});

watch(values, () => {
    data.value = [];
    data.value.push({
        id: 1,
        alt: 'image' + values.data.quantity,
        thumb: values.data.preview_url,
        url: values.data.preview_url,
    });
    data.value.push({
        id: 2,
        alt: 'image' + values.data.quantity,
        thumb: values.data.preview_url,
        url: values.data.preview_url,
    });
    data.value.push({
        id: 3,
        alt: 'image' + values.data.quantity,
        thumb: values.data.preview_url,
        url: values.data.preview_url,
    });
});

watch(route, () => {
    apiService.products
        .getProduct(`${route.params.id}`)
        .then((res: T_Detail) => {
            if (res.message === 'success') {
                values.data = res.data;
            }
        })
        .catch((err) => console.error(err));

    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});

const quantity = ref<number>(1);
const { infos } = useSession();
const apiService = new ApiService();
const toast = useToast();

const handleAddToCart = () => {
    if (infos.data.isAuth) {
        apiService.carts
            .addToCart(
                {
                    product_id: values.data?.id ?? 0,
                    customer_id: infos.data.user?.id ?? 0,
                    quantity: quantity.value,
                },
                infos.data.user?.token ?? '',
            )
            .then((res: T_AddCart) => {
                if (res.message === 'success') {
                    console.log('event: ', stateEvents.connected);
                    if (stateEvents.connected) {
                        socketContext.emit('add-to-cart', {
                            id: res.data.product_id,
                            status: 'success',
                        });
                    }

                    toast.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Thêm thành công',
                        life: 1500,
                    });
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Có lỗi',
                        detail: 'Sản phẩm này đã tồn tại trong giỏ hàng!',
                        life: 1500,
                    });
                }
            })
            .catch((err) => console.error(err));
    } else {
        toast.add({
            severity: 'error',
            summary: 'Có lỗi',
            detail: 'Bạn chưa đăng nhập, vui lòng đăng nhập để mua hàng!',
            life: 1500,
        });
    }
};
</script>

<template>
    <div class="layout-detail-product">
        <div v-if="values.data" class="contents">
            <div class="nav-bar">
                <SuggestProducts />
                <NavBarNewsPage />
            </div>
            <div class="detail">
                <div class="detail-wrapper">
                    <div class="slider">
                        <Galleria :value="data" containerStyle="max-width: 640px">
                            <template #item="slotProps">
                                <img :src="slotProps.item.url" :alt="slotProps.item.alt" style="width: 100%" />
                            </template>
                            <template #thumbnail="slotProps">
                                <img
                                    :src="slotProps.item.thumb"
                                    :alt="slotProps.item.alt"
                                    :style="{ width: '64px', height: '64px' }"
                                />
                            </template>
                        </Galleria>
                    </div>
                    <div class="info">
                        <div class="info-header">
                            <h5 class="title"><span>TRANG CHỦ /</span> {{ getNameFromType(values.data.type) }}</h5>
                            <h3 class="name-pro">{{ values.data.name }}</h3>
                        </div>
                        <span class="line"></span>
                        <div class="info-content">
                            <p class="price">{{ formatVND.format(values.data.price) }}</p>
                            <p class="description">{{ values.data.description }}</p>
                        </div>
                        <div class="info-actions">
                            <div class="count">
                                <p @click="quantity <= 1 ? 1 : --quantity" class="p_1">-</p>
                                <p class="p_2">{{ quantity }}</p>
                                <p @click="++quantity" class="p_3">+</p>
                            </div>
                            <div class="add-to-cart">
                                <button @click="handleAddToCart">THÊM VÀO GIỎ</button>
                            </div>
                        </div>
                        <div class="line-hint"></div>
                        <p class="note">Danh mục: {{ getNameFromType(values.data.type) }}</p>
                    </div>
                </div>

                <div class="spacer-w"></div>
                <div class="tab-view">
                    <TabView>
                        <TabPanel header="MÔ TẢ">
                            <div class="wrapper-tab-sub-description" v-html="values.data.sub_description"></div>
                        </TabPanel>
                        <TabPanel header="ĐÁNH GIÁ">
                            <div class="header-rate">
                                <h3 class="tab-view-rate-heading">Đánh giá</h3>
                                <p class="sub-heading-rate">Chưa có đánh giá nào!</p>
                            </div>
                            <div class="container-form-rate">
                                <h2 class="form-heading-rate">
                                    Hãy là người đầu tiên nhận xét “{{ values.data.name }}”{{ ' ' }}
                                </h2>
                                <form action="">
                                    <div :style="{ paddingTop: '12px' }">
                                        <p :style="{ fontSize: '15px', marginBottom: '4px' }">Đánh giá của bạn</p>
                                        <Rating :cancel="false" />
                                    </div>
                                    <div :style="{ paddingTop: '12px' }">
                                        <p :style="{ fontSize: '15px', marginBottom: '4px' }">Nhận xét của bạn: ""</p>
                                        <textarea
                                            name="des"
                                            id="des"
                                            :style="{
                                                width: '100%',
                                                height: 96,
                                                border: '1px solid #d7d7d7',
                                                outline: 'none',
                                                padding: '8px 8px 8px 12px',
                                                borderRadius: '4px',
                                            }"
                                        ></textarea>
                                    </div>
                                    <div class="form-item">
                                        <label htmlFor="name">Tên của bạn: </label>
                                        <input id="name" type="text" placeholder="Your name..." />
                                    </div>
                                    <div class="form-item">
                                        <label htmlFor="email">Email: </label>
                                        <input id="email" type="text" placeholder="Email..." />
                                    </div>
                                    <button class="submit-rate" type="submit">GỬI ĐI</button>
                                </form>
                            </div>
                        </TabPanel>
                        <TabPanel header="CHÍNH SÁCH BẢO HÀNH">
                            <p class="description-tab-view">Chính sách bảo hành của riêng mỗi hãng:</p>
                            <p class="description-tab-view">CASIO: Bảo hành chính hãng máy 1 năm, pin 1,5 năm</p>
                            <p class="description-tab-view">
                                CITIZEN: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm
                            </p>
                            <p class="description-tab-view">SEIKO: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm</p>
                            <p class="description-tab-view">
                                ORIENT: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm
                            </p>
                            <p class="description-tab-view">OP: Bảo hành chính hãng máy 2 năm, pin 1 năm</p>
                            <p class="description-tab-view">RHYTHM: Bảo hành chính hãng máy 1 năm, pin 1 năm</p>
                            <p class="description-tab-view">OGIVAL: Bảo hành chính hãng máy 2 năm, pin 1 năm</p>
                            <p class="description-tab-view">ELLE: Bảo hành chính hãng máy 2 năm, pin 2 năm</p>
                            <p class="description-tab-view">TISSOT: Bảo hành chính hãng máy 2 năm, pin 1 năm</p>
                        </TabPanel>
                    </TabView>
                </div>
                <div :style="{ padding: '0 16px' }">
                    <h6 class="heading-menu-similar">SẢN PHẨM TƯƠNG TỰ</h6>
                    <Similar />
                </div>
            </div>
        </div>
        <Loading v-else />
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/DetailProduct.scss';
</style>
