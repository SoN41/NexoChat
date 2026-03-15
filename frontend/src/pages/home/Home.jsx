import MessageContainer from "../../components/messages/MessageContainer"
import Sidebar from "../../components/sidebar/Sidebar"

const Home = () => {
  return (
    // Premium Glassmorphism container
    <div className="flex sm:h-[450px] md:h-[550px] w-full max-w-5xl rounded-2xl overflow-hidden bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 border border-gray-700 shadow-2xl">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home