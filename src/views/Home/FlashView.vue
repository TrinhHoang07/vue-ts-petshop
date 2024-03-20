<script setup lang="ts">
import Gift from '@/assets/icons/Gift.vue';
import Payment from '@/assets/icons/Payment.vue';
import PigMoney from '@/assets/icons/PigMoney.vue';
import Rocket from '@/assets/icons/Rocket.vue';
</script>

<template>
    <div class="flash">
        <div class="flash-item flash-line">
            <span class="flash-icon">
                <Rocket />
            </span>
            <div class="info">
                <h3 class="title">FREE SHIPPING</h3>
                <p class="description">All Order Over $150</p>
            </div>
        </div>
        <div class="flash-item flash-line">
            <span class="flash-icon">
                <PigMoney />
            </span>
            <div class="info">
                <h3 class="title">20% DISCOUNT</h3>
                <p class="description">For First Order</p>
            </div>
        </div>
        <div class="flash-item flash-line">
            <span class="flash-icon">
                <Payment />
            </span>
            <div class="info">
                <h3 class="title">SECURE PAYMENT</h3>
                <p class="description">Confirmed</p>
            </div>
        </div>
        <div class="flash-item">
            <span class="flash-icon">
                <Gift />
            </span>
            <div class="info">
                <h3 class="title">AWESOME GIFT</h3>
                <p class="description">Every Month</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Flash.scss';
</style>
