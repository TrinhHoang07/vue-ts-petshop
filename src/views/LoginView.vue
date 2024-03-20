<script setup lang="ts">
import routesConfig from '@/config/routes';
import logo from '@/assets/images/logo-petshop.jpg';
import { useSession } from '@/stores';
import { onMounted, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

const { setSessions } = useSession();

onMounted(() => {
    setSessions(true, {
        id: 1,
        name: 'Van Hoang',
        token: 'eykdhfdsfkjsfhsajfkdshffdg',
    });
});

const errors = reactive<
    | {
          name: boolean;
          password: boolean;
          both: boolean;
      }
    | any
>({ name: false, password: false, both: false });

const name = ref<string>('');
const password = ref<string>('');

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
};
</script>

<template>
    <div class="login">
        <div class="contents">
            <div class="logo">
                <img :src="logo" alt="logo shop" />
            </div>
            <div class="heading">
                <h3>Sign in to PetShop</h3>
                <p>Hãy nhập thông tin tài khoản và mật khẩu của bạn</p>
            </div>
            <div class="login-form">
                <form
                    @submit="
                        (e) => {
                            e.preventDefault();
                            // handleSubmit(onSubmit)
                            if (!name.trim()) {
                                handleError('name');
                            } else {
                                handleClearError('name');
                            }
                            if (!password.trim()) {
                                handleError('password');
                            } else {
                                handleClearError('password');
                            }

                            if((Object as any).entries(errors).every((item: any) => item[1] === false)) {
                                console.log('CALL API')
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
                                    // handleFocus(e.target as HTMLInputElement)
                                }
                            "
                            @blur="
                                (e) => {
                                    // handleBlur(e.target)
                                }
                            "
                        />
                        <p v-if="errors.name" class="error-field">This field is required!</p>
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
                                    // handleFocus(e.target as HTMLInputElement)
                                }
                            "
                            @blur="
                                () => {
                                    // => handleBlur(e.target)
                                }
                            "
                        />
                        <p v-if="errors.password" class="error-field">This field is required!</p>
                        <p v-if="errors.both" class="error-field">Tên tài khoản hoặc mật khẩu không chính xác!</p>
                    </div>
                    <div class="form-submit">
                        <button type="submit">ĐĂNG NHẬP</button>
                        <p>Bạn chưa có tài khoản. <RouterLink :to="routesConfig.register">Đăng ký</RouterLink></p>
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
