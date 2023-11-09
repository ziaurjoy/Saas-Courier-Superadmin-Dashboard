import { BaseApiUrl } from "../../config/config";
import { api,authApi } from "../interceptor/auth.interceptor";
import  {apiUrl}  from "./apiUrls";

class AuthService {

    static async register(formData) {
        return await api
            .post( BaseApiUrl + apiUrl.signupUrl, formData)
            .then((response) => {
                return response?.data;
            });
    }

    static async signIn(formData) {
        return await api
            .post(BaseApiUrl+ apiUrl.signIn, formData)
            .then((response) => {
                return response?.data;
            });
    }
     static async getUser(formData) {
        return await authApi
            .get(BaseApiUrl+ apiUrl.getUser, formData)
            .then((response) => {
                return response?.data;
            });
    }

    static async createOrganization(formData,headers) {
        return await api
            .post("/" + apiPrefix + "/user/create-tanent", formData,headers)
            .then((response) => {
                return response?.data;
            });
    }

    


    static async CreatePackage(formData) {
        return await authApi
            .post(BaseApiUrl + apiUrl.superAdminPacakge, formData)
            .then((response) => {
                return response?.data;
            });
    }
    static async DeletePackage(id) {
        return await authApi
            .delete(BaseApiUrl + apiUrl.superAdminPacakge + '/' + id)
            .then((response) => {
                return response?.data;
            });
    }


    static async subscriptionPackageFeature(formData) {
        return await authApi
            .post(BaseApiUrl + apiUrl.superAdminPacakgeSetFeature, formData)
            .then((response) => {
                return response?.data;
            });
    }

}



export default AuthService;