import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faImage, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AdminStickySave } from "./AdminCmsLayout";

function Field({ label, name, defaultValue, icon, multiline = false }) {
  const inputClass =
    "mt-2 w-full rounded-lg border border-[#d9e6f1] bg-white px-3 py-2.5 text-sm font-medium text-[#18213b] outline-none transition focus:border-[#179BD7] focus:ring-4 focus:ring-[#179BD7]/10";

  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        {icon ? <FontAwesomeIcon icon={icon} className="text-[#179BD7]" /> : null}
        {label}
      </span>
      {multiline ? (
        <textarea name={name} defaultValue={defaultValue} rows={3} className={`${inputClass} resize-y leading-6`} />
      ) : (
        <input type="text" name={name} defaultValue={defaultValue} className={inputClass} />
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

export default function PlacedStudentsPanel({ students, studentRowCount }) {
  return (
    <Panel
      id="placed-students"
      title="Placed Students"
      description="Manage placement success cards on the Placements page. Edit image path, title, and alt text. Tick delete to remove a student, or fill the blank row to add another."
      icon={faBriefcase}
    >
      <input type="hidden" name="placed-row-count" value={studentRowCount} />

      <p className="mb-4 text-sm font-semibold text-[#40506f]">
        {students.length} placed student{students.length === 1 ? "" : "s"} saved
      </p>

      <div className="space-y-5">
        {[...students, {}].map((student, studentIndex) => {
          const isNewRow = studentIndex >= students.length;
          const prefix = `placed-${studentIndex}`;

          return (
            <article
              key={student.id || `new-${studentIndex}`}
              className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                    {isNewRow ? "New entry" : `Student ${studentIndex + 1}`}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                    {isNewRow ? "Add placed student" : student.title}
                  </h3>
                </div>
                {!isNewRow ? (
                  <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                    <input type="checkbox" name={`${prefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </label>
                ) : null}
              </div>

              {!isNewRow ? <input type="hidden" name={`${prefix}-id`} value={student.id} /> : null}

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title" name={`${prefix}-title`} defaultValue={student.title || ""} icon={faPenToSquare} />
                <Field label="Image Path" name={`${prefix}-image`} defaultValue={student.image || ""} icon={faImage} />
                <div className="md:col-span-2">
                  <Field label="Alt Text" name={`${prefix}-alt`} defaultValue={student.alt || ""} icon={faPenToSquare} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
        <AdminStickySave label="Save placed students" />
    </Panel>
  );
}
