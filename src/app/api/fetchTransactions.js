const getTransactionById = async (id) => {
  // TODO: 백엔드 서버 연결 없이 테스트할 경우 사용하는 데이터, 백엔드 서버 연결시 주석처리 또는 삭제하기
  const transaction = {
    client_name: "홍길동",
    freelancer_bank: "우리",
    freelancer_account: "1001-02-110-1254",
    contract_start_date: "2024-01-15 10:30:00",
    contract_end_date: "2024-01-15 10:30:00",
    contract_created_at: "2024-01-15 10:30:00",
    title: "워켓 프론트엔드 개발",
    price: "10,000",
    status: "SETTLED",
    created_at: "2024-01-15 10:30:00",
    signed_at: "2024-01-15 10:30:00",
    deposit_hold_at: "2024-01-15 10:30:00",
    payment_confirmed_at: "2024-01-15 10:30:00",
    settled_at: "2024-01-15 10:30:00",
  };
  return transaction;

  // TODO: 실제 백엔드 서버에서 데이터 받아오는 부분
  const res = await fetch(`${process.env.SPRING_API_URL}/transactions/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("거래 데이터를 불러올 수 없습니다.");
  }

  return res.json();
};

export default getTransactionById;
