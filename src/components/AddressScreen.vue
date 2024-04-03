<script setup lang="ts">
import CloseCircle from '@/assets/icons/CloseCircle.vue';
import type { Address } from '@/model';

type T_Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    choose: Address | undefined;
    setChoose: (value: Address) => void;
    data: Address[];
};

const props = defineProps<T_Props>();
const handleCloseAddress = () => {
    props.setOpen(false);
};
</script>

<template>
    <div
        :style="{
            visibility: props.open ? 'visible' : 'hidden',
        }"
        @click="handleCloseAddress"
        class="address"
    ></div>
    <div
        :style="{
            transform: props.open ? 'translate(-50%, -50%)' : 'translate(-50%, -200%)',
        }"
        class="address-container"
    >
        <div class="add-header">
            <div :style="{ flex: 1 }"></div>
            <h3>Chọn địa chỉ</h3>
            <span @click="handleCloseAddress">
                <CloseCircle />
            </span>
        </div>
        <div class="add-contents">
            <div
                v-for="item in props.data"
                :key="item.id"
                @click="() => props.setChoose(item)"
                class="add-item"
                :class="{ active: props.choose?.id === item.id }"
            >
                <p>{{ item.full_name }} | {{ item.phone_number }}</p>
                <p>{{ item.detail_address }}, {{ item.main_address }}</p>
            </div>
        </div>
        <div class="add-footer">
            <button @click="handleCloseAddress">Ok</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.address {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 7;
    visibility: hidden;
}
.address-container {
    width: 75%;
    height: 50vh;
    transform: translate(-50%, -200%);
    left: 50%;
    top: 50%;
    padding: 16px;
    position: fixed;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 3px #d8d8d8;
    transition: all ease 0.3s;
    display: flex;
    flex-direction: column;
    z-index: 8;

    .add-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
            font-weight: 500;
            font-size: 1.8rem;
            color: #333;
            text-align: center;
            flex: 1;
        }

        span {
            cursor: pointer;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex: 1;

            &:hover {
                opacity: 0.75;
            }
        }
    }

    .add-contents {
        overflow-y: auto;
        padding: 32px 0 16px 0;

        .add-item {
            padding: 16px 10px;
            border-radius: 8px;

            &:hover {
                cursor: pointer;
                background-color: #f2f3f5;
            }
        }

        .add-item.active {
            position: relative;
            border: 1px solid orange;
        }

        .add-item.active::before {
            content: '✔';
            position: absolute;
            top: -16px;
            left: 10px;
            color: orange;
            font-size: 3rem;
        }
    }

    .add-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        button {
            cursor: pointer;
            border: none;
            padding: 10px 24px;
            color: #fff;
            background-color: orange;
            font-size: 1.6rem;
            border-radius: 6px;

            &:hover {
                opacity: 0.85;
            }
        }
    }
}
</style>
