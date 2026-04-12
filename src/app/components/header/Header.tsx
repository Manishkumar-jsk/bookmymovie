"use client";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/app/context/AuthContext";
import UserProfileButton from "./components/user-profile-button/UserProfileButton";
import { useGetEventsLocationQuery } from "@/app/store/api/eventsApi";
import { useAppDispatch } from "@/app/store/hooks";
import { useEffect, useState } from "react";
import { setLocation } from "@/app/store/slices/locationSlice";

const Header = () => {
  const router = useRouter();
  const data = useAuth();
  const {data:locationData} = useGetEventsLocationQuery();
  const [locations,setLocations] = useState(locationData?.locations.at(0) || '');
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(setLocation({location:locations}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[locations,locationData])
  return (
    <header className="flex items-center justify-between px-6 py-[14px] shadow-md">
      <h1
        className="text-2xl font-bold text-red-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <FontAwesomeIcon icon={faCompactDisc} /> EventBook
      </h1>

      <div className="flex items-center gap-4">
        <select  className="rounded-md px-3 py-2 text-sm outline-none cursor-pointer" onChange={(e) => setLocations(e.target.value)}>
          {locationData?.locations?.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        {data?.user ? (
          <UserProfileButton role={data?.user?.role} />
        ) : (
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
