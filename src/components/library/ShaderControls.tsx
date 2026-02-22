'use client';

import { useAtlasStore } from '@/lib/store';
import { Sliders } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * ShaderControls Component
 * 
 * A HUD panel for real-time shader uniform manipulation.
 * Useful for experimenting with shader parameters during development.
 */
export function ShaderControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { shaderUniforms, updateUniform } = useAtlasStore();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 glass-panel hud-border hover:border-[#00F0FF] transition-colors"
        title="Shader Controls"
        aria-label="Toggle Shader Controls"
      >
        <Sliders className="w-6 h-6" />
      </button>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-80 glass-panel hud-border p-6"
          >
            <h3 className="font-editorial text-xl mb-4">Shader Controls</h3>
            <p className="text-xs text-[#999999] mb-6">
              Real-time uniform manipulation
            </p>

            <div className="space-y-6">
              {/* Viscosity */}
              <div>
                <label className="text-sm text-[#E0E0E0] block mb-2">
                  Viscosity: {shaderUniforms.uViscosity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={shaderUniforms.uViscosity}
                  onChange={(e) => updateUniform('uViscosity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Distortion */}
              <div>
                <label className="text-sm text-[#E0E0E0] block mb-2">
                  Distortion: {shaderUniforms.uDistortion.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.01"
                  value={shaderUniforms.uDistortion}
                  onChange={(e) => updateUniform('uDistortion', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Intensity */}
              <div>
                <label className="text-sm text-[#E0E0E0] block mb-2">
                  Intensity: {shaderUniforms.uIntensity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={shaderUniforms.uIntensity}
                  onChange={(e) => updateUniform('uIntensity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Color Presets */}
              <div>
                <label className="text-sm text-[#E0E0E0] block mb-2">
                  Color Preset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateUniform('uColor', [0, 0.94, 1])}
                    className="p-2 border border-[rgba(224,224,224,0.1)] hover:border-[#00F0FF]"
                    style={{ background: '#00F0FF' }}
                    title="Cyan"
                  />
                  <button
                    onClick={() => updateUniform('uColor', [1, 0, 1])}
                    className="p-2 border border-[rgba(224,224,224,0.1)] hover:border-[#FF00FF]"
                    style={{ background: '#FF00FF' }}
                    title="Magenta"
                  />
                  <button
                    onClick={() => updateUniform('uColor', [0, 1, 0.53])}
                    className="p-2 border border-[rgba(224,224,224,0.1)] hover:border-[#00FF88]"
                    style={{ background: '#00FF88' }}
                    title="Bio Green"
                  />
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  updateUniform('uViscosity', 0.5);
                  updateUniform('uDistortion', 1.0);
                  updateUniform('uIntensity', 1.0);
                  updateUniform('uColor', [0, 0.94, 1]);
                }}
                className="w-full py-2 border border-[rgba(224,224,224,0.1)] hover:border-[#E0E0E0] transition-colors text-sm"
              >
                Reset to Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
