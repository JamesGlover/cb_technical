interface Patient {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  date_of_birth: string,
  title: string,
  gender: string,
  created_at: string,
  updated_at: string
}

interface PartialPatient {
  id?: number,
  first_name?: string,
  last_name?: string,
  email?: string,
  phone?: string,
  date_of_birth?: string,
  title?: string,
  gender?: string,
  created_at?: string,
  updated_at?: string
}

type PatientKeys = keyof Patient

interface PatientErrors {
  id?: string[],
  first_name?: string[],
  last_name?: string[],
  email?: string[],
  phone?: string[],
  date_of_birth?: string[],
  title?: string[],
  gender?: string[],
  created_at?: string[],
  updated_at?: string[]
}

export type {
  Patient,
  PartialPatient,
  PatientErrors,
  PatientKeys
}
