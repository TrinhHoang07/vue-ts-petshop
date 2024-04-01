<script setup lang="ts">
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
import LayoutProfile from '@/layout/LayoutProfile.vue';
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <LayoutProfile :temporary-image="''">
            <h1>PROFILE CHATS</h1>
        </LayoutProfile>
    </PrivateRoute>
</template>

<style lang="scss" scoped></style>
