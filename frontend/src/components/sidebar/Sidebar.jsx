import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";
import SearchInput from "./SearchInput";
import SettingsBtn from "./SettingsBtn";

const Sidebar = () => {
  return (
    <div className="border-r border-base-300 bg-base-200 p-4 flex flex-col">
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <div className="mt-auto flex items-center justify-between">
            <LogoutBtn />
            <SettingsBtn />
        </div>
    </div>
  );
};

export default Sidebar;