import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

export function CodeBlock({ code, title }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden mb-8 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {title}
                </span>
                <button
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs text-indigo-300 font-mono leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export default CodeBlock;
