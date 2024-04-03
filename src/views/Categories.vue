<script setup lang="ts">
import { onMounted, ref, reactive, watch, computed } from 'vue';
import noCarts from '@/assets/images/no-cart.png';
import Loading from '@/components/Loading.vue';
import PrivateRoute from '@/components/PrivateRoute.vue';
import Discount from '@/assets/icons/Discount.vue';
import Voucher from '@/components/Voucher.vue';
import routesConfig from '@/config/routes';
import { useSession, itemsOrder } from '@/stores';
import { ApiService } from '@/axios/ApiService';
import type { TData, T_Cart, T_Categorys } from '@/model';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { formatVND } from '@/Helper';
import { useRouter } from 'vue-router';

const { infos } = useSession();
const router = useRouter();
const apiService = new ApiService();
const loading = ref<boolean>(false);
const checkAll = ref<boolean>(false);
const openVoucher = ref<boolean>(false);
const confirm = useConfirm();
const toast = useToast();
const { items, setData } = itemsOrder();
const data = reactive<{
    data: TData[];
}>({
    data: [],
});

onMounted(() => {
    document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});

onMounted(() => {
    loading.value = true;

    apiService.carts
        .getCartsByUserId(`${infos.user?.id}`, infos.user?.token ?? '')
        .then((res: T_Categorys) => {
            if (res.message === 'success') {
                console.log('data:', res.data);

                if (res.data.length > 0) {
                    const result = res.data.map((item: T_Cart) => ({
                        id: item.carts_product_id,
                        name: item.product_name,
                        color: item.product_color,
                        price: item.product_price ?? 'Không',
                        lastPrice: item.product_price * item.carts_quantity,
                        quantity: item.carts_quantity,
                        previewUrl: item.product_preview_url,
                        checked: false,
                    }));

                    data.data = result;
                    loading.value = false;
                }
            }
        })
        .catch((err) => console.error(err));
});

watch(data, () => {
    console.log('change');
    if (data.data.length > 0) {
        checkAll.value = data.data.every((item) => item.checked);
    }
});

watch(checkAll, () => {
    if (checkAll.value) {
        console.log('check all', data.data.length);
        setData(data.data);
    }
});

watch(items, () => {
    console.log('items', items.data.length);
});

const totalMoney = computed(() => {
    const dataChecked: TData[] = data.data.filter((item) => item.checked === true);

    if (dataChecked.length > 0) {
        const result = dataChecked.reduce((result, cur) => result + cur.lastPrice, 0);

        return {
            price: result,
            length: dataChecked.length,
        };
    }
});

const confirmOne = (value: TData) => {
    confirm.require({
        message: 'Bạn có chắc chắn muốn xóa không?',
        position: 'top',
        header: 'Xóa sản phẩm',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Hủy bỏ',
        icon: 'pi pi-exclamation-triangle',
        accept() {
            toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đã xóa thành công sản phẩm',
                life: 3000,
            });
            data.data = data.data.filter((item) => item.id !== value.id);
        },
    });
};

const confirmAll = () => {
    confirm.require({
        message: 'Bạn có chắc chắn muốn xóa tất cả sản phẩm không?',
        position: 'top',
        header: 'Xóa sản phẩm',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Hủy bỏ',
        icon: 'pi pi-exclamation-triangle',
        accept() {
            if (checkAll.value) {
                data.data = [];
                toast.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Đã xóa thành công',
                    life: 3000,
                });
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Vui lòng chọn sản phẩm cần xóa!',
                    life: 3000,
                });
            }
        },
    });
};

const handleCloseVoucher = () => {
    openVoucher.value = false;
};

const handleChecked = (value: TData) => {
    if (value.checked) {
        setData(items.data.filter((item) => item.id !== value.id));
    } else {
        setData([...items.data, value]);
    }

    const index = data.data.findIndex((item) => item.id === value.id);

    const dataChanged = [...data.data];
    dataChanged[index] = {
        ...dataChanged[index],
        checked: !data.data[index].checked,
    };

    data.data = dataChanged;
};

const handeSelectAll = () => {
    if (checkAll.value) {
        console.log('ao ma');
        setData([]);
    }
    checkAll.value = !checkAll.value;
    const dataChecked = data.data.map((item) => ({
        ...item,
        checked: checkAll.value ? true : false,
    }));

    data.data = dataChecked;
};

const handleIncrementQuantity = (value: TData) => {
    const index = data.data.findIndex((item) => item.id === value.id);

    const dataChanged = [...data.data];
    dataChanged[index] = {
        ...data.data[index],
        quantity: ++data.data[index].quantity,
        lastPrice: data.data[index].quantity * data.data[index].price,
    };

    data.data = dataChanged;

    ///// update quantity orders
    if (items.data.length > 0) {
        const indexOrder = items.data.findIndex((item: any) => item.id === value.id);

        if (indexOrder !== -1) {
            const data = [...items.data];
            data[indexOrder] = {
                ...data[indexOrder],
                quantity: ++data[indexOrder].quantity,
            };

            setData(data);
        }
    }
};

