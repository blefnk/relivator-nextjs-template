import useRenderCount from "~/hooks/react-client/useRenderCount";

const UrcTestComponent = () => {
  const { renderCount, resetRenderCount } = useRenderCount(true);

  return (
    <div>
      <div>This component has rendered {renderCount} times.</div>
      <button onClick={resetRenderCount} type="button">
        Reset Render Count
      </button>
    </div>
  );
};

export default UrcTestComponent;
