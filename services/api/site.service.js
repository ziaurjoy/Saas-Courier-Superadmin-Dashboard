import { apiPrefix } from "../../config/config";
import { api, authApi } from "../interceptor/auth.interceptor";
import * as qs from "qs"

class SiteService {

    static async getSiteSettings() {
        return await api
            .get("/" + apiPrefix + "/siteSetting")
            .then((response) => {
                return response.data.data;
            });
    }    
    
    static async fetchSSOApi(url) {
        return await authApi
            .get(url)
            .then((response) => {
                return response.data;
            });
    }
}

export default SiteService;