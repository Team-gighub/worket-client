// 가능한 은행
import Woori from "../../assets/woori.png";
import Shinhan from "../../assets/shinhan.png";
import NH from "../../assets/nh.png";
import Hana from "../../assets/Hana.png";
import Ibk from "../../assets/Ibk.png";
import Toss from "../../assets/toss.png";
import Mg from "../../assets/mg.png";
import Kakao from "../../assets/kakao.png";
const paymentOptions = [
  {
    id: "woori",
    label: "우리은행",
    icon: { src: Woori, alt: "우리은행 아이콘" },
  },
  {
    id: "shinhan",
    label: "신한은행",
    icon: { src: Shinhan, alt: "신한은행 아이콘" },
  },
  { id: "nh", label: "농협은행", icon: { src: NH, alt: "농협은행 아이콘" } },
  {
    id: "hana",
    label: "하나은행",
    icon: { src: Hana, alt: "하나은행 아이콘" },
  },
  { id: "ibk", label: "기업은행", icon: { src: Ibk, alt: "기업은행 아이콘" } },

  { id: "toss", label: "토스", icon: { src: Toss, alt: "토스 아이콘" } },

  {
    id: "mg",
    label: "새마을금고",
    icon: { src: Mg, alt: "새마을금고 아이콘" },
  },
  {
    id: "kakao",
    label: "카카오뱅크",
    icon: { src: Kakao, alt: "카카오뱅크 아이콘" },
  },
];

export default paymentOptions;
