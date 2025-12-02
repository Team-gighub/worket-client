const PaymentLoading = ({ title }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-basic-500/70 z-50">
      <div className="flex flex-col items-center justify-center h-screen w-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default PaymentLoading;
