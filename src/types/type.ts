export interface CheckListItem {
    id: number;
    itemCompletionStatus: boolean;
    name: string;
}

export interface CheckList {
    checklistCompletionStatus: boolean;
    id: number;
    name: string;
    items: CheckListItem[];
}