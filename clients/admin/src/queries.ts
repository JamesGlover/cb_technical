import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const BASE_URL = 'http://localhost:3000'

const fetchFn = (path: string) => async () => window.fetch(new URL(path, BASE_URL))
const buildUseQuery = (path: string) => () => useQuery({queryKey: [path], queryFn: fetchFn(path)})

const usePatientsQuery = buildUseQuery('patients')
const useGendersQuery = buildUseQuery('genders')
const useTitlesQuery = buildUseQuery('titles')

export {
  usePatientsQuery,
  useGendersQuery,
  useTitlesQuery,
  QueryClient,
  QueryClientProvider,
}
