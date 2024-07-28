import { auth } from "@/auth"
import  Contact  from "@/component/Contact"


const Home = async() => {
  const session = await auth()
  return (
    
        <div>
          <Contact/>
        </div>
      
  
  )
}

export default Home
