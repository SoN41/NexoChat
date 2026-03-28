import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout';

const LogoutBtn = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
        {!loading ? (
          <BiLogOut 
            className='w-6 h-6 text-base-content/70 hover:text-red-500 cursor-pointer transition-all'
            onClick={logout}
          />
        ) : (
          <span className='loading loading-spinner text-base-content'></span>
        )}
    </div>
  )
}

export default LogoutBtn;