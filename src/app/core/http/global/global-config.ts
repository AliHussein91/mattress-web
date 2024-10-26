export const baseURL = 'https://admin.emattress.co';

const apiLang = localStorage.getItem('language') || 'en';

export const eMattressAPI = baseURL + `/api/v1/${apiLang}`;

export class END_Points {
  public static auth = {
    login: eMattressAPI + '/auth/login',
    logout: eMattressAPI + '/auth/logout',
    register: eMattressAPI + '/auth/register',
    registerConirmOTP: eMattressAPI + '/auth/confirm-otp',
    registerResendOTP: eMattressAPI + '/auth/resend-otp',
    addAddress: eMattressAPI + '/auth/add-new-address',
    resetPasswordSendCode: eMattressAPI + '/auth/reset-password/send/code',
    resetPasswordConfirmCode:
      eMattressAPI + '/auth/reset-password/confirm/code',
    resetPasswordChangePassword: eMattressAPI + '/auth/reset-password',
    socialLogin: eMattressAPI + '/auth/social-login',
    completeSocialUserData: eMattressAPI + '/auth/complete-social-user-data'
  };
  public static media = {
    upload: eMattressAPI + '/media',
  };
  public static conatct = {
    sendMessage: eMattressAPI + '/contact-us',
  };

  static home = {
    homePageData: eMattressAPI + '/pages/home-page',
    categories: eMattressAPI + '/pages/home-page-categories',
    qualityLevel: eMattressAPI + '/pages/home-page-quality-level',
    staticContent: eMattressAPI + '/pages/static-content',
  };

  static countries = {
    countryList: eMattressAPI + '/countries',
  };

  public static profile = {
    getProfile: eMattressAPI + '/profile',
    updateProfile: eMattressAPI + '/profile/update',
    getAddress: eMattressAPI + '/user/get-user-address',
    addAddress: eMattressAPI + '/user/add-new-address',
    deleteAddress: eMattressAPI + '/user/delete-user',
    getOrders: eMattressAPI + '/orders/active',
    getFavorites: eMattressAPI + '/products/favourites',
    rateProduct: (id: string) => eMattressAPI + `/user/rate-product/${id}`,
  };

  public static product = {
    list: eMattressAPI + '/products',
    getDetails: (id: string) => eMattressAPI + `/products/${id}`,
  };

  public static lookup = {
    lookup: eMattressAPI + '/look-up',
  };

  public static categories = {
    getCategoriesByBrandId: (id: string) =>
      eMattressAPI + `/categories/get-by-brand/${id}`,
    getQualityLevelsByCategoryId: (id: string) =>
      eMattressAPI + `/quality-levels?country_id=1&category_id=${id}`,
  };

  public static user = {
    getCart: eMattressAPI + '/carts',
    applyPromoCode: eMattressAPI + '/promo-codes/apply',
  };
}
