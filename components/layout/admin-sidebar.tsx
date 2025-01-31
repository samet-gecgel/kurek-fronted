"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  Calendar,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  UserPlus2,
  ClipboardList,
  FileText,
  UserCheck,
  //UserX,
  Group,
  Timer,
  CalendarClock,
  //Receipt,
  Wallet,
  LucideIcon,
  GraduationCap,
  Sailboat,
  Package,
  CreditCard,
  Plus,
  List,
  TrendingUp,
  TrendingDown,
  HelpCircle,
  Lock,
  Gift,
  Store,
  UserPlus,
  Menu,
  LogIn,
  PieChart,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Target,
  DollarSign,
  UserX,
  Bell,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "../LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface MenuItem {
  titleKey: string;
  icon: LucideIcon;
  href?: string;
  subItems?: {
    titleKey: string;
    href: string;
    icon?: LucideIcon;
  }[];
}

const menuItems: MenuItem[] = [
  {
    titleKey: "dashboard",
    icon: LayoutDashboard,
    href: "/admin/controlpanel/dashboard",
  },
  {
    titleKey: "clubs",
    icon: Building2,
    href: "/admin/controlpanel/club/myclub",
  },
  {
    titleKey: "clubManagers",
    icon: Users,
    href: "/admin/controlpanel/club/managers",
  },
  {
    titleKey: "userManagement",
    icon: Users,
    subItems: [
      {
        titleKey: "newUser",
        href: "/admin/controlpanel/users/add",
        icon: UserPlus2,
      },
      {
        titleKey: "preRegistration",
        href: "/admin/controlpanel/users/pre-register",
        icon: FileText,
      },
      {
        titleKey: "registeredUsers",
        href: "/admin/controlpanel/users/registered",
        icon: UserCheck,
      },
      {
        titleKey: "userGroups",
        href: "/admin/controlpanel/users/groups",
        icon: Group,
      },
      {
        titleKey: "userNotes",
        href: "/admin/controlpanel/users/notes",
        icon: FileText,
      },
      {
        titleKey: "userLevels",
        href: "/admin/controlpanel/users/levels",
        icon: BarChart,
      },
      {
        titleKey: "userAvailability",
        href: "/admin/controlpanel/users/availability",
        icon: Timer,
      },
    ],
  },
  {
    titleKey: "trainerManagement",
    icon: UserCog,
    subItems: [
      {
        titleKey: "trainerList",
        href: "/admin/controlpanel/trainers/list",
        icon: List,
      },
      {
        titleKey: "availability",
        href: "/admin/controlpanel/trainers/availability",
        icon: CalendarClock,
      },
      {
        titleKey: "calendar",
        href: "/admin/controlpanel/trainers/calendar",
        icon: Calendar,
      },
      {
        titleKey: "lessonSummary",
        href: "/admin/controlpanel/trainers/summary",
        icon: ClipboardList,
      },
      {
        titleKey: "salary",
        href: "/admin/controlpanel/trainers/salary",
        icon: Wallet,
      },
    ],
  },
  {
    titleKey: "trainingManagement",
    icon: GraduationCap,
    subItems: [
      {
        titleKey: "calendar",
        href: "/admin/controlpanel/training/calendar",
        icon: Calendar,
      },
      {
        titleKey: "program",
        href: "/admin/controlpanel/training/program",
        icon: ClipboardList,
      },
    ],
  },
  {
    titleKey: "boatManagement",
    icon: Sailboat,
    href: "/admin/controlpanel/boats",
  },
  {
    titleKey: "reservationManagement",
    icon: Calendar,
    subItems: [
      {
        titleKey: "reservationSettings",
        href: "/admin/controlpanel/reservations/settings",
        icon: Settings,
      },
    ],
  },
  {
    titleKey: "membershipPackages",
    icon: Package,
    subItems: [
      {
        titleKey: "assign",
        href: "/admin/controlpanel/packages/assign",
        icon: UserPlus,
      },
      {
        titleKey: "purchase",
        href: "/admin/controlpanel/packages/purchase",
        icon: CreditCard,
      },
    ],
  },
  {
    titleKey: "incomeManagement",
    icon: TrendingUp,
    subItems: [
      {
        titleKey: "addIncome",
        href: "/admin/controlpanel/income/add",
        icon: Plus,
      },
      {
        titleKey: "incomeTypes",
        href: "/admin/controlpanel/income/types",
        icon: List,
      },
      {
        titleKey: "currentAccounts",
        href: "/admin/controlpanel/income/accounts",
        icon: Wallet,
      },
      {
        titleKey: "incomeReports",
        href: "/admin/controlpanel/income/reports",
        icon: FileText,
      },
    ],
  },
  {
    titleKey: "expenseManagement",
    icon: TrendingDown,
    subItems: [
      {
        titleKey: "addExpense",
        href: "/admin/controlpanel/expense/add",
        icon: Plus,
      },
      {
        titleKey: "expenseTypes",
        href: "/admin/controlpanel/expense/types",
        icon: List,
      },
      {
        titleKey: "currentAccounts",
        href: "/admin/controlpanel/expense/accounts",
        icon: Wallet,
      },
      {
        titleKey: "expenseReports",
        href: "/admin/controlpanel/expense/reports",
        icon: FileText,
      },
    ],
  },
  {
    titleKey: "definitions",
    icon: Settings,
    href: "/admin/controlpanel/definitions",
  },
  {
    titleKey: "events",
    icon: Calendar,
    href: "/admin/controlpanel/events",
  },
  {
    titleKey: "socialGroups",
    icon: Users,
    href: "/admin/controlpanel/social-groups",
  },
  {
    titleKey: "reports",
    icon: FileText,
    subItems: [
      {
        titleKey: "memberReports",
        href: "/admin/controlpanel/reports/members",
        icon: Users,
      },
      {
        titleKey: "financialReports",
        href: "/admin/controlpanel/reports/financial",
        icon: Wallet,
      },
      {
        titleKey: "calendarReports",
        href: "/admin/controlpanel/reports/calendar",
        icon: Calendar,
      },
      {
        titleKey: "trainerReports",
        href: "/admin/controlpanel/reports/trainers",
        icon: UserCog,
      },
      {
        titleKey: "freezeReports",
        href: "/admin/controlpanel/reports/freeze",
        icon: Timer,
      },
      {
        titleKey: "membershipSales",
        href: "/admin/controlpanel/reports/membership-sales",
        icon: Package,
      },
      {
        titleKey: "membershipCollections",
        href: "/admin/controlpanel/reports/membership-collections",
        icon: CreditCard,
      },
      {
        titleKey: "debtReports",
        href: "/admin/controlpanel/reports/debts",
        icon: TrendingDown,
      },
      {
        titleKey: "allTransactions",
        href: "/admin/controlpanel/reports/transactions",
        icon: List,
      },
      {
        titleKey: "entranceExitMovements",
        href: "/admin/controlpanel/reports/entrance-exit",
        icon: LogIn,
      },
      {
        titleKey: "peakHourReport",
        href: "/admin/controlpanel/reports/peak-hours",
        icon: BarChart,
      },
      {
        titleKey: "generalSalesAnalysis",
        href: "/admin/controlpanel/reports/sales-analysis",
        icon: TrendingUp,
      },
      {
        titleKey: "generalCollectionAnalysis",
        href: "/admin/controlpanel/reports/collection-analysis",
        icon: PieChart,
      },
      {
        titleKey: "genderAgeAnalysis",
        href: "/admin/controlpanel/reports/gender-age",
        icon: Users,
      },
      {
        titleKey: "productServiceSales",
        href: "/admin/controlpanel/reports/product-service",
        icon: ShoppingBag,
      },
      {
        titleKey: "expiringMemberships",
        href: "/admin/controlpanel/reports/expiring-memberships",
        icon: Clock,
      },
      {
        titleKey: "activeMembers",
        href: "/admin/controlpanel/reports/active-members",
        icon: UserCheck,
      },
      {
        titleKey: "riskyMembers",
        href: "/admin/controlpanel/reports/risky-members",
        icon: AlertTriangle,
      },
      {
        titleKey: "salesSourceReport",
        href: "/admin/controlpanel/reports/sales-source",
        icon: Target,
      },
      {
        titleKey: "potentialMemberReport",
        href: "/admin/controlpanel/reports/potential-members",
        icon: UserPlus,
      },
      {
        titleKey: "incomeExpenseReports",
        href: "/admin/controlpanel/reports/income-expense",
        icon: DollarSign,
      },
      {
        titleKey: "absentMembers",
        href: "/admin/controlpanel/reports/absent-members",
        icon: UserX,
      },
    ],
  },
  {
    titleKey: "calendars",
    icon: Calendar,
    subItems: [
      {
        titleKey: "lessonCalendar",
        href: "/admin/controlpanel/calendars/lessons",
        icon: GraduationCap,
      },
      {
        titleKey: "creditCalendar",
        href: "/admin/controlpanel/calendars/credits",
        icon: CreditCard,
      },
      {
        titleKey: "reminderCalendar",
        href: "/admin/controlpanel/calendars/reminders",
        icon: Bell,
      },
      {
        titleKey: "birthdayCalendar",
        href: "/admin/controlpanel/calendars/birthdays",
        icon: Gift,
      },
      {
        titleKey: "memberNotesCalendar",
        href: "/admin/controlpanel/calendars/member-notes",
        icon: FileText,
      },
    ],
  },
  {
    titleKey: "clubPromotionalProducts",
    icon: Gift,
    href: "/admin/controlpanel/promotional-products",
  },
  {
    titleKey: "pointOfSale",
    icon: Store,
    href: "/admin/controlpanel/pos",
  },
  {
    titleKey: "system",
    icon: Settings,
    subItems: [
      {
        titleKey: "settings",
        href: "/admin/controlpanel/system/settings",
        icon: Settings,
      },
      {
        titleKey: "smsMailManagement",
        href: "/admin/controlpanel/system/sms-mail",
        icon: Mail,
      },
    ],
  },
  {
    titleKey: "faq",
    icon: HelpCircle,
    href: "/admin/controlpanel/faq",
  },
  {
    titleKey: "securityProtocols",
    icon: Lock,
    href: "/admin/controlpanel/security",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const t = useTranslations("superAdminSidebar");
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleMenu = (titleKey: string) => {
    setOpenMenus((prev) =>
      prev.includes(titleKey)
        ? prev.filter((key) => key !== titleKey)
        : [...prev, titleKey]
    );
  };

  const handleLogout = () => {
    router.push("/admin/controlpanel/login");
  };

  const isActive = (href: string) => pathname === href;
  const isMenuActive = (item: MenuItem) => {
    if (item.href) return isActive(item.href);
    return item.subItems?.some((subItem) => pathname === subItem.href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block fixed top-0 left-0 h-full 
          bg-white dark:bg-zinc-950 border-r border-border 
          shadow-sm transition-all duration-300 z-40
          ${isOpen ? "w-84" : "w-24"}`}
      >
        <button
          onClick={onToggle}
          className="absolute -right-3 top-16 
            bg-background border border-border
            rounded-full p-1.5 
            hover:bg-accent 
            transition-colors
            shadow-sm"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex flex-col h-full p-4">
          {/* Logo ve Başlık */}
          <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg" />
              {isOpen && (
                <h1 className="text-base font-semibold text-foreground">
                  {t("title")}
                </h1>
              )}
            </div>
          </div>

          {/* Menü */}
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.titleKey}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleMenu(item.titleKey)}
                      className={cn(
                        "w-full flex items-center text-sm gap-3 px-3 py-2 rounded-lg",
                        "text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
                        "hover:bg-accent/50 transition-colors",
                        isMenuActive(item) && "bg-primary/10 text-primary border border-primary/20"
                      )}
                    >
                      <item.icon size={20} />
                      {isOpen && (
                        <span className="flex-1 text-left">
                          {t(item.titleKey)}
                        </span>
                      )}
                      {isOpen && (
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            openMenus.includes(item.titleKey) && "rotate-180"
                          )}
                        />
                      )}
                    </button>

                    {isOpen && openMenus.includes(item.titleKey) && (
                      <div className="ml-4 pl-4 border-l border-border space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg",
                              "text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
                              "hover:bg-accent/50 transition-colors text-sm",
                              isActive(subItem.href) && "bg-primary/10 text-primary border border-primary/20"
                            )}
                          >
                            {subItem.icon && <subItem.icon size={16} />}
                            {isOpen && <span>{t(subItem.titleKey)}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg",
                      "text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
                      "hover:bg-accent/50 transition-colors",
                      isActive(item.href!) && "bg-primary/10 text-primary border border-primary/20"
                    )}
                  >
                    <item.icon size={20} />
                    {isOpen && <span>{t(item.titleKey)}</span>}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Çıkış Butonu */}
          <div className="mt-auto pt-4 border-t border-border">
            {isOpen ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-4">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2 px-4 py-2 
                    text-sm font-medium text-red-500 hover:bg-red-500/10
                    rounded-lg transition-colors duration-200"
                >
                  <LogOut size={20} />
                  <span>{t("logout")}</span>
                </motion.button>
              </div>
            ) : (
              <div>
                
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center justify-center w-full p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
              >
                <LogOut size={20} />
              </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-[100]">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "bg-white border-zinc-200 dark:bg-zinc-900/90 dark:border-zinc-800",
                isSheetOpen && "hidden"
              )}
            >
              <Menu className="h-5 w-5 text-black dark:text-zinc-400" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 p-0 bg-background/95 border-border/50 backdrop-blur-sm"
          >
            <div className="flex flex-col h-full p-4">
              {/* Logo ve Başlık */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg" />
                  <h1 className="text-sm font-semibold text-foreground">
                    {t("title")}
                  </h1>
                </div>
              </div>

              {/* Menü */}
              <nav className="space-y-2 flex-1 overflow-y-auto mt-6">
                {menuItems.map((item) => (
                  <div key={item.titleKey}>
                    {item.subItems ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleMenu(item.titleKey)}
                          className={cn(
                            "w-full flex items-center text-sm gap-3 px-3 py-2 rounded-lg",
                            "text-muted-foreground hover:text-foreground",
                            "hover:bg-accent/50 transition-colors",
                            isMenuActive(item) && "bg-primary/10 text-primary border border-primary/20"
                          )}
                        >
                          <item.icon size={20} />
                          <span className="flex-1 text-left">
                            {t(item.titleKey)}
                          </span>
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform duration-200",
                              openMenus.includes(item.titleKey) && "rotate-180"
                            )}
                          />
                        </button>

                        {openMenus.includes(item.titleKey) && (
                          <div className="ml-4 pl-4 border-l border-border space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg",
                                  "text-muted-foreground hover:text-foreground",
                                  "hover:bg-accent/50 transition-colors text-sm",
                                  isActive(subItem.href) && "bg-primary/10 text-primary border border-primary/20"
                                )}
                              >
                                {subItem.icon && <subItem.icon size={16} />}
                                <span>{t(subItem.titleKey)}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg",
                          "text-muted-foreground hover:text-foreground",
                          "hover:bg-accent/50 transition-colors",
                          isActive(item.href!) && "bg-primary/10 text-primary border border-primary/20"
                        )}
                      >
                        <item.icon size={20} />
                        <span>{t(item.titleKey)}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Çıkış Butonu */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                <div className="flex items-center justify-between px-4">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={20} />
                  {t("logout")}
                </motion.button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
