import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from '../../../features/posts/postsThunk';
import type { RootState } from '../../../store';

const ListPosts = () => {

    const dispatch = useDispatch();
    const postsData = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts(2) as any)
    }, [dispatch]);

    const RenderStrategy = {
        "loading": () => <p>Loading...</p>,
        "error": (error: any) => <p>{error || 'Something went wrong'}</p>,
        "empty": () => <p>No data found</p>,
        "success": (_: any, data: any) => <p>{data.length} records</p>
    };

    const getStatus = () => {
        console.log(postsData)
        if (postsData.loading) return "loading";
        if (postsData.error) return "error";
        if (!postsData.data || postsData.data.length === 0) return "empty";
        return "success";
    }

    return (
        <>
            <div>Posts List</div>
            {RenderStrategy[getStatus()](postsData.error, postsData.data)}
        </>
    );
}

export default ListPosts