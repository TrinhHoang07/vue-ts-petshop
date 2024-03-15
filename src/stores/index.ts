import { reactive } from 'vue'
import { defineStore } from 'pinia'

type Users = {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  token?: string;
  avatar?: string;
  gender?: string;
  birthdate?: string;
}

export const useSession = defineStore('infoUser', () => {
  const infos = reactive<{isAuth: boolean, user: Users}>({
    isAuth: false,
    user: {}
  })

  const setSessions = (isAuth: boolean, data: Users) => {
    infos.isAuth = isAuth;
    infos.user = data
  }

  return {infos, setSessions}
})
