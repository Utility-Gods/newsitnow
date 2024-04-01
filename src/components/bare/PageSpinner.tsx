import Loader from "@components/bare/Loader";

const PageSpinner = () => {
  return (
    <div class="fixed top-0 left-0 z-[999] bottom-0 right-0 w-full h-full flex items-center justify-center bg-black/40 bg-opacity-40">
      <div class="animate-spin text-theme-red origin-center h-8 w-8">
        <Loader />
      </div>
    </div>
  );
};

export default PageSpinner;
