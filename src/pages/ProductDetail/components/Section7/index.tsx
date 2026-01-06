import image1 from "@assets/ProductDetail/Section7/image1.svg";
import image2 from "@assets/ProductDetail/Section7/image2.svg";
import image3 from "@assets/ProductDetail/Section7/image3.svg";
import BlogItem from "@components/Ui/BlogItem";

const dataBlogs = [
  {
    id: 1,
    image: image1,
    title: "My Dream Cycling Tour",
    des: `My dream cycling tour is about exploring new places at my own pace.
Riding through long roads, small towns, and beautiful landscapes brings a special sense of freedom.

Every journey is a mix of challenge and joy, with moments to stop, breathe, and enjoy the view.
A cycling tour is not just about the destination, but about every mile along the way.`,
  },
  {
    id: 2,
    image: image2,
    title: "Best Cycling Accessories",
    des: `Having the right cycling accessories can make every ride safer, more comfortable, and more enjoyable.
From helmets and gloves to lights and repair kits, each accessory plays an important role on the road.

Good lighting improves visibility at night, while padded gloves reduce fatigue on long rides.
With the right accessories, cycling becomes not just a sport, but a smooth and confident experience.`,
  },
  {
    id: 3,
    image: image3,
    title: "Cycling through The Night",
    des: `When the city falls asleep, cycling through the night feels different.
The streets are quiet, the air is cool, and every pedal stroke is calming.

Streetlights guide the way, and the silence creates space to think and breathe.
Night cycling is not just a ride — it is a moment of freedom.`,
  },
];

// const dataSection7 = [
//   {
//     id: 1,
//     image: image1,
//     title: "My Dream Cycling Tour",
//     des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 2,
//     image: image2,
//     title: "Best Cycling Accessories",
//     des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 3,
//     image: image3,
//     title: "Cycling through The Night",
//     des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
//   },
// ];

const Section7 = () => {
  return (
    <>
      <h3 className="text-[24px] text-[#23272F] font-semibold">
        Blog related to this product
      </h3>
      <div className="flex md:gap-[17px] md:flex-row flex-col gap-[20px]">
        {dataBlogs.map((item, _) => {
          return (
            <BlogItem
              id={item.id}
              title={item.title}
              des={item.des}
              image={item.image}
            />
          );
        })}
      </div>
    </>
  );
};

export default Section7;
