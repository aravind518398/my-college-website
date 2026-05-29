import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPenToSquare,
  faTrash,
  faIdBadge,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import { AdminStickySave } from "./AdminCmsLayout";
import ImageUploadField from "./ImageUploadField";
import { MAX_NSS_PROGRAMME_OFFICERS } from "@/lib/nssProgrammeOfficersDefaults";

function Field({
  label,
  name,
  defaultValue,
  icon,
  multiline = false,
  placeholder = "",

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

      {multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={3}
          className={`${inputClass} resize-y leading-6`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          name={name}
          defaultValue={defaultValue}
          className={inputClass}
          placeholder={placeholder}

        />
      )}
    </label>
  );
}

function Panel({ id, title, description, icon, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-6 rounded-xl border border-[#e1ebf4] bg-white p-5 shadow-sm"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#179BD7]/10 text-[#179BD7]">
          <FontAwesomeIcon icon={icon} />
        </span>

        <div>
          <h2 className="text-lg font-bold text-[#18213b]">{title}</h2>

          <p className="mt-1 text-sm leading-6 text-[#63708a]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

export default function NssProgrammeOfficersPanel({
  officers = [],
  officerRowCount = 0,
}) {

  const canAddOfficer =
    officers.length < officerRowCount;
  return (
    <Panel
      id="nss-programme-officers"
      title="NSS Programme Officers"
      description="Manage NSS Programme Officer cards displayed on the Co-Curricular page. Edit officer details, department, image, unit, and description."
      icon={faUsers}
    >
      <input
        type="hidden"
        name="nss-officer-row-count"
        value={officerRowCount}
      />

      <p className="mb-4 text-sm font-semibold text-[#40506f]">
        {officers.length} officer
        {officers.length === 1 ? "" : "s"} saved
      </p>

      <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#dce7f0] bg-[#fbfdff] px-4 py-3">
        <p className="text-sm font-semibold text-[#40506f]">
          {officers.length} of {MAX_NSS_PROGRAMME_OFFICERS} officers in use
        </p>

        {canAddOfficer ? (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#12826f]">
            Add officer row available
          </span>
        ) : (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#a33c3c]">
            Maximum reached
          </span>
        )}
      </div>

      <div className="space-y-5">

        {[
          ...officers,
          ...(canAddOfficer ? [{}] : []),
        ].map((officer, officerIndex) => {
          const isNewRow = officerIndex >= officers.length;

          const prefix = `nss-officer-${officerIndex}`;

          return (
            <article
              key={officer.id || `new-${officerIndex}`}
              className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                    {isNewRow
                      ? "New Officer"
                      : `Officer ${officerIndex + 1}`}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                    {isNewRow
                      ? "Add NSS Programme Officer"
                      : officer.name}
                  </h3>
                </div>

                {!isNewRow ? (
                  <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                    <input
                      type="checkbox"
                      name={`${prefix}-delete`}
                      className="h-4 w-4 accent-[#a33c3c]"
                    />

                    <FontAwesomeIcon icon={faTrash} />

                    Delete
                  </label>
                ) : null}
              </div>

              {!isNewRow ? (
                <input
                  type="hidden"
                  name={`${prefix}-id`}
                  value={officer.id}
                />
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Officer Name"
                  name={`${prefix}-name`}
                  defaultValue={officer.name || ""}
                  icon={faPenToSquare}
                  placeholder="eg: Rahul Krishnan"
                />

                <Field
                  label="Designation"
                  name={`${prefix}-designation`}
                  defaultValue={officer.designation || ""}
                  icon={faIdBadge}
                  placeholder="eg: NSS Programme Officer"
                />

                <Field
                  label="Department"
                  name={`${prefix}-department`}
                  defaultValue={officer.department || ""}
                  icon={faBuilding}
                  placeholder="eg: Department of Commerce"
                />

                <Field
                  label="NSS Unit"
                  name={`${prefix}-unit`}
                  defaultValue={officer.unit || ""}
                  icon={faIdBadge}
                  placeholder="eg: Unit 252"
                />

                <ImageUploadField
                  label="Officer Image"
                  name={`${prefix}-image`}
                  defaultValue={officer.image || ""}
                  defaultPublicId={officer.imagePublicId || ""}
                  previewAlt={officer.name || "Officer image preview"}
                  variant="person"
                />

                <div className="md:col-span-2">
                  <Field
                    label="Short Description"
                    name={`${prefix}-description`}
                    defaultValue={officer.description || ""}
                    icon={faPenToSquare}
                    multiline
                    placeholder="Write a short profile about the officer..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Field
                    label="Image Alt Text"
                    name={`${prefix}-alt`}
                    defaultValue={officer.alt || ""}
                    icon={faPenToSquare}
                    placeholder="eg: Rahul Krishnan NSS Programme Officer"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <AdminStickySave label="Save NSS Programme Officers" />
    </Panel>
  );
}
