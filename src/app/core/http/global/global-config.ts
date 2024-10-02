export const baseURL = 'https://admin.emattress.co'

export const eMattressAPI = baseURL + '/api/v1/en'

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
}

