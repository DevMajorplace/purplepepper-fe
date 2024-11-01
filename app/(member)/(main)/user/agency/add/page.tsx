import AgencyForm from "../_components/AgencyForm";

import Card from "@/components/card";

export default function AgencyAdd() {
  return (
    <Card className="min-h-[86vh] pt-8 pb-16">
      <AgencyForm type="추가" />
    </Card>
  );
}
