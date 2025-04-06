import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Auth = ({ children }: { children: React.ReactNode }) => {
  const naviagate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      naviagate("/signin")
    }
  }, [])
  return children
}

export default Auth