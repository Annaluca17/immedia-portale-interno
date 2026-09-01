import {
  Receipt, TrendingUp, Calculator, FileText, Landmark, Gavel, Database, Bot, Zap,
  Coins, CalendarDays, CalendarCheck, UserCog, UserCheck, UserMinus, Users,
  FileSpreadsheet, FileSearch, FileCog, Table, Terminal, Layers, Clock, Mail,
  Banknote, ClipboardList,
} from 'lucide-react';

// Unica mappa nome -> icona del portale: sidebar e card leggono da qui.
const iconMap = {
  receipt: Receipt,
  'trending-up': TrendingUp,
  calculator: Calculator,
  'file-text': FileText,
  landmark: Landmark,
  gavel: Gavel,
  database: Database,
  bot: Bot,
  zap: Zap,
  coins: Coins,
  'calendar-days': CalendarDays,
  'calendar-check': CalendarCheck,
  'user-cog': UserCog,
  'user-check': UserCheck,
  'user-minus': UserMinus,
  users: Users,
  'file-spreadsheet': FileSpreadsheet,
  'file-search': FileSearch,
  'file-cog': FileCog,
  table: Table,
  terminal: Terminal,
  layers: Layers,
  clock: Clock,
  mail: Mail,
  banknote: Banknote,
  'clipboard-list': ClipboardList,
};

export default function AppIcon({ name, size = 16 }) {
  const Icon = iconMap[name];
  return Icon ? <Icon size={size} /> : null;
}
