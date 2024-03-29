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
