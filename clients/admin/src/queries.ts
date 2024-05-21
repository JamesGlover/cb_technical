import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Patient } from './types'

const BASE_URL = 'http://localhost:3000'
const headers = {"CONTENT-TYPE":"application/json"}

const fetchFn = (path: string, options = {}) => async () => {
  const result = await window.fetch(new URL(path, BASE_URL), options)
  return await result.json()
}

const buildUseQuery = (path: string) => () => useQuery({queryKey: [path], queryFn: fetchFn(path)})

const usePatientsQuery = buildUseQuery('patients')
const useGendersQuery = buildUseQuery('genders')
const useTitlesQuery = buildUseQuery('titles')

const usePatientQuery = (patient_id: number | string) => {
  return useQuery({queryKey: ['patients', patient_id], queryFn: fetchFn(`patients/${patient_id}`)})
}

const useDeletePatientMutation = ({onSuccess = () => {}}={}) => {
  const mutationFn = async (patient_id: string | number) =>  await window.fetch(new URL(`patients/${patient_id}`, BASE_URL), {method: 'DELETE'}) 
  return useMutation({mutationFn, onSuccess})
}

const useUpdatePatientMutation = ({onSuccess = () => {}}={}) => {
  const mutationFn = async (patient: Patient) =>  {
    const body = await JSON.stringify({patient})
    await window.fetch(new URL(`patients/${patient.id}`, BASE_URL), {method: 'PUT', body, headers})
  }
  return useMutation({mutationFn, onSuccess})
}

export {
  usePatientsQuery,
  useGendersQuery,
  useTitlesQuery,
  usePatientQuery,
  QueryClient,
  QueryClientProvider,
  useDeletePatientMutation,
  useUpdatePatientMutation
}

export type {
  UseQueryResult
}
