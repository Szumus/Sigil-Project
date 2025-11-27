import React from "react";

export interface CardProps {
  title: string;
  desc: string;
  img: string;
  path: string;
}
export interface ToolTipProps {
  text: string;
  icon: React.ReactNode;
}
export interface StatProps {
  numberOfInputs: number;
  statsName: string;
}
export interface Status {
  id: string;
  name: string;
  description?: string;
}


export interface StatusSelectorProps {
  states: Status[];
  selectedStatus: string;
  setSelectedStatus: (v: string) => void;
  selectedLevel: number;
  setSelectedLevel: (v: number) => void;
  addStatus: () => void;
  onPreviewEnter: (e: React.MouseEvent, status: Status, level: number) => void;
  onPreviewLeave: () => void;
}

export interface StatusListProps {
  statuses: SelectedStatus[];
  states: Status[];
  editingIndex: number | null;
  toggleEdit: (i: number) => void;
  updateLevel: (i: number, lvl: number) => void;
  removeStatus: (i: number) => void;
  onHoverEnter: (e: React.MouseEvent, status: Status, level: number) => void;
  onHoverLeave: () => void;
}
export interface SelectedStatus {
  status: Status;
  level: number;
}