const handleDownQuantity = (value: TData) => {
    ////// update quantity data
    const index = data.data.findIndex((item) => item.id === value.id);

    const dataChanged = [...data.data];
    dataChanged[index] = {
        ...dataChanged[index],
        quantity: --data.data[index].quantity <= 1 ? 1 : data.data[index].quantity,
        lastPrice:
            data.data[index].quantity <= 1
                ? data.data[index].price
                : data.data[index].quantity * data.data[index].price,
    };

    data.data = dataChanged;

    /// update quantity orders
    if (items.data.length > 0) {
        const indexOrder = items.data.findIndex((item: any) => item.id === value.id);

        if (indexOrder !== -1) {
            const data = [...items.data];
            data[indexOrder] = {
                ...data[indexOrder],
                quantity: --data[indexOrder].quantity <= 1 ? 1 : data[indexOrder].quantity,
            };

            setData(data);
        }
    }
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.categories">
        <div class="categories">
            <Voucher :open="openVoucher" :setOpen="handleCloseVoucher" />
            <div class="header-cate">
                <div class="info">
                    <div class="logo">
                        <h3 class="name-petshop">Petshop</h3>
                    </div>
                    <div class="line"></div>
                    <p class="cart-name">Giỏ hàng</p>
                </div>
                <RouterLink
                    :style="{
                        textDecoration: 'none',
                        color: '#333',
                    }"
                    :to="routesConfig.profile"
                >
                    <div class="user">
                        <div class="preview">
                            <img :src="infos.user?.avatar" alt="user" />
                        </div>
                        <h3 class="user-name">{{ infos.user?.name }}</h3>
                    </div>
                </RouterLink>
            </div>
            <div class="carts-list">
                <div class="wrapper-carts">
                    <Loading v-if="loading" />
                    <template v-else>
                        <template v-if="data.data.length > 0">
                            <div v-for="item in data.data" :key="item.id" class="cart-item">
                                <div class="input-product-wrap">
                                    <input
                                        :checked="item.checked"
                                        @change="() => handleChecked(item)"
                                        type="checkbox"
                                        name="check-cart"
                                    />
                                    <div class="info-item">
                                        <div class="preview-product">
                                            <img :src="item.previewUrl" alt="preview product" />
                                        </div>
                                        <div class="wrapper-info">
                                            <p class="name-item-cart">{{ item.name }}</p>
                                            <p class="color-product">Màu sắc: {{ item.color }}</p>
                                            <p class="item-price">{{ formatVND.format(item.price) }}</p>
                                            <div class="count-item">
                                                <p @click="() => handleDownQuantity(item)" class="p_1">-</p>
                                                <p class="p_2">{{ item.quantity }}</p>
                                                <p @click="() => handleIncrementQuantity(item)" class="p_3">+</p>
                                            </div>

                                            <p class="last-price">
                                                {{ formatVND.format(item.lastPrice) }}
                                            </p>
                                            <p @click="() => confirmOne(item)" class="remove-item">Xóa</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-else :style="{ padding: '32px 0' }">
                            <p>Giỏ hàng trống!!!</p>
                            <div class="preview-no-carts">
                                <img :src="noCarts" alt="no-carts" />
                            </div>
                        </div>
                    </template>
                </div>
                <div class="footer-cate">
                    <div class="voucher">
                        <div class="empty"></div>
                        <div class="info-voucher">
                            <div class="icon">
                                <Discount />
                                <span>Petshop Voucher</span>
                            </div>
                            <p @click="openVoucher = true" class="add-voucher">Chọn Hoặc Nhập Mã</p>
                        </div>
                    </div>
                    <div class="actions-footer">
                        <div class="all-remove">
                            <div class="select-all">
                                <input
                                    @change="handeSelectAll"
                                    :checked="checkAll"
                                    type="checkbox"
                                    name="remove-all"
                                    id="all-del"
                                />
                                <label htmlFor="all-del">Chọn Tất Cả ({{ data.data.length }})</label>
                            </div>
                            <p @click="confirmAll" class="deleted-all">Xóa</p>
                        </div>
                        <div class="buy-all">
                            <p class="total-buy">
                                Tổng thanh toán {{ ' ' }}
                                <span v-if="totalMoney?.length" class="total-count"
                                    >({{ totalMoney?.length }} sản phẩm)</span
                                >
                                <span>₫{{ formatVND.format(totalMoney?.price ?? 0) }}</span>
                            </p>
                            <button @click="router.push(routesConfig.orders)" class="btn-buy">Mua Hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Categories.scss';
</style>
