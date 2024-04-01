<script setup lang="ts">
import { reactive, ref } from 'vue';

type _T_Props = {
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
};

const props = defineProps<_T_Props>();

const errors = reactive<
    | {
          phoneNumber: boolean;
          verifyNumber: boolean;
      }
    | any
>({
    phoneNumber: false,
    verifyNumber: false,
});

const phoneNumber = ref<string>('');
const verifyNumber = ref<string>('');

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
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
        <h3 class="heading-form-add">Thêm số điện thoại</h3>

        <div class="detail-card">
            <form
                @submit="e => {
                e.preventDefault();
                
                if (!phoneNumber.trim()) {
                                handleError('phoneNumber');
                            } else {
                                handleClearError('phoneNumber');
                            }
                            if (!verifyNumber.trim()) {
                                handleError('verifyNumber');
                            } else {
                                handleClearError('verifyNumber');
                            }
                            if((Object as any).entries(errors).every((item: any) => item[1] === false)) {
                                // hanleRegister()
                                console.log('CALL API')
                            }


            }"
                class="form-container"
            >
                <div class="form-wrapper">
                    <div class="form-item">
                        <label htmlFor="phoneNumber">Số điện thoại: </label>
                        <div class="wrapper-bank-phone">
                            <input
                                id="phoneNumber"
                                type="text"
                                placeholder="Your name..."
                                model="phoneNumber"
                                @input="
                                    () => {
                                        handleClearError('phoneNumber');
                                    }
                                "
                            />
                            <button type="button" class="verify-phone">Gửi mã xác minh</button>
                            <button type="button" class="verify-phone-mobile">Mã xác minh</button>
                        </div>
                        <p v-if="errors.phoneNumber" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="verifyNumber">Mã xác minh: </label>
                        <input
                            id="verifyNumber"
                            type="text"
                            placeholder="Your name..."
                            model="verifyNumber"
                            @input="
                                () => {
                                    handleClearError('verifyNumber');
                                }
                            "
                        />
                        <p v-if="errors.verifyNumber" class="error-field">This field is required!</p>
                    </div>
                </div>

                <div class="form-submit">
                    <button
                        @click="
                            () => {
                                phoneNumber = '';
                                verifyNumber = '';

                                props.setIsVisible(false);
                            }
                        "
                        type="button"
                        class="btn-back"
                    >
                        Trở lại
                    </button>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/ProfileBank.scss';
</style>
