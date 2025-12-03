"use client";

import React, { useMemo, useCallback } from "react";
import MainButton from "../common/MainButton";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import LinkIcon from "@/assets/link.png";

const CopyTradeLinkButton = ({ transactionId }) => {
  const linkToCopy = useMemo(
    () => `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/trade/${transactionId}`,
    [transactionId],
  );
  const [isCopied, copy] = useCopyToClipboard();

  const handleClick = useCallback(() => {
    copy(linkToCopy);
  }, [copy, linkToCopy]);

  return (
    <MainButton
      text={isCopied ? "복사 완료!" : "링크 복사"}
      height={"4rem"}
      theme={"secondary"}
      icon={{ src: LinkIcon, alt: "링크 복사" }}
      onClick={handleClick}
    />
  );
};

export default CopyTradeLinkButton;
