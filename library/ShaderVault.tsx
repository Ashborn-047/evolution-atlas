'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Download, Code2 } from 'lucide-react';
import { useAtlasStore } from '@/lib/store';

/**
 * ShaderVault Component
 * 
 * A slide-out panel displaying live GLSL shader code.
 * Uses Monaco Editor for syntax highlighting and code inspection.
 */
export function ShaderVault() {
  const { isVaultOpen, activeShaderCode, toggleVault } = useAtlasStore();
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);

  // Initialize Monaco Editor
  useEffect(() => {
    if (!isVaultOpen || !editorRef.current || monacoRef.current) return;

    // Dynamically import Monaco to avoid SSR issues
    import('monaco-editor').then((monaco) => {
      if (!editorRef.current) return;

      // Configure Monaco for GLSL
      monaco.languages.register({ id: 'glsl' });
      monaco.languages.setMonarchTokensProvider('glsl', {
        keywords: [
          'attribute', 'const', 'uniform', 'varying', 'break', 'continue',
          'do', 'for', 'while', 'if', 'else', 'in', 'out', 'inout',
          'float', 'int', 'void', 'bool', 'true', 'false',
          'lowp', 'mediump', 'highp', 'precision',
          'invariant', 'discard', 'return', 'mat2', 'mat3', 'mat4',
          'vec2', 'vec3', 'vec4', 'ivec2', 'ivec3', 'ivec4',
          'bvec2', 'bvec3', 'bvec4', 'sampler2D', 'samplerCube',
          'struct',
        ],
        operators: [
          '=', '>', '<', '!', '~', '?', ':',
          '==', '<=', '>=', '!=', '&&', '||', '++', '--',
          '+', '-', '*', '/', '&', '|', '^', '%', '<<',
          '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
          '^=', '%=', '<<=', '>>=', '>>>=',
        ],
        tokenizer: {
          root: [
            [/[a-z_$][\w$]*/, {
              cases: {
                '@keywords': 'keyword',
                '@default': 'identifier',
              },
            }],
            [/[A-Z][\w\$]*/, 'type.identifier'],
            [/[0-9]+\.[0-9]*/, 'number.float'],
            [/[0-9]+/, 'number'],
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
            [/\/\/.*$/, 'comment'],
          ],
          string: [
            [/[^\\"]+/, 'string'],
            [/"/, 'string', '@pop'],
          ],
        },
      });

      // Create editor instance
      const editor = monaco.editor.create(editorRef.current, {
        value: activeShaderCode,
        language: 'glsl',
        theme: 'vs-dark',
        readOnly: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 13,
        fontFamily: 'JetBrains Mono, monospace',
        lineNumbers: 'on',
        renderLineHighlight: 'line',
        automaticLayout: true,
      });

      // Custom dark theme
      monaco.editor.defineTheme('cyber-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: '00F0FF', fontStyle: 'bold' },
          { token: 'number', foreground: '00FF88' },
          { token: 'string', foreground: 'FF00FF' },
          { token: 'comment', foreground: '999999', fontStyle: 'italic' },
        ],
        colors: {
          'editor.background': '#050505',
          'editor.foreground': '#E0E0E0',
          'editor.lineHighlightBackground': '#1A1A1A',
          'editorLineNumber.foreground': '#999999',
          'editorCursor.foreground': '#00F0FF',
        },
      });

      monaco.editor.setTheme('cyber-dark');
      monacoRef.current = editor;
    });

    return () => {
      monacoRef.current?.dispose();
      monacoRef.current = null;
    };
  }, [isVaultOpen]);

  // Update editor content when shader changes
  useEffect(() => {
    if (monacoRef.current && activeShaderCode) {
      monacoRef.current.setValue(activeShaderCode);
    }
  }, [activeShaderCode]);

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

            {/* Monaco Editor Container */}
            <div ref={editorRef} className="flex-1 overflow-hidden" />

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
