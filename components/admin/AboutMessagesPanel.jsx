import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faQuoteLeft, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { AdminStickySave } from "./AdminCmsLayout";
import ImageUploadField from "./ImageUploadField";

function Field({
  label,
  name,
  defaultValue,
  icon,
  type = "text",
  multiline = false,
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
          rows={8}
          className={`${inputClass} resize-y leading-6`}
        />
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

export default function AboutMessagesPanel({
  messages,
  messageRowCount,
  canAddMessage,
  maxMessages,
}) {
  return (
    <Panel
      id="about-messages"
      title="About Page Messages"
      description={`Manage leadership messages on the About page (up to ${maxMessages}). Edit titles, quotes, photos, and message body paragraphs. Tick delete to remove a message, or fill the blank row to add another.`}
      icon={faQuoteLeft}
    >
      <input type="hidden" name="about-message-row-count" value={messageRowCount} />

      <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#dce7f0] bg-[#fbfdff] px-4 py-3">
        <p className="text-sm font-semibold text-[#40506f]">{messages.length} message(s) in use</p>
        {canAddMessage ? (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#12826f]">
            Add message row available
          </span>
        ) : (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#a33c3c]">
            Maximum reached
          </span>
        )}
      </div>

      <div className="space-y-6">
        {[...messages, ...(canAddMessage ? [{}] : [])].map((message, messageIndex) => {
          const isNewRow = messageIndex >= messages.length;
          const prefix = `about-message-${messageIndex}`;

          return (
            <article
              key={message.id || `new-${messageIndex}`}
              className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                    {isNewRow ? "New message" : `Message ${messageIndex + 1}`}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                    {isNewRow ? "Add leadership message" : message.title}
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
                <Field
                  label="Slug ID"
                  name={`${prefix}-id`}
                  defaultValue={message.id || ""}
                  icon={faPenToSquare}
                />
                <Field
                  label="Section Title"
                  name={`${prefix}-title`}
                  defaultValue={message.title || ""}
                  icon={faPenToSquare}
                />
                <Field
                  label="Name"
                  name={`${prefix}-name`}
                  defaultValue={message.name || ""}
                  icon={faUser}
                />
                <Field
                  label="Role"
                  name={`${prefix}-role`}
                  defaultValue={message.role || ""}
                  icon={faPenToSquare}
                />
                
                <div className="md:col-span-2">
                  <Field
                    label="Quote"
                    name={`${prefix}-quote`}
                    defaultValue={message.quote || ""}
                    icon={faQuoteLeft}
                    multiline
                  />
                </div>
                <Field
                  label="Quote Author"
                  name={`${prefix}-author`}
                  defaultValue={message.author || ""}
                  icon={faPenToSquare}
                />
                <div className="md:col-span-2">
                  <ImageUploadField
                    label="Photo Path"
                    name={`${prefix}-image`}
                    defaultValue={message.image || ""}
                    icon={faPenToSquare}
                    className="h-full w-full object-cover"
                    variant="person"
                  />
                </div>
                <div className="md:col-span-2">
                  <Field
                    label="Message Paragraphs (one per line)"
                    name={`${prefix}-paragraphs`}
                    defaultValue={(message.paragraphs || []).join("\n")}
                    icon={faPenToSquare}
                    multiline
                  />
                </div>
                
              </div>
            </article>
          );
        })}
      </div>

      <AdminStickySave label="Save about messages" />
    </Panel>
  );
}
