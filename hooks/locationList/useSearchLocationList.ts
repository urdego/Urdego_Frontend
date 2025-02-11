import { useEffect, useState } from 'react';

const useSearchLocationList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchSearchResult = async () => {
    const params = new URLSearchParams();
    params.append('search', searchKeyword);

    const response = await fetch(`/api/content/search?${params}`);
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    if (data) {
      console.log(data);
    }
  };

  useEffect(() => {
    fetchSearchResult();
  }, [searchKeyword]);

  return {
    searchKeyword,
    setSearchKeyword,
  };
};

export default useSearchLocationList;
