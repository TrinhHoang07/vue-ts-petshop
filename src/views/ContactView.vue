<script setup lang="ts">
import TitleView from '@/components/TitleView.vue';
import logo from '@/assets/images/sleigh-bell.svg';
import { onMounted, reactive, ref } from 'vue';

onMounted(() => {
    document.title = 'Liên hệ | Petshop chất lượng số 1 Việt Nam!';
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    });
});

const errors = reactive<
    | {
          name: boolean;
          email: boolean;
          phone: boolean;
          description: boolean;
      }
    | any
>({
    name: false,
    email: false,
    phone: false,
    description: false,
});

const name = ref<string>('');
const email = ref<string>('');
const phone = ref<string>('');
const description = ref<string>('');

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
};
</script>

<template>
    <div class="contact">
        <div class="banner">
            <div class="contents">
                <div class="contact-info">
                    <TitleView :logo="logo" title="LIÊN HỆ VỚI CHÚNG TÔI" />
                    <div class="description">
                        <p class="description-p">
                            Mona Media là công ty thiết kế website cao cấp có tuổi đời 8+ năm trong ngành.
                        </p>
                        <p class="description-p">
                            Ngay từ những ngày đầu hoạt động, Mona Media đã chọn cho mình một phân khúc riêng, khác biệt
                            với hàng ngàn công ty thiết kế website trên thị trường: phân khúc của sự hiệu quả.
                        </p>
                        <p class="description-p">
                            Những website/phần mềm từ Mona Media luôn được tư vấn, phát triển, tối ưu nhằm mang lại hiệu
                            quả rõ rệt cho hoạt động kinh doanh của doanh nghiệp.
                        </p>
                    </div>
                    <TitleView :logo="logo" title="" />
                </div>
                <div class="contact-form">
                    <form
                        @submit="
                            (e) => {
                                // handle validation
                                e.preventDefault();
                                if (!name.trim()) {
                                    handleError('name');
                                } else {
                                    handleClearError('name');
                                }
                                if (!email.trim()) {
                                    handleError('email');
                                } else {
                                    handleClearError('email');
                                }
                                if (!phone.trim()) {
                                    handleError('phone');
                                } else {
                                    handleClearError('phone');
                                }
                                if (!description.trim()) {
                                    handleError('description');
                                } else {
                                    handleClearError('description');
                                }

                                if((Object as any).entries(errors).every((item: any) => item[1] === false)) {
                                    console.log('CALL API')
                                }
                            }
                        "
                        class="form-container"
                    >
                        <div class="form-item">
                            <label htmlFor="name">Họ Và Tên: </label>
                            <input
                                @input="
                                    () => {
                                        handleClearError('name');
                                    }
                                "
                                v-model="name"
                                id="name"
                                type="text"
                                placeholder="Your name..."
                            />
                            <p v-if="errors.name" class="error-field">This field is required!</p>
                        </div>
                        <div class="form-item">
                            <label htmlFor="email">Email: </label>
                            <input
                                @input="
                                    () => {
                                        handleClearError('email');
                                    }
                                "
                                v-model="email"
                                id="email"
                                type="text"
                                placeholder="Email..."
                            />
                            <p v-if="errors.email" class="error-field">This field is email!</p>
                        </div>
                        <div class="form-item">
                            <label htmlFor="phone">Số Điện Thoại: </label>
                            <input
                                @input="
                                    () => {
                                        handleClearError('phone');
                                    }
                                "
                                v-model="phone"
                                id="phone"
                                type="text"
                                placeholder="Phone number..."
                            />
                            <p v-if="errors.phone" class="error-field">This field is phone number!</p>
                        </div>
                        <div class="form-item">
                            <label htmlFor="description">Lời Nhắn: </label>
                            <textarea
                                @input="
                                    () => {
                                        handleClearError('description');
                                    }
                                "
                                v-model="description"
                                id="description"
                                placeholder="Nhập lời nhắn..."
                            ></textarea>
                            <p v-if="errors.description" class="error-field">This field is required!</p>
                        </div>
                        <div class="form-submit">
                            <button type="submit">GỬI</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Contact.scss';
</style>
