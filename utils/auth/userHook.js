import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useUser() {
  const { data, mutate } = useSWR('/api/auth/aUser', fetcher);
  const user = data && data.user;
  return [user, { mutate }];
}
