'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
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
  Bot,
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
  Mail
} from 'lucide-react';
import { LanguageSelector } from "@/components/language-selector";
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
    titleKey: 'dashboard',
    icon: LayoutDashboard,
    href: '/super-admin/dashboard',
  },
  {
    titleKey: 'clubs',
    icon: Building2,
    subItems: [
      { titleKey: 'addClub', href: '/super-admin/clubs/add', icon: UserPlus2 }
    ]
  },
  {
    titleKey: 'clubManagers',
    icon: Users,
    href: '/super-admin/clubs/managers',
  },
  {
    titleKey: 'userManagement',
    icon: Users,
    subItems: [
      { titleKey: 'newUser', href: '/super-admin/users/add', icon: UserPlus2 },
      { titleKey: 'preRegistration', href: '/super-admin/users/pre-register', icon: FileText },
      { titleKey: 'registeredUsers', href: '/super-admin/users/registered', icon: UserCheck },
      { titleKey: 'userGroups', href: '/super-admin/users/groups', icon: Group },
      { titleKey: 'userNotes', href: '/super-admin/users/notes', icon: FileText },
      { titleKey: 'userLevels', href: '/super-admin/users/levels', icon: BarChart },
      { titleKey: 'userAvailability', href: '/super-admin/users/availability', icon: Timer }
    ]
  },
  {
    titleKey: 'trainerManagement',
    icon: UserCog,
    subItems: [
      { titleKey: 'personalInfo', href: '/super-admin/trainers/info', icon: FileText },
      { titleKey: 'availability', href: '/super-admin/trainers/availability', icon: CalendarClock },
      { titleKey: 'calendar', href: '/super-admin/trainers/calendar', icon: Calendar },
      { titleKey: 'lessonSummary', href: '/super-admin/trainers/summary', icon: ClipboardList },
      { titleKey: 'salary', href: '/super-admin/trainers/salary', icon: Wallet }
    ]
  },
  {
    titleKey: 'trainingManagement',
    icon: GraduationCap,
    subItems: [
      { titleKey: 'calendar', href: '/super-admin/training/calendar', icon: Calendar },
      { titleKey: 'program', href: '/super-admin/training/program', icon: ClipboardList }
    ]
  },
  {
    titleKey: 'levelManagement',
    icon: BarChart,
    href: '/super-admin/levels',
  },
  {
    titleKey: 'boatManagement',
    icon: Bot,
    href: '/super-admin/boats',
  },
  {
    titleKey: 'reservationManagement',
    icon: Calendar,
    subItems: [
      { titleKey: 'settings', href: '/super-admin/reservations/settings', icon: Settings }
    ]
  },
  {
    titleKey: 'membershipPackages',
    icon: Package,
    subItems: [
      { titleKey: 'assign', href: '/super-admin/packages/assign', icon: UserPlus },
      { titleKey: 'purchase', href: '/super-admin/packages/purchase', icon: CreditCard }
    ]
  },
  {
    titleKey: 'incomeManagement',
    icon: TrendingUp,
    subItems: [
      { titleKey: 'addIncome', href: '/super-admin/income/add', icon: Plus },
      { titleKey: 'incomeTypes', href: '/super-admin/income/types', icon: List },
      { titleKey: 'currentAccounts', href: '/super-admin/income/accounts', icon: Wallet },
      { titleKey: 'incomeReports', href: '/super-admin/income/reports', icon: FileText }
    ]
  },
  {
    titleKey: 'expenseManagement',
    icon: TrendingDown,
    subItems: [
      { titleKey: 'addExpense', href: '/super-admin/expense/add', icon: Plus },
      { titleKey: 'expenseTypes', href: '/super-admin/expense/types', icon: List },
      { titleKey: 'currentAccounts', href: '/super-admin/expense/accounts', icon: Wallet },
      { titleKey: 'expenseReports', href: '/super-admin/expense/reports', icon: FileText }
    ]
  },
  {
    titleKey: 'definitions',
    icon: Settings,
    href: '/super-admin/definitions',
  },
  {
    titleKey: 'events',
    icon: Calendar,
    href: '/super-admin/events',
  },
  {
    titleKey: 'socialGroups',
    icon: Users,
    href: '/super-admin/social-groups',
  },
  {
    titleKey: 'reports',
    icon: FileText,
    subItems: [
      { titleKey: 'memberReports', href: '/super-admin/reports/members', icon: Users },
      { titleKey: 'financialReports', href: '/super-admin/reports/financial', icon: Wallet },
      { titleKey: 'calendarReports', href: '/super-admin/reports/calendar', icon: Calendar },
      { titleKey: 'trainerReports', href: '/super-admin/reports/trainers', icon: UserCog },
      { titleKey: 'freezeReports', href: '/super-admin/reports/freeze', icon: Timer },
      { titleKey: 'membershipSales', href: '/super-admin/reports/membership-sales', icon: Package },
      { titleKey: 'membershipCollections', href: '/super-admin/reports/membership-collections', icon: CreditCard },
      { titleKey: 'debtReports', href: '/super-admin/reports/debts', icon: TrendingDown },
      { titleKey: 'allTransactions', href: '/super-admin/reports/transactions', icon: List },
      { titleKey: 'entranceExitMovements', href: '/super-admin/reports/entrance-exit', icon: LogIn },
      { titleKey: 'peakHourReport', href: '/super-admin/reports/peak-hours', icon: BarChart },
      { titleKey: 'generalSalesAnalysis', href: '/super-admin/reports/sales-analysis', icon: TrendingUp },
      { titleKey: 'generalCollectionAnalysis', href: '/super-admin/reports/collection-analysis', icon: PieChart },
      { titleKey: 'genderAgeAnalysis', href: '/super-admin/reports/gender-age', icon: Users },
      { titleKey: 'productServiceSales', href: '/super-admin/reports/product-service', icon: ShoppingBag },
      { titleKey: 'expiringMemberships', href: '/super-admin/reports/expiring-memberships', icon: Clock },
      { titleKey: 'activeMembers', href: '/super-admin/reports/active-members', icon: UserCheck },
      { titleKey: 'riskyMembers', href: '/super-admin/reports/risky-members', icon: AlertTriangle },
      { titleKey: 'salesSourceReport', href: '/super-admin/reports/sales-source', icon: Target },
      { titleKey: 'potentialMemberReport', href: '/super-admin/reports/potential-members', icon: UserPlus },
      { titleKey: 'incomeExpenseReports', href: '/super-admin/reports/income-expense', icon: DollarSign },
      { titleKey: 'absentMembers', href: '/super-admin/reports/absent-members', icon: UserX }
    ]
  },
  {
    titleKey: 'calendars',
    icon: Calendar,
    subItems: [
      { titleKey: 'lessonCalendar', href: '/super-admin/calendars/lessons', icon: GraduationCap },
      { titleKey: 'creditCalendar', href: '/super-admin/calendars/credits', icon: CreditCard },
      { titleKey: 'reminderCalendar', href: '/super-admin/calendars/reminders', icon: Bell },
      { titleKey: 'birthdayCalendar', href: '/super-admin/calendars/birthdays', icon: Gift },
      { titleKey: 'memberNotesCalendar', href: '/super-admin/calendars/member-notes', icon: FileText }
    ]
  },
  {
    titleKey: 'clubPromotionalProducts',
    icon: Gift,
    href: '/super-admin/promotional-products',
  },
  {
    titleKey: 'pointOfSale',
    icon: Store,
    href: '/super-admin/pos',
  },
  {
    titleKey: 'system',
    icon: Settings,
    subItems: [
      { titleKey: 'settings', href: '/super-admin/system/settings', icon: Settings },
      { titleKey: 'smsMailManagement', href: '/super-admin/system/sms-mail', icon: Mail }
    ]
  },
  {
    titleKey: 'faq',
    icon: HelpCircle,
    href: '/super-admin/faq',
  },
  {
    titleKey: 'securityProtocols',
    icon: Lock,
    href: '/super-admin/security',
  }
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const t = useTranslations('superAdminSidebar');
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleMenu = (titleKey: string) => {
    setOpenMenus(prev => 
      prev.includes(titleKey) 
        ? prev.filter(key => key !== titleKey)
        : [...prev, titleKey]
    );
  };

  const handleLogout = () => {
    router.push('/super-admin/login');
  };

  const isActive = (href: string) => pathname === href;
  const isMenuActive = (item: MenuItem) => {
    if (item.href) return isActive(item.href);
    return item.subItems?.some(subItem => pathname === subItem.href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block fixed top-0 left-0 h-full bg-zinc-900/50 border-r border-zinc-800 transition-all duration-300 z-40
        ${isOpen ? 'w-84' : 'w-24'}`}
      >
        <button
          onClick={onToggle}
          className="absolute -right-3 top-16 bg-zinc-800 rounded-full p-1.5 hover:bg-zinc-700 transition-colors"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex flex-col h-full p-4">
          {/* Logo ve Başlık */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg" />
              {isOpen && <h1 className="text-base font-semibold text-white">{t('title')}</h1>}
            </div>
            {isOpen && <div className="flex-shrink-0">
              <LanguageSelector />
            </div>}
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
                        "w-full flex items-center text-sm gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors",
                        isMenuActive(item) && "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                      )}
                    >
                      <item.icon size={20} />
                      {isOpen && <span className="flex-1 text-left">{t(item.titleKey)}</span>}
                      {isOpen && <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          openMenus.includes(item.titleKey) && "rotate-180"
                        )}
                      />}
                    </button>
                    
                    {isOpen && openMenus.includes(item.titleKey) && (
                      <div className="ml-4 pl-4 border-l border-zinc-800 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors text-sm",
                              isActive(subItem.href) && "bg-blue-500/10 text-blue-500 border border-blue-500/20"
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
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors",
                      isActive(item.href!) && "bg-blue-500/10 text-blue-500 border border-blue-500/20"
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
          <div className="mt-auto pt-4 border-t border-zinc-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              {isOpen && <span>{t('logout')}</span>}
            </button>
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
                "bg-zinc-900/90 border-zinc-800",
                isSheetOpen && "hidden"
              )}
            >
              <Menu className="h-5 w-5 text-zinc-400" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 bg-zinc-900/95 border-zinc-800/50 backdrop-blur-sm">
            <div className="flex flex-col h-full p-4">
              {/* Logo ve Başlık */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg" />
                  <h1 className="text-sm font-semibold text-white">{t('title')}</h1>
                </div>
                <div className="flex-shrink-0">
                  <LanguageSelector />
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
                            "w-full flex items-center text-sm gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors",
                            isMenuActive(item) && "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          )}
                        >
                          <item.icon size={20} />
                          <span className="flex-1 text-left">{t(item.titleKey)}</span>
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform duration-200",
                              openMenus.includes(item.titleKey) && "rotate-180"
                            )}
                          />
                        </button>
                        
                        {openMenus.includes(item.titleKey) && (
                          <div className="ml-4 pl-4 border-l border-zinc-800 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors text-sm",
                                  isActive(subItem.href) && "bg-blue-500/10 text-blue-500 border border-blue-500/20"
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
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors",
                          isActive(item.href!) && "bg-blue-500/10 text-blue-500 border border-blue-500/20"
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
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span>{t('logout')}</span>
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
