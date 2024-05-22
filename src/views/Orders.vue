<script lang="ts" setup>
import { itemsOrder, useSession } from '@/stores';
import image from '@/assets/images/success-pay.png';
import imagefail from '@/assets/images/fail-pay.png';
import AddressScreen from '../components/AddressScreen.vue';
import PaymentScreen from '../components/PaymentScreen.vue';
import ButtonView from '@/components/ButtonView.vue';
import routesConfig from '@/config/routes';
import Location from '@/assets/icons/Location.vue';
import RiCoupon3Fill from '@/assets/icons/RiCoupon3Fill.vue';
import Dollars from '@/assets/icons/Dollars.vue';
import Coupons from '@/assets/icons/Coupons.vue';
import BillDetail from '@/assets/icons/BillDetail.vue';
import { formatVND } from '@/Helper';
import { useToast } from 'primevue/usetoast';
import { ApiService } from '@/axios/ApiService';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { Address, T_AddOrder, T_Payment, T_ProfileAddress } from '@/model';
import { useRouter } from 'vue-router';
import PrivateRoute from '@/components/PrivateRoute.vue';

const { items, setData } = itemsOrder();
const router = useRouter();
const timer = ref<any>();
const toast = useToast();
const apiService = new ApiService();
const { infos } = useSession();
const isChangeAddress = ref<boolean>(false);
const isChangePayment = ref<boolean>(false);
const statePay = ref<string>('');
const voucher = ref<{
    ship: number;
    shop: number;
}>({
    ship: 0,
    shop: 100000,
});
const addresses = ref<Address[]>([]);
const addressChoose = ref<Address>();
const paymentChoose = ref<{
    id: number;
    method: string;
    content: string;
}>({
    id: 1,
    method: 'CASH',
    content: 'Tiền mặt',
});

onMounted(() => {
    document.title = 'Mua sắm | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });

    apiService.address
        .getAddressesById((infos.data.user?.id as number).toString(), infos.data.user?.token ?? '')
        .then((res: T_ProfileAddress) => {
            if (res.message === 'success') {
                addresses.value = res.data;

                if (res.data.length > 0) {
                    addressChoose.value = res.data[0];
                }
            }
        })
        .catch((err) => console.error(err));
});

onUnmounted(() => {
    setData([]);
});

const totalMoney = computed(() => {
    if (items.data.length > 0) {
        const result = items.data.reduce((result, cur) => result + cur.lastPrice, 0);

        return {
            price: result,
            length: items.data.length,
        };
    }
});

const totalPay = computed(() => {
    if (totalMoney.value?.price) {
        return (
            totalMoney.value.price -
            totalMoney.value.length * voucher.value.ship -
            totalMoney.value.length * voucher.value.shop
        );
    }

    return 0;
});

onMounted(() => {
    if (items.data.length <= 0) {
        router.push(routesConfig.categories);
    }
});

const handleGetPaymentById = (res: { url: string; id: number }, id_original?: number[]) => {
    apiService.payments
        .getPaymentById(`${res.id}`, infos.data.user?.token ?? '')
        .then((res: T_Payment) => {
            if (res.message === 'success' && res.data.state === '00') {
                statePay.value = 'success';
                toast.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Thanh toán thành công!',
                    life: 4500,
                });
                clearInterval(timer.value);
            } else if (res.message === 'success' && res.data.state === '03') {
                statePay.value = 'error';
                if (id_original) {
                    handleDeleteOrder(id_original);
                }
                toast.add({
                    severity: 'error',
                    summary: 'Có lỗi',
                    detail: 'Thanh toán thất bại!',
                    life: 4500,
                });
                clearInterval(timer.value);
            } else if (res.message === 'success' && res.data.state === '97') {
                statePay.value = 'checksumfail';
                if (id_original) {
                    handleDeleteOrder(id_original);
                }
                toast.add({
                    severity: 'error',
                    summary: 'Có lỗi',
                    detail: 'Thanh toán thất bại, chữ ký không hợp lệ!',
                    life: 4500,
                });
                clearInterval(timer.value);
            }
        })
        .catch((_) => {
            statePay.value = 'error';
        });
};

const handleDeleteFromCart = (id: number[]) => {
    if (id.length > 0) {
        id.forEach((id) => {
            apiService.carts
                .deleteFromCart(`${id}`, infos.data.user.token ?? '')
                .then((res: { message: string; statusCode: number }) => {
                    if (res.message === 'success') {
                        //////////////////
                        console.log('da xoa thanh cong san pham da mua trong gio hang');
                    }
                })
                .catch((err) => console.error(err));
        });
    }
};

const handleDeleteOrder = (id: number[]) => {
    console.log(id);
    if (id.length > 0) {
        id.forEach((id) => {
            apiService.orders
                .deleteOrderById(`${id}`, infos.data.user.token ?? '')
                .then((res: { message: string; statusCode: number }) => {
                    if (res.message === 'success') {
                        //////////////////
                        console.log('da xoa thanh cong san pham da mua error');
                    }
                })
                .catch((err) => console.error(err));
        });
    }
};

