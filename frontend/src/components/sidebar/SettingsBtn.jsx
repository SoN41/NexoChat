import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const SettingsBtn = () => {
    return (
        <div className='mt-auto'>
            <Link to='/settings'>
                <IoSettingsSharp className='w-6 h-6 text-base-content/70 hover:text-blue-500 cursor-pointer transition-all' />
            </Link>
        </div>
    );
};

export default SettingsBtn;