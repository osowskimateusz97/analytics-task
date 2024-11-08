import React from "react";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface StatCardProps {
  title: string;
  iconComponent: ReactElement; // Accept React element for the icon component
  content: React.ReactNode; // Content can be any renderable React content
  detail?: string; // Optional detail text
  className?: string; // Optional additional class names
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  iconComponent: IconComponent,
  content,
  detail,
  className = "", // Provide a default value
}) => (
  <Card>
    <CardHeader
      className={`flex flex-row items-center justify-between space-y-0 pb-2 ${className}`}
    >
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {IconComponent}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{content}</div>
      {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
    </CardContent>
  </Card>
);

export default StatCard;
