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

    static home = {
        homePageData: eMattressAPI + '/pages/home-page',
        categories: eMattressAPI + '/pages/home-page-categories',
        qualityLevel: eMattressAPI + '/pages/home-page-quality-level'
    }

    static countries = {
        countryList: eMattressAPI + '/countries'
    }

    public static profile = {
        getProfile: eMattressAPI + '/profile',
        getAddress: eMattressAPI + '/user/get-user-address',
        addAddress: eMattressAPI + '/user/add-new-address',
        deleteAddress: eMattressAPI + ''
    }

    public static product = {
        list: eMattressAPI + '/products',
        getDetails: (id: string) => eMattressAPI + `/products/${id}`
    }
    
}

