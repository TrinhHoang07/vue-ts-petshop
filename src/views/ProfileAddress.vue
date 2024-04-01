<script setup lang="ts">
import { ApiService } from '@/axios/ApiService';
import FormAddAddress from '@/components/FormAddAddress.vue';
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import { useToast } from 'primevue/usetoast';
import { ref, reactive, onMounted } from 'vue';
import { socketContext } from '@/context/SocketContext';
import { isMenuMobile, useSession } from '@/stores';
import type { Address, T_ProfileAddress } from '@/model';
import { useConfirm } from 'primevue/useconfirm';
import HiMenu from '@/assets/icons/HiMenu.vue';
import AddIcon from '@/assets/icons/AddIcon.vue';

const visible = ref<boolean>(false);
const typeAction = ref<string>('');
const apiService = new ApiService();
const toast = useToast();
const confirm = useConfirm();
const { setIsMenu } = isMenuMobile();
const { infos } = useSession();
const dataAddress = reactive<{
    data: Address | any;
}>({
    data: {},
});
const addresses = reactive<{
    data: Address[];
}>({
    data: [],
});

onMounted(() => {
    if (infos.isAuth) {
        apiService.address
            .getAddressesById(infos.user?.id?.toString() ?? '', infos.user?.token ?? '')
            .then((res: T_ProfileAddress) => {
                if (res.message === 'success') {
                    addresses.data = res.data;
                }
            })
            .catch((err) => console.error(err));
    }
});

onMounted(() => {
    if (socketContext) {
        socketContext.on('connect', () => {
            socketContext?.on('create-address-give', (_) => {
                console.log('listening on ' + socketContext);
                if (infos.isAuth) {
                    apiService.address
                        .getAddressesById(infos.user?.id?.toString() ?? '', infos.user?.token ?? '')
                        .then((res: T_ProfileAddress) => {
                            if (res.message === 'success') {
                                console.log('addresses' + res.data.length);
                                addresses.data = res.data;
                            }
                        })
                        .catch((err) => console.error(err));
                }
            });

            socketContext?.on('update-address-give', (_) => {
                if (infos.isAuth) {
                    apiService.address
                        .getAddressesById(infos.user?.id?.toString() ?? '', infos.user?.token ?? '')
                        .then((res: T_ProfileAddress) => {
                            if (res.message === 'success') {
                                addresses.data = res.data;
                            }
                        })
                        .catch((err) => console.error(err));
                }
            });
        });

        socketContext.on('disconnect', () => {
            console.log('id disconnected: ', socketContext?.id);
        });
    }
});

const confirmHandle = (value: string) => {
    confirm.require({
        message: 'Bạn có chắc chắn muốn xóa không?',
        position: 'top',
        header: 'Xóa sản phẩm',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Hủy bỏ',
        icon: 'pi pi-exclamation-triangle',
        accept() {
            apiService.address
                .deleteAddressById(value, infos.user?.token ?? '')
                .then((res: { message: string; statusCode: number }) => {
                    if (res.message === 'success') {
                        toast.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Đã xóa thành công',
                            life: 3000,
                        });

                        apiService.address
                            .getAddressesById(infos.user?.id?.toString() ?? '', infos.user?.token ?? '')
                            .then((res: T_ProfileAddress) => {
                                if (res.message === 'success') {
                                    addresses.data = res.data;
                                }
                            })
                            .catch((err) => console.error(err));
                    } else {
                        toast.add({
                            severity: 'error',
                            summary: 'Có lỗi',
                            detail: 'Xảy ra lỗi!!!',
                            life: 3000,
                        });
                    }
                });

            // setData((prev) => prev.filter((item) => item.id !== value.id));
        },
    });
};

const setVisible = (data: boolean) => {
    visible.value = data;
};

const setDataAddress = (data: any) => {
    dataAddress.data = data;
};

const setTypeAction = (data: string) => {
    typeAction.value = data;
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile>
            <div class="profile-address">
                <div class="my-address">
                    <FormAddAddress
                        :visible="visible"
                        @setIsVisible="setVisible"
                        :data="dataAddress"
                        @setData="setDataAddress"
                        :type="typeAction"
                        @setType="setTypeAction"
                    />
                    <div class="header-address">
                        <p class="heading">
                            <span @click="() => setIsMenu(true)" class="back-btn-profile">
                                <HiMenu />
                            </span>
                            <span>Địa Chỉ Của Tôi</span>
                        </p>
                        <p
                            @click="
                                typeAction = 'add';
                                visible = true;
                            "
                            class="btn-credit"
                        >
                            <AddIcon />
                            Thêm Địa Chỉ Mới
                        </p>
                        <p
                            @click="
                                typeAction = 'add';
                                visible = true;
                            "
                            class="btn-credit-mobile"
                        >
                            <AddIcon />
                            Thêm
                        </p>
                    </div>
                    <div class="contents">
                        <div v-if="addresses.data.length > 0" class="address-item">
                            <h5>Địa chỉ</h5>
                            <div v-for="item in addresses.data" class="wrapper-item-addr" :key="item.id">
                                <div class="infos">
                                    <h3>
                                        {{ item.full_name }} | <span>(+84) {{ item.phone_number.slice(1) }}</span>
                                    </h3>
                                    <p>{{ item.detail_address }}</p>
                                    <p>{{ item.main_address }}</p>
                                    <button>Mặc định</button>
                                </div>
                                <div class="actions">
                                    <p
                                        @click="
                                            typeAction = 'update';
                                            dataAddress.data = item;
                                            visible = true;
                                        "
                                    >
                                        Cập nhật
                                    </p>
                                    <p @click="() => confirmHandle(item.id.toString())">Xóa</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="wrapper-icon-empty">
                            <div class="address-icon">
                                <AddressIcon />
                                <p>Bạn chưa có địa chỉ!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileAddress.module.scss';
</style>
