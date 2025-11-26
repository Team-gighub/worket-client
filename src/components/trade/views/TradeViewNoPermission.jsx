import PageLayout from "@/components/layouts/PageLayout";
import x_circle from "@/assets/x-circle.png";
import Image from "next/image";

const TradeViewNoPermission = () => {
  return (
    <PageLayout>
      <div className="h-full w-full flex flex-col justify-center items-center pb-[3rem] px-[2rem]">
        <div className="flex flex-col justify-center items-center gap-[1rem]">
          <Image src={x_circle} alt="x" width={48} />
          <span className="pretendard-semibold-20 flex flex-col justify-center items-center">
            <p>거래의 당사자가 아니에요</p>
          </span>
          <p className="pretendard-medium-14 text-point-red-200">
            상대방이 공유해준 주소가 정확한지 확인해보세요.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default TradeViewNoPermission;
