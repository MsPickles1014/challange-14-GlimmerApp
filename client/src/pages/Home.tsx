import { useEffect } from "react"
import Auth from '../utils/auth'; 
export default function Home() {

    useEffect(()=>{
        if (!Auth.loggedIn()) {
            window.location.assign('/login');    
        }
    },[])
  return (
    <div>
      SEARCH BAR PLACEHOLDER
    </div>
  )
}
