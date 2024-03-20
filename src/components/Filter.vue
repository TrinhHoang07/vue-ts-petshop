<script lang="ts" setup>
import { formatVND } from '@/Helper';
import { FilterCondition, filterItemByPrice, initPrice, useSession } from '@/stores';
import Slider from 'primevue/slider';
import { ref, watch } from 'vue';

// type TProps = {
//     value: [number, number];
// };

// const props = defineProps<TProps>();

const { defaultPrice, setPrice } = filterItemByPrice();
const { init } = initPrice();
const { setIsFilter } = FilterCondition();
const data = ref<[number, number]>([0, 100]);

watch(defaultPrice, () => {
    data.value = defaultPrice.data;
});

const handleSubmitFilter = () => {
    setIsFilter();
};
</script>

<template>
    <div class="filter">
        <h6 class="heading-menu">LỌC THEO GIÁ</h6>
        <div class="wrapper-filter">
            <Slider
                v-model="data"
                v-on:change="
                    (e) => {
                        console.log(e);
                        setPrice(e as any)
                    }
                "
                :min="init.data[0]"
                :max="init.data[1]"
                range
            />
            <div class="info-filter">
                <button @click="handleSubmitFilter">Lọc</button>
                <p>Giá: {{ formatVND.format(data[0]) }} - {{ formatVND.format(data[1]) }}</p>
            </div>
        </div>
    </div>
</template>
