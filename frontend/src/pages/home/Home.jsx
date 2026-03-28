import MessageContainer from "../../components/messages/MessageContainer"
import Sidebar from "../../components/sidebar/Sidebar"

const Home = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-base-100">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home