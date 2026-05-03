import { ReactNode } from "react";

const Popup = ({
  onCancel,
  children,
}: {
  onCancel: () => void;
  children: ReactNode;
}) => {
  return (
    <div className="fixed inset-0 ">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={() => {
          onCancel();
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white max-w-[400px] w-full  rounded-[20px]">
        {children}
      </div>
    </div>
  );
};

export default Popup;
