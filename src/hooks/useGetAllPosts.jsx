// import axiosInstance from '../features/axioxInstance';
// import { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { showPosts, clearPosts } from '../redux/Slices/postSlices';

// const useGetAllPosts = () => {
//   const [loading, setLoading] = useState(false)
//   const posts = useSelector(state => state.posts)
//   const [cursor, setCursor] = useState(null)
//   const [hasmore, setHasmore] = useState(true)
//   const observerRef = useRef()
//   const limit = 5
//   const dispatch = useDispatch()


//   const fetchPosts = async () => {
//     if (loading || !hasmore) return
//     setLoading(true)
//     try {
//       const res = await axiosInstance.get(`/api/v1/posts/getposts?limit=${limit}&cursor=${cursor}`)
//       dispatch(showPosts(res?.data?.posts))
//       setCursor(res?.data?.nextcursor)

//       if (res?.data?.nextcursor) {
//         setHasmore(true)
//       } else {
//         setHasmore(false)
//       }
//     } catch (error) {
//       console.log(error.message || "failed to fetch posts")
//     }
//     finally {
//       setLoading(false)
//     }
//   }
//   useEffect(() => {
//     dispatch(clearPosts())
//     if (posts.posts.length == 0) {
//       fetchPosts()
//     }
//   }, [])

//   useEffect(() => {
//     // if (loading) return
//     // setLoading(true)
//     try {
//       if (observerRef.current) observerRef.current.disconnect()
//       const observer = new IntersectionObserver((entity) => {
//         if (entity[0].isIntersecting && hasmore) {
//           fetchPosts()
//         }
//       })
//       observer.observe(document.querySelector(".loadmore"))
//       observerRef.current = observer
//     } catch (error) {
//       console.log(error)
//     }

//   }, [loading, hasmore])

//   return fetchPosts
// }

// export default useGetAllPosts

import axiosInstance from "../features/axioxInstance";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPosts, clearPosts } from "../redux/Slices/postSlices";

const useGetAllPosts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const cursorRef = useRef(null);

  const limit = 5;

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.append("limit", limit);

      if (cursorRef.current) {
        params.append("cursor", cursorRef.current);
      }

      const res = await axiosInstance.get(`/api/v1/posts/getposts?limit=${limit}&cursor=${cursor}`)
      const newPosts = res?.data?.posts || [];
      const nextCursor = res?.data?.nextcursor || null;

      dispatch(showPosts(newPosts));

      cursorRef.current = nextCursor;
      setCursor(nextCursor);

      setHasMore(Boolean(nextCursor));
    } catch (error) {
      console.log(error?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, dispatch]);

  // Initial fetch ONLY if Redux doesn't already have posts
  useEffect(() => {
    if (posts.length > 0) {
      return;
    }

    fetchPosts();
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (loading || !hasMore) return;

    const loadMoreElement = document.querySelector(".loadmore");

    if (!loadMoreElement) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreElement);

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore, fetchPosts]);

  return {
    fetchPosts,
    loading,
    hasMore,
  };
};

export default useGetAllPosts;