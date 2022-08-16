import React from "react";

export const useUpdateEffect = (cb: React.EffectCallback, deps?: React.DependencyList) => {
    const didMountRef = React.useRef<boolean>(false);

    React.useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }

        cb();
    });
};
