<script setup lang="ts">
import HiMenu from '@/assets/icons/HiMenu.vue';
import { ApiService } from '@/axios/ApiService';
import ButtonView from '@/components/ButtonView.vue';
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import { App } from '@/const/App';
import LayoutProfile from '@/layout/LayoutProfile.vue';
import type { T_CustomerUpdate } from '@/model';
import { isMenuMobile, useSession } from '@/stores';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

type _T_Data = {
    day?: {
        day?: string;
    };
    month?: {
        month?: string;
    };
    year?: {
        year?: string;
    };
    name?: string;
    email?: string;
    phoneNumber?: string;
    gender?: string;
    avatar?: string;
};

const data = reactive<{
    data: _T_Data;
}>({
    data: {},
});
const { infos, setSessions } = useSession();
const { setIsMenu } = isMenuMobile();
const imageAvatar = ref<string>('');
const apiService = new ApiService();
const toast = useToast();
const router = useRouter();
const confirm = useConfirm();

const days = [
    { day: '01' },
    { day: '02' },
    { day: '03' },
    { day: '04' },
    { day: '05' },
    { day: '06' },
    { day: '07' },
    { day: '08' },
    { day: '09' },
    { day: '10' },
    { day: '11' },
    { day: '12' },
    { day: '13' },
    { day: '14' },
    { day: '15' },
    { day: '16' },
    { day: '17' },
    { day: '18' },
    { day: '19' },
    { day: '20' },
    { day: '21' },
    { day: '22' },
    { day: '23' },
    { day: '24' },
    { day: '25' },
    { day: '26' },
    { day: '27' },
    { day: '28' },
    { day: '29' },
    { day: '30' },
    { day: '31' },
];

const months = [
    { month: '01' },
    { month: '02' },
    { month: '03' },
    { month: '04' },
    { month: '05' },
    { month: '06' },
    { month: '07' },
    { month: '08' },
    { month: '09' },
    { month: ' 10' },
    { month: ' 11' },
    { month: ' 12' },
];

const years = [
    { year: '2023' },
    { year: '2022' },
    { year: '2021' },
    { year: '2020' },
    { year: '2019' },
    { year: '2018' },
    { year: '2017' },
    { year: '2016' },
    { year: '2015' },
    { year: '2014' },
    { year: '2013' },
    { year: '2012' },
    { year: '2011' },
    { year: '2010' },
    { year: '2009' },
    { year: '2008' },
    { year: '2007' },
    { year: '2006' },
    { year: '2005' },
    { year: '2004' },
    { year: '2003' },
    { year: '2002' },
    { year: '2001' },
    { year: '2000' },
    { year: '1999' },
    { year: '1998' },
    { year: '1997' },
    { year: '1996' },
    { year: '1995' },
    { year: '1994' },
    { year: '1993' },
];

onMounted(() => {
    document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});

onMounted(() => {
    if (infos.data.user) {
        data.data = {
            day: {
                day: infos.data.user.birthdate && infos.data.user.birthdate.split('/')[0],
            },
            month: {
                month: infos.data.user.birthdate && infos.data.user.birthdate.split('/')[1],
            },
            year: {
                year: infos.data.user.birthdate && infos.data.user.birthdate.split('/')[2],
            },
            email: infos.data.user.email,
            gender: infos.data.user.gender,
            name: infos.data.user.name,
            phoneNumber: infos.data.user.phone,
            avatar: infos.data.user.avatar,
        };
    }
});

onUnmounted(() => {
    imageAvatar.value && URL.revokeObjectURL(imageAvatar.value);
});

const handleLogout = () => {
    confirm.require({
        header: 'Đăng xuất',
        message: 'Bạn có chắc chắn muốn đăng xuất không?',
        acceptLabel: 'Dồng ý',
        rejectLabel: 'Hủy bỏ',
        accept: () => {
            setSessions(false, {});

            localStorage.removeItem('userDataHT');

            toast.add({
                severity: 'success',
                detail: 'Đăng xuất thành công!',
                life: 3000,
            });

            setTimeout(() => {
                router.push(routesConfig.home);
            }, 300);
        },
    });
};

