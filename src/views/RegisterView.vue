<script setup lang="ts">
import logo from '@/assets/images/logo-petshop.jpg';
import { ApiService } from '@/axios/ApiService';
import routesConfig from '@/config/routes';
import type { T_Auth } from '@/model';
import { useSession } from '@/stores';
import { useToast } from 'primevue/usetoast';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const apiService = new ApiService();
const { setSessions } = useSession();
const router = useRouter();
const toast = useToast();

const hanleRegister = () => {
    apiService.auth
        .register({
            name: name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirmPassword.value,
        })
        .then((res: T_Auth) => {
            if (res.message === 'success') {
                setSessions(true, {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone_number,
                    token: res.data.access_token,
                    avatar: res.data.avatar,
                    gender: res.data.gender,
                    birthdate: res.data.birth_day,
                });

                toast.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Đăng ký thành công!',
                    life: 3000,
                });

                setTimeout(() => {
                    router.push(routesConfig.home);
                }, 1500);
            } else {
                toast.add({
                    severity: 'warn',
                    summary: 'Có lỗi',
                    detail: res.message,
                    life: 3000,
                });
            }
        })
        .catch((_) => {
            toast.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: 'Có lỗi, vui lòng thử lại!',
                life: 3000,
            });
        });
};

const errors = reactive<
    | {
          name: boolean;
          email: boolean;
          password: boolean;
          confirmPassword: boolean;
          checkpass: boolean;
      }
    | any
>({
    checkpass: false,
    confirmPassword: false,
    email: false,
    name: false,
    password: false,
});

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
};

const REGEXPASS = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const REGEX_EMAIL = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
</script>

<template>
    <div class="login">
        <div class="contents">
            <div class="logo">
                <img :src="logo" alt="logo shop" />
            </div>
            <div class="heading">
                <h3>Sign up to PetShop</h3>
                <p>Vui lòng nhập đầy đủ thông tin của bạn</p>
            </div>
            <div class="login-form">
                <form
                    @submit="
                        (e) => {
                            e.preventDefault();

                            if (!name.trim()) {
                                handleError('name');
                            } else {
                                handleClearError('name');
                            }
                            if (!REGEX_EMAIL.test(email.trim())) {
                                handleError('email');
                            } else {
                                handleClearError('email');
                            }
                            if (!REGEXPASS.test(password.trim())) {
                                handleError('password');
                            } else {
                                handleClearError('password');
                            }
                            if (!REGEXPASS.test(confirmPassword.trim())) {
                                handleError('confirmPassword');
                            } else {
                                handleClearError('confirmPassword');
                            }
                            if (password.trim() !== confirmPassword.trim()) {
                                handleError('checkpass');
                            } else {
                                handleClearError('checkpass');
                            }

                            if((Object as any).entries(errors).every((item: any) => item[1] === false)) {
                                hanleRegister()
                            }
                        }
                    "
                    class="form-container"
                >
                    <div class="form-item">
                        <label htmlFor="name">Tài khoản: </label>
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
                        <p v-if="errors.name" class="error-field">Trường này là bắt buộc!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Your email..."
                            v-model="email"
                            @input="
                                () => {
                                    handleClearError('email');
                                }
                            "
                        />
                        <p v-if="errors.email" class="error-field">Trường này phải là email!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="password">Mật khẩu: </label>
                        <input
                            id="password"
                            type="text"
                            placeholder="Password..."
                            v-model="password"
                            @input="
                                () => {
                                    handleClearError('password');
                                }
                            "
                        />
                        <p v-if="errors.password" class="error-field">
                            Mật khẩu tối thiểu 8 ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt!
                        </p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="confirmPassword">Nhập lại mật khẩu: </label>
                        <input
                            id="confirmPassword"
                            type="text"
                            placeholder="Confirm password..."
                            v-model="confirmPassword"
                            @input="
                                () => {
                                    handleClearError('confirmPassword');
                                }
                            "
                        />
                        <p v-if="errors.confirmPassword" class="error-field">Trường này là bắt buộc!</p>
                        <p v-if="errors.checkpass" class="error-field">Mật khẩu không khớp!</p>
                    </div>
                    <div class="form-submit">
                        <button type="submit">ĐĂNG KÝ</button>
                        <p>Bạn đã có tài khoản. <RouterLink :to="routesConfig.login">Đăng nhập</RouterLink></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    padding: 48px 0 64px 0;
}

.contents {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.heading {
    text-align: center;
    h3 {
        font-size: 2.8rem;
        font-weight: 600;
    }

    p {
        font-weight: 300;
        font-size: 1.4rem;
        text-align: center;
        width: 230px;
        margin-top: 8px;
        margin-left: 12px;
    }
}

.logo {
    width: 180px;
    height: 180px;
    display: flex;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.login-form {
    width: 380px;
}

.form-item {
    display: flex;
    flex-direction: column;
    color: #333;
    font-size: 15px;
    padding: 8px 0;

    input {
        margin-top: 4px;
        caret-color: #333;
        color: #999;
        outline: none;
        border: 1px solid #d7d7d7;
        padding: 12px 0 12px 12px;
        border-radius: 6px;
    }
}

.form-submit {
    padding-top: 8px;
    text-align: center;

    button {
        padding: 12px 24px;
        background-color: dodgerblue;
        color: #fff;
        font-size: 1.5rem;
        letter-spacing: 1px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    p {
        margin-top: 12px;
        font-weight: 300;
        font-size: 1.4rem;
    }

    a {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

.error-field {
    color: red;
    font-weight: 300;
    font-size: 14px;
    &::before {
        display: inline;
        content: '⚠ ';
    }
}
</style>
