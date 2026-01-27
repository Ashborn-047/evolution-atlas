import React from 'react';
import '../styles/components.css';

type Alignment = 'left' | 'right' | 'center';

interface SectionProps {
    id: string;
    children: React.ReactNode;
    alignment?: Alignment;
    className?: string;
}

/**
 * Section component for spatial text positioning
 * Supports left, right, and center alignment configurations
 */
export const Section: React.FC<SectionProps> = ({
    id,
    children,
    alignment = 'center',
    className = '',
}) => {
    const alignClass: Record<Alignment, string> = {
        left: 'section--left',
        right: 'section--right',
        center: 'section--center',
    };

    return (
        <section
            id={id}
            className={`section ${alignClass[alignment]} ${className}`}
        >
            <div className="section__content">
                {children}
            </div>
        </section>
    );
};
