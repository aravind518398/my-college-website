import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faArrowRightToBracket, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default function RunningRibon() {
    return (
        <>
            <div className="bg-[#ba3e3e] text-white font-bold text-xs overflow-hidden cursor-pointer">
                <div className="flex w-max whitespace-nowrap animate-marquee py-3 pause-on-hover">

                    {/* block 1 */}
                    <div className="flex gap-20 mr-20">
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                    </div>

                    {/* block 2 (duplicate) */}
                    <div className="flex gap-20 mr-20">
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                    </div>
                    {/* block 3 (duplicate) */}
                    <div className="flex gap-20 mr-20">
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                    </div>
                    {/* block 4 (duplicate) */}
                    <div className="flex gap-20 mr-20">
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                    </div>
                    {/* block 5 (duplicate) */}
                    <div className="flex gap-20 mr-20">
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                    </div>
                    {/* block 6 (duplicate) */}
                    <div className="flex gap-20">
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                        <p>KMM College of Arts and Science has been NAAC Accredited with B Grade.</p>
                    </div>

                </div>
            </div>
            <ContactBar />
            <Navbar />

        </>
    )
}


export function ContactBar() {
    return (
        <>
            <div className="bg-[#18213b] text-white flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2 flex-1">
                    <span className="font-sans font-medium text-sm cursor-default">Embase</span>
                    <FontAwesomeIcon icon={faArrowRightToBracket} className="icon cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out" />
                </div>

                <ul className="flex items-center gap-3 font-sans font-medium flex-1 justify-center cursor-default">
                    <li>Contact No:</li>
                    <li className="group hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">0484-2577567<span className="group-hover:text-white">,</span></li>
                    <li className=" group hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">9037002130<span className="group-hover:text-white">,</span></li>
                    <li className="hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">0484-2577567</li>
                </ul>

                <div className="flex items-center gap-4 flex-1 justify-end">
                    <FontAwesomeIcon icon={faInstagram} className="social-icon cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out" />
                    <FontAwesomeIcon icon={faFacebook} className="social-icon cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out" />
                    <FontAwesomeIcon icon={faYoutube} className="social-icon cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out" />
                    <FontAwesomeIcon icon={faSearch} className="social-icon cursor-pointer hover:text-[#1ab69d] transition-colors duration-300 ease-in-out" />
                </div>
            </div>

        </>
    )
}

export function Navbar() {
    return (
        <>
            <div className="flex items-center justify-between bg-[#18213b] text-white border-t border-t-gray-500 px-4  ">
                    <ul className="flex gap-2 font-medium">
                        <li className="border-r border-r-gray-500 pr-2 py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">ADMISSION
                            <div className="hidden group-hover:block absolute top-10 -left-2  w-50 shadow-lg bg-white">
                                <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">UG Admission</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">PG Admission</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Fee Structure</li>
                                </ul>
                            </div>
                        </li>
                        <li className="border-r border-r-gray-500 pr-2 py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">CLUBS
                            <div className="hidden group-hover:block absolute top-10 -left-2  w-80 shadow-lg bg-white">
                                <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Nature Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Literary Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Media Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Staff Recreation Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">KMM Veranda</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Sports Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Entrpreneuship Development Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Socail Outreach Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Scholarship Support Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Quiz Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Yoga Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Electoral Literacy Club</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Arts Club</li>
                                </ul>
                            </div>
                        </li>
                        <li className="border-r border-r-gray-500 pr-2 py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">CELLS
                            <div className="hidden group-hover:block absolute top-10 -left-2  w-70 shadow-lg bg-white">
                                <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Internal Exam and Test Paper</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">OBC Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">SC/ST Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">RTI Act Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Women's Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Anti Drug Narcotic Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Minority Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Research Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Placement and Training Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">IPR Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Counseling Cell</li>
                                </ul>
                            </div>
                        </li>
                        <li className="py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">COMMITTEES
                          <div className="hidden group-hover:block absolute top-10 -left-2  w-80 shadow-lg bg-white">
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
                        <li className="border-r border-r-gray-500 pr-2 py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">RESEARCH
                            <div className="hidden group-hover:block absolute top-10 -left-2  w-80 shadow-lg bg-white">
                                <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">Research Cell</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">IIC</li>
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">IEDC</li>
                                   
                                </ul>
                            </div> 
                        </li>
                        <li className="border-r border-r-gray-500 pr-2 py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out relative group">STUDENT SUPPORT
                            <div className="hidden group-hover:block absolute top-10 -left-2  w-50 shadow-lg bg-white">
                                <ul className="flex flex-col gap-2 p-2  text-blue-800">
                                    <li className="hover:bg-[#f1f1f1] px-2 rounded">SQAC</li> 
                                </ul>
                            </div> 
                        </li>
                        <li className="border-r border-r-gray-500 pr-2 py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">IQAC</li>
                        <li className="border-r border-r-gray-500 pr-2 py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">FACILITIES</li>
                        <li className="py-2 cursor-pointer hover:border-gray-500 hover:text-[#1ab69d] transition-colors duration-300 ease-in-out">EVENTS</li>
                    </ul>
            </div>

        </>
    )
}