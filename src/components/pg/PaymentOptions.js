// 가능한 은행
import Woori from "../../assets/woori.png";
import Shinhan from "../../assets/shinhan.png";
import NH from "../../assets/nh.png";
import Hana from "../../assets/Hana.png";
import Ibk from "../../assets/Ibk.png";
import Toss from "../../assets/toss.png";
import Mg from "../../assets/mg.png";
import Kakao from "../../assets/kakao.png";

export const paymentOptions = [
  {
    id: "WOORI",
    label: "우리은행",
    icon: { src: Woori, alt: "우리은행 아이콘" },
    kftcCode: "020",
  },
  {
    id: "SHINHAN",
    label: "신한은행",
    icon: { src: Shinhan, alt: "신한은행 아이콘" },
    kftcCode: "088",
  },
  {
    id: "NONGHYEOP",
    label: "농협은행",
    icon: { src: NH, alt: "농협은행 아이콘" },
    kftcCode: "011",
  },
  {
    id: "HANA",
    label: "하나은행",
    icon: { src: Hana, alt: "하나은행 아이콘" },
    kftcCode: "081",
  },
  {
    id: "IBK",
    label: "기업은행",
    icon: { src: Ibk, alt: "기업은행 아이콘" },
    kftcCode: "003",
  },
  {
    id: "TOSSBANK",
    label: "토스",
    icon: { src: Toss, alt: "토스 아이콘" },
    kftcCode: "092",
  },
  {
    id: "SAEMAUL",
    label: "새마을금고",
    icon: { src: Mg, alt: "새마을금고 아이콘" },
    kftcCode: "045",
  },
  {
    id: "KAKAOBANK",
    label: "카카오뱅크",
    icon: { src: Kakao, alt: "카카오뱅크 아이콘" },
    kftcCode: "090",
  },
];

export const findBankLabel = (code) => {
  const bank = paymentOptions.find((b) => b.kftcCode === code);
  return bank ? bank.label : "-";
};
