<script setup lang="ts">
import PrivateRoute from '@/components/PrivateRoute.vue';
import routesConfig from '@/config/routes';
</script>

<template>
    <PrivateRoute :redirect="routesConfig.profile">
        <div class="profile-user">
            <div class="profile-user-wrapper">
                <div class="wall-image"></div>
                <div class="infos">
                    <div class="wrapper-image">
                        <div class="avatar-user">
                            <img :src="data.avatarPath" alt="data.userName" />
                        </div>
                    </div>
                    <h3>{{data.userName}}</h3>
                    <div class="actions">
                        {data.isFriend ? (
                            <>
                                <Button>Bạn bè</Button>
                                <Button onClick={handleChat}>Nhắn tin</Button>
                            </>
                        ) : idsInvited.includes(data.id) ? (
                            <Button onClick={handleRemoveInvite}>Hủy yêu cầu</Button>
                        ) : idsGiveInvite.includes(data.id) ? (
                            <Button onClick={handleAcceptInvite}>Xác nhận</Button>
                        ) : (
                            <Button onClick={handleAddNewInviteFriend}>Thêm bạn bè</Button>
                        )}
                    </div>
                    <p class="description">
                        description user hehehe hehehe hehehe hehehe hehehe hehehe hehehe
                    </p>
                </div>
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped></style>
