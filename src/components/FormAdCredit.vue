<script setup lang="ts">
import { reactive, ref } from 'vue';

type _T_Props = {
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
};

const props = defineProps<_T_Props>();

const errors = reactive<
    | {
          cardNumber: boolean;
          endDate: boolean;
          cvvCode: boolean;
          fullName: boolean;
          address: boolean;
          codeBC: boolean;
      }
    | any
>({
    cardNumber: false,
    endDate: false,
    cvvCode: false,
    fullName: false,
    address: false,
    codeBC: false,
});

const cardNumber = ref<string>('');
const endDate = ref<string>('');
const cvvCode = ref<string>('');
const address = ref<string>('');
const fullName = ref<string>('');
const codeBC = ref<string>('');

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
        <h3 class="heading-form-add">Thêm thẻ</h3>
        <div class="description">
            <p class="guards-icon">
                <SiAdguard />
            </p>
            <div class="text-description">
                <p>Thông tin thẻ của bạn được bảo mật.</p>
                <p class="sub-text">
                    Chúng tôi hợp tác với CyberSource để đảm bảo thông tin thẻ của bạn được an toàn và bảo mật tuyệt
                    đối. Shopee sẽ không được cấp quyền truy cập vào thông tin thẻ của bạn.
                </p>
            </div>
        </div>
        <div class="detail-card">
            <form
                @submit="(e) => {
                e.preventDefault()

                if (!cardNumber.trim()) {
                                handleError('cardNumber');
                            } else {
                                handleClearError('cardNumber');
                            }
                            if (!cvvCode.trim()) {
                                handleError('cvvCode');
                            } else {
                                handleClearError('cvvCode');
                            }
                            if (!endDate.trim()) {
                                handleError('endDate');
                            } else {
                                handleClearError('endDate');
                            }
                            if (!fullName.trim()) {
                                handleError('fullName');
                            } else {
                                handleClearError('fullName');
                            }
                            if (!codeBC.trim()) {
                                handleError('codeBC');
                            } else {
                                handleClearError('codeBC');
                            }
                            if (!address.trim()) {
                                handleError('address');
                            } else {
                                handleClearError('address');
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
                        <label htmlFor="cardNumber">Số thẻ: </label>
                        <input
                            id="cardNumber"
                            type="text"
                            placeholder="Your name..."
                            model="cardNumber"
                            @input="
                                () => {
                                    handleClearError('cardNumber');
                                }
                            "
                        />
                        <p v-if="errors.cardNumber" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="endDate">Ngày hết hạn: </label>
                        <input
                            id="endDate"
                            type="text"
                            placeholder="Your name..."
                            model="endDate"
                            @input="
                                () => {
                                    handleClearError('endDate');
                                }
                            "
                        />
                        <p v-if="errors.endDate" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="cvvCode">Mã CVV: </label>
                        <input
                            id="cvvCode"
                            type="text"
                            placeholder="Your name..."
                            model="cvvCode"
                            @input="
                                () => {
                                    handleClearError('cvvCode');
                                }
                            "
                        />
                        <p v-if="errors.cvvCode" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="fullName">Họ và tên chủ thẻ: </label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="Your name..."
                            model="fullName"
                            @input="
                                () => {
                                    handleClearError('fullName');
                                }
                            "
                        />
                        <p v-if="errors.fullName" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="address">Địa chỉ: </label>
                        <input
                            id="address"
                            type="text"
                            placeholder="Your name..."
                            model="address"
                            @input="
                                () => {
                                    handleClearError('address');
                                }
                            "
                        />
                        <p v-if="errors.address" class="error-field">This field is required!</p>
                    </div>
                    <div class="form-item">
                        <label htmlFor="codeBC">Mã bưu chính: </label>
                        <input
                            id="codeBC"
                            type="text"
                            placeholder="Your name..."
                            model="codeBC"
                            @input="
                                () => {
                                    handleClearError('codeBC');
                                }
                            "
                        />
                        <p v-if="errors.codeBC" class="error-field">This field is required!</p>
                    </div>
                </div>

                <div class="form-submit">
                    <button
                        @click="
                            () => {
                                props.setIsVisible(false);
                                cardNumber = '';
                                endDate = '';
                                cvvCode = '';
                                fullName = '';
                                address = '';
                                codeBC = '';
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
