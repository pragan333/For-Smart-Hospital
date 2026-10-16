"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Patients", href: "/patients", icon: "🏥" },
  { name: "Beds", href: "/beds", icon: "🛏️" },
  { name: "Tasks", href: "/tasks", icon: "📋" },
  { name: "Staff", href: "/staff", icon: "👨‍⚕️" },
  { name: "Departments", href: "/departments", icon: "🏢" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-700">Smart Hospital</h1>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-primary-50 text-primary-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 text-xs text-gray-400">
        Hospital Workflow Optimization v0.1
      </div>
    </aside>
  );
}
