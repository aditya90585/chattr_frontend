import axiosInstance from '../features/axioxInstance';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showPosts, clearPosts } from '../redux/Slices/postSlices';

const useGetAllPosts = () => {
  const [loading, setLoading] = useState(false)
  const posts = useSelector(state => state.posts)
  const [cursor, setCursor] = useState(null)
  const [hasmore, setHasmore] = useState(true)
  const observerRef = useRef()
  const limit = 5
  const dispatch = useDispatch()


  const fetchPosts = async () => {
    if (loading || !hasmore) return
    setLoading(true)
    try {
      const res = await axiosInstance.get(`/api/v1/posts/getposts?limit=${limit}&cursor=${cursor}`)
      dispatch(showPosts(res?.data?.posts))
      setCursor(res?.data?.nextcursor)

      if (res?.data?.nextcursor) {
        setHasmore(true)
      } else {
        setHasmore(false)
      }
    } catch (error) {
      console.log(error.message || "failed to fetch posts")
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (posts.posts.length == 0) {
      dispatch(clearPosts())
      fetchPosts()
    }
  }, [])

  useEffect(() => {
    if (loading) return
    setLoading(true)
    try {
      if (observerRef.current) observerRef.current.disconnect()
      const observer = new IntersectionObserver((entity) => {
        if (entity[0].isIntersecting && hasmore) {
          fetchPosts()
        }
      })
      observer.observe(document.querySelector(".loadmore"))
      observerRef.current = observer
    } catch (error) {
      console.log(error)
    }

  }, [loading, hasmore])

  return fetchPosts
}

export default useGetAllPosts
