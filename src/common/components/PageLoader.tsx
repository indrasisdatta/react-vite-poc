export const PageLoader = () => {
  return (
    <div
      className="flex align-items-center justify-content-center"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <div
        className={`flex m-auto h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};
