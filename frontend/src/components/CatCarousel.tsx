import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Love } from "./Love";

interface Cats {
  id: string;
  url: string;
  isLiked: boolean;
}

interface CarouselProps {
  datas?: Cats[];
  like: (catId: string) => void;
  unlike: (catId: string) => void;
}

export const CatCarousel = ({ datas, like, unlike }: CarouselProps) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1200 },
      items: 5,
    },
    desktopa: {
      breakpoint: { max: 1200, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 700 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 700, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      draggable={true}
      swipeable={true}
      infinite={true}
      className="w-[calc(100vw-74px)] max-h-56 py-5 px-15 flex flex-row mt-2"
    >
      {datas &&
        datas.map((r) => (
          <div
            key={r.id}
            className="flex flex-col rounded-xl border min-h-52 border-white mx-2 bg-no-repeat bg-cover items-end"
            style={{
              backgroundImage: `url(${r.url})`,
            }}
          >
            <div
              onClick={() => {
                !r.isLiked ? like(r.id) : unlike(r.id);
              }}
              className={`group p-1 justify-end rounded-md translate-x-1/4 -translate-y-1/4  hover:cursor-pointer overflow-hidden transition-all ease-in-out duration-150 ${
                !r.isLiked
                  ? "hover:bg-red-400 bg-gray-200"
                  : "hover:bg-gray-200 bg-red-400"
              } border border-gray-200 hover:border hover:border-white`}
            >
              <div className="aspect-square w-6 text-xl text-right text-black group-hover:translate-y-[-125%] transition-all ease-in-out duration-150">
                <Love
                  color="white"
                  className={`w-5 h-5 mx-auto ${
                    !r.isLiked && "translate-y-[150%]"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
    </Carousel>
  );
};
