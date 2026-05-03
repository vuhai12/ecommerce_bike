import { useState } from "react";

import Checkbox from "@components/Checkbox";
import { ProductImage } from "services/products/productApi";

const BoughtTogether = ({
  listChecked,
  setListChecked,
  accessories,
}: {
  listChecked: string[];
  setListChecked: (val: string[]) => void;
  accessories:
    | {
        id: string;
        title: string;
        handle: string;
        description: string;
        featuredImage: string;
        price: string;
        variant: { id: string; price: string; inventoryQuantity: number };
      }[]
    | undefined;
}) => {
  return (
    <div className="flex p-[20px] max-w-[1200px] mx-auto rounded-[16px] border-[1px] gap-[20px] border-[#EAECF0] flex-col">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <h3 className="text-[20px] font-semibold text-black">
          Frequently bought together
        </h3>
        {listChecked.length > 0 && (
          <p className="text-[14px] text-black underline">
            +{listChecked.length} more accessories
          </p>
        )}
      </div>
      <div className="grid gap-[30px] lg:grid-cols-5 md:grid-cols-4 grid-cols-1">
        {accessories?.map((item, _) => {
          return (
            <div
              className="flex flex-col gap-[12px] border-[1px] border-[#EAECF0] rounded-[12px] p-[10px]"
              key={item.id}
            >
              <div className=" relative p-[20px]">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-[0px] right-[0px]">
                  <Checkbox
                    setListChecked={setListChecked}
                    listChecked={listChecked}
                    value={item.variant.id}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[16px] line-clamp-2 font-semibold">
                  {item.title}
                </h3>
                <p className="text-[14px] font-semibold">
                  {item.variant?.price} $
                </p>
                {/* <p className="text-[16px] font-semibold">{item.price}</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoughtTogether;
