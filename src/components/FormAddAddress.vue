<script setup lang="ts">
import { ApiService } from '@/axios/ApiService';
import type { Address, TPostCreateAddress, TPostUpdateAddress } from '@/model';
import { useSession } from '@/stores';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref, watch } from 'vue';
import { socketContext } from '@/context/SocketContext';

type TForm = {
    name: string;
    phone: string;
    city: string;
    detail: string;
};

type _T_Props = {
    visible: boolean;
    data: Address | any;
    type: string;
};

const props = defineProps<_T_Props>();
const emit = defineEmits(['setIsVisible', 'setData', 'setType']);

const errors = reactive<
    | {
          name: boolean;
          phone: boolean;
          cityDetail: boolean;
          detail: boolean;
      }
    | any
>({
    name: false,
    phone: false,
    cityDetail: false,
    detail: false,
});

const name = ref<string>('');
const phone = ref<string>('');
const cityDetail = ref<string>('');
const detail = ref<string>('');
const typeAddress = ref<string>('home');

const toast = useToast();
const { infos } = useSession();
const apiService = new ApiService();

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
};

watch(props.data, () => {
    console.log('watching...');
    if (props.type === 'update') {
        name.value = props.data.data?.full_name as string;
        phone.value = props.data.data?.phone_number as string;
        cityDetail.value = props.data.data?.main_address as string;
        detail.value = props.data.data?.detail_address as string;
        typeAddress.value = props.data.data?.type as string;
    }
});

const handleSubmit = () => {
    if (props.type === 'add') {
        console.log('add...');

        const dataPost: TPostCreateAddress = {
            full_name: name.value,
            customer_id: infos.data.user?.id ?? 0,
            phone_number: phone.value,
            main_address: cityDetail.value,
            detail_address: detail.value,
            type: typeAddress.value,
        };
        apiService.address
            .createAddress(dataPost, infos.data.user?.token ?? '')
            .then((res) => {
                if (res.message === 'success') {
                    handleCloseForm();

                    toast.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Thêm thành công',
                        life: 3000,
                    });

                    socketContext.emit('create-address', {
                        id: infos.data.user?.id,
                        status: 'success',
                    });
                }
            })
            .catch((_) => {
                toast.add({
                    severity: 'error',
                    summary: 'Có lỗi',
                    detail: 'Xảy ra lỗi!!!',
                    life: 3000,
                });
            });
    } else if (props.type === 'update') {
        const dataPost: TPostUpdateAddress = {
            full_name: name.value,
            id: props.data.data?.id,
            phone_number: phone.value,
            main_address: cityDetail.value,
            detail_address: detail.value,
            type: typeAddress.value,
        };
        apiService.address
            .updateAddressById(infos.data.user?.id?.toString() ?? '', dataPost, infos.data.user?.token ?? '')
            .then((res) => {
                console.log(res);
                if (res.message === 'success') {
                    handleCloseForm();

                    toast.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Cập nhật thành công',
                        life: 3000,
                    });

                    socketContext.emit('update-address', {
                        id: infos.data.user?.id,
                        status: 'success',
                    });
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Có lỗi',
                        detail: 'Xảy ra lỗi!!!',
                        life: 3000,
                    });
                }
            })
            .catch((_) => {
                toast.add({
                    severity: 'error',
                    summary: 'Có lỗi',
                    detail: 'Xảy ra lỗi!!!',
                    life: 3000,
                });
            });
    }
};
const handleCloseForm = () => {
    name.value = '';
    phone.value = '';
    cityDetail.value = '';
    detail.value = '';

    emit('setIsVisible', false);
    emit('setData', {});
    emit('setType', '');
};
</script>

<template>
    <div
        class="mask"
        :style="{
            visibility: props.visible ? 'visible' : 'hidden',
        }"
    ></div>
    <div
        class="form-contents"
        :style="{
            transform: props.visible ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)',
        }"
    >
        <h3 class="heading-form-add">Thêm địa chỉ</h3>

        <div class="detail-card">
            <form
                @submit="(e) => {
                e.preventDefault()

                if (!name.trim()) {
                                handleError('name');
                            } else {
                                handleClearError('name');
                            }
                            if (!phone.trim()) {
                                handleError('phone');
                            } else {
                                handleClearError('phone');
                            }
                            if (!cityDetail.trim()) {
                                handleError('cityDetail');
                            } else {
                                handleClearError('cityDetail');
                            }
                            if (!detail.trim()) {
                                handleError('detail');
                            } else {
                                handleClearError('detail');
                            }
                            if((Object as any).entries(errors).every((item: any) => item[1] === false)) {
                                // hanleRegister()
                                console.log('CALL API')
                                handleSubmit()
                            }


            }"
                class="form-container"
            >
                <div class="form-wrapper">
                    <div class="form-item">
                        <label htmlFor="name">Họ Và Tên: </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name..."
                            v-model="name"
                            @input="
                                () => {
                                    handleClearError('name');
                                }
                            "
                        />
                        <p v-if="errors.name" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="phone">Số điện thoại: </label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="Your name..."
                            v-model="phone"
                            @input="
                                () => {
                                    handleClearError('phone');
                                }
                            "
                        />
                        <p v-if="errors.phone" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="city">Tỉnh/Thành Phố/, Quận/Huyện, Phường/Xã: </label>
                        <input
                            id="city"
                            type="text"
                            placeholder="Your name..."
                            v-model="cityDetail"
                            @input="
                                () => {
                                    handleClearError('cityDetail');
                                }
                            "
                        />
                        <p v-if="errors.cityDetail" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="detail">Địa chỉ cụ thể: </label>
                        <input
                            id="detail"
                            type="text"
                            placeholder="Your name..."
                            v-model="detail"
                            @input="
                                () => {
                                    handleClearError('detail');
                                }
                            "
                        />
                        <p v-if="errors.detail" class="error-field">This field is required!</p>
                    </div>
                </div>

                <div class="type-address">
                    <h3 class="type-address-heading">Loại địa chỉ</h3>
                    <div class="type-item">
                        <button
                            type="button"
                            @click="typeAddress = 'home'"
                            :style="{
                                borderColor: typeAddress === 'home' ? 'blue' : '#d7d7d7',
                            }"
                        >
                            Nhà Riêng
                        </button>
                        <button
                            type="button"
                            @click="typeAddress = 'office'"
                            :style="{
                                borderColor: typeAddress === 'office' ? 'blue' : '#d7d7d7',
                            }"
                        >
                            Văn Phòng
                        </button>
                    </div>
                    <div class="add-default-type">
                        <input type="checkbox" id="address-type" />
                        <label htmlFor="address-type">Đặt làm địa chỉ mặc định</label>
                    </div>
                </div>
                <div class="form-submit">
                    <button @click="handleCloseForm" type="button" class="btn-back">Trở lại</button>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileAddress.module.scss';
</style>