const handleOrders = () => {
    if (items.data.length > 0) {
        statePay.value = 'paying';

        const dataPosts = items.data.map((item) => ({
            customer_id: infos.data.user.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
        }));

        const idsDeleteCart = items.data.map((item) => item.id_original);

        console.log('orders: ', dataPosts);
        console.log('payment' + paymentChoose.value.method);

        if (paymentChoose.value.method === 'CASH') {
            apiService.orders.addOrder(dataPosts, infos.data.user.token ?? '').then((res: T_AddOrder) => {
                if (res.message === 'success') {
                    statePay.value = 'success';
                    handleDeleteFromCart(idsDeleteCart);
                }
            });
        } else {
            apiService.orders
                .addOrder(dataPosts, infos.data.user?.token ?? '')
                .then((resContainer: T_AddOrder) => {
                    if (resContainer.message === 'success') {
                        handleDeleteFromCart(idsDeleteCart);

                        return apiService.payments
                            .addPayment(
                                {
                                    state: '99',
                                    order_id: resContainer.data[0].id,
                                },
                                infos.data.user?.token ?? '',
                            )
                            .then((res: T_Payment) => {
                                if (res.message === 'success') {
                                    return {
                                        res,
                                        original_id: resContainer.data.map((item) => item.id),
                                    };
                                }
                            })

                            .catch((err) => console.error(err));
                    }
                })
                .then((resContainer) => {
                    return apiService.payments
                        .createVNPAY(
                            {
                                amount: 1000000,
                                pay_id: resContainer?.res?.data.id,
                                // bankCode: 'VNPAYQR',
                                orderInfo: 'Test thanh toan VN PAY QR',
                            },
                            infos.data.user?.token ?? '',
                        )
                        .then((res: { url: string; id: number }) => {
                            if (res.url) {
                                window.open(res.url);

                                timer.value = setInterval(() => {
                                    handleGetPaymentById(res, resContainer?.original_id);
                                }, 1500);
                            }
                        })
                        .catch((err) => {
                            console.log('error VNPAY: ' + err);
                        });
                })
                .catch((err) => {
                    console.error(err);
                    toast.add({
                        severity: 'error',
                        summary: 'Thất bại',
                        detail: 'Đã xảy ra lỗi, vui lòng thử lại!',
                        life: 3000,
                    });
                });
        }
    } else {
        toast.add({
            severity: 'error',
            summary: 'Có lỗi',
            detail: 'Vui lòng chọn sản phẩm cần mua!',
            life: 3000,
        });
    }
};

const setIsChangeAddress = (data: boolean) => {
    isChangeAddress.value = data;
};

const setIsChangePayment = (data: boolean) => {
    isChangePayment.value = data;
};

const setAddressChoose = (data: Address) => {
    addressChoose.value = data;
};