const handleUpdateAvatar = (e: any) => {
    const files = e.target.files;

    if (files && files.length > 0) {
        const formData = new FormData();
        formData.append('file', files[0]);

        imageAvatar.value = URL.createObjectURL(files[0]);

        axios
            .post(`${App.URL_MAIN}customers/test/upload/${infos.data.user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res: any) => {
                if (res.data.message === 'success') {
                    const newInfos = {
                        ...infos,
                        user: {
                            ...infos.data.user,
                            id: infos.data.user.id ?? 0,
                            avatar: res.data.linkAvatar,
                        },
                    };

                    setSessions(infos.data.isAuth, newInfos as any);

                    toast.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Cập nhật avatar thành công!',
                        life: 2000,
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

const handleSubmit = () => {
    apiService.customer
        .updateCustomerById(
            `${infos.data.user.id}`,
            {
                phone_number: data.data.phoneNumber,
                gender: data.data.gender,
                birth_date: `${data.data.day?.day}/${data.data.month?.month}/${data.data.year?.year}`,
            },
            infos.data.user.token ?? '',
        )
        .then((res: T_CustomerUpdate) => {
            if (res.message === 'success') {
                setSessions(infos.data.isAuth, {
                    ...infos.data.user,
                    id: infos.data.user.id ?? 0,
                    name: res.data.name,
                    phone: res.data.phone_number,
                    birthdate: res.data.birth_date,
                    gender: res.data.gender,
                });

                toast.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Cập nhật thông tin thành công!',
                    life: 2000,
                });
            }
        })
        .catch(() => {
            toast.add({
                severity: 'error',
                summary: 'Có lỗi',
                detail: 'Xảy ra lỗi!!!',
                life: 3000,
            });
        });
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile :temporary-image="imageAvatar">
            <div class="profile">
                <div class="header-profile">
                    <div>
                        <h3 class="title">
                            <div class="profile-into-back">
                                <span @click="setIsMenu(true)" class="back-btn-profile">
                                    <HiMenu />
                                </span>
                                <span>Hồ Sơ Của Tôi</span>
                            </div>
                        </h3>
                        <p class="sub-title">Quản lý thông tin hồ sơ để bảo mật tài khoản của bạn</p>
                    </div>
                    <ButtonView medium="true" @click="handleLogout"> Đăng xuất </ButtonView>
                </div>
                <div class="contents">
                    <div class="form-profile">
                        <form class="form-container">
                            <div class="form-item">
                                <label htmlFor="name">Tên đăng nhập</label>
                                <input
                                    @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            name: e.target.value,
                                        }
                                    }"
                                    :value="data.data?.name ?? ''"
                                    type="text"
                                    id="name"
                                    placeholder="Aa..."
                                />
                            </div>
                            <div class="form-item">
                                <label htmlFor="mail">Email</label>
                                <input
                                    @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            email: e.target.value,
                                        }
                                    }"
                                    :value="data.data?.email ?? ''"
                                    type="text"
                                    id="mail"
                                    placeholder="Aa..."
                                />
                            </div>
                            <div class="form-item">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                    @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            phoneNumber: e.target.value,
                                        }
                                    }"
                                    :value="data.data?.phoneNumber ?? ''"
                                    type="text"
                                    id="phone"
                                    placeholder="Aa..."
                                />
                            </div>
                            <div class="form-item">
                                <span>Giới tính</span>
                                <div class="gender-container">
                                    <div class="gender-item">
                                        <input
                                            :checked="data.data?.gender?.toLocaleLowerCase() === 'male'"
                                            @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            gender: e.target.value,
                                        }
                                    }"
                                            type="radio"
                                            value="male"
                                            id="male"
                                            name="gender"
                                        />
                                        <label htmlFor="male">Nam</label>
                                    </div>
                                    <div class="gender-item">
                                        <input
                                            :checked="data?.data.gender?.toLowerCase() === 'female'"
                                            @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            gender: e.target.value,
                                        }
                                    }"
                                            value="female"
                                            type="radio"
                                            id="female"
                                            name="gender"
                                        />
                                        <label htmlFor="female">Nữ</label>
                                    </div>
                                    <div class="gender-item">
                                        <input
                                            :checked="data?.data.gender?.toLowerCase() === 'other'"
                                            @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            gender: e.target.value,
                                        }
                                    }"
                                            value="other"
                                            type="radio"
                                            id="other"
                                            name="gender"
                                        />
                                        <label htmlFor="other">Khác</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-item">
                                <span>Ngày sinh</span>
                                <div class="birth-container">
                                    <div class="birth-item">
                                        <Dropdown
                                            :modelValue="data?.data.day"
                                            @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            day: e.value,
                                        }
                                    }"
                                            :options="days"
                                            optionLabel="day"
                                            placeholder="Ngày"
                                            class="ll md:w-14rem"
                                        />
                                    </div>
                                    <div class="birth-item">
                                        <Dropdown
                                            :modelValue="data?.data.month"
                                            @change="(e: any) => {
                                                console.log(e)
                                        data.data = {
                                            ...data.data,
                                            month: e.value,
                                        }
                                    }"
                                            :options="months"
                                            optionLabel="month"
                                            placeholder="Tháng"
                                            class="ll md:w-14rem"
                                        />
                                    </div>
                                    <div class="birth-item">
                                        <Dropdown
                                            :modelValue="data?.data.year"
                                            @change="(e: any) => {
                                        data.data = {
                                            ...data.data,
                                            year: e.value,
                                        }
                                    }"
                                            :options="years"
                                            optionLabel="year"
                                            placeholder="Năm"
                                            class="ll md:w-14rem"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="btn-save">
                                <button @click="handleSubmit" type="button">Lưu</button>
                            </div>
                        </form>
                    </div>
                    <div class="preview-avatar">
                        <div class="prev-avatar">
                            <img
                                :src="
                                    imageAvatar.length > 0
                                        ? imageAvatar
                                        : infos.data.user &&
                                          infos.data.user.avatar &&
                                          (infos.data.user?.avatar as string).length > 0
                                        ? infos.data.user?.avatar
                                        : 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
                                "
                                alt="prev view avatar"
                            />
                        </div>
                        <div class="change-avatar">
                            <label htmlFor="choose">Chọn Ảnh</label>
                            <input @change="handleUpdateAvatar" type="file" id="choose" />
                        </div>
                        <div class="alert">
                            <p>Dụng lượng file tối đa 1 MB</p>
                            <p>Định dạng:.JPEG, .PNG</p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Profile.module.scss';
</style>
