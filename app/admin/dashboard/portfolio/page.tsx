"use client";
import { data, ProductCardProps } from "@/app/api/add-pet/data_types";
import { ProductCard } from "@/app/portfolio/page";
import AddPicForm from "@/components/AddPicForm";

export default function Page() {
  return (
    <>
      <div className="justify-center flex flex-col max-w-lg">
        <div className="xxs:columns-1 xxs:mx-0 xs:columns-1 xs:mx-0 s:columns-2 md:columns-3 lg:columns-4 gap-0 mx-0">
          {data.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
        <AddPicForm />
        {/* <BackToTopButton /> */}
      </div>
    </>
  );
}
