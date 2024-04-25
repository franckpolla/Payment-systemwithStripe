import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Card className="flex justify-center items-center h-screen">
        <CardTitle className=" animate-pulse">Loading...</CardTitle>
      </Card>
    </div>
  );
};

export default Loading;
