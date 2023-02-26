import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

interface User {
    accessToken: string
    client: string
    uid: string
    tokenType: string
    userId: string
}

export const userState = atom<User>({
    key: 'user',
    default: {
        accessToken: '',
        client: '',
        uid: '',
        tokenType: '',
        userId: '',
    },
    effects_UNSTABLE: [persistAtom],
})
