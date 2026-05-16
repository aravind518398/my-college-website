import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { faTrophy, faUsers, faHeart, faVolleyballBall, faPalette, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CoCurricular() {
    const activities = [
        {
            icon: faVolleyballBall,
            title: "Sports & Games",
            description: "Develop athletic skills and team spirit through competitive and recreational sports activities."
        },
        {
            icon: faPalette,
            title: "Arts & Culture",
            description: "Express creativity through music, dance, visual arts, and cultural performances."
        },
        {
            icon: faUsers,
            title: "Clubs & Societies",
            description: "Join various clubs and societies to explore shared interests and build networks."
        },
        {
            icon: faMicrophone,
            title: "Events & Seminars",
            description: "Participate in seminars, workshops, and conferences to enhance knowledge and skills."
        },
        {
            icon: faTrophy,
            title: "Leadership Programs",
            description: "Develop leadership qualities through mentoring, training, and development programs."
        },
        {
            icon: faHeart,
            title: "Social Service",
            description: "Engage in community service and social responsibility initiatives to make a positive impact."
        }
    ];

    return (
        <>
            <Header />
            <main className="overflow-hidden bg-[#f7faf8] text-[#18213b]">
                {/* Hero Section */}
                <section className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[480px]">
                    <Image
                        src="/images/nss.jpeg"
                        alt="Co-curricular activities at KMM College"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#18213b]/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#18213b]/90 via-[#18213b]/45 to-transparent" />
                    <div className="relative z-10 mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center px-4 py-12 sm:min-h-[380px] sm:px-6 sm:py-16 lg:min-h-[480px] lg:py-24">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                            KMM College
                        </p>
                        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
                            Co-Curricular Activities
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:mt-5 sm:text-base lg:text-lg">
                            Beyond academics, we foster holistic development through diverse co-curricular activities that nurture leadership, creativity, teamwork, and communication skills.
                        </p>
                    </div>
                </section>

                {/* Activities Overview Section */}
                <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                    <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#1ab69d]">
                            Our Activities
                        </p>
                        <h2 className="max-w-3xl text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
                            Diverse Learning Experiences
                        </h2>
                        <Image
                            src="/images/underlinee.png"
                            width={120}
                            height={36}
                            alt="Decorated underline"
                            className="mt-3 brightness-0"
                        />
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#364565] sm:text-base">
                            KMM College offers a wide range of co-curricular activities designed to complement academic learning and develop well-rounded individuals.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {activities.map((activity, index) => (
                            <article
                                key={index}
                                className="group rounded-2xl border border-[#d6e8e2] bg-white p-6 transition-all duration-300 hover:border-[#1ab69d] hover:shadow-lg hover:shadow-[#1ab69d]/10 sm:p-7"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e9f8f4] to-[#d6e8e2] text-[#12826f] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#1ab69d] group-hover:to-[#12826f] group-hover:text-white">
                                    <FontAwesomeIcon icon={activity.icon} className="text-lg" />
                                </div>
                                <h3 className="text-lg font-bold text-[#18213b] sm:text-xl">
                                    {activity.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#364565] sm:mt-3">
                                    {activity.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* NSS Section */}
                <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 scroll-mt-20" id="nss">
                    <div className="rounded-[28px] border border-[#d6e8e2] bg-white p-6 shadow-[0_20px_55px_-35px_rgba(24,33,59,0.6)] sm:p-8 lg:p-12">
                        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
                            <div className="lg:col-span-2">
                                <span className="inline-flex rounded-full bg-[#e9f8f4] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#12826f]">
                                    NSS Unit No. 251 & 252
                                </span>
                                <h2 className="mt-5 text-2xl font-bold leading-tight text-[#18213b] sm:text-3xl lg:text-4xl">
                                    National Service Scheme
                                </h2>
                                <Image
                                    src="/images/underlinee.png"
                                    width={120}
                                    height={36}
                                    alt="Decorated underline"
                                    className="mt-3 brightness-0"
                                />
                                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#2f3d5f] sm:text-sm">
                                    KMM College, Kumbalam
                                </p>
                                <p className="mt-6 text-sm leading-7 text-[#364565] sm:text-base lg:leading-8">
                                    National Service Scheme is a Central Government Educational Programme started in 1969. It functions under the Ministry of Youth Affairs and Sports at the national level and under the Ministry of Higher Education at the state level. Mahatma Gandhi University NSS was started in 1984. The major aim of NSS is to develop student personality through meaningful community service.
                                </p>
                            </div>

                            <aside className="flex flex-col items-center rounded-2xl border border-[#d6e8e2] bg-[#f7faf8] p-6 sm:p-7">
                                <div className="rounded-full bg-white p-4 shadow-[0_12px_28px_-18px_rgba(24,33,59,0.55)]">
                                    <Image
                                        src="/images/nss-logo.png"
                                        width={140}
                                        height={140}
                                        alt="NSS Logo"
                                        className="h-24 w-24 object-contain sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                                    />
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-[#18213b] sm:text-xl">NSS Logo</h3>
                                <p className="mt-3 text-center text-xs leading-6 text-[#40506f] sm:text-sm">
                                    The NSS symbol is inspired by the Rath wheel of the Konark Sun Temple. It signifies continuity, progress, and the spirit of social transformation.
                                </p>
                            </aside>
                        </div>

                        {/* NSS Details Grid */}
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
                            <article className="rounded-2xl border border-[#dceae5] bg-[#f5faf8] p-6 sm:p-7">
                                <h3 className="text-lg font-bold text-[#18213b] sm:text-xl">Aim and Objective</h3>
                                <p className="mt-3 text-sm leading-6 text-[#364565] sm:mt-4 sm:text-base">
                                    The major aim of NSS is the development of student personality through community service. It extends education beyond the classroom and helps students engage with social realities while building a civic mindset.
                                </p>
                                <div className="mt-4 rounded-xl bg-white p-4 text-xs leading-6 text-[#364565] shadow-[0_10px_22px_-20px_rgba(24,33,59,0.7)] sm:text-sm">
                                    <span className="font-semibold text-[#18213b]">Motto:</span> NOT ME BUT YOU. This reflects selfless service and reminds us that individual welfare is deeply connected to the welfare of society.
                                </div>
                            </article>

                            <article className="rounded-2xl border border-[#dceae5] bg-[#f5faf8] p-6 sm:p-7">
                                <h3 className="text-lg font-bold text-[#18213b] sm:text-xl">Core Objectives</h3>
                                <p className="mt-3 text-sm leading-6 text-[#364565] sm:mt-4 sm:text-base">The broad objectives of NSS include:</p>
                                <ul className="mt-3 space-y-2 text-xs leading-5 text-[#364565] sm:text-sm">
                                    <li className="flex gap-2">
                                        <span className="font-bold text-[#1ab69d]">•</span>
                                        <span>Understand community needs and participate in problem-solving</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-[#1ab69d]">•</span>
                                        <span>Develop social and civic responsibility</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-[#1ab69d]">•</span>
                                        <span>Build leadership and democratic values</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-[#1ab69d]">•</span>
                                        <span>Mobilize community participation</span>
                                    </li>
                                </ul>
                            </article>
                        </div>

                        {/* NSS Programs */}
                        <div className="mt-10 grid gap-5 sm:grid-cols-2">
                            <article className="rounded-2xl border border-[#dceae5] bg-white p-6 sm:p-7">
                                <h3 className="text-base font-bold text-[#18213b] sm:text-lg">Constitution</h3>
                                <p className="mt-3 text-xs leading-6 text-[#364565] sm:text-sm">
                                    NSS volunteers who complete 240 hours of regular activities over two years and attend one 7-day annual special camp are eligible for the NSS certificate issued by the college.
                                </p>
                            </article>
                            <article className="rounded-2xl border border-[#dceae5] bg-white p-6 sm:p-7">
                                <h3 className="text-base font-bold text-[#18213b] sm:text-lg">Programme Classification</h3>
                                <p className="mt-3 text-xs leading-6 text-[#364565] sm:text-sm">
                                    NSS activities are divided into two major groups: regular NSS activities and special camping programmes, ensuring comprehensive community engagement.
                                </p>
                            </article>
                        </div>

                        {/* Program Officers */}
                        <div className="mt-10 rounded-2xl border border-[#dceae5] bg-[#fcfefd] p-6 sm:p-7 lg:p-8">
                            <h3 className="text-lg font-bold text-[#18213b] sm:text-xl">Program Officers</h3>
                            <p className="mt-2 text-xs font-semibold text-[#364565] sm:text-sm">
                                KMM College, Kumbalam - NSS Unit No. 251 & 252
                            </p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <article className="overflow-hidden rounded-xl border border-[#dceae5] bg-white transition-all duration-300 hover:shadow-lg">
                                    <Image
                                        src="/images/nss-officer-placeholder-1.svg"
                                        width={640}
                                        height={420}
                                        alt="Placeholder image for NSS Program Officer 1"
                                        className="h-40 w-full object-cover sm:h-48"
                                    />
                                    <div className="p-4 sm:p-5">
                                        <p className="text-base font-semibold text-[#18213b] sm:text-lg">Program Officer 1</p>
                                        <p className="mt-1 text-xs text-[#4b5875] sm:text-sm">Name will be updated</p>
                                    </div>
                                </article>
                                <article className="overflow-hidden rounded-xl border border-[#dceae5] bg-white transition-all duration-300 hover:shadow-lg">
                                    <Image
                                        src="/images/nss-officer-placeholder-2.svg"
                                        width={640}
                                        height={420}
                                        alt="Placeholder image for NSS Program Officer 2"
                                        className="h-40 w-full object-cover sm:h-48"
                                    />
                                    <div className="p-4 sm:p-5">
                                        <p className="text-base font-semibold text-[#18213b] sm:text-lg">Program Officer 2</p>
                                        <p className="mt-1 text-xs text-[#4b5875] sm:text-sm">Name will be updated</p>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <p className="mt-8 text-xs font-semibold text-[#2f3d5f] sm:text-sm">
                            NSS UNIT NO. 251 & 252 -{" "}
                            <a
                                href="http://www.nssvoice.org/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#12826f] underline decoration-[#12826f]/40 underline-offset-4 transition hover:decoration-[#12826f]"
                            >
                                www.nssvoice.org
                            </a>
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
