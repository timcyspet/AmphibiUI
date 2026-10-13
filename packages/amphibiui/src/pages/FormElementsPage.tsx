import { useState, type DragEvent, type ReactNode } from "react";
import { useAmphibiUIOptional } from "../context/AmphibiUIContext.js";
import { RichTextEditor } from "../components/Editor/RichTextEditor.js";
import { AmphibiIcon } from "../components/Icon/AmphibiIcon.js";
import { AmphibiSelect } from "../components/Select/AmphibiSelect.js";
import { faBell, faCalendarDays, faChartLine, faEnvelope, faGear, faUser } from "@fortawesome/free-solid-svg-icons";

const multipleOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
const departmentOptions = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
];
type DepartmentOption = (typeof departmentOptions)[number];
const iconExamples = [
  { icon: faUser, name: "faUser", description: "Profiles and user accounts" },
  { icon: faEnvelope, name: "faEnvelope", description: "Mail and messages" },
  { icon: faBell, name: "faBell", description: "Notifications and alerts" },
  { icon: faCalendarDays, name: "faCalendarDays", description: "Dates and schedules" },
  { icon: faChartLine, name: "faChartLine", description: "Analytics and trends" },
  { icon: faGear, name: "faGear", description: "Settings and preferences" },
];

function FormSection({ title, children, className }: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const id = `form-section-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section className={["aui-card", "aui-form-section", className].filter(Boolean).join(" ")} aria-labelledby={id}>
      <header><h3 id={id}>{title}</h3></header>
      <div className="aui-form-section-body">{children}</div>
    </section>
  );
}

function FormField({ label, htmlFor, children }: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="aui-form-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

function ToggleChoice({ id, label, checked = false, disabled = false, tone = "primary" }: {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  tone?: "primary" | "dark";
}) {
  return (
    <label className={`aui-form-toggle-choice aui-form-toggle-${tone}`} htmlFor={id}>
      <input id={id} type="checkbox" defaultChecked={checked} disabled={disabled} />
      <span className="aui-form-toggle-track" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

export function FormElementsPage() {
  const { framework } = useAmphibiUIOptional();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["Option 1", "Option 3"]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [droppedFileNames, setDroppedFileNames] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [richTextLength, setRichTextLength] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentOption | null>(departmentOptions[1]);
  const [selectedDepartments, setSelectedDepartments] = useState<DepartmentOption[]>([departmentOptions[0]]);

  const setDroppedFiles = (files: FileList | null) => {
    if (files) setDroppedFileNames(Array.from(files, (file) => file.name));
  };

  const handleFileDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    setDroppedFiles(event.dataTransfer.files);
  };

  return (
    <div className={`aui-form-elements aui-form-elements-${framework}`}>
      <div className="aui-page-intro">
        <div>
          <h2>Form Elements</h2>
          <p>Inputs, selectors, and controls for building clear, consistent forms.</p>
        </div>
      </div>

      <div className="aui-form-elements-columns">
        <div className="aui-form-elements-column">
          <FormSection title="Default Inputs">
            <div className="aui-form-controls">
              <FormField label="Input" htmlFor="form-default-input">
                <input id="form-default-input" className="aui-form-control" />
              </FormField>
              <FormField label="Input with Placeholder" htmlFor="form-placeholder-input">
                <input id="form-placeholder-input" className="aui-form-control" placeholder="info@gmail.com" />
              </FormField>
              <FormField label="Select Input" htmlFor="form-default-select">
                <select id="form-default-select" className="aui-form-control" defaultValue="">
                  <option value="" disabled>Select an option</option>
                  <option>Design</option>
                  <option>Engineering</option>
                  <option>Marketing</option>
                </select>
              </FormField>
              <FormField label="Password Input" htmlFor="form-password-input">
                <span className="aui-form-password">
                  <input
                    id="form-password-input"
                    className="aui-form-control"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </span>
              </FormField>
              <FormField label="Date Picker Input" htmlFor="form-date-input">
                <input id="form-date-input" className="aui-form-control" type="date" />
              </FormField>
              <FormField label="Time Picker Input" htmlFor="form-time-input">
                <input id="form-time-input" className="aui-form-control" type="time" />
              </FormField>
              <FormField label="Input with Payment" htmlFor="form-payment-input">
                <span className="aui-form-payment">
                  <span className="aui-form-payment-icon" aria-hidden="true"><i /><i /></span>
                  <input
                    id="form-payment-input"
                    className="aui-form-control"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="Card number"
                  />
                </span>
              </FormField>
            </div>
          </FormSection>

          <FormSection title="Select Inputs">
            <div className="aui-form-controls">
              <FormField label="Select Input" htmlFor="form-select-input">
                <select id="form-select-input" className="aui-form-control" defaultValue="">
                  <option value="" disabled>Select Option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </FormField>
              <div className="aui-form-field">
                <label htmlFor="form-multiple-select">Multiple Select Options</label>
                <div className="aui-form-multiselect">
                  {selectedOptions.map((option) => (
                    <span className="aui-form-chip" key={option}>
                      {option}
                      <button
                        type="button"
                        aria-label={`Remove ${option}`}
                        onClick={() => setSelectedOptions((selected) => selected.filter((item) => item !== option))}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <select
                    id="form-multiple-select"
                    aria-label="Add an option"
                    value=""
                    onChange={(event) => {
                      const option = event.target.value;
                      if (option) setSelectedOptions((selected) => [...selected, option]);
                    }}
                  >
                    <option value="">Add option</option>
                    {multipleOptions.filter((option) => !selectedOptions.includes(option)).map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection title="React Select">
            <div className="aui-form-controls">
              <FormField label="Searchable Single Select" htmlFor="form-react-select">
                <AmphibiSelect<DepartmentOption>
                  inputId="form-react-select"
                  aria-label="Searchable department select"
                  options={departmentOptions}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  placeholder="Choose a department..."
                  isClearable
                />
              </FormField>
              <p className="aui-select-selection" aria-live="polite">
                Selected department: {selectedDepartment?.label ?? "None"}
              </p>
              <FormField label="Searchable Multi-select" htmlFor="form-react-multi-select">
                <AmphibiSelect<DepartmentOption, true>
                  inputId="form-react-multi-select"
                  aria-label="Multiple departments"
                  options={departmentOptions}
                  value={selectedDepartments}
                  onChange={(value) => setSelectedDepartments([...value])}
                  placeholder="Choose departments..."
                  isMulti
                  closeMenuOnSelect={false}
                />
              </FormField>
              <p className="aui-select-selection" aria-live="polite">
                Selected departments: {selectedDepartments.length > 0
                  ? selectedDepartments.map(({ label }) => label).join(", ")
                  : "None"}
              </p>
            </div>
          </FormSection>

          <FormSection title="Font Awesome Icons">
            <div className="aui-table-wrap">
              <table className="aui-table aui-icon-table">
                <caption>Common Font Awesome icons and their use cases</caption>
                <thead>
                  <tr><th scope="col">Preview</th><th scope="col">Icon name</th><th scope="col">Example usage</th></tr>
                </thead>
                <tbody>
                  {iconExamples.map(({ icon, name, description }) => (
                    <tr key={name}>
                      <td><AmphibiIcon icon={icon} aria-hidden="true" /></td>
                      <td><code>{name}</code></td>
                      <td>{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FormSection>

          <FormSection title="Textarea Input Field">
            <div className="aui-form-controls">
              <FormField label="Description" htmlFor="form-description">
                <textarea id="form-description" className="aui-form-control aui-form-textarea" placeholder="Enter your message" rows={4} />
              </FormField>
              <FormField label="Description (Disabled)" htmlFor="form-description-disabled">
                <textarea id="form-description-disabled" className="aui-form-control aui-form-textarea" placeholder="Enter your message" rows={4} disabled />
              </FormField>
              <FormField label="Description (Read only)" htmlFor="form-description-readonly">
                <textarea id="form-description-readonly" className="aui-form-control aui-form-textarea" defaultValue="This content is available for reference." rows={3} readOnly />
              </FormField>
            </div>
          </FormSection>

          <FormSection title="Rich Text Editor">
            <RichTextEditor
              ariaLabel="Rich text description editor"
              placeholder="Write a formatted description..."
              onChange={(serializedState) => setRichTextLength(serializedState.length)}
            />
            <p className="aui-rich-text-status" aria-live="polite">
              {richTextLength > 0 ? `Draft updated (${richTextLength} serialized characters).` : "Format text, create lists, and undo or redo edits."}
            </p>
          </FormSection>
        </div>

        <div className="aui-form-elements-column">
          <FormSection title="Input Group">
            <div className="aui-form-controls">
              <FormField label="Email" htmlFor="form-group-email">
                <span className="aui-form-input-group">
                  <span className="aui-form-input-addon" aria-hidden="true">✉</span>
                  <input id="form-group-email" className="aui-form-control" type="email" placeholder="info@gmail.com" />
                </span>
              </FormField>
              <FormField label="Phone" htmlFor="form-group-phone">
                <span className="aui-form-input-group">
                  <select className="aui-form-control aui-form-country-code" aria-label="Country calling code">
                    <option>US</option><option>GB</option><option>FR</option>
                  </select>
                  <input id="form-group-phone" className="aui-form-control" type="tel" placeholder="+1" />
                </span>
              </FormField>
              <FormField label="Phone" htmlFor="form-group-phone-reversed">
                <span className="aui-form-input-group">
                  <input id="form-group-phone-reversed" className="aui-form-control" type="tel" defaultValue="+1" />
                  <select className="aui-form-control aui-form-country-code" aria-label="Phone country">
                    <option>US</option><option>GB</option><option>FR</option>
                  </select>
                </span>
              </FormField>
            </div>
          </FormSection>

          <FormSection title="File Input">
            <div className="aui-form-controls">
              <FormField label="Upload File" htmlFor="form-file-input">
                <input
                  id="form-file-input"
                  className="aui-form-control aui-form-file"
                  type="file"
                  multiple
                  onChange={(event) => setFileNames(Array.from(event.target.files ?? [], (file) => file.name))}
                />
              </FormField>
              {fileNames.length > 0 && <p className="aui-form-file-names" role="status">{fileNames.join(", ")}</p>}
            </div>
          </FormSection>

          <FormSection title="Checkbox">
            <div className="aui-form-choice-list">
              <label className="aui-form-choice"><input type="checkbox" /> Default</label>
              <label className="aui-form-choice"><input type="checkbox" defaultChecked /> Checked</label>
              <label className="aui-form-choice"><input type="checkbox" disabled /> Disabled</label>
            </div>
          </FormSection>

          <FormSection title="Radio Buttons">
            <div className="aui-form-choice-list">
              <label className="aui-form-choice"><input type="radio" name="form-radio" /> Default</label>
              <label className="aui-form-choice"><input type="radio" name="form-radio" defaultChecked /> Selected</label>
              <label className="aui-form-choice"><input type="radio" name="form-radio-disabled" disabled /> Disabled</label>
            </div>
          </FormSection>

          <FormSection title="Toggle Switch Input">
            <div className="aui-form-toggle-rows">
              <div className="aui-form-choice-list">
                <ToggleChoice id="form-toggle-default" label="Default" />
                <ToggleChoice id="form-toggle-checked" label="Checked" checked />
                <ToggleChoice id="form-toggle-disabled" label="Disabled" disabled />
              </div>
              <div className="aui-form-choice-list">
                <ToggleChoice id="form-toggle-dark-default" label="Default" tone="dark" />
                <ToggleChoice id="form-toggle-dark-checked" label="Checked" tone="dark" checked />
                <ToggleChoice id="form-toggle-dark-disabled" label="Disabled" tone="dark" disabled />
              </div>
            </div>
          </FormSection>

          <FormSection title="Dropzone">
            <label
              className="aui-form-dropzone"
              data-drag-active={dragging}
              htmlFor="form-dropzone-input"
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleFileDrop}
            >
              <input
                id="form-dropzone-input"
                className="aui-form-dropzone-input"
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.svg"
                multiple
                onChange={(event) => setDroppedFiles(event.target.files)}
              />
              <span className="aui-form-dropzone-icon" aria-hidden="true">↑</span>
              <strong>Drag &amp; Drop Files Here</strong>
              <span>Drop your PNG, JPG, PDF, or SVG images here or browse.</span>
              <span className="aui-form-dropzone-browse">Browse Files</span>
            </label>
            {droppedFileNames.length > 0 && (
              <p className="aui-form-file-names" role="status">{droppedFileNames.join(", ")}</p>
            )}
          </FormSection>
        </div>
      </div>
    </div>
  );
}

export default FormElementsPage;
