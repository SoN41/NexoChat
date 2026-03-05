import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";
import SearchInput from "./SearchInput";
import SettingsBtn from "./SettingsBtn";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        
        {/* Action area at the bottom */}
        <div className="mt-auto flex items-center justify-between">
            <LogoutBtn />
            < SettingsBtn />
        </div>
    </div>
  );
};

export default Sidebar;