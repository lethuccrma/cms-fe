import { useCallback, useEffect, useState } from "react";
import AuthorizedAPI from "../../apis/authorized";
import qs from 'qs';
import IPagination from "../../types/IPage";
import { COLLECTION } from "../../configs/server";

function useCollectionData({
  page,
  take,
  collectionName
}: {page: number; take: number; collectionName?: string}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [pagination, setPagination] = useState<{haveNextPage: boolean; total: number}>({haveNextPage: false, total: 0});

  const fetchData = useCallback((preventSetLoading = false) => {
    if (!preventSetLoading) {
      setLoading(true);
    }
    AuthorizedAPI.get<{data: any[]; pagination: IPagination}>(`${COLLECTION}/${collectionName}?${qs.stringify({page, take})}`)
      .then((result) => {
        setData(result.data.data);
        setPagination(result.data.pagination);
      })
      .catch(err => {
        setError(err?.response?.data?.message || err.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, take, collectionName]);

  useEffect(() => {
    fetchData();
  }, [page, take, collectionName]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    pagination: {
      page,
      take,
      ...pagination,
    },
  }
}

export default useCollectionData;
