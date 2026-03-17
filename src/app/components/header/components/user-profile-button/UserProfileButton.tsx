import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { authApi, useLogoutUserMutation } from "@/app/store/api/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store/hooks";

const UserProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [logoutUser] = useLogoutUserMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfile = () => {
    setIsOpen(false);
  };

  const handleAdmin = () => {
    router.push('/admin/events')
  }

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Logout successfully");
      dispatch(authApi.util.resetApiState());
      router.push("/");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      toast.error("Logout failed, try again");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-blue-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={handleProfile}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg transition cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-400" />
            Profile
          </button>

          <hr className="border-gray-100" />

          <button
            onClick={handleAdmin}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg transition cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-400" />
            Admin
          </button>

          <hr className="border-gray-100" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-b-lg transition cursor-pointer"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileButton;
