import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ClaimNode {
  id: string;
  title: string;
  status: string;
  isCustom?: boolean;
  note?: string;
  [key: string]: any;
}

interface ClaimStore {
  nodes: ClaimNode[];
  setNodes: (nodes: ClaimNode[]) => void;
  addCustomNode: (index: number, node: ClaimNode) => void;
  removeCustomNode: (id: string) => void;
  updateNodeData: (id: string, newData: any) => void;
}

export const useClaimStore = create<ClaimStore>()(
  persist(
    (set) => ({
      nodes: [],
      setNodes: (nodes) => set({ nodes }),
      addCustomNode: (index, node) =>
        set((state) => {
          const newNodes = [...state.nodes]
          newNodes.splice(index + 1, 0, node)
          return { nodes: newNodes }
        }),
      removeCustomNode: (id) =>
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== id),
        })),
      updateNodeData: (id, newData) => 
        set((state) => ({
          nodes: state.nodes.map(node => 
            node.id === id ? { ...node, ...newData } : node
          )
        }))
    }),
    {
      name: 'claim-storage-v1',
    }
  )
)