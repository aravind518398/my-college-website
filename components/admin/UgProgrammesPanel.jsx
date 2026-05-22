import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Field({ label, name, defaultValue, icon, type = "text", multiline = false }) {
  const inputClass =
    "mt-2 w-full rounded-lg border border-[#d9e6f1] bg-white px-3 py-2.5 text-sm font-medium text-[#18213b] outline-none transition focus:border-[#179BD7] focus:ring-4 focus:ring-[#179BD7]/10";

  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        {icon ? <FontAwesomeIcon icon={icon} className="text-[#179BD7]" /> : null}
        {label}
      </span>
      {multiline ? (
        <textarea name={name} defaultValue={defaultValue} rows={6} className={`${inputClass} resize-y leading-6`} />
      ) : (
        <input type={type} name={name} defaultValue={defaultValue} className={inputClass} />
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
            <article key={programme.id || `new-${programmeIndex}`} className="rounded-xl border border-[#dce7f0] bg-[#fbfdff] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                    {isNewRow ? "New programme" : `Programme ${programmeIndex + 1}`}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                    {isNewRow ? "Add UG programme" : programme.title}
                  </h3>
                </div>
                {!isNewRow ? (
                  <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                    <input type="checkbox" name={`${prefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                    <FontAwesomeIcon icon={faTrash} />
                    Delete programme
                  </label>
                ) : null}
              </div>

              <input type="hidden" name={`${prefix}-syllabus-count`} value={syllabusItems.length} />

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Slug ID (URL)" name={`${prefix}-id`} defaultValue={programme.id || ""} icon={faPenToSquare} />
                <Field label="Short Name" name={`${prefix}-shortName`} defaultValue={programme.shortName || ""} icon={faPenToSquare} />
                <div className="md:col-span-2">
                  <Field label="Full Title" name={`${prefix}-title`} defaultValue={programme.title || ""} icon={faPenToSquare} />
                </div>
                <Field label="Table Program Name" name={`${prefix}-program`} defaultValue={programme.program || ""} icon={faPenToSquare} />
                <Field label="Table Specialisation" name={`${prefix}-specialisation`} defaultValue={programme.specialisation || ""} icon={faPenToSquare} />
                <Field label="Department" name={`${prefix}-department`} defaultValue={programme.department || ""} icon={faPenToSquare} />
                <Field label="Focus" name={`${prefix}-focus`} defaultValue={programme.focus || ""} icon={faPenToSquare} />
                <Field label="Seats" name={`${prefix}-seats`} defaultValue={programme.seats ?? ""} icon={faPenToSquare} type="number" />
                <Field label="Duration" name={`${prefix}-duration`} defaultValue={programme.duration || ""} icon={faPenToSquare} />
                <Field label="Semesters" name={`${prefix}-semesters`} defaultValue={programme.semesters ?? ""} icon={faPenToSquare} type="number" />
                <Field label="Eligibility (one per line)" name={`${prefix}-eligibility`} defaultValue={(programme.eligibility || []).join("\n")} icon={faPenToSquare} multiline />
                <Field label="Highlights (one per line)" name={`${prefix}-highlights`} defaultValue={(programme.highlights || []).join("\n")} icon={faPenToSquare} multiline />
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
                        <Field label="Label" name={`${syllabusPrefix}-label`} defaultValue={item.label || ""} icon={faPenToSquare} />
                        <Field label="Status" name={`${syllabusPrefix}-status`} defaultValue={item.status || "Available"} icon={faPenToSquare} />
                        <div className="md:col-span-2">
                          <Field label="Detail" name={`${syllabusPrefix}-detail`} defaultValue={item.detail || ""} icon={faPenToSquare} multiline />
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

    </Panel>
  );
}