const setPaymentChoose = (data: { id: number; method: string; content: string }) => {
    paymentChoose.value = data;
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.orders">
        <div class="orders">
            <AddressScreen
                :data="addresses"
                :open="isChangeAddress"
                :setOpen="setIsChangeAddress"
                :setChoose="setAddressChoose"
                :choose="addressChoose"
            />

            <PaymentScreen
                :open="isChangePayment"
                :setOpen="setIsChangePayment"
                :setChoose="setPaymentChoose"
                :choose="paymentChoose"
            />

            <div v-if="!!statePay" class="fixed-payment">
                <div class="wrapper-payment">
                    <span
                        v-if="statePay !== 'success' && statePay !== 'error' && statePay !== 'checksumfail'"
                        class="loader"
                    ></span>
                    <div class="image-pay-success">
                        <img v-if="statePay === 'success'" :src="image" alt="success image" />
                        <img v-if="statePay === 'error'" :src="imagefail" alt="fail image" />
                    </div>
                    <p>
                        {{
                            statePay === 'success'
                                ? 'Thanh toán thành công'
                                : statePay === 'error'
                                ? 'Thanh toán thất bại'
                                : statePay === 'checksumfail'
                                ? 'Thanh toán thất bại, chữ ký không hợp lệ'
                                : 'Đang tiến hành thanh toán...'
                        }}
                    </p>
                    <div class="group-button-pay">
                        <template v-if="statePay === 'success'">
                            <ButtonView :to="routesConfig.profile_buy">Đến đơn mua</ButtonView>
                            <ButtonView :to="routesConfig.home">Về trang chủ</ButtonView>
                        </template>
                        <ButtonView v-if="statePay === 'error'" :to="routesConfig.categories"
                            >Quay lại giỏ hàng</ButtonView
                        >
                    </div>
                </div>
            </div>
            <div class="address">
                <div class="heading">
                    <span>
                        <Location />
                    </span>
                    <div class="detail-info">
                        <h5 :style="{ fontWeight: 'bold' }">Địa chỉ nhận hàng</h5>
                        <div v-if="addresses.length > 0" class="detail-info">
                            <h5 :style="{ margin: '4px 0' }">
                                {{ addressChoose?.full_name }} | {{ addressChoose?.phone_number }}
                            </h5>
                            <p>{{ addressChoose?.detail_address }}, {{ addressChoose?.main_address }}</p>
                        </div>
                        <div v-else class="detail-info">
                            <p>Bạn chưa có địa chỉ, vui lòng thêm địa chỉ!</p>
                        </div>
                    </div>
                </div>
                <ButtonView v-if="addresses.length > 0" @click="isChangeAddress = true" medium="true">
                    Thay đổi địa chỉ
                </ButtonView>
                <ButtonView v-else :to="routesConfig.profile_address" medium="true"> Thêm địa chỉ </ButtonView>
            </div>
            <div class="products">
                <h3 class="heading">TrinhHoang Shop</h3>
                <div class="product-container">
                    <div v-if="items.data.length > 0" v-for="item in items.data" :key="item.id" class="product-item">
                        <div class="preview-product">
                            <img :src="item.previewUrl" :alt="item.name" />
                        </div>
                        <div class="info-product">
                            <h3>{{ item.name }}</h3>
                            <p>Phân loại: {{ item.color ?? 'Không có' }}</p>
                            <p>Số lượng: x{{ item.quantity }}</p>
                            <p>Giá : {{ formatVND.format(item.price) }}</p>
                            <p>Thành tiền : {{ formatVND.format(item.lastPrice) }}</p>
                        </div>
                    </div>
                </div>
                <div class="voucher-shop">
                    <div class="heading">
                        <span>
                            <RiCoupon3Fill />
                        </span>
                        <p>Voucher của Shop</p>
                    </div>
                    <p class="select-voucher">Chọn hoặc nhập mã</p>
                </div>
            </div>
            <div class="shippp">
                <h3>Phương thức vận chuyển (Có thể thay đổi)</h3>
                <div class="info-ship">
                    <div>
                        <h5>Phương thức vận chuyển: Nhanh</h5>
                        <p>Nhận hàng vào 22/2 - 25/2</p>
                        <p :style="{ color: 'orange' }">Option áp mã vận chuyển</p>
                    </div>
                    <p :style="{ color: '#000' }">Phí giao hàng: {{ formatVND.format(voucher.ship) }}</p>
                    <ButtonView small="true">Thay đổi</ButtonView>
                </div>
            </div>
            <div class="total-money">
                <h3>Tống số tiền ({{ totalMoney?.length }} sản phẩm):</h3>
                <p>{{ formatVND.format(totalMoney?.price ?? 0) }}</p>
            </div>
            <div class="voucher-shop">
                <div class="heading">
                    <span>
                        <Coupons />
                    </span>
                    <p>Voucher của shop</p>
                </div>
                <p class="select-voucher">Chọn hoặc nhập mã</p>
            </div>
            <div class="voucher-shop">
                <div class="heading">
                    <span>
                        <Dollars />
                    </span>
                    <p>Phương thức thanh toán</p>
                </div>
                <div :style="{ display: 'flex', alignItems: 'center' }">
                    <p
                        :style="{ color: 'orange', marginRight: '12px' }"
                        class="select-voucher"
                        @click="isChangePayment = true"
                    >
                        {{ paymentChoose.content }}
                    </p>
                    <ButtonView small="true" @click="isChangePayment = true">Thay đổi</ButtonView>
                </div>
            </div>
            <div class="details-payments">
                <div class="heading-pay">
                    <span>
                        <BillDetail />
                    </span>
                    <p>Chi tiết thanh toán</p>
                </div>
                <div class="contents">
                    <div class="item-pay">
                        <p>Tổng tiền hàng</p>
                        <p>{{ formatVND.format(totalMoney?.price ?? 0) }}</p>
                    </div>
                    <div class="item-pay">
                        <p>Giảm giá của Shop</p>
                        <p>{{ formatVND.format((totalMoney?.length ?? 1) * voucher.shop) }}</p>
                    </div>
                    <div class="item-pay">
                        <p>Tổng tiền phí vận chuyển</p>
                        <p>{{ formatVND.format(voucher.ship) }}</p>
                    </div>
                    <div class="item-pay">
                        <p>Giảm giá phí vận chuyển</p>
                        <p>{{ formatVND.format(voucher.ship) }}</p>
                    </div>
                    <div class="item-total">
                        <p>Tổng thanh toán</p>
                        <p>{{ formatVND.format(totalPay) }}</p>
                    </div>
                </div>
            </div>
            <div class="buy-submit">
                <div class="buys-container">
                    <div class="info-total">
                        <p>Tổng thanh toán</p>
                        <h6>{{ formatVND.format(totalPay) }}</h6>
                    </div>
                    <button @click="handleOrders">{{ !!statePay ? 'Đang thanh toán...' : 'Đặt hàng' }}</button>
                </div>
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Orders.scss';
</style>
