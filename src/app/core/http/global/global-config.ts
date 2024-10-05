export const baseURL = 'https://admin.emattress.co'

const apiLang = localStorage.getItem('language') || 'en'

export const eMattressAPI = baseURL + `/api/v1/${apiLang}`

export class END_Points {
    public static auth = {
        login: eMattressAPI + '/auth/login',
        logout: eMattressAPI + '/auth/logout',
        register: eMattressAPI + '/auth/register',
        registerConirmOTP: eMattressAPI + '/auth/confirm-otp',
        registerResendOTP: eMattressAPI + '/auth/resend-otp',
        addAddress: eMattressAPI + '/auth/add-new-address',
        resetPasswordSendCode: eMattressAPI + '/auth/reset-password/send/code',
        resetPasswordConfirmCode: eMattressAPI + '/auth/reset-password/confirm/code',
        resetPasswordChangePassword: eMattressAPI + '/auth/reset-password',
    }
    public static media = {
        upload: eMattressAPI + '/media'
    }
    public static conatct = {
        sendMessage: eMattressAPI + '/contact-us'
    }
    public static profile = {
        getProfile: eMattressAPI + '/profile',
        addAddress: eMattressAPI + '/user/add-new-address'
    }
}

