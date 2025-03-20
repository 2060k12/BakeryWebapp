import Image from "next/image";

export default function Page() {
  return (
    <div>
      <div className="flex justify-center mx-auto my-16">
        {/*  hero banner with images */}
        <Image
          alt="Image for banner"
          src={"/images/ad1.jpg"}
          width={768}
          height={400}
          className="rounded-3xl aspect-video "
        />
        <div className="flex flex-wrap gap-6 my-12 justify-center "></div>
      </div>
      <div className="grid grid-cols-4 mx-20">
        <div className="flex-row ">
          <Image
            alt="Image for banner"
            src={"/images/cake6.jpg"}
            width={200}
            height={100}
            className="rounded-3xl aspect-square  "
          />
          <h4 className="flex justify-center text-xl">Anniversery</h4>
        </div>
        <div className="flex-row ">
          <Image
            alt="Image for banner"
            src={"/images/cake4.jpg"}
            width={200}
            height={100}
            className="rounded-3xl aspect-square  "
          />
          <h4 className="flex justify-center">Birthday</h4>
        </div>{" "}
        <div className="flex-row ">
          <Image
            alt="Image for banner"
            src={"/images/cake2.jpg"}
            width={200}
            height={100}
            className="rounded-3xl aspect-square  "
          />
          <h4 className="flex justify-center">Events</h4>
        </div>{" "}
        <div className="flex-row ">
          <Image
            alt="Image for banner"
            src={"/images/cake7.jpg"}
            width={200}
            height={100}
            className="rounded-3xl aspect-square  "
          />
          <h4 className="flex justify-center">Baby Shower</h4>
        </div>
      </div>
    </div>
  );
}
