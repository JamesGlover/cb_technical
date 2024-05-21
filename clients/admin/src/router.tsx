import _ from "react"
import { createBrowserRouter, RouterProvider, redirect, useNavigate, useParams, NavLink } from "react-router-dom"

import Patient from "./pages/Patient"

const router = createBrowserRouter([
  { path: "/", element: <Patient.List />},
  { 
    path: "/patients", 
    element: <Patient.List />,
  },
  {
    path: "/patients/new",
    element: <Patient.New />
  },
  {
    path: "/patients/:patient_id",
    element: <Patient.Show />
  },
  {
    path: "/patients/:patient_id/edit",
    element: <Patient.Edit />
  }
])


export {
  NavLink,
  router,
  RouterProvider,
  redirect,
  useNavigate,
  useParams
}
