import OverlayScrollbars from "overlayscrollbars";
import React from "react";

export const useScrollbar = (
    target: React.MutableRefObject<HTMLElement | null> | HTMLElement | null,
) => {
    React.useEffect(() => {
        // console.log("TARGET REF", targetRef);
        let scrollbar: OverlayScrollbars | undefined;
        if (target) {
            if (target instanceof HTMLElement) {
                scrollbar = OverlayScrollbars(target, {});
            } else if (target.current) {
                scrollbar = OverlayScrollbars(target.current, {});
            }
            // console.log(scrollbar);
        }

        return () => {
            scrollbar?.destroy();
        };
    }, [target]);
};
