"use client";

import { useSearchParams } from "next/navigation";
import SuccessfullyStatus from "./SuccessfullyStatus";

export default function ChangeStatusClient() {
  const searchParams = useSearchParams();
  const ticketNumber = searchParams.get("ticket");
  const status = searchParams.get("status");

  return <SuccessfullyStatus ticketNumber={ticketNumber} status={status} />;
}
