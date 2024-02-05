"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import InputImage, { InputImageValue } from "~/components/ui/input-image";

export default function ExampleInputImage() {
  const [imgList, setImgList] = useState<InputImageValue[]>([]);

  const onSubmit = () => {
    const res = JSON.stringify(imgList, null, 2);

    console.log(res);
    toast.success(<pre className="text-xs">{res}</pre>);
  };

  return (
    <div>
      <h2 className="mb-4 font-semibold">input-image.tsx</h2>
      <InputImage value={imgList} onChange={setImgList} />
      <div className="mt-4">
        <Button onClick={onSubmit}>제출</Button>
      </div>
    </div>
  );
}
