/**
 * Navigation Header Component
 *
 * This file defines the complete top navigation structure of the website,
 * organized into three distinct layers:
 *
 * 1. RunningRibon  – Top announcement marquee section.
 * 2. ContactBar    – Contact information and social media links.
 * 3. Navbar        – Primary navigation menu with dropdown sections.
 *
 * Each layer is separated into its own functional component
 * to improve readability, maintainability, and scalability.
 */
"use client";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faArrowRightToBracket, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"




export default function Header() {
    return (
        <>
            <RunningRibon />
            <ContactBar />
            <Navbar />
            <MobileNavbar />
        </>
    )
}



export function RunningRibon() {
    // First Layer
    const message = "KMM College of Arts and Science has been NAAC Accredited with B Grade.";
    return (
        <>
            <div className="bg-[#ba3e3e] text-white font-bold text-sm md:text-base lg:text-lg 2xl:text-xl overflow-hidden cursor-pointer">
                <div className="flex w-max whitespace-nowrap animate-marquee py-2 lg:py-3 pause-on-hover">
                    {Array(6).fill().map((_, i) => (
                        <div key={i} className="flex gap-20 mr-20">
                            <p>{message}</p>
                            <p>{message}</p>
                            <p>{message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export function ContactBar() {
    // Second Layer
    return (
        <>
            <div className="hidden  bg-[#18213b] text-white lg:flex items-center justify-between px-4 py-2 lg:py-3 text-sm md:text-base lg:text-lg 2xl:text-xl">
                <div className="flex items-center gap-2 flex-1">
                    <span className="font-sans font-medium cursor-default">Embase</span>
                    {/* Provide the Embase page link later */}
                    <Link href={"#"}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} className="w-6 h-6  lg:w-7 lg:h-7 cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out" />
                    </Link>
                </div>

                {/*Enter College Phone Numbers */}
                <ul className="flex items-center gap-3 font-sans font-medium  justify-center cursor-default">
                    <li>Contact No:</li>
                    <li className="group hover:text-[#1ab69d] transition-colors duration-300 ease-in-out cursor-pointer"><a href="tel:#">0484-2XXXXX7</a><span className="group-hover:text-white">,</span></li>
                    <li className=" group hover:text-[#1ab69d] transition-colors duration-300 ease-in-out cursor-pointer"><a href="tel:#">0484-XXXX2XX</a><span className="group-hover:text-white">,</span></li>
                    <li className="hover:text-[#1ab69d] transition-colors duration-300 ease-in-out cursor-pointer"><a href="tel:#">04X4-2X5XX5X7</a></li>
                </ul>

                <div className="flex items-center gap-4 flex-1 justify-end">

                    <a
                        href="https://instagram.com/" //Add your collage instagram link
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faInstagram}
                            className="w-6 h-6  lg:w-7 lg:h-7 cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out"
                        />
                    </a>

                    <a
                        href="https://facebook.com/" //Add your collage facebook link
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="w-6 h-6  lg:w-7 lg:h-7 cursor-pointer hover:text-[#1ab69d] transition-colals duration-300 ease-in-out"
                        />
                    </a>

                    <a
                        href="https://youtube.com/" //Add your collage youtube channel link
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faYoutube}
                            className="w-6 h-6  lg:w-7 lg:h-7 cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out"
                        />
                    </a>

                    <a href="#">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="w-6 h-6  lg:w-7 lg:h-7 cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out"
                        />
                    </a>

                </div>
            </div>

        </>
    )
}

export function Navbar() {
    // Third Layer
    return (
        <>
            <div className=" hidden lg:flex items-center justify-between bg-[#18213b] text-white border-t border-t-gray-500 px-4  text-sm md:text-base lg:text-lg 2xl:text-xl  ">
                <ul className="flex gap-2 font-medium">
                    <li className="border-r border-r-gray-500 pr-2 py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">ADMISSION
                        <div className="hidden group-hover:block absolute top-13 -left-2  w-50 shadow-lg bg-white">
                            <ul className="flex flex-col gap-2 p-2  text-blue-800 ">
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">UG Admission</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">PG Admission</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Fee Structure</li>
                            </ul>
                        </div>
                    </li>
                    <li className="border-r border-r-gray-500 pr-2 py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">CLUBS
                        <div className="hidden group-hover:block absolute top-13 -left-2  w-80 shadow-lg bg-white">
                            <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Nature Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Literary Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Media Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Staff Recreation Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">KMM Veranda</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Sports Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Entrepreneurship Development Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Social Outreach Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Scholarship Support Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Quiz Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Yoga Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Electoral Literacy Club</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Arts Club</li>
                            </ul>
                        </div>
                    </li>
                    <li className="border-r border-r-gray-500 pr-2 py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">CELLS
                        <div className="hidden group-hover:block absolute top-13 -left-2  w-70 shadow-lg bg-white">
                            <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Internal Exam and Test Paper</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">OBC Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">SC/ST Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">RTI Act Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Women&apos;s Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Anti Drug Narcotic Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Minority Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Research Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Placement and Training Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">IPR Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Counseling Cell</li>
                            </ul>
                        </div>
                    </li>
                    <li className="py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">COMMITTEES
                        <div className="hidden group-hover:block absolute top-13 -left-2  w-80 shadow-lg bg-white">
                            <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Anti Ragging</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Grievance Redressal Committee</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Internal Complaints Committee</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Energy Monitoring Committee</li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul className="flex gap-2 font-medium">
                    <li className="border-r border-r-gray-500 pr-2 py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">RESEARCH
                        <div className="hidden group-hover:block absolute top-13 -left-2  w-80 shadow-lg bg-white">
                            <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">Research Cell</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">IIC</li>
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">IEDC</li>

                            </ul>
                        </div>
                    </li>
                    <li className="border-r border-r-gray-500 pr-2 py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">STUDENT SUPPORT
                        <div className="hidden group-hover:block absolute top-13 -left-2  w-50 shadow-lg bg-white">
                            <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                <li className="hover:bg-[#f1f1f1] px-2 rounded">SQAC</li>
                            </ul>
                        </div>
                    </li>
                    <li className="border-r border-r-gray-500 pr-2 py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">IQAC</li>
                    <li className="border-r border-r-gray-500 pr-2 py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">FACILITIES</li>
                    <li className="py-2 lg:py-3 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">EVENTS</li>
                </ul>
            </div>

        </>
    )
}


export function MobileNavbar() {

    const [open, setOpen] = useState(false)

    function crossOver() {
        setOpen(!open)
    }
    return (
        <>
            <nav className="flex items-center justify-between px-4 shadow-xl lg:hidden">

                <div className="flex items-center">
                    <Image className="object-contain"
                        src="/images/kmm-logo.webp"
                        alt="logo"
                        width={80}
                        height={80}
                        priority
                    />
                    <div className="flex flex-col items-center text-[#18213b] font-semibold justify-center">
                        <h1 className="text-xl">KMM COLLEGE</h1>
                        <h3 className="border-t border-[#18213b] text-base">
                            Kumbalam, Panagad
                        </h3>
                    </div>
                </div>

                {/* Hamburger */}
                <div
                    className="flex flex-col gap-1.5 cursor-pointer"
                    onClick={crossOver}
                >
                    <span
                        className={`w-8 h-[3px] bg-black rounded transition-all duration-300 
          ${open ? "rotate-45 translate-y-[8px]" : ""}`}
                    ></span>

                    <span
                        className={`w-8 h-[3px] bg-black rounded transition-all duration-200 
          ${open ? "opacity-0" : ""}`}
                    ></span>

                    <span
                        className={`w-8 h-[3px] bg-black rounded transition-all duration-300 
          ${open ? "-rotate-45 -translate-y-[8px]" : ""}`}
                    ></span>
                </div>

            </nav>
        </>
    )
}
