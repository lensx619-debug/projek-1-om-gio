import React from 'react';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Sparkles,
  Sliders,
  PlaySquare,
  FileText,
  Lock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  Crown
} from 'lucide-react';

import { UserProfile } from '../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenAdmin: () => void;
  onOpenLifetimePro: () => void;
  currentUser?: UserProfile | null;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  activeSection,
  onSelectSection,
  onOpenAdmin,
  onOpenLifetimePro,
  currentUser,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const isAdmin = currentUser?.role === 'admin';
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      sublabel: 'Project workspace',
      icon: LayoutDashboard,
    },
    {
      id: 'references',
      label: 'References',
      sublabel: 'Product + Character',
      icon: ImageIcon,
    },
    {
      id: 'creative-direction',
      label: 'Creative Direction',
      sublabel: 'Mode + strategy',
      icon: Sparkles,
    },
    {
      id: 'creative-tools',
      label: 'Creative Tools',
      sublabel: 'Hook • Product • Character',
      icon: Sliders,
    },
    {
      id: 'production',
      label: 'Production',
      sublabel: 'Duration • Engine • Ratio',
      icon: PlaySquare,
    },
    {
      id: 'output',
      label: 'Output',
      sublabel: 'Storyboard • Video • Social',
      icon: FileText,
    },
  ];

  const renderNavButtons = (isDrawer = false) => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              onSelectSection(item.id);
              if (isDrawer && onCloseMobile) {
                onCloseMobile();
              }
            }}
            title={collapsed && !isDrawer ? `${item.label} (${item.sublabel})` : undefined}
            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/8 to-transparent text-amber-200 border-l-2 border-l-amber-400 border-y-transparent border-r-transparent shadow-sm'
                : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent'
            }`}
          >
            <Icon
              className={`h-5 w-5 shrink-0 transition-transform ${
                isActive ? 'text-amber-400 scale-105' : 'text-slate-400 group-hover:text-slate-200'
              }`}
            />
            {(!collapsed || isDrawer) && (
              <div className="min-w-0 flex-1 truncate">
                <div className={`text-xs font-semibold leading-none ${isActive ? 'text-amber-200' : 'text-slate-200'}`}>
                  {item.label}
                </div>
                <div className="text-[10px] text-slate-400 pt-0.5 truncate leading-tight">
                  {item.sublabel}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ======================================================== */}
      {/* 1. MOBILE & TABLET DRAWER OVERLAY (SLIDE-OVER) */}
      {/* ======================================================== */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        >
          <div
            className="relative h-full w-72 max-w-[85vw] bg-[#090A10] border-r border-white/[0.08] p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 font-extrabold text-slate-950 shadow-md text-base">
                    OG
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-white tracking-tight text-sm">Om Gio</span>
                      <span className="text-[9px] font-bold text-amber-400 tracking-wider">
                        STUDIO V11
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Executive Director
                    </p>
                  </div>
                </div>

                <button
                  onClick={onCloseMobile}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Tutup Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Nav Items */}
              <p className="px-2 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Studio Workspace
              </p>
              {renderNavButtons(true)}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-3 border-t border-white/[0.08] space-y-2">
              {isAdmin && (
                <button
                  onClick={() => {
                    onOpenAdmin();
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-amber-500/30 bg-[#161826] px-3 py-2 text-xs font-semibold text-amber-300 hover:text-white"
                >
                  <Lock className="h-3.5 w-3.5 text-amber-400" />
                  <span>Admin (API Key)</span>
                </button>
              )}

              <button
                onClick={() => {
                  onOpenLifetimePro();
                  if (onCloseMobile) onCloseMobile();
                }}
                className="flex w-full items-center gap-2.5 rounded-xl border border-amber-500/40 bg-amber-950/20 px-3 py-2 text-xs font-semibold text-amber-300"
              >
                <Crown className="h-4 w-4 text-amber-400" />
                <span>Lifetime Pro Member</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DESKTOP PERMANENT SIDEBAR (LG+) */}
      {/* ======================================================== */}
      <aside
        className={`hidden lg:flex relative flex-col justify-between border-r border-white/[0.08] bg-[#08090E] transition-all duration-300 select-none z-30 shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Top Header & Branding */}
        <div>
          <div className="flex items-center gap-3 p-4 border-b border-white/[0.08]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 text-lg">
              OG
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-100 tracking-tight text-base whitespace-nowrap">
                    Om Gio
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 tracking-wider">
                    STUDIO
                  </span>
                </div>
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  CREATIVE DIRECTOR
                </p>
              </div>
            )}
          </div>

          {/* WORKSPACE SECTION */}
          <div className="p-3">
            {!collapsed && (
              <p className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                STUDIO SUITE
              </p>
            )}

            {renderNavButtons(false)}
          </div>
        </div>

        {/* Bottom Area */}
        <div className="p-3 border-t border-white/[0.08] space-y-3">
          {/* Status Pill */}
          {!collapsed ? (
            <div className="rounded-xl bg-[#10121B] border border-white/[0.06] p-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <span className="text-[11px] font-semibold text-slate-200">Cinema Engine Online</span>
              </div>
              <div className="text-[10px] text-slate-400 pl-4 pt-0.5">
                V11.1 • Cinema Flow Active
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="Cinema Engine Ready (V11.1)">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            </div>
          )}

          {/* Admin Settings Button: Only for Admin */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className={`flex w-full items-center gap-2 rounded-xl border border-amber-500/30 bg-[#161826] hover:bg-[#1c2032] py-2 text-xs font-semibold text-amber-300 hover:text-white transition-all cursor-pointer ${
                collapsed ? 'justify-center px-0' : 'px-3'
              }`}
              title={collapsed ? 'Admin (API Key)' : undefined}
            >
              <Lock className="h-4 w-4 text-amber-400" />
              {!collapsed && <span>Admin (API Key)</span>}
            </button>
          )}

          {/* Lifetime Pro Button */}
          <button
            onClick={onOpenLifetimePro}
            className={`flex w-full items-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 to-amber-900/20 py-2 text-xs font-bold text-amber-300 hover:border-amber-400 transition-all cursor-pointer shadow-sm ${
              collapsed ? 'justify-center px-0' : 'px-3'
            }`}
            title={collapsed ? 'Lifetime Pro Member' : undefined}
          >
            <Crown className="h-4 w-4 text-amber-400" />
            {!collapsed && <span>Lifetime Pro Member</span>}
          </button>

          {/* Collapse Toggle Arrow */}
          <div className="pt-1 flex justify-end">
            <button
              onClick={onToggleCollapse}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-[#11131D] text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title={collapsed ? 'Perluas Sidebar' : 'Kecilkan Sidebar'}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
