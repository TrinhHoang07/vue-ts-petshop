<script lang="ts" setup>
import MenuPhoneProfile from '@/components/MenuPhoneProfile.vue';
import SideBarProfile from '@/components/SideBarProfile.vue';

const props = defineProps<{
    temporaryImage?: string;
}>();
</script>

<template>
    <div class="layout-detail-product">
        <MenuPhoneProfile />
        <div class="contents">
            <div class="nav-bar">
                <SideBarProfile :temporaryImage="props.temporaryImage ?? ''" />
            </div>
            <div class="detail">
                <div class="detail-wrapper">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/LayoutProfile.scss';
</style>
