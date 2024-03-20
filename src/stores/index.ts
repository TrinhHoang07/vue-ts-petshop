import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

type Users = {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    token?: string;
    avatar?: string;
    gender?: string;
    birthdate?: string;
};

export const useSession = defineStore('infoUser', () => {
    const infos = reactive<{ isAuth: boolean; user: Users }>({
        isAuth: true,
        user: {
            avatar: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474015AhW/anh-gai-xinh-3.jpg',
        },
    });

    const setSessions = (isAuth: boolean, data: Users) => {
        infos.isAuth = isAuth;
        infos.user = data;
    };

    return { infos, setSessions };
});

export const filterItemByPrice = defineStore('filterByPrice', () => {
    const defaultPrice = reactive<{
        data: [number, number];
    }>({
        data: [0, 100],
    });

    const setPrice = (data: [number, number]) => {
        defaultPrice.data = data;
    };

    return { defaultPrice, setPrice };
});

export const initPrice = defineStore('initPrice', () => {
    const init = reactive<{
        data: [number, number];
    }>({
        data: [0, 100],
    });

    const setInit = (data: [number, number]) => {
        init.data = data;
    };

    return { init, setInit };
});

export const FilterCondition = defineStore('FilterCondition', () => {
    const isFilter = reactive<{
        data: boolean;
    }>({
        data: false,
    });

    const setIsFilter = () => {
        console.log('call');
        isFilter.data = !isFilter.data;
    };

    return { isFilter, setIsFilter };
});

export const filterByProduct = defineStore('filterByProduct', () => {
    const isFilterProduct = reactive<{
        data: string;
    }>({
        data: '',
    });

    const setIsFilterProduct = (data: string) => {
        isFilterProduct.data = data;
    };

    return { isFilterProduct, setIsFilterProduct };
});
