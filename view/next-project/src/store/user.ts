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

export const userState = atom<User | undefined>({
    key: 'user',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
})
