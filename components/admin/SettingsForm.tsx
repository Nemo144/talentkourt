"use client";

import React, { useState, useTransition } from "react";
import { ConfigKey } from "@/lib/generated/prisma/enums";
import { updateConfig } from "@/lib/actions/settings";
import {
  Settings,
  Edit2,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Clock,
  User,
} from "lucide-react";

interface ConfigItem {
  key: ConfigKey;
  value: string;
  description: string;
  updatedAt: Date | string;
  adminId: string;
  updatedBy: {
    email: string;
    userType: string;
  };
}

interface SettingsFormProps {
  configs: ConfigItem[];
  currentAdminId: string; // The active session admin id passed down from theserver shell
}

export default function SettingsForm({
  configs,
  currentAdminId,
}: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  // Tracks which config row key enum is currently being actively edited
  const [editingKey, setEditingKey] = useState<ConfigKey | null>(null);

  // Temporary storage holding values modified during live edits before hit save
  const [editValue, setEditValue] = useState<string>("");

  // Local Helper to detect dynamic value shapes based on input conventions
  const getConfigType = (
    key: ConfigKey,
    value: string,
  ): "BOOLEAN" | "NUMBER" | "STRING" => {
    if (value === "true" || value === "false") return "BOOLEAN";
    if (!isNaN(Number(value)) && value.trim() !== "") return "NUMBER";
    return "STRING";
  };

  const handleStartEdit = (item: ConfigItem) => {
    setEditingKey(item.key);
    setEditValue(item.value);
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const handleSaveEdit = (key: ConfigKey) => {
    startTransition(async () => {
      const response = await updateConfig(key, editValue, currentAdminId);
      if (response.success) {
        setEditingKey(null);
      } else {
        alert(`Mutation error: ${response.message}`);
      }
    });
  };

  const handleToggleBoolean = (key: ConfigKey, currentValue: string) => {
    if (isPending) return;
    const toggledValue = currentValue === "true" ? "false" : "true";
    startTransition(async () => {
      await updateConfig(key, toggledValue, currentAdminId);
    });
  };

  return (
    <div className="w-full bg-zinc-950 rounded-2xl border border-zinc-900 shadow-2xl p-6">
      <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-6">
        <div className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-orange-500">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white tracking-wide">
            System Control Registry
          </h2>
          <p className="text-xs text-zinc-500">
            Modify application variables and platform parameters dynamically.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {configs.map((item) => {
          const isRowEditing = editingKey === item.key;
          const valueType = getConfigType(item.key, item.value);

          return (
            <div
              key={item.key}
              className={`rounded-xl border p-5 transition-all ${
                isRowEditing
                  ? "border-orange-500/30 bg-orange-950/5"
                  : "border-zinc-900 bg-zinc-900/10 hover:border-zinc-800"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-orange-400">
                    {item.key.replaceAll("_", " ")}
                  </span>
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-zinc-600 pt-1.5">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>By: {item.updatedBy.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(item.updatedAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  {isRowEditing ? (
                    <div className="flex items-center gap-2 animate-fade-in">
                      {valueType === "NUMBER" ? (
                        <input
                          type="number"
                          value={editValue}
                          disabled={isPending}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-9 w-32 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-center text-white focus:border-orange-500/50 focus:outline-none transition disabled:opacity-40"
                        />
                      ) : valueType === "STRING" ? (
                        <input
                          type="text"
                          value={editValue}
                          disabled={isPending}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-9 w-48 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono px-3 text-white focus:border-orange-500/50 focus:outline-none transition disabled:opacity-40"
                        />
                      ) : null}

                      <button
                        onClick={() => handleSaveEdit(item.key)}
                        disabled={isPending}
                        className="h-9 w-9 rounded-lg bg-emerald-950/40 border border-emerald-900/60 flex items-center justify-center text-emerald-400 hover:bg-emerald-900/30 transition disabled:opacity-40"
                        title="Save Changes"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={isPending}
                        className="h-9 w-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition disabled:opacity-40"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      {valueType === "BOOLEAN" ? (
                        <button
                          onClick={() =>
                            handleToggleBoolean(item.key, item.value)
                          }
                          disabled={isPending}
                          className={`flex items-center transition disabled:opacity-40 ${
                            item.value === "true"
                              ? "text-emerald-500"
                              : "text-zinc-700"
                          }`}
                        >
                          {item.value === "true" ? (
                            <ToggleRight className="w-9 h-9 stroke-[1.5]" />
                          ) : (
                            <ToggleLeft className="w-9 h-9 stroke-[1.5]" />
                          )}
                        </button>
                      ) : (
                        <div className="min-w-[80px] text-center rounded-lg bg-zinc-900 border border-zinc-800/80 px-3 py-1.5 font-mono text-xs font-black text-zinc-100">
                          {item.value}
                        </div>
                      )}

                      {valueType !== "BOOLEAN" && (
                        <button
                          onClick={() => handleStartEdit(item)}
                          disabled={isPending}
                          className="h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 flex items-center gap-1.5 transition disabled:opacity-40"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
