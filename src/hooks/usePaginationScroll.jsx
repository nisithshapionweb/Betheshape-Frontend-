// hooks/usePaginationScroll.js
import { useCallback, useEffect, useRef, useState } from 'react';

const usePaginationScroll = (page, isLoading, options = {}) => {
  const {
    offset = 100,
    behavior = 'instant',
    block = 'center',
  } = options;

  const paginationRef = useRef(null);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(null);

  // পেজ চেঞ্জ হ্যান্ডলার
  const handlePageChange = useCallback((newPage, setPageFunction) => {
    if (newPage !== page && !isPageChanging) {
      
      // বর্তমান স্ক্রল পজিশন সংরক্ষণ
      if (paginationRef.current) {
        const rect = paginationRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setSavedScrollPosition({
          top: scrollTop + rect.top,
          height: rect.height,
        });
      }
      
      setIsPageChanging(true);
      setPageFunction(newPage);
    }
  }, [page, isPageChanging]);

  // স্ক্রল পজিশন রিস্টোর করার ইফেক্ট
  useEffect(() => {
    if (isPageChanging && !isLoading && savedScrollPosition) {
      // রিকোয়েস্ট অ্যানিমেশন ফ্রেম ব্যবহার করে স্ক্রল
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScrollPosition.top - offset,
          behavior: behavior,
        });
      });
      
      // স্টেট রিসেট করার জন্য ছোট delay
      setTimeout(() => {
        setIsPageChanging(false);
        setSavedScrollPosition(null);
      }, 100);
    }
  }, [isPageChanging, isLoading, savedScrollPosition, offset, behavior, page]);

  // page পরিবর্তন ট্র্যাক করুন
  useEffect(() => {
   
  }, [page]);

  return {
    paginationRef,
    isPageChanging,
    handlePageChange,
  };
};

export default usePaginationScroll;


