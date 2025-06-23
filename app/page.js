import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col text-white h-[44vh]  max-md:text-center">
        <div className="font-bold text-5xl flex gap-2 justify-center items-center max-md:px-4 max-md:text-4xl">
          FundBay <span className="pt-5 "><img className="invertImg" src="/donate2.gif" alt="" width={66} /></span>
        </div>
        <p className="font-semibold text-lg pb-4 pt-2 max-md:px-4">
          A Crowdfunding platform for creators or a cause. Get funded by your fans and followers, or the ones who want to help a cause. Start Now!
        </p>
        <div>
          <Link href={'/login'}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href={'/about'}>

            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>

          </Link>
        </div>

      </div>
      <div className="bg-white h-1  opacity-10 "></div>
      
      <div className="bg-white h-1  opacity-10"></div>
      <div className="text-white container ml-52 w-[calc(100vw-26rem)] pb-32 pt-14 flex flex-col items-center justify-center max-md:mx-72 max-md:w-[calc(100vw-6rem)]">
        <h2 className="text-3xl font-bold text-center mb-14">Learn More about us</h2>
        <iframe width="350" height="315" src="https://www.youtube.com/embed/hU9flsFPzDs?si=WI1yOhM95BM_yiFZ" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
