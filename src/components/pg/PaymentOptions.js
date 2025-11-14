// 가능한 은행
import Woori from "../../assets/woori.png";
import Shinhan from "../../assets/shinhan.png";
import NH from "../../assets/nh.png";
import Hana from "../../assets/hana.png";
import Ibk from "../../assets/ibk.png";
import Samsung from "../../assets/samsung.png";
import Toss from "../../assets/toss.png";
import PayBook from "../../assets/paybook.png";
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
    icon: { src: Hana, alt: "우리은행 아이콘" },
  },
  { id: "ibk", label: "기업은행", icon: { src: Ibk, alt: "기업은행 아이콘" } },
  {
    id: "samsung",
    label: "삼성페이",
    icon: { src: Samsung, alt: "삼성페이 아이콘" },
  },

  { id: "toss", label: "토스", icon: { src: Toss, alt: "토스 아이콘" } },
  {
    id: "paybook",
    label: "페이북",
    icon: { src: PayBook, alt: "페이북 아이콘" },
  },
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

  // 더 많은 은행이 있지만 5개만 렌더링할 예정
];

export default paymentOptions;
