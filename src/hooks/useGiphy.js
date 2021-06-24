import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.giphy.com/v1';
const API_KEY = process.env.REACT_APP_GIPHY_KEY;

const useGiphy = (query, offset, limit, type) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const extractUsefulData = (res) => ({
    images: res.data.map((item) => item.images.fixed_width.url),
    pagination: res.pagination,
  });

  useEffect(() => {
    setImages([]);
  }, [query, type]);

  useEffect(() => {
    let url = `${BASE_URL}/${type}`;
    let params = { api_key: API_KEY, limit, offset };
    const isQueryEmpty = query.length === 0;
    if (isQueryEmpty) {
      // Fetch trending
      params = { ...params, trending: 'r' };
      url += '/trending';
    } else {
      // Fetch by query
      params = { ...params, q: query, lang: 'pl', rating: 'r' };
      url += '/search';
    }

    let cancel;
    setIsLoading(true);
    axios
      .get(url, {
        params,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        const data = extractUsefulData(res.data);
        setImages((prevImages) => [...prevImages, ...data.images]);
        setHasMore(data.pagination.total_count !== data.pagination.count + offset);
      })
      .catch(() => {
        if (axios.isCancel(cancel)) return;
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1500);
      });

    return () => cancel();
  }, [offset, query, type, limit]);

  return { images, hasMore, isLoading };
};

export default useGiphy;
