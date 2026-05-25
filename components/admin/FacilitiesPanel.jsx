import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
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
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={4}
          className={`${inputClass} resize-y leading-6`}
        />
      ) : (
        <input name={name} defaultValue={defaultValue} className={inputClass} />
      )}
    </label>
  );
}

export default function FacilitiesPanel({ page, itemRowCount, canAddItem, maxItems }) {
  return (
    <section id="facilities" className="scroll-mt-6 rounded-xl border border-[#e1ebf4] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#179BD7]/10 text-[#179BD7]">
          <FontAwesomeIcon icon={faBuilding} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-[#18213b]">Facilities Page</h2>
          <p className="mt-1 text-sm leading-6 text-[#63708a]">
            Manage the /facilities page hero and facility list (up to {maxItems} items).
          </p>
        </div>
      </div>

      <input type="hidden" name="facility-item-row-count" value={itemRowCount} />

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Field label="Hero Eyebrow" name="facility-hero-eyebrow" defaultValue={page.hero.eyebrow} icon={faPenToSquare} />
        <Field label="Hero Title" name="facility-hero-title" defaultValue={page.hero.title} icon={faPenToSquare} />
        <div className="md:col-span-2">
          <Field
            label="Hero Description"
            name="facility-hero-description"
            defaultValue={page.hero.description}
            icon={faPenToSquare}
            multiline
          />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#dce7f0] bg-[#fbfdff] px-4 py-3">
        <p className="text-sm font-semibold text-[#40506f]">{page.items.length} facility item(s)</p>
        {canAddItem ? (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#12826f]">
            Add item row available
          </span>
        ) : (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#a33c3c]">
            Maximum reached
          </span>
        )}
      </div>

      <div className="space-y-5">
        {[...page.items, ...(canAddItem ? [{}] : [])].map((item, itemIndex) => {
          const isNewRow = itemIndex >= page.items.length;
          const prefix = `facility-item-${itemIndex}`;

          return (
            <article
              key={item.id || `new-${itemIndex}`}
              className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                    {isNewRow ? "New facility" : `Item ${itemIndex + 1}`}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                    {isNewRow ? "Add facility" : item.title}
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

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Slug ID" name={`${prefix}-id`} defaultValue={item.id || ""} icon={faPenToSquare} />
                <Field label="Title" name={`${prefix}-title`} defaultValue={item.title || ""} icon={faPenToSquare} />
                <div className="md:col-span-2">
                  <Field
                    label="Description (optional)"
                    name={`${prefix}-description`}
                    defaultValue={item.description || ""}
                    icon={faPenToSquare}
                    multiline
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <AdminStickySave label="Save facilities" />
    </section>
  );
}
