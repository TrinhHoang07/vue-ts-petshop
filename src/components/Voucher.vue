<script setup lang="ts">
import img from '@/assets/images/freeship.png';

const props = defineProps<{
    open: boolean;
    setOpen: Function;
}>();
</script>

<template>
    <div class="voucher">
        <div
            :style="{
                visibility: props.open ? 'visible' : 'hidden',
            }"
            id="mask"
            class="mask"
        ></div>
        <div
            :style="{
                transform: props.open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
            }"
            id="voucher"
            class="contents"
        >
            <div class="header-voucher">
                <h3>Petshop Vouchers</h3>
                <div class="search-vouchers">
                    <span class="span-d">Mã voucher: </span>
                    <span class="span-mobile">Mã: </span>
                    <input type="text" placeholder="Aa..." />
                    <button>ÁP DỤNG</button>
                </div>
            </div>
            <div class="vouchers">
                <div class="voucher-item">
                    <div class="wraper-info">
                        <div class="preview_img">
                            <img :src="img" alt="voucher images" />
                        </div>
                        <div class="info-voucher">
                            <p>Name voucher</p>
                            <p>Condition voucher</p>
                            <p class="danger">50% - Tối đa 30k</p>
                            <p class="deadline">Sắp hết hạn: còn 3 ngày</p>
                        </div>
                    </div>
                    <div class="checked-input">
                        <input type="radio" />
                    </div>
                </div>
                <div class="voucher-item">
                    <div class="wraper-info">
                        <div class="preview_img">
                            <img :src="img" alt="voucher images" />
                        </div>
                        <div class="info-voucher">
                            <p>Name voucher</p>
                            <p>Condition voucher</p>
                            <p class="danger">50% - Tối đa 30k</p>
                            <p class="deadline">Sắp hết hạn: còn 3 ngày</p>
                        </div>
                    </div>
                    <div class="checked-input">
                        <input type="radio" />
                    </div>
                </div>
                <div class="voucher-item">
                    <div class="wraper-info">
                        <div class="preview_img">
                            <img :src="img" alt="voucher images" />
                        </div>
                        <div class="info-voucher">
                            <p>Name voucher</p>
                            <p>Condition voucher</p>
                            <p class="danger">50% - Tối đa 30k</p>
                            <p class="deadline">Sắp hết hạn: còn 3 ngày</p>
                        </div>
                    </div>
                    <div class="checked-input">
                        <input type="radio" />
                    </div>
                </div>
                <div class="voucher-item">
                    <div class="wraper-info">
                        <div class="preview_img">
                            <img :src="img" alt="voucher images" />
                        </div>
                        <div class="info-voucher">
                            <p>Name voucher</p>
                            <p>Condition voucher</p>
                            <p class="danger">50% - Tối đa 30k</p>
                            <p class="deadline">Sắp hết hạn: còn 3 ngày</p>
                        </div>
                    </div>
                    <div class="checked-input">
                        <input type="radio" />
                    </div>
                </div>
                <div class="voucher-item">
                    <div class="wraper-info">
                        <div class="preview_img">
                            <img :src="img" alt="voucher images" />
                        </div>
                        <div class="info-voucher">
                            <p>Name voucher</p>
                            <p>Condition voucher</p>
                            <p class="danger">50% - Tối đa 30k</p>
                            <p class="deadline">Sắp hết hạn: còn 3 ngày</p>
                        </div>
                    </div>
                    <div class="checked-input">
                        <input type="radio" />
                    </div>
                </div>
            </div>
            <div class="footer">
                <button @click="props.setOpen">TRỞ LẠI</button>
                <button class="primary">OK</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/sass/Voucher.scss';
</style>
