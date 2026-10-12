import { useEffect, useMemo, useState, type FormEvent, type MouseEvent } from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CodeNode } from "@lexical/code";
import { LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { $createHorizontalRuleNode, HorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/extension";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, FORMAT_TEXT_COMMAND, ParagraphNode, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useAmphibiUIOptional } from "../../context/AmphibiUIContext.js";

export interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (serializedState: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
  onError?: (error: Error) => void;
}

function isSafeLinkUrl(value: string): boolean {
  if (!value.trim()) return false;
  try {
    const protocol = new URL(value).protocol;
    return ["http:", "https:", "mailto:", "tel:"].includes(protocol);
  } catch {
    return false;
  }
}

function EditorToolbar({ disabled }: { disabled: boolean }) {
  const [editor] = useLexicalComposerContext();
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkError, setLinkError] = useState("");
  const buttonProps = {
    type: "button" as const,
    disabled,
    onMouseDown: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault(),
  };

  const setBlockType = (type: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      if (type === "paragraph") $setBlocksType(selection, () => new ParagraphNode());
      else if (type === "h1" || type === "h2") $setBlocksType(selection, () => new HeadingNode(type));
      else if (type === "quote") $setBlocksType(selection, () => new QuoteNode());
      else if (type === "code") $setBlocksType(selection, () => new CodeNode());
    });
  };

  const insertContent = (action: string) => {
    if (action === "link") {
      setLinkOpen(true);
      setLinkError("");
    } else if (action === "horizontal-rule") {
      editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
    } else if (action === "bullet-list") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else if (action === "numbered-list") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else if (action === "h1" || action === "h2" || action === "quote" || action === "code") {
      setBlockType(action);
    }
  };

  const applyLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = linkUrl.trim();
    if (!isSafeLinkUrl(url)) {
      setLinkError("Enter a valid HTTP(S), mailto, or tel URL.");
      return;
    }

    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    setLinkOpen(false);
    setLinkUrl("");
    setLinkError("");
  };

  const removeLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    setLinkOpen(false);
    setLinkUrl("");
    setLinkError("");
  };

  return (
    <>
      <div className="aui-rich-text-toolbar" role="toolbar" aria-label="Text formatting">
        <select
          aria-label="Block style"
          defaultValue="paragraph"
          disabled={disabled}
          onChange={(event) => setBlockType(event.target.value)}
        >
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="quote">Quote</option>
          <option value="code">Code block</option>
        </select>
        <span className="aui-rich-text-toolbar-divider" aria-hidden="true" />
        <button {...buttonProps} aria-label="Bold" title="Bold" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}><strong>B</strong></button>
        <button {...buttonProps} aria-label="Italic" title="Italic" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}><em>I</em></button>
        <button {...buttonProps} aria-label="Underline" title="Underline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}><u>U</u></button>
        <button {...buttonProps} aria-label="Strikethrough" title="Strikethrough" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}><s>S</s></button>
        <button {...buttonProps} aria-label="Inline code" title="Inline code" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}><code>{"</>"}</code></button>
        <button {...buttonProps} aria-label="Subscript" title="Subscript" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")}>x<sub>2</sub></button>
        <button {...buttonProps} aria-label="Superscript" title="Superscript" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")}>x<sup>2</sup></button>
        <span className="aui-rich-text-toolbar-divider" aria-hidden="true" />
        <button {...buttonProps} aria-label="Bulleted list" title="Bulleted list" onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>Bullets</button>
        <button {...buttonProps} aria-label="Numbered list" title="Numbered list" onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>Numbering</button>
        <label className="aui-rich-text-insert">
          <span>Insert</span>
          <select
            aria-label="Insert content"
            defaultValue=""
            disabled={disabled}
            onChange={(event) => {
              insertContent(event.target.value);
              event.target.value = "";
            }}
          >
            <option value="" disabled>Select...</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="quote">Quote</option>
            <option value="code">Code block</option>
            <option value="bullet-list">Bulleted list</option>
            <option value="numbered-list">Numbered list</option>
            <option value="link">Link</option>
            <option value="horizontal-rule">Horizontal rule</option>
          </select>
        </label>
        <span className="aui-rich-text-toolbar-divider" aria-hidden="true" />
        <button {...buttonProps} aria-label="Undo" title="Undo" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>Undo</button>
        <button {...buttonProps} aria-label="Redo" title="Redo" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>Redo</button>
      </div>
      {linkOpen && (
        <form className="aui-rich-text-link-panel" onSubmit={applyLink}>
          <label htmlFor="aui-rich-text-link-url">Link URL</label>
          <input
            id="aui-rich-text-link-url"
            autoFocus
            type="text"
            inputMode="url"
            disabled={disabled}
            value={linkUrl}
            onChange={(event) => { setLinkUrl(event.target.value); setLinkError(""); }}
            placeholder="https://example.com"
            aria-describedby={linkError ? "aui-rich-text-link-error" : undefined}
          />
          {linkError && <span id="aui-rich-text-link-error" role="alert">{linkError}</span>}
          <button type="submit" disabled={disabled}>Apply link</button>
          <button type="button" disabled={disabled} onClick={removeLink}>Remove link</button>
          <button type="button" onClick={() => { setLinkOpen(false); setLinkError(""); }}>Cancel</button>
        </form>
      )}
    </>
  );
}

function EditablePlugin({ disabled }: { disabled: boolean }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  return null;
}

function HorizontalRuleCommandPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => editor.registerCommand(
    INSERT_HORIZONTAL_RULE_COMMAND,
    () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;
      selection.insertNodes([$createHorizontalRuleNode()]);
      return true;
    },
    COMMAND_PRIORITY_EDITOR,
  ), [editor]);

  return null;
}

export function RichTextEditor({
  initialValue,
  onChange,
  placeholder = "Start writing...",
  ariaLabel = "Rich text editor",
  disabled = false,
  className,
  onError,
}: RichTextEditorProps) {
  const { framework } = useAmphibiUIOptional();
  const initialConfig = useMemo(() => ({
    namespace: "AmphibiUIRichTextEditor",
    nodes: [HeadingNode, QuoteNode, CodeNode, LinkNode, HorizontalRuleNode, ListNode, ListItemNode],
    editorState: initialValue ?? undefined,
    editable: !disabled,
    onError: (error: Error) => {
      if (onError) onError(error);
      else console.error("AmphibiUI RichTextEditor encountered an error:", error);
    },
  }), [disabled, initialValue, onError]);

  return (
    <div className={["aui-rich-text-editor", `aui-rich-text-editor-${framework}`, disabled && "is-disabled", className].filter(Boolean).join(" ")}>
      <LexicalComposer initialConfig={initialConfig}>
        <EditorToolbar disabled={disabled} />
        <div className="aui-rich-text-surface">
          <RichTextPlugin
            contentEditable={<ContentEditable aria-label={ariaLabel} className="aui-rich-text-content" />}
            placeholder={<span className="aui-rich-text-placeholder">{placeholder}</span>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin validateUrl={isSafeLinkUrl} />
        <HorizontalRuleCommandPlugin />
        <EditablePlugin disabled={disabled} />
        {onChange && (
          <OnChangePlugin onChange={(editorState) => onChange(JSON.stringify(editorState.toJSON()))} />
        )}
      </LexicalComposer>
    </div>
  );
}

export default RichTextEditor;
