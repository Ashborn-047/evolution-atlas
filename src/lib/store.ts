import { create } from 'zustand';

interface ShaderUniforms {
  uTime: number;
  uMouse: [number, number];
  uViscosity: number;
  uDistortion: number;
  uColor: [number, number, number];
  uIntensity: number;
}

interface AtlasStore {
  // Active exhibit tracking
  activeExhibit: string | null;
  setActiveExhibit: (id: string | null) => void;
  
  // Shader state
  shaderUniforms: ShaderUniforms;
  updateUniform: <K extends keyof ShaderUniforms>(key: K, value: ShaderUniforms[K]) => void;
  
  // Shader vault state
  isVaultOpen: boolean;
  activeShaderCode: string;
  toggleVault: () => void;
  setActiveShaderCode: (code: string) => void;
  
  // Scroll documentary state
  documentaryProgress: number;
  setDocumentaryProgress: (progress: number) => void;
}

export const useAtlasStore = create<AtlasStore>((set) => ({
  // Active exhibit
  activeExhibit: null,
  setActiveExhibit: (id) => set({ activeExhibit: id }),
  
  // Shader uniforms
  shaderUniforms: {
    uTime: 0,
    uMouse: [0, 0],
    uViscosity: 0.5,
    uDistortion: 1.0,
    uColor: [0, 0.94, 1], // Cyan #00F0FF
    uIntensity: 1.0,
  },
  updateUniform: (key, value) =>
    set((state) => ({
      shaderUniforms: {
        ...state.shaderUniforms,
        [key]: value,
      },
    })),
  
  // Shader vault
  isVaultOpen: false,
  activeShaderCode: '',
  toggleVault: () => set((state) => ({ isVaultOpen: !state.isVaultOpen })),
  setActiveShaderCode: (code) => set({ activeShaderCode: code }),
  
  // Documentary scroll
  documentaryProgress: 0,
  setDocumentaryProgress: (progress) => set({ documentaryProgress: progress }),
}));
