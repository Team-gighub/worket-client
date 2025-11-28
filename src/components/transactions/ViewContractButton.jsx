"use client";

import { usePdfViewer } from "@/hooks/usePdfViewer";
import ExternalLinkIcon from "@/assets/external-link.png";
import MainButton from "../common/MainButton";

const ViewContractButton = ({ pdfUrl }) => {
  const { open, Viewer } = usePdfViewer();
  return (
    <>
      <MainButton
        text={"원본 보기"}
        height={"4rem"}
        theme={"darkgray"}
        icon={{ src: ExternalLinkIcon, alt: "원본 보기" }}
        onClick={() => open(pdfUrl)}
      />
      <Viewer />
    </>
  );
};

export default ViewContractButton;
