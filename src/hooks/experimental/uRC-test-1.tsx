/** @see useRenderCount.tsx @see https://youtu.be/uH9uMH2e5Ts */

import useRenderCount from "./useRenderCount";

const UrcTestComponent = () => {
  const { renderCount, resetRenderCount } = useRenderCount(true);

  return (
    <div>
      <div>This component has rendered {renderCount} times.</div>
      <button type="button" onClick={resetRenderCount}>
        Reset Render Count
      </button>
    </div>
  );
};

export default UrcTestComponent;
