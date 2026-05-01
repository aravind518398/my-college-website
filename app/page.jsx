import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col  cursor-default">
      <Header />
      <main className="min-h-0 flex-1">
        <Carousel />
        <section className=" px-4 h-auto bg-gray-400 pt-24 relative"
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}>
          <div className="flex items-center">
            <div className="h-12 w-2 bg-[#179BD7]"></div>
            <h3 className="ml-2 text-2xl font-semibold">Welcome to KMM College of Arts & Science</h3>

          </div>
          <div className="flex mt-4 ">
            <div className="w-100 h-auto shadow-2xl   ">
              <Image src="/images/demo.png" width={441} height={550} alt="students" className="w-full h-full object-cover" />
            </div>
            <div className="w-100 h-auto bg-white p-4 flex flex-col gap-4 shadow-2xl">
              <h3 className="text-[#179BD7] text-xl font-medium">KMM College of Arts & Science</h3>
              <p className="text-[#131313] mt-4 leading-7">An AICTE-approved, self-financing institution affiliated with M.G. University, Kottayam, prepares youth with a balanced mix of knowledge, skills, and a professional mindset, guided by ethical values. A part of the Jai Bharath Educational Foundation since 2002, we're known for pioneering education and empowering students from diverse backgrounds through innovative learning. Led by founder chairman Mr. A.M Kharim, our foundation is a prominent promoter of educational institutions in the country.</p>
              <button className="bg-[#179BD7] rounded-br-2xl  rounded-tl-2xl p-2 self-end mt-4 text-white font-medium cursor-pointer">MORE ABOUT US

                <FontAwesomeIcon className="pl-2" icon={faArrowRight} />
              </button>
            </div>

            <div className="w-80 h-auto shadow-2xl absolute right-4 -top-10 bg-white/80 ">
                        <div className=" bg-[#179BD7]">
                           <h2 className="text-white font-medium p-2">LATEST UPDATES</h2>
                        </div>
                        <div className="p-2">
                           <h6 className="text-xs">March 17, 2025</h6>
                           <h3  className="font-medium mt-2">ADMISSIONS STARTE
                              
                           </h3>
                          
                        </div>
                        <hr />
                        <div className="p-2">
                           <h6 className="text-xs">March 17, 2025</h6>
                           <h3 className="font-medium mt-2">UG &amp; PG 2025-2026 ADMISSION STARTED {/*<img src="assets/images/icons/new.png" alt="">*/}
                           </h3>
                        </div>
                        <hr />
                        <div className="p-2">
                           <h6 className="text-xs">March 17, 2025</h6>
                           <h3 className="font-medium mt-2">UG &amp; PG 2025-2026 ADMISSION STARTED</h3>
                        </div>
                        <hr />
                        <div className="p-2">
                           <h6 className="text-xs">March 17, 2025</h6>
                           <h3 className="font-medium mt-2">UG &amp; PG 2025-2026 ADMISSION STARTED</h3>
                        </div>
                        <hr />
                        <div >
                           <h6 style={{color:"brown"}} className="py-4 pl-2 cursor-pointer">View More
                              <FontAwesomeIcon className="pl-2" icon={faChevronRight} color="brown"/>
                           </h6>
                           
                        </div>
                     </div>

          </div>





          <div>

          </div>
        </section>
      </main>
    </div>
  );
}
