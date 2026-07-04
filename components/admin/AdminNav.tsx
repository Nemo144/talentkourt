"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/sportss.png";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  //define the active link route
  const pathname = usePathname();

  //dynamic style for link route
  const style = (path: string) =>
    `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
      pathname === path
        ? "text-[#ff4500] bg-[#252525] border-l-4 border-[#ff4500]"
        : "text-gray-400 hover:text-white hover:bg-[#252525]"
    }`;

  return (
    <div className="bg-[#1a1a1a] flex flex-col h-full">
      <div className="p-6 text-white font-bold text-xl">
        <Image
          src={logo}
          alt="logo"
          placeholder="blur"
          width={40}
          height={40}
        />
      </div>

      <div className="flex flex-col gap-1 px-3 flex-1">
        <Link className={style("/admin")} href="/admin">
          Dashboard
        </Link>

        <Link
          className={style("/admin/user-management")}
          href="/admin/user-management"
        >
          User Management
        </Link>

        <Link
          className={style("/admin/content-moderation")}
          href="/admin/content-moderation"
        >
          Content Moderation
        </Link>

        <Link className={style("/admin/analytics")} href="/admin/analytics">
          Analytics
        </Link>

        <Link className={style("/admin/settings")} href="/admin/settings">
          Settings
        </Link>
      </div>

      <div className="mt-auto p-6">
        <p className="text-gray-500 text-sm mt-auto">Admin Panel v1.0</p>
      </div>
    </div>
  );
};

export default AdminNav;
