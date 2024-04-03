import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import routesConfig from '@/config/routes';
import HomeView from '@/views/Home/HomeView.vue';
import DescriptionView from '@/views/DescriptionView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import FlagmentLayout from '@/layout/FlagmentLayout.vue';
import FoodView from '@/views/FoodView.vue';
import DogView from '@/views/DogView.vue';
import CatView from '@/views/CatView.vue';
import AccessoriesView from '@/views/AccessoriesView.vue';
import NewsView from '@/views/News/NewsView.vue';
import ContactView from '@/views/ContactView.vue';
import SearchView from '@/views/SearchView.vue';
import NotFound from '@/views/NotFound.vue';
import ShopView from '@/views/ShopView.vue';
import DetailProduct from '@/views/DetailProduct.vue';
import Categories from '@/views/Categories.vue';
import ProfileChangePassword from '@/views/ProfileChangePassword.vue';
import ProfileChat from '@/views/ProfileChat.vue';
import ProfileBank from '@/views/ProfileBank.vue';
import ProfileBuys from '@/views/ProfileBuys.vue';
import ProfileVoucher from '@/views/ProfileVoucher.vue';
import ProfileAddress from '@/views/ProfileAddress.vue';
import ProfileNoti from '@/views/ProfileNoti.vue';
import ProfileFriends from '@/views/ProfileFriends.vue';
import ProfileUser from '@/views/ProfileUser.vue';
import Orders from '@/views/Orders.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'defaultLayout',
            component: DefaultLayout,
            children: [
                {
                    path: routesConfig.home,
                    component: HomeView,
                    name: 'home',
                },
                {
                    path: routesConfig.description,
                    component: DescriptionView,
                    name: 'description',
                },
                {
                    component: ProfileView,
                    name: 'profile',
                    path: routesConfig.profile,
                },
                {
                    component: FoodView,
                    name: 'food',
                    path: routesConfig.food,
                },
                {
                    component: DogView,
                    name: 'dog',
                    path: routesConfig.dog,
                },
                {
                    component: CatView,
                    name: 'cat',
                    path: routesConfig.cat,
                },
                {
                    component: AccessoriesView,
                    name: 'accessories',
                    path: routesConfig.accessories,
                },
                {
                    component: NewsView,
                    name: 'news',
                    path: routesConfig.news,
                },
                {
                    component: ContactView,
                    name: 'contact',
                    path: routesConfig.contact,
                },
                {
                    component: SearchView,
                    name: 'search',
                    path: routesConfig.search,
                },
                {
                    component: ShopView,
                    name: 'shop',
                    path: routesConfig.shop,
                },
                {
                    component: DetailProduct,
                    name: 'detailProduct',
                    path: routesConfig.detail,
                },
                {
                    component: Categories,
                    name: 'categories',
                    path: routesConfig.categories,
                },
                //
                {
                    component: ProfileChangePassword,
                    name: 'profile-change-password',
                    path: routesConfig.profile_change_password,
                },
                {
                    component: ProfileChat,
                    name: 'profile-chat',
                    path: routesConfig.profile_chats,
                },
                {
                    component: ProfileBank,
                    name: 'profile-bank',
                    path: routesConfig.profile_bank,
                },
                {
                    component: ProfileBuys,
                    name: 'profile-buys',
                    path: routesConfig.profile_buy,
                },
                {
                    component: ProfileVoucher,
                    name: 'profile-voucher',
                    path: routesConfig.profile_voucher,
                },
                {
                    component: ProfileAddress,
                    name: 'profile-address',
                    path: routesConfig.profile_address,
                },
                {
                    component: ProfileNoti,
                    name: 'profile-noti',
                    path: routesConfig.profile_noti,
                },
                {
                    component: ProfileFriends,
                    name: 'profile-friends',
                    path: routesConfig.profile_friends,
                },
                {
                    component: ProfileUser,
                    name: 'profile-user',
                    path: routesConfig.profile_user,
                },
                {
                    component: Orders,
                    name: 'orders',
                    path: routesConfig.orders,
                },
            ],
        },
        {
            path: '/',
            name: 'flagmentLayout',
            component: FlagmentLayout,
            children: [
                {
                    path: routesConfig.register,
                    component: RegisterView,
                    name: 'register',
                },
                {
                    path: routesConfig.login,
                    component: LoginView,
                    name: 'login',
                },
                {
                    path: routesConfig.notFound,
                    name: 'notFound',
                    component: NotFound,
                },
            ],
        },
    ],
});

export default router;
