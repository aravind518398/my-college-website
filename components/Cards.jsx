"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function Cards({ course, img, detail, programId, level = "ug" }) {
    const router = useRouter();
    const resolvedProgramId =
        programId || String(course || "").toLowerCase().replace(/\s+/g, "-");
    const detailsAnchor = level === "pg" ? "pg-programme-details" : "ug-programme-details";

    const handleViewProgramme = () => {
        router.push(`/academics?program=${resolvedProgramId}#${detailsAnchor}`);
    };

    return (
        <article className="group relative flex min-h-[360px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#179BD7]/20">
            <div className="absolute inset-0">
                <Image
                    src={img}
                    fill
                    alt={`${course} programme`}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#18213b]/95 via-[#18213b]/35 to-transparent"></div>
            <div className="relative mt-auto flex w-full flex-col justify-end p-5 text-white sm:p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/18 text-white ring-1 ring-white/30 backdrop-blur">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-xl" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1ab69d]">Programme</p>
                <h4 className="mt-1 text-3xl font-bold leading-tight">{course}</h4>
                {detail && <p className="mt-3 min-h-12 text-sm leading-6 text-white/82">{detail}</p>}
                <button 
                    type="button" 
                    onClick={handleViewProgramme}
                    className="mt-5 flex w-fit cursor-pointer items-center gap-2 rounded-br-2xl rounded-tl-2xl bg-white px-4 py-2.5 text-sm font-bold text-[#1469b8] shadow-lg transition-all duration-300 group-hover:bg-[#1ab69d] group-hover:text-white"
                >
                    View Programme
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>
        </article>
    )
}
