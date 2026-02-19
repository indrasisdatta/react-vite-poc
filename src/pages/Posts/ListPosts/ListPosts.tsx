import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from '../../../features/posts/postsThunk';

const ListPosts = () => {

    const dispatch = useDispatch();
    const postsData = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchPosts(2))
    }, [dispatch]);

    const RenderStrategy = {
        "loading": () => <p>Loading...</p>,
        "error": (error) => <p>{error || 'Something went wrong'}</p>,
        "empty": () => <p>No data found</p>,
        "success": (_, data) => <p>{data.length} records</p>
    };

    const getStatus = () => {
        console.log(postsData)
        if (postsData.isLoading) return "loading";
        if (postsData.error) return "error";
        if (!postsData.data.posts || postsData.data.posts.length === 0) return "empty";
        return "success";
    }

    return (
        <>
            <div>Posts List</div>
            {RenderStrategy[getStatus()](postsData.error, postsData.data.posts)}
        </>
    );
}

export default ListPosts