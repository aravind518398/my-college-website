import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faImage, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AdminStickySave } from "./AdminCmsLayout";
import ImageUploadField from "./ImageUploadField";

function Field({
  label,
  name,
  defaultValue,
  icon,
  multiline = false,
  placeholder,
}) {
  const inputClass =
    "mt-2 w-full rounded-lg border border-[#d9e6f1] bg-white px-3 py-2.5 text-sm font-medium text-[#18213b] outline-none transition focus:border-[#179BD7] focus:ring-4 focus:ring-[#179BD7]/10";

  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        {icon ? <FontAwesomeIcon icon={icon} className="text-[#179BD7]" /> : null}
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={3}
          className={`${inputClass} resize-y leading-6`}
          placeholder={placeholder}
        />
      ) : (
        <input name={name} defaultValue={defaultValue} className={inputClass} placeholder={placeholder}/>
      )}
    </label>
  );
}

function CardRows({ title, cards, prefix, canAdd }) {
  const rowCount = canAdd ? cards.length + 1 : cards.length;

  return (
    <div className="space-y-5">
      <div className="sticky top-1 z-50 flex items-center justify-between gap-3 rounded-lg border border-[#1ab69d] bg-[#fbfdff]/10 px-4 py-3 backdrop-blur">
        <p className="text-sm font-bold text-[#1ab69d]">{title}</p>
        <p className="text-sm font-semibold text-[#40506f]">{cards.length} card(s)</p>
      </div>

      <input type="hidden" name={`${prefix}-row-count`} value={rowCount} />

      {[...cards, ...(canAdd ? [{}] : [])].map((card, cardIndex) => {
        const isNewRow = cardIndex >= cards.length;
        const rowPrefix = `${prefix}-${cardIndex}`;

        return (
          <article
            key={card.id || `new-${cardIndex}`}
            className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                  {isNewRow ? "New card" : `Card ${cardIndex + 1}`}
                </p>
                <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                  {isNewRow ? "Add programme card" : card.course}
                </h3>
              </div>
              {!isNewRow ? (
                <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                  <input type="checkbox" name={`${rowPrefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </label>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Slug ID" name={`${rowPrefix}-id`} defaultValue={card.id || ""} icon={faPenToSquare} placeholder={"eg: ug-bca"} />
              <Field label="Programme Name" name={`${rowPrefix}-course`} defaultValue={card.course || ""} icon={faGraduationCap} placeholder={"eg: BCA"}/>
              <Field
                label="Programme Slug (academics URL)"
                name={`${rowPrefix}-programId`}
                defaultValue={card.programId || ""}
                icon={faPenToSquare}
                placeholder={"eg: bca"}
              />
              <ImageUploadField 
              label="Image Path" 
              name={`${rowPrefix}-img`} 
              defaultValue={card.img || ""} 
              defaultPublicId={card.imgPublicId || ""}
              icon={faImage} 
              variant="placedStudents"
              />
              <div className="md:col-span-2">
                <Field
                  label="Short Description"
                  name={`${rowPrefix}-detail`}
                  defaultValue={card.detail || ""}
                  icon={faPenToSquare}
                  multiline
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function HomeProgrammeCardsPanel({
  ugCards,
  pgCards,
  maxCards,
  canAddUg,
  canAddPg,
}) {
  return (
    <section id="home-programme-cards" className="scroll-mt-6 rounded-xl border border-[#e1ebf4] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#179BD7]/10 text-[#179BD7]">
          <FontAwesomeIcon icon={faGraduationCap} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-[#18213b]">Home Programme Cards</h2>
          <p className="mt-1 text-sm leading-6 text-[#63708a]">
            Manage UG and PG programme cards on the homepage (up to {maxCards} per section). Programme slug links to the academics page details section.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        <CardRows title="UG Programmes" cards={ugCards} prefix="home-ug-card" canAdd={canAddUg} />
        <CardRows title="PG Programmes" cards={pgCards} prefix="home-pg-card" canAdd={canAddPg} />
      </div>

      <AdminStickySave label="Save home programme cards" />
    </section>
  );
}
