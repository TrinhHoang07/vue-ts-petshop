import { App } from '@/const/App';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

export type _T_DataItemHome = {
    id: number;
    name: string;
    previewUrl: string;
    price: number;
};

export function useDataInHome(path: string) {
    const values = reactive<{
        data: _T_DataItemHome[];
    }>({
        data: [],
    });

    axios.get(App.URL_MAIN + path).then((res) => {
        if (res.data.data.length > 0) {
            console.log(res.data);
            const items: _T_DataItemHome[] = res.data.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                previewUrl: item.preview_url,
            }));

            values.data = items;
        }
    });

    // fetch(App.URL_MAIN + path)
    //     .then((res) => {
    //         console.log(res);
    //         return res.json();
    //     })
    //     .then((data) => {
    //         if (data.data.length > 0) {
    //             const items: _T_DataItemHome[] = data.data.map((item: any) => ({
    //                 id: item.id,
    //                 name: item.name,
    //                 price: item.price,
    //                 previewUrl: item.preview_url,
    //             }));

    //             data.value = items;
    //         }
    //     })
    //     .catch((err) => console.error(err));

    return { values };
}
