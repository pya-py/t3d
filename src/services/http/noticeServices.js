import http from "./httpService";
import { Routes } from "../configs";

const noticeServices = {
    createNotice: (notice) => {
        return http.post(
            `${Routes.Root}/${Routes.Notices}/${Routes.NoticeManagement}`,
            JSON.stringify(notice)
        );
    },
    getAdvancedNotics: () => { //returns all notices with complete data esp. with ID
        return http.get(
            `${Routes.Root}/${Routes.Notices}/${Routes.NoticeManagement}`
        );
    },
    getShortNotices: () => {
        return http.get(`${Routes.Root}/${Routes.Notices}`);
    },
    editNotice: (noticeID, notice) => {
        return http.put(
            `${Routes.Root}/${Routes.Notices}/${Routes.NoticeManagement}/${noticeID}`,
            JSON.stringify(notice)
        );
    }
};

export default noticeServices;
