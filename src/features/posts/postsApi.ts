import { axios } from "../../api/axios";

export const getPosts = async (page: string | number | undefined) => {
    return await axios.get(`posts?page=${page}`);
}