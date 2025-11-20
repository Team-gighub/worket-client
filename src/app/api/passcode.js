// Passcode 등록 API
export const registerPasscode = async (encrypted) => {
  const res = await fetch("/auth/passcode/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ passcode: encrypted }),
  });

  if (!res.ok) throw new Error("REGISTER_FAILED");
  return res.json().catch(() => null);
};

// Passcode 검증 API
export const verifyPasscode = async (encrypted) => {
  const res = await fetch("/auth/passcode/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ passcode: encrypted }),
  });

  if (!res.ok) throw new Error("VERIFY_FAILED");
  return res.json().catch(() => null);
};
