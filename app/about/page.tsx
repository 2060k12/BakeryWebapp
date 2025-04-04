import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="md:px-44 px-8 pt-18 pb-8">
        <h1 className="font-bold text-3xl">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          euismod, justo eget facilisis dapibus, nunc ligula fermentum nunc, at
          gravida libero sapien at risus. Curabitur id metus at orci accumsan
          ultricies. Fusce interdum, odio ut ullamcorper tristique, odio risus
          posuere sapien, sit amet tincidunt felis ex ut lectus. Integer et
          metus id purus fermentum posuere. Aliquam erat volutpat. Suspendisse
          potenti. Nulla facilisi. Donec at ex eget velit accumsan maximus vel
          ut urna.
        </p>
      </div>
      <Image
        src={"/images/banner.jpg"}
        width={500}
        height={500}
        alt="banner"
        className="aspect-video w-full h-80 md:px-44 px-8 object-cover"
      />
      <div className="flex md:flex-row flex-col place-content-between md:px-44 px-8 py-8 md:py16">
        <div>
          <h3 className="font-bold text-3xl">Contact Info</h3>
          <div className="text-xl">
            <h4>+977 9800112233</h4>
            <h4>+977 98441122333</h4>
            <h4>iampranish@outlook.com</h4>
          </div>
        </div>
        <hr className="border-gray-700 border-1 my-3 md:hidde" />
        <div>
          <h3 className="font-bold text-3xl ">We are available on</h3>
          <div className="text-xl md:text-right font-bold">
            <h4>Whatsapp</h4>
            <h4>facebook</h4>
            <h4>Instagram</h4>
            <h4>tiktok</h4>
          </div>
        </div>
      </div>
    </>
  );
}
