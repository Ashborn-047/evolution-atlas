import {
    NavigationExperiment,
    ButtonsExperiment,
    CardsExperiment,
    CarouselExperiment,
    StatusTagsExperiment
} from "../experiments";

/**
 * EXPERIMENTS VIEW
 * Showcases all UI experiment components
 */
export function ExperimentsView() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-32 space-y-32">
            <NavigationExperiment />
            <ButtonsExperiment />
            <CardsExperiment />
            <CarouselExperiment />
            <StatusTagsExperiment />
        </div>
    );
}

export default ExperimentsView;
