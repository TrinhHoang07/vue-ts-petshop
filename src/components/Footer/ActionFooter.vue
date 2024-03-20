<script lang="ts" setup>
import logo from '@/assets/images/dark.png';
import { ref, type VNodeRef } from 'vue';

const inputref = ref(null);
const isErr = ref<boolean>(false);
const inputValue = ref<string>('');

const handleSubmit = () => {
    if (inputValue.value.trim().length > 0) {
        alert('Cảm ơn bạn để lại góp ý cho chúng tôi! Chúc bạn một ngày tốt lành <3');
    } else {
        handleError();
    }
};

const handleError = () => {
    isErr.value = true;
    if (inputref.value) {
        (inputref.value as any).style.border = '1px solid red';
    }
};

const handleClearError = () => {
    isErr.value = false;
    if (inputref.value) {
        (inputref.value as any).style.border = '1px solid #30b5b2';
    }
};
</script>

<template>
    <div class="wrapper-footer">
        <div class="logo-footer">
            <img :src="logo" alt="logo-footer" />
        </div>
        <p class="description-footer">
            Mục tiêu của chúng tôi là mang lại những chú thú cưng đẹp và chất lượng nhất trên thị trường!
        </p>
        <div>
            <h5 class="heading-feedback">Góp ý với chúng tôi</h5>
            <div>
                <input
                    ref="inputref"
                    type="text"
                    placeholder="Nội dung góp ý..."
                    class="input-feedback"
                    v-model="inputValue"
                    @input="handleClearError"
                />
                <button @click="handleSubmit" class="btn-submit">Gửi</button>
                <p v-if="isErr" :style="{ color: 'red', fontSize: '12px', textAlign: 'left', marginLeft: '18px' }">
                    Vui lòng nhập trường này!
                </p>
            </div>
        </div>
    </div>
</template>
