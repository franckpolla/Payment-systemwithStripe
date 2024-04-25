import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div>
      <Card className="flex justify-center items-center h-screen">
        <CardTitle className=" animate-bounce">
          {" "}
          Transaction Successfull !
        </CardTitle>
      </Card>
    </div>
  );
};

export default page;
