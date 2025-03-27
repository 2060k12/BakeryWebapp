import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="px-44 pt-18 pb-8">
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
        className="aspect-video w-full h-80 px-44 object-cover"
      />
      <div className="flex place-content-between px-44 py-16">
        <div>
          <h3 className="font-bold text-3xl">Contact Info</h3>
          <div className="text-xl">
            <h4>+977 9800112233</h4>
            <h4>+977 98441122333</h4>
            <h4>iampranish@outlook.com</h4>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-3xl ">We are available on</h3>
          <div className="text-xl text-right font-bold">
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
