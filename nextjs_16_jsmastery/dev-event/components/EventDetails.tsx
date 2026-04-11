import PageContent from "@/app/events/[slug]/page";
import { Suspense } from "react";

export default function EventDetailsPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent {...props} />
    </Suspense>
  );
}