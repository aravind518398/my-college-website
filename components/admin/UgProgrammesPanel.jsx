import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AdminStickySave } from "./AdminCmsLayout";

function Field({
  label,
  name,
  defaultValue,
  icon,
  type = "text",
  multiline = false,
  options = null,
  placeholder = "",
  disabled = false,
}) {
  const inputClass =
    "mt-2 w-full rounded-lg border border-[#d9e6f1] bg-white px-3 py-2.5 text-sm font-medium text-[#18213b] outline-none transition focus:border-[#179BD7] focus:ring-4 focus:ring-[#179BD7]/10";

  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        {icon ? (
          <FontAwesomeIcon icon={icon} className="text-[#179BD7]" />
        ) : null}
        {label}
      </span>

      {options ? (
        <select
          name={name}
          defaultValue={defaultValue}
          className={inputClass}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={6}
          placeholder={placeholder}
          className={`${inputClass} resize-y leading-6`}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={inputClass}
          disabled={disabled}
        />
      )}
    </label>
  );
}

function Panel({ id, title, description, icon, children }) {
  return (
    <section id={id} className="scroll-mt-6 rounded-xl border border-[#e1ebf4] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#179BD7]/10 text-[#179BD7]">
          <FontAwesomeIcon icon={icon} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-[#18213b]">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-[#63708a]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function UgProgrammesPanel({
  programmes,
  documentsRequired,
  programmeRowCount,
}) {
  return (
    <Panel
      id="ug-programmes"
      title="UG Programmes"
      description="Manage the UG programmes table on the Academics page and the detailed syllabus, eligibility, and highlights section. Tick delete to remove a programme or syllabus row. Fill the blank rows to add new entries."
      icon={faGraduationCap}
    >
      <input type="hidden" name="ug-programme-row-count" value={programmeRowCount} />

      <div className="mb-4 flex flex-wrap gap-3">
        {(programmes || []).map((d, i) => (
          <a
            key={d?.id || `programme-${i}`}
            href={`#${d?.id || ""}`}
            className="border border-[#dce7f0] rounded-full bg-white/60 px-3 py-1 text-sm font-semibold text-[#179BD7] shadow-sm"
          >
            {d?.shortName || "Untitled"}
          </a>
        ))}
      </div>

      <div className="mb-6">
        <Field
          label="Documents Required (one per line)"
          name="ug-documents-required"
          defaultValue={documentsRequired.join("\n")}
          icon={faPenToSquare}
          multiline
        />
      </div>

      <div className="space-y-6">
        {[...programmes, {}].map((programme, programmeIndex) => {
          const isNewRow = programmeIndex >= programmes.length;
          const prefix = `ug-programme-${programmeIndex}`;
          const syllabusItems = programme.syllabus || [];

          return (
            <article id={programme.id || undefined} key={programme.id || `new-${programmeIndex}`} className="scroll-mt-24 lg:scroll-mt-4 rounded-xl border border-[#dce7f0] bg-[#fbfdff] p-4">
              <div className="  sticky top-20 lg:top-1  border border-[#dce7f0] bg-white/10 p-2 rounded-lg mb-4 flex items-center justify-between gap-3 backdrop-blur">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                    {isNewRow ? "New Programme" : `Programme ${programmeIndex + 1}`}
                  </p>

                  <h3 className="mt-1 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#18213b]">
                    {isNewRow ? "Add UG programme" : programme.title}
                  </h3>
                </div>

                {!isNewRow ? (
                  <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-[10px] sm:text-xs md:text-sm font-bold text-[#a33c3c]">
                    <input
                      type="checkbox"
                      name={`${prefix}-delete`}
                      className="h-4 w-4 accent-[#a33c3c]"
                    />
                    <FontAwesomeIcon icon={faTrash} />
                    Delete programme
                  </label>
                ) : null}
              </div>

              <input type="hidden" name={`${prefix}-syllabus-count`} value={syllabusItems.length} />

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Slug ID (URL)" name={`${prefix}-id`} defaultValue={programme.id || ""} icon={faPenToSquare} placeholder={"eg: bca"} />
                <Field label="Short Name" name={`${prefix}-shortName`} defaultValue={programme.shortName || ""} icon={faPenToSquare} placeholder={"eg: BCA"} />
                <div className="md:col-span-2">
                  <Field label="Full Title" name={`${prefix}-title`} defaultValue={programme.title || ""} icon={faPenToSquare} placeholder={"eg: Bachelor of Computer Applications"} />

                </div>
                <div className="md:col-span-2">
                  <Field label="Focus" name={`${prefix}-focus`} defaultValue={programme.focus || ""} icon={faPenToSquare} placeholder={"eg: Comprehensive computer education with practical exposure and industry relevance"} />
                </div>
                <Field label="Programme Type" name={`${prefix}-programmeType`} defaultValue={programme.programmeType || ""} icon={faPenToSquare} options={["Regular", "Honours", "Honours with Research"]} />


                <Field label="Department" name={`${prefix}-department`} defaultValue={programme.department || ""} icon={faPenToSquare} placeholder={"eg: Computer Application"} />

                <Field label="Seats" name={`${prefix}-seats`} defaultValue={programme.seats ?? ""} icon={faPenToSquare} type="number" />
                <Field label="Duration" name={`${prefix}-duration`} defaultValue={programme.duration || ""} icon={faPenToSquare} type="number" />
                <Field label="Semesters" name={`${prefix}-semesters`} defaultValue={programme.semesters ?? ""} icon={faPenToSquare} type="number" />
                <Field label="Fees (per semester)" name={`${prefix}-fees`} defaultValue={programme.fees ?? ""} icon={faPenToSquare} type="number" />
                <Field label="Eligibility (one per line)" name={`${prefix}-eligibility`} defaultValue={(programme.eligibility || []).join("\n")} icon={faPenToSquare} multiline />
                <Field label="Specialisations (one per line)" name={`${prefix}-specialisations`} defaultValue={(programme.specialisations || []).join("\n")} icon={faPenToSquare} multiline />
              </div>

              <div className="mt-6 space-y-4 border-t border-[#dce7f0] pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#40506f]">Syllabus PDF rows</p>
                {[...syllabusItems, {}, {}].map((item, syllabusIndex) => {
                  const isNewSyllabus = syllabusIndex >= syllabusItems.length;
                  const syllabusPrefix = `${prefix}-syllabus-${syllabusIndex}`;

                  return (
                    <div key={`${programme.id || "new"}-syllabus-${syllabusIndex}`} className="rounded-lg border border-[#e1ebf4] bg-white p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-[#18213b]">
                          {isNewSyllabus ? "Add syllabus row" : item.label}
                        </p>
                        {!isNewSyllabus ? (
                          <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                            <input type="checkbox" name={`${syllabusPrefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                            Delete
                          </label>
                        ) : null}
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Label" name={`${syllabusPrefix}-label`} defaultValue={item.label || ""} icon={faPenToSquare} placeholder={"eg: BCA Semesters 1 & 2 Syllabus"} />
                        <Field
                          label="Status"
                          name={`${syllabusPrefix}-status`}
                          defaultValue={item.status || "Available"}
                          icon={faPenToSquare}
                          options={["Available", "Coming soon"]}
                        />
                        <div className="md:col-span-2">
                          <Field label="Detail" name={`${syllabusPrefix}-detail`} defaultValue={item.detail || ""} icon={faPenToSquare} multiline placeholder={"Describe the syllabus content, core subjects, practical training, project work, and learning outcomes for this semester."} />
                        </div>
                        <div className="md:col-span-2">
                          <Field label="PDF Path" name={`${syllabusPrefix}-href`} defaultValue={item.href || ""} icon={faPenToSquare} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}

      </div>
      <AdminStickySave label="Save UG programmes" />
    </Panel>
  );
}
