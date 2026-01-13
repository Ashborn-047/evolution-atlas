import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Download, Code2 } from 'lucide-react';
import { useAtlasStore } from '@/lib/store';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * ShaderVault Component
 * 
 * A slide-out panel displaying live GLSL shader code.
 * Uses React-Syntax-Highlighter (Prism) for high-performance, lightweight inspection.
 */
export function ShaderVault() {
  const { isVaultOpen, activeShaderCode, toggleVault } = useAtlasStore();

  // Custom theme derived from vscDarkPlus to match our Cyber Dark aesthetic
  const customTheme = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#050505',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: '#050505',
      fontFamily: '"JetBrains Mono", monospace',
    },
    'keyword': { color: '#00F0FF', fontWeight: 'bold' },
    'number': { color: '#00FF88' },
    'string': { color: '#FF00FF' },
    'comment': { color: '#666666', fontStyle: 'italic' },
    'function': { color: '#00F0FF' },
    'operator': { color: '#E0E0E0' },
  };


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeShaderCode);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([activeShaderCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shader.glsl';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm z-[100]"
            onClick={toggleVault}
          />

          {/* Vault Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-3/4 lg:w-2/3 bg-[#050505] border-l border-[rgba(224,224,224,0.1)] z-[101] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[rgba(224,224,224,0.1)]">
              <div className="flex items-center gap-3">
                <Code2 className="w-6 h-6 text-[#00F0FF]" />
                <div>
                  <h3 className="font-editorial text-2xl">Shader Vault</h3>
                  <p className="text-xs text-[#999999] mt-1">
                    Raw GLSL code — inspect, copy, deploy
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-[#1A1A1A] transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-[#1A1A1A] transition-colors"
                  title="Download shader"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleVault}
                  className="p-2 hover:bg-[#1A1A1A] transition-colors ml-2"
                  title="Close vault"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Code Viewer */}
            <div className="flex-1 overflow-auto custom-scrollbar bg-[#050505]">
              <SyntaxHighlighter
                language="clike"
                style={customTheme as any}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  height: '100%',
                }}
                showLineNumbers
              >
                {activeShaderCode}
              </SyntaxHighlighter>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[rgba(224,224,224,0.1)] text-xs text-[#999999]">
              <p>
                All shaders are open source. Use freely in your projects. Attribution appreciated.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
