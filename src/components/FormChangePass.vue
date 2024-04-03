<script lang="ts" setup>
import { ApiService } from '@/axios/ApiService';
import { useSession } from '@/stores';
import { useToast } from 'primevue/usetoast';
import { reactive, ref } from 'vue';

const errors = reactive<
    | {
          prevPass: boolean;
          newPass: boolean;
          conNewPass: boolean;
      }
    | any
>({
    prevPass: false,
    newPass: false,
    conNewPass: false,
});

const prevPass = ref<string>('');
const newPass = ref<string>('');
const conNewPass = ref<string>('');
const toast = useToast();
const apiService = new ApiService();
const { infos } = useSession();

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
};

const onSubmit = () => {
    if (newPass.value !== conNewPass.value) {
        toast.add({
            severity: 'error',
            summary: 'Có lỗi',
            detail: 'Mật khẩu mới không trùng khớp!',
            life: 1500,
        });
    } else {
        apiService.customer
            .updatePassword(
                (infos.user?.id as number).toString(),
                {
                    password: newPass.value,
                    oldPassword: prevPass.value,
                },
                infos.user?.token ?? '',
            )
            .then((res: { message: string; statusCode: number; detail?: string }) => {
                if (res.message === 'mismatched') {
                    toast.add({
                        severity: 'error',
                        summary: 'Có lỗi',
                        detail: 'Mật khẩu cũ của bạn chưa chính xác, vui lòng thử lại!',
                        life: 2500,
                    });
                } else if (res.message === 'success') {
                    toast.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Thay đổi mật khẩu thành công!',
                        life: 2000,
                    });

                    prevPass.value = '';
                    newPass.value = '';
                    conNewPass.value = '';
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
</script>

<template>
    <div class="form-container">
        <form
            @submit="
                (e) => {
                    e.preventDefault();

                    if (!prevPass.trim()) {
                                handleError('prevPass');
                            } else {
                                handleClearError('prevPass');
                            }
                            if (!newPass.trim()) {
                                handleError('newPass');
                            } else {
                                handleClearError('newPass');
                            }
                            if (!conNewPass.trim()) {
                                handleError('conNewPass');
                            } else {
                                handleClearError('conNewPass');
                            }
                            if((Object as any).entries(errors).every((item: any) => item[1] === false)) {
                                // hanleRegister()
                                console.log('CALL API')
                                onSubmit()
                            }


                }
            "
            class="form-container"
        >
            <div class="form-wrapper">
                <div class="form-item">
                    <label htmlFor="prevPass">Nhập mật khẩu cũ: </label>
                    <input
                        id="prevPass"
                        type="text"
                        placeholder="Your name..."
                        v-model="prevPass"
                        @input="
                            () => {
                                handleClearError('prevPass');
                            }
                        "
                    />

                    <p v-if="errors.prevPass" class="error-field">This field is required!</p>
                </div>
                <div class="form-item">
                    <label htmlFor="newPass">Mật khẩu mới: </label>
                    <input
                        id="newPass"
                        type="text"
                        placeholder="Your name..."
                        v-model="newPass"
                        @input="
                            () => {
                                handleClearError('newPass');
                            }
                        "
                    />

                    <p v-if="errors.newPass" class="error-field">This field is required!</p>
                </div>
                <div class="form-item">
                    <label htmlFor="conNewPass">Nhập lại mật khẩu: </label>
                    <input
                        id="conNewPass"
                        type="text"
                        placeholder="Your name..."
                        v-model="conNewPass"
                        @input="
                            () => {
                                handleClearError('conNewPass');
                            }
                        "
                    />

                    <p v-if="errors.conNewPass" class="error-field">This field is required!</p>
                </div>
            </div>
            <div class="form-submit">
                <button type="submit">SUBMIT</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileChangePass.scss';
</style>
