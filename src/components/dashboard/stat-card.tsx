import { Card, CardContent } from "..";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  bottomSection: React.ReactNode | string;
};

export const StatCard = (props: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p4">
        <div className="flex items-center justify-between mb-2">
          <span className=" text-sm">{props.title}</span>
          {props.icon}
        </div>
        <div className="text-2xl text-primary mb-1">{props.value}</div>
        <div className="flex items-center gap-1 text-sm text-green-600">
          {props.bottomSection ? props.bottomSection : ""}
        </div>
      </CardContent>
    </Card>
  );
};
